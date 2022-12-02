import { NextPage } from 'next';
import Link from 'next/link';

const Footer: NextPage = () => {
  return (
    <footer className="footer p-10 bg-base-300 text-base-content">
      <div>
        <p>&copy;CIEL Stake Pool</p>
        {/* <Link href="/contact">
          <a className="link link-hover">お問い合わせ</a>
        </Link> */}
      </div>
      <div>
        {/* <span className="footer-title">Services</span>
        <a className="link link-hover">Branding</a>
        <a className="link link-hover">Design</a> */}
      </div>
      <div>
        <span className="footer-title">About us</span>
        <Link legacyBehavior href="https://twitter.com/CIEL_Stake_Pool">
          <a className="link link-hover">Twitter</a>
        </Link>
        <Link legacyBehavior href="https://github.com/449sabu">
          <a className="link link-hover">Github</a>
        </Link>
        {/* <a className="link link-hover">Privacy policy</a> */}
      </div>
      <div>
        <span className="footer-title">Pool stats</span>
        <Link
          legacyBehavior
          href={`https://pooltool.io/pool/${process.env.HEX_POOL_ID}/epochs`}
        >
          <a className="link link-hover">PoolTool.io</a>
        </Link>
        <Link
          legacyBehavior
          href={`https://cexplorer.io/${process.env.NEXT_PUBLIC_POOL_ID}`}
        >
          <a className="link link-hover">Cexplorer.io</a>
        </Link>
        <Link
          legacyBehavior
          href={`https://pool.pm/${process.env.HEX_POOL_ID}`}
        >
          <a className="link link-hover">Pool.pm</a>
        </Link>
        <Link
          legacyBehavior
          href={`https://poolpeek.com/pool/${process.env.HEX_POOL_ID}`}
        >
          <a className="link link-hover">Poolpeek.com</a>
        </Link>
        <Link
          legacyBehavior
          href={`https://cardanoscan.io/pool/${process.env.HEX_POOL_ID}`}
        >
          <a className="link link-hover">Cardanoscan.io</a>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
