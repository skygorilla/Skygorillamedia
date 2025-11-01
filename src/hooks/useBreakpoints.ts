import { useState } from 'react';

interface Breakpoint {
  id: string;
  file: string;
  line: number;
  condition?: string;
  enabled: boolean;
}

export const useBreakpoints = () => {
  const [breakpoints, setBreakpoints] = useState<Breakpoint[]>([]);
  const [paused, setPaused] = useState(false);

  const addBreakpoint = (file: string, line: number, condition?: string) => {
    const breakpoint: Breakpoint = {
      id: `bp-${Date.now()}`,
      file,
      line,
      condition,
      enabled: true,
    };
    
    setBreakpoints(prev => [...prev, breakpoint]);
    
    // Log breakpoint creation with structured logging
    console.log(JSON.stringify({
      event: 'breakpoint_set',
      file: file.replace(/[<>"'&]/g, '').substring(0, 200),
      line: Math.max(0, Math.min(line, 999999)),
      timestamp: new Date().toISOString()
    }));
  };

  const removeBreakpoint = (id: string) => {
    setBreakpoints(prev => prev.filter(bp => bp.id !== id));
  };

  const toggleBreakpoint = (id: string) => {
    setBreakpoints(prev => 
      prev.map(bp => 
        bp.id === id ? { ...bp, enabled: !bp.enabled } : bp
      )
    );
  };

  const clearAllBreakpoints = () => {
    setBreakpoints([]);
  };

  // Simulate debugger controls with validation
  const resume = () => {
    try {
      setPaused(false);
      console.log(JSON.stringify({
        event: 'debugger_resumed',
        timestamp: new Date().toISOString()
      }));
    } catch (error) {
      console.error('Resume failed:', { error: error instanceof Error ? error.message : 'Unknown error' });
    }
  };

  const stepOver = () => {
    try {
      console.log(JSON.stringify({
        event: 'debugger_step_over',
        timestamp: new Date().toISOString()
      }));
    } catch (error) {
      console.error('Step over failed:', { error: error instanceof Error ? error.message : 'Unknown error' });
    }
  };

  const stepInto = () => {
    try {
      console.log(JSON.stringify({
        event: 'debugger_step_into',
        timestamp: new Date().toISOString()
      }));
    } catch (error) {
      console.error('Step into failed:', { error: error instanceof Error ? error.message : 'Unknown error' });
    }
  };

  const stepOut = () => {
    try {
      console.log(JSON.stringify({
        event: 'debugger_step_out',
        timestamp: new Date().toISOString()
      }));
    } catch (error) {
      console.error('Step out failed:', { error: error instanceof Error ? error.message : 'Unknown error' });
    }
  };

  return {
    breakpoints,
    paused,
    addBreakpoint,
    removeBreakpoint,
    toggleBreakpoint,
    clearAllBreakpoints,
    resume,
    stepOver,
    stepInto,
    stepOut,
  };
};