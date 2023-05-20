import { useRouter } from 'next/router';
import { useSession, signIn, signOut } from 'next-auth/react';
import Image from 'next/image';
import logo from '../public/Spotify_Logo_RGB_Black.png';
import { FaChevronDown } from 'react-icons/fa';
import { useState, useEffect } from 'react';

function Navbar({ color }) {
  const router = useRouter();
  const { data: session, loading } = useSession();
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
    if (!loading && !session) {
      // User has signed out, redirect to the login page
      router.push('/login');
    }
  }, [loading, session, router]);

  return (
    <>
      {session && (  
        <nav className={`top-2 flex justify-between items-start space from-green-500 gradient text-white w-full`} style={{ backgroundColor: color }}>
          <Image src={logo} alt="spotify logo" className="w-[200px] flex flex-row justify-between" priority={true} />
          <ul className={`main-nav ${loading ? 'loading' : 'loaded'}`}>
            <li className="top-4">
              <div className="relative">
                <button
                  className="flex items-center bg-black space-x-4 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2"
                  onClick={handleToggleDropdown}
                >
                  {session?.user?.image && (
                    <img
                      className="rounded-full w-8 h-8"
                      src={session.user.image}
                      alt=""
                    />
                  )}
                  <h3 className="text-gray-400">{session?.user?.name}</h3>
                  <FaChevronDown className="h-3" style={{ color: "rgb(128, 128, 128)" }}/>
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
      )}
    </>
  );
}

export default Navbar;
