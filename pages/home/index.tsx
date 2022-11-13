import Head from 'next/head'
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext'
import styles from './index.module.scss'

export default function Home() {
  const { loggedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loggedIn) router.push('/login');
  }, [loggedIn, router])
  
  return (
    <div className={styles.container}>
      <Head>
        <title>Wallt | Home</title>
      </Head>

      <main className={styles.main}>
        <div className={styles.topCard}>

        </div>
      </main>
    </div>
  )
}
