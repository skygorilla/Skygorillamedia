# Development Guidelines

## Code Quality Standards

### TypeScript Patterns
- **Strict Type Safety**: All files use strict TypeScript with explicit types for props, state, and function parameters
- **Interface Definitions**: Complex objects use well-defined interfaces (e.g., `InspectedElement`, `ToasterToast`, `ChartConfig`)
- **Generic Types**: Extensive use of generics for reusable components and utilities
- **Type Guards**: Proper type checking with conditional types and type assertions

### Component Architecture
- **forwardRef Pattern**: All UI components use `React.forwardRef` for proper ref forwarding
- **displayName Assignment**: Every component sets `displayName` for better debugging
- **Compound Components**: Complex components broken into logical sub-components (e.g., Sidebar system)
- **Polymorphic Components**: `asChild` prop pattern for component composition using Radix Slot

### State Management Patterns
- **Custom Hooks**: Business logic extracted into reusable hooks with clear return interfaces
- **Reducer Pattern**: Complex state managed with reducers (toast system uses dispatch/reducer)
- **Context Providers**: Shared state via React Context with proper error boundaries
- **Memoization**: Strategic use of `useMemo`, `useCallback` for performance optimization

## Structural Conventions

### File Organization
- **Barrel Exports**: Components export all related pieces from single file
- **Hook Naming**: Custom hooks prefixed with `use` and descriptive names
- **Component Grouping**: Related components kept in same file when logically connected

### Import/Export Standards
- **Named Exports**: Prefer named exports over default exports for components
- **Path Aliases**: Consistent use of `@/` path aliases for internal imports
- **External Dependencies**: Clear separation of external vs internal imports

### Error Handling
- **Error Boundaries**: Comprehensive error boundary implementation with fallback UI
- **Try-Catch Blocks**: Defensive programming with proper error logging
- **Graceful Degradation**: Components handle missing props/data gracefully
- **User-Friendly Errors**: Error messages designed for end-user consumption

## Semantic Patterns

### Event Handling
- **Event Delegation**: Proper event listener cleanup in useEffect hooks
- **Keyboard Shortcuts**: Standardized keyboard shortcut implementation
- **Passive Listeners**: Performance-optimized event listeners where appropriate
- **Event Composition**: Complex interactions broken into composable event handlers

### Performance Optimization
- **Dynamic Imports**: Code splitting with `dynamic()` for non-critical components
- **Conditional Rendering**: Efficient conditional rendering patterns
- **Memory Management**: Proper cleanup of timeouts, intervals, and event listeners
- **Bundle Optimization**: Strategic use of client-side only components

### Accessibility Patterns
- **ARIA Labels**: Comprehensive ARIA labeling for interactive elements
- **Keyboard Navigation**: Full keyboard accessibility support
- **Screen Reader Support**: Semantic HTML with proper roles and descriptions
- **Focus Management**: Proper focus handling in modal and interactive components

## Internal API Usage

### Radix UI Integration
```typescript
// Standard Radix component wrapping pattern
const Component = React.forwardRef<ElementRef, ComponentProps>(
  ({ className, ...props }, ref) => (
    <RadixPrimitive.Component
      ref={ref}
      className={cn("base-styles", className)}
      {...props}
    />
  )
)
```

### Custom Hook Pattern
```typescript
// Standard custom hook structure
export const useCustomHook = () => {
  const [state, setState] = useState(initialState);
  
  useEffect(() => {
    // Setup and cleanup logic
    return () => cleanup();
  }, [dependencies]);
  
  return { state, actions };
};
```

### Context Provider Pattern
```typescript
// Standard context implementation
const Context = React.createContext<ContextType | null>(null);

function useContext() {
  const context = React.useContext(Context);
  if (!context) {
    throw new Error("useContext must be used within Provider");
  }
  return context;
}
```

## Code Idioms

### CSS-in-JS Patterns
- **Tailwind Composition**: Use `cn()` utility for conditional class merging
- **CSS Variables**: Custom properties for dynamic styling (`--sidebar-width`)
- **Data Attributes**: Semantic data attributes for styling hooks (`data-sidebar`)
- **Responsive Design**: Mobile-first responsive patterns with breakpoint utilities

### Animation & Transitions
- **CSS Transitions**: Smooth transitions with easing functions
- **Transform Properties**: Hardware-accelerated transforms for performance
- **State-based Animations**: Animation states tied to component state
- **Reduced Motion**: Respect user motion preferences

### Development Tools Integration
- **DevTools Support**: Built-in development and debugging interfaces
- **Performance Monitoring**: Real-time performance metrics collection
- **Error Tracking**: Comprehensive error detection and reporting
- **Network Monitoring**: Request/response tracking and analysis

## Annotations & Documentation

### TSDoc Standards
- **Public APIs**: All exported functions/components documented with TSDoc
- **Complex Logic**: Non-obvious implementations explained with inline comments
- **Type Definitions**: Complex types documented with usage examples
- **Hook Dependencies**: useEffect dependencies explained when non-obvious

### Code Comments
- **Business Logic**: Complex business rules explained in comments
- **Performance Notes**: Performance-critical sections documented
- **Browser Compatibility**: Browser-specific code clearly marked
- **TODO/FIXME**: Technical debt clearly marked with context