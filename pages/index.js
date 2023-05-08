import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import Navbar from '@component/components/Navbar';
// import Search from '../components/Search';

export default function Home() {
  const router = useRouter();
  const { data: session, loading } = useSession();

  useEffect(() => {
    if (!loading && session) {
      // User is authenticated, redirect to the search page
      router.push('/search');
    } else if (!loading && !session) {
      // User is not authenticated, redirect to the login page
      router.push('/login');
    }
  }, [loading, session, router]);

  return (
    <div className="flex-1 mx-auto">
      <Navbar />
      {/* <Search /> */}
    </div>
  );
}
