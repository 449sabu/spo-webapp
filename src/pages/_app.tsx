import { MeshProvider } from '@martifylabs/mesh-react';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Footer from '../components/Footer';
import Navbar from '../components/Nav';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MeshProvider>
      <header>
        <Navbar />
      </header>
      <Component {...pageProps} />
      <footer>
        <Footer />
      </footer>
    </MeshProvider>
  );
}

export default MyApp;
