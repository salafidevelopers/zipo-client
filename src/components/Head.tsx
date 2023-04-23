import type { NextPage } from 'next';
import Head from 'next/head';

type Og = {
  title: string;
  description: string;
  image: string;
};

const HeadComponent = ({
  title,
  description,
  og,
}: {
  title: string;
  description?: string;
  og?: Og;
}) => {
  return (
    <Head>
      {description && (
        <meta name='description' content={description} key='description' />
      )}
      {og && (
        <>
          <meta property='og:title' content={og.title} />
          <meta property='og:description' content={og.description} />
          <meta property='og:image' content={og.image} />
        </>
      )}
      <title>{title}</title>
      <meta name='google' content='notranslate' key='notranslate' />
      <link rel='icon' href='/favicon.ico' />
    </Head>
  );
};

export default HeadComponent;
