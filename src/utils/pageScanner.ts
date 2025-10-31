import { CodeSuggestion } from '@/types/console';

export class PageScanner {
  static scanAccessibility(): CodeSuggestion[] {
    const suggestions: CodeSuggestion[] = [];

    // Check if running in browser
    if (typeof document === 'undefined') return suggestions;

    try {
      // Check for missing alt text
      const imagesWithoutAlt = document.querySelectorAll('img:not([alt])');
      if (imagesWithoutAlt.length > 0) {
      suggestions.push({
        id: 'missing-alt-text',
        type: 'accessibility',
        title: 'Missing Alt Text',
        description: `${imagesWithoutAlt.length} images missing alt attributes`,
        code: `// Add alt text to images\n<img src="..." alt="Descriptive text" />`,
        autoApply: false,
        impact: 'high',
      });
    }

      // Check for missing form labels
      const inputsWithoutLabels = document.querySelectorAll('input:not([aria-label]):not([aria-labelledby])');
      const unlabeledInputs = Array.from(inputsWithoutLabels).filter(input => {
        const id = input.getAttribute('id');
        return !id || !document.querySelector(`label[for="${id}"]`);
      });

      if (unlabeledInputs.length > 0) {
        suggestions.push({
          id: 'missing-labels',
          type: 'accessibility',
          title: 'Missing Form Labels',
          description: `${unlabeledInputs.length} form inputs missing labels`,
          code: `<label for="input-id">Label text</label>\n<input id="input-id" type="text" />`,
          autoApply: false,
          impact: 'high',
        });
      }
    } catch (error) {
      console.warn('Accessibility scan failed:', error);
    }

    return suggestions;
  }

  static scanSEO(): CodeSuggestion[] {
    const suggestions: CodeSuggestion[] = [];

    if (typeof document === 'undefined') return suggestions;

    try {
      // Check page title
      const title = document.querySelector('title');
    if (!title || !title.textContent || title.textContent.length < 10) {
      suggestions.push({
        id: 'page-title',
        type: 'seo',
        title: 'Improve Page Title',
        description: 'Page title is missing or too short',
        code: `<title>Descriptive Page Title (50-60 characters)</title>`,
        autoApply: false,
        impact: 'high',
      });
    }

      // Check meta description
      const metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription || !metaDescription.getAttribute('content')) {
        suggestions.push({
          id: 'meta-description',
          type: 'seo',
          title: 'Add Meta Description',
          description: 'Missing meta description for search engines',
          code: `<meta name="description" content="Page description (150-160 chars)" />`,
          autoApply: false,
          impact: 'high',
        });
      }
    } catch (error) {
      console.warn('SEO scan failed:', error);
    }

    return suggestions;
  }

  static scanPerformance(): CodeSuggestion[] {
    const suggestions: CodeSuggestion[] = [];

    if (typeof document === 'undefined') return suggestions;

    try {
      // Check image optimization
      const largeImages = document.querySelectorAll('img');
    const unoptimizedImages = Array.from(largeImages).filter(img => {
      return !img.src.includes('.webp') && !img.src.includes('.avif');
    });

      if (unoptimizedImages.length > 0) {
        suggestions.push({
          id: 'image-optimization',
          type: 'performance',
          title: 'Optimize Images',
          description: `${unoptimizedImages.length} images could be optimized`,
          code: `import Image from 'next/image';\n<Image src="..." alt="..." width={500} height={300} />`,
          autoApply: false,
          impact: 'medium',
        });
      }
    } catch (error) {
      console.warn('Performance scan failed:', error);
    }

    return suggestions;
  }

  static scanAll(): CodeSuggestion[] {
    return [
      ...this.scanAccessibility(),
      ...this.scanSEO(),
      ...this.scanPerformance(),
    ];
  }
}