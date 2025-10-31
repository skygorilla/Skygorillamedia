import { useState, useEffect } from 'react';

interface InspectedElement {
  tagName: string;
  id: string;
  className: string;
  textContent: string;
  attributes: Record<string, string>;
  styles: Record<string, string>;
  rect: DOMRect;
}

export const useElementInspector = () => {
  const [inspecting, setInspecting] = useState(false);
  const [selectedElement, setSelectedElement] = useState<InspectedElement | null>(null);
  const [hoveredElement, setHoveredElement] = useState<Element | null>(null);

  useEffect(() => {
    if (!inspecting) return;

    const handleMouseMove = (e: MouseEvent) => {
      const element = document.elementFromPoint(e.clientX, e.clientY);
      if (element && element !== hoveredElement) {
        // Remove previous highlight
        if (hoveredElement) {
          (hoveredElement as HTMLElement).style.outline = '';
        }
        
        // Add highlight to new element
        (element as HTMLElement).style.outline = '2px solid #0078d4';
        setHoveredElement(element);
      }
    };

    const handleClick = (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      
      const element = e.target as Element;
      if (element) {
        const computedStyles = window.getComputedStyle(element);
        const rect = element.getBoundingClientRect();
        
        const inspected: InspectedElement = {
          tagName: element.tagName.toLowerCase(),
          id: element.id,
          className: element.className,
          textContent: element.textContent?.slice(0, 100) || '',
          attributes: Array.from(element.attributes).reduce((acc, attr) => {
            acc[attr.name] = attr.value;
            return acc;
          }, {} as Record<string, string>),
          styles: {
            display: computedStyles.display,
            position: computedStyles.position,
            width: computedStyles.width,
            height: computedStyles.height,
            margin: computedStyles.margin,
            padding: computedStyles.padding,
            backgroundColor: computedStyles.backgroundColor,
            color: computedStyles.color,
            fontSize: computedStyles.fontSize,
            fontFamily: computedStyles.fontFamily,
          },
          rect,
        };
        
        setSelectedElement(inspected);
        setInspecting(false);
        
        // Remove highlight
        (element as HTMLElement).style.outline = '';
        setHoveredElement(null);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('click', handleClick, true);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('click', handleClick, true);
      
      // Clean up highlights
      if (hoveredElement) {
        (hoveredElement as HTMLElement).style.outline = '';
      }
    };
  }, [inspecting, hoveredElement]);

  const startInspecting = () => {
    setInspecting(true);
    document.body.style.cursor = 'crosshair';
  };

  const stopInspecting = () => {
    setInspecting(false);
    document.body.style.cursor = '';
    if (hoveredElement) {
      (hoveredElement as HTMLElement).style.outline = '';
      setHoveredElement(null);
    }
  };

  return {
    inspecting,
    selectedElement,
    startInspecting,
    stopInspecting,
  };
};