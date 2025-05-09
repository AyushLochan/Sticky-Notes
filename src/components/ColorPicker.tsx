import React from 'react';
import { NoteColor } from '../types';
import { COLORS } from '../utils/colors';

interface ColorPickerProps {
  currentColor: NoteColor;
  onColorChange: (color: NoteColor) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ currentColor, onColorChange }) => {
  const colorOptions: NoteColor[] = ['yellow', 'blue', 'green', 'pink', 'purple', 'orange'];
  
  return (
    <div className="fixed top-6 right-6 p-2 bg-white rounded-lg shadow-md flex gap-2">
      {colorOptions.map((color) => {
        const colorClasses = COLORS[color].split(' ')[0];
        const isSelected = color === currentColor;
        
        return (
          <button
            key={color}
            className={`w-6 h-6 rounded-full ${colorClasses} border-2 
                      transition-transform hover:scale-110
                      ${isSelected ? 'border-gray-800 scale-110' : 'border-gray-300'}`}
            onClick={() => onColorChange(color)}
            aria-label={`Select ${color} color`}
            title={`Select ${color} color`}
          />
        );
      })}
    </div>
  );
};

export default ColorPicker;