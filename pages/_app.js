import Head from "next/head";
import Layout from "@/components/layout/layout";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <title>Events for meetups</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="Nextjs events" />
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}
