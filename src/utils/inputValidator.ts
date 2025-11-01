import { z } from 'zod';

/**
 * Comprehensive input validation utilities following Skygorilla security standards
 */

// Sanitize HTML to prevent XSS
export const sanitizeHtml = (input: string): string => {
  return input
    .replace(/[<>\"'&]/g, (match) => {
      const entities: Record<string, string> = {
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        '&': '&amp;',
      };
      return entities[match] || match;
    });
};

// Validate and sanitize URLs
export const validateUrl = (url: string): string | null => {
  try {
    const parsed = new URL(url);
    // Only allow https and http protocols
    if (!['https:', 'http:'].includes(parsed.protocol)) {
      return null;
    }
    // Prevent data URLs and javascript URLs
    if (parsed.protocol === 'data:' || parsed.protocol === 'javascript:') {
      return null;
    }
    return parsed.href;
  } catch {
    return null;
  }
};

// Validate file paths to prevent directory traversal
export const validatePath = (path: string): boolean => {
  return !path.includes('..') && 
         !path.includes('//') && 
         path.startsWith('/') &&
         !/[<>:"|?*]/.test(path);
};

// Common validation schemas
export const schemas = {
  email: z.string().email().max(254),
  
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain uppercase letter')
    .regex(/[a-z]/, 'Password must contain lowercase letter')
    .regex(/[0-9]/, 'Password must contain number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain special character'),
  
  username: z.string()
    .min(3)
    .max(30)
    .regex(/^[a-zA-Z0-9_-]+$/, 'Username can only contain letters, numbers, hyphens, and underscores'),
  
  url: z.string().url().refine(validateUrl, 'Invalid URL format'),
  
  filename: z.string()
    .min(1)
    .max(255)
    .regex(/^[a-zA-Z0-9._-]+$/, 'Invalid filename format'),
  
  cssColor: z.string()
    .regex(/^#[0-9a-fA-F]{3,6}$|^rgb\(|^rgba\(|^hsl\(|^hsla\(/, 'Invalid CSS color format'),
  
  safeString: z.string()
    .max(1000)
    .transform(sanitizeHtml),
};

// Validate form data with comprehensive error handling
export const validateFormData = <T>(
  data: unknown,
  schema: z.ZodSchema<T>
): { success: true; data: T } | { success: false; errors: string[] } => {
  try {
    const result = schema.safeParse(data);
    
    if (result.success) {
      return { success: true, data: result.data };
    }
    
    const errors = result.error.errors.map(err => 
      `${err.path.join('.')}: ${err.message}`
    );
    
    return { success: false, errors };
  } catch (error) {
    console.error('Validation error:', error);
    return { success: false, errors: ['Validation failed'] };
  }
};

// Rate limiting utility
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

export const rateLimit = (
  key: string, 
  maxRequests: number = 10, 
  windowMs: number = 60000
): boolean => {
  const now = Date.now();
  const record = rateLimitMap.get(key);
  
  if (!record || now > record.resetTime) {
    rateLimitMap.set(key, { count: 1, resetTime: now + windowMs });
    return true;
  }
  
  if (record.count >= maxRequests) {
    return false;
  }
  
  record.count++;
  return true;
};

// Clean up rate limit map periodically
setInterval(() => {
  const now = Date.now();
  for (const [key, record] of rateLimitMap.entries()) {
    if (now > record.resetTime) {
      rateLimitMap.delete(key);
    }
  }
}, 300000); // Clean up every 5 minutes