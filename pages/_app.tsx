import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { AuthContextProvider } from '../contexts/AuthContext';

export default function App({ Component, pageProps }: AppProps) {
  return <AuthContextProvider><div className="cont"><Component {...pageProps} /></div></AuthContextProvider>;
}
