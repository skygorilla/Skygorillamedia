/**
 * SKYGORILLA Security Utilities - World-class security enforcement
 */

export const sanitizeInput = (input: string): string => {
  try {
    if (typeof input !== 'string') return '';
    
    return input
      .replace(/[<>]/g, '')
      .replace(/javascript:/gi, '')
      .replace(/vbscript:/gi, '')
      .replace(/on\w+=/gi, '')
      .substring(0, 1000);
  } catch (error) {
    console.error('Input sanitization failed:', error);
    return '';
  }
};

export const validateUrl = (url: string): boolean => {
  try {
    if (!url || typeof url !== 'string') return false;
    const parsed = new URL(url);
    return ['http:', 'https:'].includes(parsed.protocol);
  } catch (error) {
    console.error('URL validation failed:', error);
    return false;
  }
};

export const escapeHtml = (text: string): string => {
  try {
    if (typeof text !== 'string') return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  } catch (error) {
    console.error('HTML escaping failed:', error);
    return text.replace(/[<>&"']/g, (match) => {
      const entities: Record<string, string> = {
        '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&#x27;'
      };
      return entities[match] || match;
    });
  }
};

export const generateNonce = (): string => {
  return Array.from(crypto.getRandomValues(new Uint8Array(16)))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
};