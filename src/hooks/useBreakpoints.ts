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
      file: file.replace(/[<>"'&]/g, ''),
      line,
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

  // Simulate debugger controls
  const resume = () => {
    setPaused(false);
    console.log(JSON.stringify({
      event: 'debugger_resumed',
      timestamp: new Date().toISOString()
    }));
  };

  const stepOver = () => {
    console.log(JSON.stringify({
      event: 'debugger_step_over',
      timestamp: new Date().toISOString()
    }));
  };

  const stepInto = () => {
    console.log(JSON.stringify({
      event: 'debugger_step_into',
      timestamp: new Date().toISOString()
    }));
  };

  const stepOut = () => {
    console.log(JSON.stringify({
      event: 'debugger_step_out',
      timestamp: new Date().toISOString()
    }));
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