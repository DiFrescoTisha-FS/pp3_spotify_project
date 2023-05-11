import { useRouter } from 'next/router';
import { useSession, signIn, signOut } from 'next-auth/react';
import Image from 'next/image';
import logo from '../public/Spotify_Logo_RGB_Black.png';
import { ChevronDownIcon } from '@heroicons/react/outline';
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

function Navbar() {
  const router = useRouter(); // Add useRouter
  const { data: session, loading } = useSession();
  const [color, setColor] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleToggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSignOut = async () => {
    await signOut();
    setIsDropdownOpen(false); // Set isDropdownOpen to false when signing out
    router.push('/login'); // Redirect to the login page
  };

  useEffect(() => {
    setColor(shuffle(colors).pop());
  }, []);

  useEffect(() => {
    if (!loading && !session) {
      // User has signed out, redirect to the login page
      router.push('/login');
    }
  }, [loading, session, router]);

  return (
    <nav className={`top-2 flex justify-between items-start space bg-gradient-to-b to-black ${color} h-40 text-[#E4E4E7] p-8 w-full`}>
      <Image src={logo} alt="spotify logo" className="w-[200px] flex flex-row justify-between mb-10" priority={true} />

      <ul className={`main-nav ${!session && loading ? 'loading' : 'loaded'}`}>
        <li className="top-5">
          <div className="relative">
            <button
              className="flex items-center mt-2 bg-black space-x-6 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2"
              onClick={handleToggleDropdown}
            >
              {session?.user?.image && (
                <img
                  className="rounded-full w-12 h-12"
                  src={session.user.image}
                  alt=""
                />
              )}
              <h2 className="text-gray-400">{session?.user?.name}</h2>
              <ChevronDownIcon className="h-5 w-5" />
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 py-2 w-38 bg-gray-300 rounded-lg shadow-lg z-10">
                <button
                  className="block px-2 py-1 text-gray-800 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                  onClick={handleSignOut}
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
