import Head from 'next/head';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession, getProviders } from 'next-auth/react';
import LoginPage from '../components/LoginPage';

export default function Login({ providers }) {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'authenticated') {
      // User is authenticated, redirect to the search page
      router.push('/search');
    }
  }, [status, router]);

  return (
    <div>
      <Head>
        <title>Log In | Spotify Search</title>
        <meta
          name="description"
          content="User log in with Spotify"
        />
      </Head>
      <LoginPage providers={providers} />
    </div>
  );
}

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}
