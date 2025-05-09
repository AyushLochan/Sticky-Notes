import React from 'react';
import { StickyNote } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-amber-500 to-amber-600 p-4 text-white shadow-md">
      <div className="container mx-auto flex items-center">
        <StickyNote size={28} className="mr-2" />
        <h1 className="text-2xl font-bold">Sticky Notes</h1>
      </div>
    </header>
  );
};

export default Header;