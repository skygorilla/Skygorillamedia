// Suppress IDE console noise
(function() {
  const originalWarn = console.warn;
  const originalError = console.error;
  const originalInfo = console.info;
  
  const shouldSuppress = (message) => {
    return message.includes('[previewserver]') ||
           message.includes('syntax highlighting') ||
           message.includes('MessageNotSentError') ||
           message.includes('Extension host') ||
           message.includes('bundle.js') ||
           message.includes('workbench.js');
  };
  
  console.warn = function(...args) {
    const message = args.join(' ');
    if (!shouldSuppress(message)) {
      originalWarn.apply(console, args);
    }
  };
  
  console.error = function(...args) {
    const message = args.join(' ');
    if (!shouldSuppress(message)) {
      originalError.apply(console, args);
    }
  };
  
  console.info = function(...args) {
    const message = args.join(' ');
    if (!shouldSuppress(message)) {
      originalInfo.apply(console, args);
    }
  };
})();