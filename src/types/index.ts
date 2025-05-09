export interface Note {
  id: string;
  content: string;
  position: {
    x: number;
    y: number;
  };
  color: string;
  zIndex: number;
}

export type NoteColor = 'yellow' | 'blue' | 'green' | 'pink' | 'purple' | 'orange';