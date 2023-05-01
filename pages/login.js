import { getProviders, signIn } from "next-auth/react";
import Image from 'next/image';
import logo from '../public/Spotify_Logo_RGB_Green.png';
import { useState } from 'react'

function Login({ providers }) {
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleSignIn = async (providerId) => {
    setIsLoggingIn(true);

    try {
      // Call the signIn function to log in the user
      const result = await signIn(providerId, { callbackUrl: '/' });

      if (result?.error) {
        // Handle login error
        console.error(result.error);
        // Display an error message to the user if needed
      }
    } catch (error) {
      console.error(error);
      // Display an error message to the user if needed
    } finally {
      setIsLoggingIn(false);
    }
  };

  if (!providers) {
    // Handle the case where providers are undefined or null
    return null; // or display an error message
  }

  return (
    <div className="loginpage">
      <Image src={logo} alt="Spotify logo" className="login_logo" priority={true} />

      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button
            className="login_button"
            onClick={() => handleSignIn(provider.id)}
          >
            Login with {provider.name}
          </button>
        </div>
      ))}
    </div>
  );
}

export default Login;

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers,
    }
  }
}
