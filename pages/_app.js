import '../styles/globals.css';
import {wrapper} from "../redux/store";
import {SessionProvider} from "next-auth/react";

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider>
    <Component {...pageProps} />
    </SessionProvider>
  )
}

export default wrapper.withRedux(MyApp);
