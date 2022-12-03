import { BlockFrostAPI } from '@blockfrost/blockfrost-js';
import type { NextPage, InferGetStaticPropsType } from 'next';
import { useState, useEffect } from 'react';
import Footer from '../../components/Footer';

export const getStaticProps = async () => {
  const API = new BlockFrostAPI({
    projectId: 'mainnetg5YxGssXpYdb2iuXLMFChR222gty2Ubf',
  });
  const poolsMetaData = await API.poolMetadata(
    process.env.NEXT_PUBLIC_POOL_ID || '',
  );
  const poolsById = await API.poolsById(process.env.NEXT_PUBLIC_POOL_ID || '');
  const poolsByIdDelegators = await API.poolsByIdDelegators(
    process.env.NEXT_PUBLIC_POOL_ID || '',
  );

  return {
    props: {
      MetaData: poolsMetaData,
      PoolData: poolsById,
      Delegators: poolsByIdDelegators,
      revalidate: 10,
    },
  };
};

const BlockfrostContext: NextPage<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ MetaData, PoolData, Delegators }) => {
  const [MetaDataContext] = useState(MetaData);
  useEffect(() => {
    console.log(MetaData);
  }, []);

  return (
    <div>
      <Footer data={MetaDataContext} />
    </div>
  );
};

export default BlockfrostContext;
