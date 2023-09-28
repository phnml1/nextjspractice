import Head from "next/head";

import Layout from "@/components/layout/layout";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return(
  <Layout>
    {/* 전역으로 head 적용 */}
    <Head>
      <title>Next Events</title>
      <meta name = "viewport" content = "initial-scale=1.0, width=device-width"/>
    </Head>
    <Component {...pageProps} />
  </Layout>);
}

export default MyApp;