import { useRouter } from 'next/router';
import { useState } from 'react';

export default function LoginPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const router = useRouter();

  const handleLogin = () => {
    // Simulate logging in
    setLoggedIn(true);

    // Redirect to search1 page
    router.push('/search1');
  };

  return (
    <div>
      {loggedIn ? (
        <p>You are logged in!</p>
      ) : (
        <button onClick={handleLogin} className="bg-white">Log in</button>
      )}
    </div>
  );
}
