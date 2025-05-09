import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Note from './components/Note';
import AddNoteButton from './components/AddNoteButton';
import ColorPicker from './components/ColorPicker';
import Header from './components/Header';
import { Note as NoteType, NoteColor } from './types';
import { saveNotes, loadNotes } from './utils/storage';
import { getRandomColor } from './utils/colors';

function App() {
  const [notes, setNotes] = useState<NoteType[]>([]);
  const [currentColor, setCurrentColor] = useState<NoteColor>('yellow');
  const [highestZIndex, setHighestZIndex] = useState(1);

  // Load notes from local storage on initial render
  useEffect(() => {
    const savedNotes = loadNotes();
    if (savedNotes.length > 0) {
      setNotes(savedNotes);
      
      // Find highest z-index from loaded notes
      const maxZ = Math.max(...savedNotes.map(note => note.zIndex));
      setHighestZIndex(maxZ > 0 ? maxZ : 1);
    }
  }, []);

  // Save notes to local storage whenever they change
  useEffect(() => {
    saveNotes(notes);
  }, [notes]);

  const addNote = () => {
    const newNote: NoteType = {
      id: uuidv4(),
      content: '',
      position: getRandomPosition(),
      color: currentColor,
      zIndex: highestZIndex
    };
    
    setNotes(prevNotes => [...prevNotes, newNote]);
  };

  const getRandomPosition = () => {
    const container = document.getElementById('notes-container');
    if (!container) return { x: 50, y: 50 };
    
    const maxWidth = container.clientWidth - 250;
    const maxHeight = container.clientHeight - 250;
    
    return {
      x: Math.max(10, Math.floor(Math.random() * maxWidth)),
      y: Math.max(10, Math.floor(Math.random() * maxHeight))
    };
  };

  const updateNote = (id: string, content: string) => {
    setNotes(prevNotes => 
      prevNotes.map(note => 
        note.id === id ? { ...note, content } : note
      )
    );
  };

  const deleteNote = (id: string) => {
    setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
  };

  const updateNotePosition = (id: string, position: { x: number; y: number }) => {
    setNotes(prevNotes => 
      prevNotes.map(note => 
        note.id === id ? { ...note, position } : note
      )
    );
  };

  const bringNoteToFront = (id: string) => {
    const newZIndex = highestZIndex + 1;
    setHighestZIndex(newZIndex);
    
    setNotes(prevNotes => 
      prevNotes.map(note => 
        note.id === id ? { ...note, zIndex: newZIndex } : note
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      
      <div 
        id="notes-container"
        className="flex-1 relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-200"
      >
        {notes.length === 0 ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500">
            <p className="text-xl mb-2">No notes yet!</p>
            <p>Click the + button to add your first note</p>
          </div>
        ) : (
          notes.map(note => (
            <Note 
              key={note.id}
              note={note}
              onUpdate={updateNote}
              onDelete={deleteNote}
              onPositionChange={updateNotePosition}
              onFocus={bringNoteToFront}
            />
          ))
        )}
      </div>
      
      <ColorPicker 
        currentColor={currentColor} 
        onColorChange={setCurrentColor} 
      />
      
      <AddNoteButton onAdd={addNote} />
    </div>
  );
}

export default App;