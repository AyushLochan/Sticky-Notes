import React, { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { Note as NoteType } from '../types';
import { COLORS, TEXT_COLORS } from '../utils/colors';
import { useDrag } from '../hooks/useDrag';

interface NoteProps {
  note: NoteType;
  onUpdate: (id: string, content: string) => void;
  onDelete: (id: string) => void;
  onPositionChange: (id: string, position: { x: number; y: number }) => void;
  onFocus: (id: string) => void;
}

const Note: React.FC<NoteProps> = ({ 
  note, 
  onUpdate, 
  onDelete, 
  onPositionChange,
  onFocus
}) => {
  const [content, setContent] = useState(note.content);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { noteRef, startDrag, isDragging } = useDrag({ 
    note, 
    onPositionChange,
    onFocus
  });

  useEffect(() => {
    if (textareaRef.current) {
      const textarea = textareaRef.current;
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [content]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (content !== note.content) {
        onUpdate(note.id, content);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [content, note.id, note.content, onUpdate]);

  const getRandomRotation = () => {
    const rotationId = note.id.charCodeAt(0) % 10;
    return `rotate-[${rotationId - 5}deg]`;
  };

  const colorClasses = COLORS[note.color] || COLORS.yellow;
  const textColorClass = TEXT_COLORS[note.color] || TEXT_COLORS.yellow;
  const rotation = getRandomRotation();

  return (
    <div
      ref={noteRef}
      className={`absolute cursor-move shadow-md ${colorClasses} ${rotation} 
                 p-3 rounded-sm w-60 border-t-8 transition-shadow group
                 hover:shadow-lg ${isDragging ? 'shadow-lg z-50' : ''}`}
      style={{
        left: `${note.position.x}px`,
        top: `${note.position.y}px`,
        zIndex: note.zIndex,
      }}
      onMouseDown={startDrag}
      onClick={() => onFocus(note.id)}
    >
      <div className="relative">
        <button 
          className="absolute -top-2 -right-2 p-1.5 bg-white/20 rounded-full opacity-0 
                     group-hover:opacity-100 hover:bg-white/50 transition-all
                     hover:scale-110 active:scale-95 z-[9999]"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(note.id);
          }}
          aria-label="Delete note"
        >
          <X size={16} className={textColorClass} />
        </button>
      </div>
      
      <textarea
        ref={textareaRef}
        className={`w-full bg-transparent border-none resize-none focus:outline-none 
                   ${textColorClass} pt-3 min-h-[80px] cursor-text`}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your note here..."
        onClick={(e) => e.stopPropagation()}
        onMouseDown={(e) => e.stopPropagation()}
      />
    </div>
  );
};

export default Note;