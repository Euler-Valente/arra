import '../styles/global.css';
import Tolote from './tolote';
import Header from '@/components/Header';

export default function App({ Component, pageProps }) {
  return(
    <>
     {/* <Tolote/> */}
     <Header/>
     <Component {...pageProps} />
    </>
  );
}
