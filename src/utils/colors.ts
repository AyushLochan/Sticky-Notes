import { NoteColor } from '../types';

export const COLORS: Record<NoteColor, string> = {
  yellow: 'bg-amber-100 border-amber-200',
  blue: 'bg-sky-100 border-sky-200',
  green: 'bg-emerald-100 border-emerald-200',
  pink: 'bg-pink-100 border-pink-200',
  purple: 'bg-violet-100 border-violet-200',
  orange: 'bg-orange-100 border-orange-200'
};

export const TEXT_COLORS: Record<NoteColor, string> = {
  yellow: 'text-amber-800',
  blue: 'text-sky-800',
  green: 'text-emerald-800',
  pink: 'text-pink-800',
  purple: 'text-violet-800',
  orange: 'text-orange-800'
};

export const getRandomColor = (): NoteColor => {
  const colors: NoteColor[] = ['yellow', 'blue', 'green', 'pink', 'purple', 'orange'];
  return colors[Math.floor(Math.random() * colors.length)];
};