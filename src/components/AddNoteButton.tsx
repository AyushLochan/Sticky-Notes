import React from 'react';
import { Plus } from 'lucide-react';

interface AddNoteButtonProps {
  onAdd: () => void;
}

const AddNoteButton: React.FC<AddNoteButtonProps> = ({ onAdd }) => {
  return (
    <button
      onClick={onAdd}
      className="fixed bottom-6 right-6 bg-amber-500 hover:bg-amber-600 text-white 
                rounded-full w-14 h-14 flex items-center justify-center shadow-lg 
                transition-all hover:scale-105 active:scale-95"
      aria-label="Add new note"
    >
      <Plus size={24} />
    </button>
  );
};

export default AddNoteButton;