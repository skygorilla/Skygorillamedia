export interface UnassignedElement {
  id: string;
  tagName: string;
  selector: string;
  text: string;
  issues: string[];
  severity: 'high' | 'medium' | 'low';
}

export const detectUnassignedElements = (): UnassignedElement[] => {
  const results: UnassignedElement[] = [];
  
  // Check buttons
  document.querySelectorAll('button').forEach((btn, i) => {
    const issues: string[] = [];
    const hasClick = btn.onclick || btn.addEventListener.length > 0 || btn.hasAttribute('onClick');
    const hasAriaLabel = btn.hasAttribute('aria-label') || btn.hasAttribute('aria-labelledby');
    
    if (!hasClick) issues.push('No click handler');
    if (!hasAriaLabel && !btn.textContent?.trim()) issues.push('Missing accessibility label');
    if (btn.disabled && !btn.hasAttribute('aria-disabled')) issues.push('Missing aria-disabled');
    
    if (issues.length > 0) {
      results.push({
        id: `btn-${i}`,
        tagName: 'button',
        selector: btn.className ? `.${btn.className.split(' ')[0]}` : `button:nth-child(${i + 1})`,
        text: btn.textContent?.slice(0, 30) || 'No text',
        issues,
        severity: issues.includes('No click handler') ? 'high' : 'medium'
      });
    }
  });
  
  // Check links
  document.querySelectorAll('a').forEach((link, i) => {
    const issues: string[] = [];
    const hasHref = link.hasAttribute('href') && link.getAttribute('href') !== '#';
    const hasClick = link.onclick || link.addEventListener.length > 0;
    
    if (!hasHref && !hasClick) issues.push('No href or click handler');
    if (!link.textContent?.trim() && !link.hasAttribute('aria-label')) issues.push('Missing link text');
    
    if (issues.length > 0) {
      results.push({
        id: `link-${i}`,
        tagName: 'a',
        selector: link.className ? `.${link.className.split(' ')[0]}` : `a:nth-child(${i + 1})`,
        text: link.textContent?.slice(0, 30) || link.getAttribute('href') || 'No text',
        issues,
        severity: 'medium'
      });
    }
  });
  
  return results;
};