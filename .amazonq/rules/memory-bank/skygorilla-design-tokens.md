# SKYGORILLA Design Token Standards

## Token Naming Convention - World-Class Consistency

### Namespace Structure
- **Colors**: `--sg-color-{category}-{variant}-{state}`
- **Spacing**: `--sg-space-{size}` (xs, sm, md, lg, xl, 2xl)
- **Typography**: `--sg-font-{property}-{variant}`
- **Shadows**: `--sg-shadow-{elevation}`
- **Durations**: `--sg-duration-{speed}`
- **Breakpoints**: `--sg-bp-{size}`

### Color System Validation
```typescript
// SKYGORILLA Color Token Validation
const colorTokens = {
  '--sg-color-primary-500': '#DD0312',
  '--sg-color-accent-500': '#5CB400', 
  '--sg-color-warning-500': '#FFBF00',
  '--sg-color-neutral-50': '#F7F7F8',
  '--sg-color-neutral-900': '#1A1A1A'
};

const validateColorPalette = (tokens: Record<string, string>): boolean => {
  const requiredCategories = ['primary', 'accent', 'neutral', 'warning', 'error'];
  return requiredCategories.every(category => 
    Object.keys(tokens).some(key => key.includes(`-${category}-`))
  );
};
```

## Spacing Scale - Mathematical Precision

### Base Unit System
- **Base**: 4px (0.25rem)
- **Scale**: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128px
- **Semantic**: `--sg-space-xs` through `--sg-space-3xl`

### Typography Scale
- **Ratio**: 1.125 (Major Second)
- **Base**: 16px (1rem)
- **Scale**: 12, 14, 16, 18, 20, 24, 28, 32, 36, 48, 64px

### Shadow System
```css
/* SKYGORILLA Shadow Tokens */
--sg-shadow-xs: 0 1px 2px rgba(0,0,0,0.05);
--sg-shadow-sm: 0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06);
--sg-shadow-md: 0 4px 6px rgba(0,0,0,0.07), 0 2px 4px rgba(0,0,0,0.06);
--sg-shadow-lg: 0 10px 15px rgba(0,0,0,0.1), 0 4px 6px rgba(0,0,0,0.05);
--sg-shadow-xl: 0 20px 25px rgba(0,0,0,0.1), 0 10px 10px rgba(0,0,0,0.04);
```

## Token Validation Automation

### Stylelint Configuration
```json
{
  "plugins": ["stylelint-declaration-strict-value"],
  "rules": {
    "scale-unlimited/declaration-strict-value": [
      ["color", "font-size", "margin", "padding", "box-shadow"],
      {
        "ignoreValues": ["inherit", "currentColor", "transparent", "0"],
        "message": "Use SKYGORILLA design tokens instead of hardcoded values"
      }
    ]
  }
}
```

### Build-time Validation
```typescript
// tools/validate-design-tokens.ts
import fs from 'fs';

const validateTokens = (): void => {
  const cssContent = fs.readFileSync('src/styles/tokens.css', 'utf8');
  
  const requiredTokens = [
    '--sg-color-primary',
    '--sg-space-',
    '--sg-shadow-',
    '--sg-duration-',
    '--sg-bp-'
  ];
  
  requiredTokens.forEach(token => {
    if (!cssContent.includes(token)) {
      throw new Error(`Missing required SKYGORILLA token: ${token}`);
    }
  });
  
  console.log('✅ All SKYGORILLA design tokens validated');
};
```

## Component Token Usage

### CSS Custom Properties
```css
/* SKYGORILLA Component Tokens */
.sg-button {
  padding: var(--sg-space-sm) var(--sg-space-md);
  border-radius: var(--sg-radius-md);
  font-size: var(--sg-font-size-sm);
  box-shadow: var(--sg-shadow-sm);
  transition: all var(--sg-duration-fast);
}

.sg-button:hover {
  box-shadow: var(--sg-shadow-md);
  transform: translateY(-1px);
}
```

### TypeScript Token Types
```typescript
// types/design-tokens.ts
export type SGColor = 
  | 'primary' | 'accent' | 'neutral' | 'warning' | 'error'
  | 'success' | 'info';

export type SGSpacing = 
  | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';

export type SGShadow = 
  | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export interface SGTokens {
  color: Record<SGColor, string>;
  space: Record<SGSpacing, string>;
  shadow: Record<SGShadow, string>;
}
```

## Autonomous Token Enforcement

### Development Warnings
- **Hardcoded Values**: ESLint rules prevent magic numbers
- **Token Drift**: Automated detection of unused tokens
- **Consistency**: Cross-component token usage validation

### Design System Sync
- **Figma Integration**: Token sync with design files
- **Documentation**: Auto-generated token documentation
- **Version Control**: Semantic versioning for token changes

### Performance Optimization
- **CSS Variables**: Efficient runtime token updates
- **Tree Shaking**: Remove unused tokens from bundle
- **Caching**: Token compilation optimization