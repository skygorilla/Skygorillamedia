export const autoFixEngine = {
  // Performance fixes
  optimizeImages: () => {
    document.querySelectorAll('img').forEach(img => {
      if (!img.loading) img.loading = 'lazy';
      if (!img.decoding) img.decoding = 'async';
    });
  },

  // SEO fixes
  addMetaTags: () => {
    if (!document.querySelector('meta[name="viewport"]')) {
      const meta = document.createElement('meta');
      meta.name = 'viewport';
      meta.content = 'width=device-width, initial-scale=1';
      document.head.appendChild(meta);
    }
  },

  // Accessibility fixes
  fixAccessibility: () => {
    // Add missing alt attributes
    document.querySelectorAll('img:not([alt])').forEach(img => {
      img.setAttribute('alt', 'Image');
    });
    
    // Add missing labels
    document.querySelectorAll('input:not([aria-label]):not([id])').forEach((input, i) => {
      input.setAttribute('aria-label', `Input field ${i + 1}`);
    });
  },

  // Apply all fixes
  fixAll: () => {
    autoFixEngine.optimizeImages();
    autoFixEngine.addMetaTags();
    autoFixEngine.fixAccessibility();
    console.log('✅ All auto-fixes applied');
  }
};