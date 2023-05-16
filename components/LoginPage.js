import { getProviders, signIn } from "next-auth/react";
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

export default function Login({ providers }) {
  const router = useRouter();

  const handleSignIn = async (providerId) => {
    const result = await signIn(providerId, {
      callbackUrl: '/search',
    });
    if (result?.url) {
      router.push(result.url); // Redirect to the specified URL
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
      className="loginpage"
    >
      <motion.img
        initial={{
          y: -300,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{ duration: 1.2 }}
        src="https://i.imgur.com/2vs9fot.png"
        width="450px"
        height="450px"
        alt="Spotify Logo"
        className="spotify_logo"
      />

      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button
            className="button_signin py-2 px-4 bg-[#52c18bff] text-black rounded-lg"
            onClick={() => handleSignIn(provider.id)}
          >
            Login with {provider.name}
          </button>
        </div>
      ))}
    </motion.div>
  );
}

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers,
    }
  }
}
