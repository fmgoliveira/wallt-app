import Head from 'next/head'
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { login, register } from '../../passage';
import styles from './index.module.scss'

export default function Login() {
  const router = useRouter();
  const [error, setError] = useState(false);
  const { setLoggedIn } = useAuth();
  const [clicks1, setClicks1] = useState(0);
  const [clicks2, setClicks2] = useState(0);
  const [clicks3, setClicks3] = useState(0);

  const handleLogin = async (e: any) => {
    e.preventDefault();

    const res = await login(router, setLoggedIn!);
    if (!res) setError(true);
  }

  const handleSignup = async (e: any) => {
    e.preventDefault();

    const res = await register(router, setLoggedIn!);
    if (!res) setError(true);
  }

  useEffect(() => { login(router, setLoggedIn!) }, [router, setLoggedIn]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Wallt | Login</title>
      </Head>

      <main className={styles.main}>
        <Image src='/images/icons/icon-192x192.png' alt='' width={128} height={128} className={styles.img} onClick={e => handleSignup(e)}/>
        <h1 className={styles.title}>Wa<span>ll</span>t</h1>
      </main>
    </div>
  )
}
