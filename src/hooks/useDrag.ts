import { useState, useEffect, useRef } from 'react';
import { Note } from '../types';

interface UseDragProps {
  note: Note;
  onPositionChange: (id: string, position: { x: number; y: number }) => void;
  onFocus: (id: string) => void;
}

export const useDrag = ({ note, onPositionChange, onFocus }: UseDragProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const noteRef = useRef<HTMLDivElement>(null);
  const startPosRef = useRef({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Find the container once
    containerRef.current = document.getElementById('notes-container') as HTMLDivElement;
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !noteRef.current || !containerRef.current) return;
      
      const container = containerRef.current;
      const containerRect = container.getBoundingClientRect();
      
      // Calculate new position
      const offsetX = e.clientX - startPosRef.current.x;
      const offsetY = e.clientY - startPosRef.current.y;
      
      const newX = note.position.x + offsetX;
      const newY = note.position.y + offsetY;
      
      // Check boundaries
      const noteRect = noteRef.current.getBoundingClientRect();
      const maxX = containerRect.width - noteRect.width;
      const maxY = containerRect.height - noteRect.height;
      
      const boundedX = Math.max(0, Math.min(newX, maxX));
      const boundedY = Math.max(0, Math.min(newY, maxY));
      
      onPositionChange(note.id, { x: boundedX, y: boundedY });
      
      // Update start position for next move
      startPosRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, note, onPositionChange]);

  const startDrag = (e: React.MouseEvent) => {
    e.preventDefault();
    onFocus(note.id);
    setIsDragging(true);
    startPosRef.current = { x: e.clientX, y: e.clientY };
  };

  return { noteRef, startDrag, isDragging };
};