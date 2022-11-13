import Head from 'next/head'
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext'

export default function Home() {
  const { loggedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loggedIn) router.push('/home');
    else router.push('/login');
  }, [loggedIn, router])
  
  return <Head><title>Wallt | Home</title></Head>;
}
