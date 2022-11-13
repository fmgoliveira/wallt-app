import Head from 'next/head'
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { activateLink } from '../../passage';
import styles from './index.module.scss'

export default function Login() {
  const router = useRouter();
  const [success, setSuccess] = useState(false);
  
  const { psg_magic_link } = router.query;

  useEffect(() => {
    (async () => {
      if (psg_magic_link) {
        const answer = await activateLink(psg_magic_link as string);
        if (!answer) router.push('/login');
        setSuccess(true);
      }
    })();
  }, [psg_magic_link, router]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Wallt | Login</title>
      </Head>

      <main className={styles.main}>
        <Image src='/images/icons/icon-192x192.png' alt='' width={128} height={128} className={styles.img} />
        <h1 className={styles.title}>Wa<span>ll</span>t</h1>
        {
          success ? <p className={styles.p}> <span className={styles.success}>Login successful!</span><br />You can now close this page and return to the app</p> : <p className={styles.p}>Logging in...</p>
        }
      </main>
    </div>
  )
}
