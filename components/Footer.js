import { useState, useEffect } from 'react';
import { shuffle } from 'lodash';

const colors = [
  'from-indigo-500',
  'from-blue-500',
  'from-green-500',
  'from-red-500',
  'from-yellow-500',
  'from-pink-500',
  'from-purple-500',
];

const Footer = () => {
  const [color, setColor] = useState(null);

  useEffect(() => {
    setColor(shuffle(colors).pop());
  }, []);

  return (
    <div className="flex flex-col h-screen sticky justify-end">
    <footer className={`top-2 bg-gradient-to-t to-black ${color} p-6 w-full`}>
     <div className="p-1 mt-4 text-white text-center">
      © 2023 Copyright: Tisha Di Fresco
    </div>
   </footer>
</div>
)}

export default Footer