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
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setLoggedIn } = useAuth();

  const handleLogin = async (e: any) => {
    e.preventDefault();

    const res = await login(router, setLoggedIn!, setLoading);
    if (!res) setError(true);
    else setSuccess(true);
  }

  const handleSignup = async (e: any) => {
    e.preventDefault();

    const res = await register(router, setLoggedIn!);
    if (!res) setError(true);
    else setSuccess(true);
  }

  useEffect(() => { login(router, setLoggedIn!, setLoading) }, [router, setLoggedIn]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Wallt | Login</title>
      </Head>

      <main className={styles.main}>
        <Image src='/images/icons/icon-192x192.png' alt='' width={128} height={128} className={styles.img} />
        <h1 className={styles.title}>Wa<span>ll</span>t</h1>

        <div>
          <span className={"ms-icon " + styles.icon + " " + (success ? styles.s : error ? styles.e : null)} onClick={e => loading ? null : handleLogin(e)}>{loading ? 'hourglass_empty' : 'fingerprint'}</span>
          {
            success ? <p className={styles.success}>Logged in</p> :
              error ? <p className={styles.error}>Error logging in. Please try again by clicking the icon</p> :
                loading ? <p className={styles.loading}>Waiting for email login...</p> :
                <p className={styles.p}>Click the icon to login</p>
          }
        </div>
      </main>
    </div>
  )
}
