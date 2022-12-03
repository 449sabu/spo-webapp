import { KoiosProvider } from '@martifylabs/mesh';
// import { StakeButton } from '@martifylabs/mesh-react';
import { NextPage } from 'next';
import Link from 'next/link';
import StakeButton from './StakeBtn';

type address = string;

const Navbar: NextPage = (MetaData) => {
  const blockchainProvider = new KoiosProvider('api');
  const PoolId = process.env.NEXT_PUBLIC_POOL_ID || '';
  // console.log(`PoolIdは ${PoolId} です`);

  return (
    <>
      {/* ヘッダーメニューを固定する場合 fixed w-full */}
      <div className="bg-white ">
        <div className="max-w-screen-2xl px-4 md:px-8 mx-auto">
          <header className="flex justify-between items-center py-4 md:py-8 ">
            {/* <!-- ロゴ --> */}
            <Link href="/" legacyBehavior>
              <a className="inline-flex items-center text-black-800 text-2xl md:text-3xl font-bold gap-2.5">
                Cardano
              </a>
            </Link>
            {/* チェックボックス */}
            <input
              type="checkbox"
              id="menu"
              className="absolute -left-96 peer"
            />
            {/* ハンバーガーボタン */}
            <label className="open btn m-1 lg:hidden" htmlFor="menu">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </label>
            <label
              htmlFor="menu"
              className="peer-checked:bg-gray-600 peer-checked:bg-opacity-70 absolute w-full h-full top-0 right-0 hidden peer-checked:block peer-checked:fixed"
            ></label>
            {/* サイドバー */}
            <aside className="absolute h-full duration-200 bg-white w-48 -left-48 top-0 flex flex-col peer-checked:left-0 peer-checked:top-0 peer-checked:fixed">
              <label htmlFor="menu" className="btn m-4">
                ✖
              </label>
              <Link href="/" legacyBehavior>
                <a className="text-gray-600 text-lg font-semibold transition duration-100 p-2">
                  Home
                </a>
              </Link>
              <Link href="/stats" legacyBehavior>
                <a className="text-gray-600 text-lg font-semibold transition duration-100 p-2">
                  Stats
                </a>
              </Link>
              <Link href="/contact" legacyBehavior>
                <a className="text-gray-600 text-lg font-semibold transition duration-100 p-2">
                  Contact
                </a>
              </Link>
            </aside>

            {/* <!-- デスクトップ用ナビゲーション--> */}
            <nav className="hidden lg:flex gap-12">
              <Link href="/" legacyBehavior>
                <a className="text-gray-600 hover:text-indigo-500 active:text-indigo-700 text-lg font-semibold transition duration-100">
                  Home
                </a>
              </Link>
              <Link href="/stats" legacyBehavior>
                <a className="text-gray-600 hover:text-indigo-500 active:text-indigo-700 text-lg font-semibold transition duration-100">
                  Stats
                </a>
              </Link>
              <Link href="/contact" legacyBehavior>
                <a className="text-gray-600 hover:text-indigo-500 active:text-indigo-700 text-lg font-semibold transition duration-100">
                  Contact
                </a>
              </Link>
              <Link href="/context/blockfrost" legacyBehavior>
                <a className="text-gray-600 hover:text-indigo-500 active:text-indigo-700 text-lg font-semibold transition duration-100">
                  Blockfrost
                </a>
              </Link>
            </nav>
            {/* <!-- 右側の配置アイテム --> */}
            <div className="hidden lg:flex flex-col sm:flex-row sm:justify-center lg:justify-start gap-2.5 -ml-8">
              {/* 委任ボタン */}
              <StakeButton
                onCheck={(address: address) =>
                  blockchainProvider.fetchAccountInfo(address)
                }
                poolId={PoolId}
              />
              {/* <div className="inline-block bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700  border-transparent focus-visible:ring ring-indigo-300 text-white text-sm md:text-base font-semibold rounded-lg outline-none">
                <StakeButton
                  onCheck={(address: address) =>
                    blockchainProvider.fetchAccountInfo(address)
                  }
                  poolId="pool1xlfty06hg6q23qvcaxwv3p9ke7ff9n34qpr8tpxt2zflyq20ceh"
                />
              </div> */}
            </div>
          </header>
        </div>
      </div>
    </>
  );
};

export default Navbar;
