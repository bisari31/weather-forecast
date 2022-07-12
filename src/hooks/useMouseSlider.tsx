import { MouseEvent, useState } from 'react';

export const useMouseSlider = (ref: HTMLElement | null) => {
  const [isDrag, setIsDrag] = useState(false);
  const [startX, setStartX] = useState(0);

  const handleDragStart = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (ref) {
      setIsDrag(true);
      setStartX(e.pageX + ref.scrollLeft);
    }
  };

  const handleDragEnd = () => setIsDrag(false);

  const handleDragMove = (e: MouseEvent) => {
    if (isDrag && ref) {
      ref.scrollLeft = startX - e.pageX;
    }
  };

  return [handleDragStart, handleDragEnd, handleDragMove];
};
