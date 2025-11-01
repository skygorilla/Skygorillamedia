export interface ButtonDiagnostic {
  id: string;
  element: string;
  file: string;
  line: number;
  type: 'ui-component' | 'html-button' | 'interactive';
  accessibility: {
    hasAriaLabel: boolean;
    hasRole: boolean;
    isKeyboardAccessible: boolean;
  };
  functionality: {
    hasClickHandler: boolean;
    hasDisabledState: boolean;
    hasLoadingState: boolean;
  };
  issues: string[];
}

export const diagnoseAllButtons = (): ButtonDiagnostic[] => {
  const buttons: ButtonDiagnostic[] = [
    // Hero Section Buttons
    {
      id: 'hero-calculate',
      element: 'button.btn.primary',
      file: 'src/components/hero-section.tsx',
      line: 33,
      type: 'html-button',
      accessibility: { hasAriaLabel: false, hasRole: false, isKeyboardAccessible: true },
      functionality: { hasClickHandler: false, hasDisabledState: false, hasLoadingState: false },
      issues: ['Missing click handler', 'No aria-label']
    },
    {
      id: 'hero-models',
      element: 'button.btn.outline',
      file: 'src/components/hero-section.tsx',
      line: 34,
      type: 'html-button',
      accessibility: { hasAriaLabel: false, hasRole: false, isKeyboardAccessible: true },
      functionality: { hasClickHandler: false, hasDisabledState: false, hasLoadingState: false },
      issues: ['Missing click handler', 'No aria-label']
    },
    
    // Calculator Buttons
    {
      id: 'calc-mini',
      element: 'button.go-calc__pill[data-plan="mini"]',
      file: 'src/components/calculator.tsx',
      line: 175,
      type: 'html-button',
      accessibility: { hasAriaLabel: false, hasRole: false, isKeyboardAccessible: true },
      functionality: { hasClickHandler: false, hasDisabledState: false, hasLoadingState: false },
      issues: ['Missing click handler']
    },
    {
      id: 'calc-standard',
      element: 'button.go-calc__pill[data-plan="standard"]',
      file: 'src/components/calculator.tsx',
      line: 176,
      type: 'html-button',
      accessibility: { hasAriaLabel: false, hasRole: false, isKeyboardAccessible: true },
      functionality: { hasClickHandler: false, hasDisabledState: false, hasLoadingState: false },
      issues: ['Missing click handler']
    },
    {
      id: 'calc-partner',
      element: 'button.go-calc__pill[data-plan="partner"]',
      file: 'src/components/calculator.tsx',
      line: 177,
      type: 'html-button',
      accessibility: { hasAriaLabel: false, hasRole: false, isKeyboardAccessible: true },
      functionality: { hasClickHandler: false, hasDisabledState: false, hasLoadingState: false },
      issues: ['Missing click handler']
    },
    {
      id: 'calc-reset',
      element: 'button.btn.outline#go-reset',
      file: 'src/components/calculator.tsx',
      line: 198,
      type: 'html-button',
      accessibility: { hasAriaLabel: false, hasRole: false, isKeyboardAccessible: true },
      functionality: { hasClickHandler: false, hasDisabledState: false, hasLoadingState: false },
      issues: ['Missing click handler']
    },

    // DevTools Buttons
    {
      id: 'devtools-gear',
      element: 'button.settings-gear',
      file: 'src/app/pitch/page.tsx',
      line: 95,
      type: 'html-button',
      accessibility: { hasAriaLabel: false, hasRole: false, isKeyboardAccessible: true },
      functionality: { hasClickHandler: true, hasDisabledState: false, hasLoadingState: false },
      issues: []
    },
    {
      id: 'devtools-close',
      element: 'button.devtools-close',
      file: 'src/app/pitch/page.tsx',
      line: 150,
      type: 'html-button',
      accessibility: { hasAriaLabel: false, hasRole: false, isKeyboardAccessible: true },
      functionality: { hasClickHandler: true, hasDisabledState: false, hasLoadingState: false },
      issues: []
    },

    // Config Fixer Buttons
    {
      id: 'config-fix',
      element: 'button (config fixer)',
      file: 'src/components/ui/config-fixer.tsx',
      line: 40,
      type: 'html-button',
      accessibility: { hasAriaLabel: true, hasRole: false, isKeyboardAccessible: true },
      functionality: { hasClickHandler: true, hasDisabledState: true, hasLoadingState: false },
      issues: []
    }
  ];

  return buttons;
};

export const runButtonTests = (): { passed: number; failed: number; results: any[] } => {
  const buttons = diagnoseAllButtons();
  const results: any[] = [];
  let passed = 0;
  let failed = 0;

  buttons.forEach(btn => {
    const test = {
      id: btn.id,
      file: btn.file,
      tests: {
        hasClickHandler: btn.functionality.hasClickHandler,
        isAccessible: btn.accessibility.hasAriaLabel || btn.accessibility.hasRole,
        hasNoIssues: btn.issues.length === 0
      }
    };

    const testsPassed = Object.values(test.tests).filter(Boolean).length;
    const totalTests = Object.keys(test.tests).length;
    
    if (testsPassed === totalTests) {
      passed++;
    } else {
      failed++;
    }

    results.push({ ...test, score: `${testsPassed}/${totalTests}`, issues: btn.issues });
  });

  return { passed, failed, results };
};