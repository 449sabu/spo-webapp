import type { AccountInfo } from '@martifylabs/mesh';
import {
  useRewardAddress,
  useWallet,
  useWalletList,
  useWalletTx,
} from '@martifylabs/mesh-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export const CheckMark = () => (
  <h1 className="text-indigo-500 bg-yellow-400">接続中</h1>
);

export const MenuItem = ({
  icon,
  label,
  action,
  active,
}: {
  icon: string;
  label: string;
  action: any;
  active: boolean;
}) => (
  <li onClick={action}>
    <div>
      {icon && (
        <Image
          className="w-10 pr-2"
          src={icon}
          alt="img"
          width="40"
          height="32"
        />
      )}
      <span>
        {label
          .split(' ')
          .map((word: string) => {
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
          })
          .join(' ')}
      </span>
      {active && (
        <span>
          <h1 className="text-indigo-500 bg-yellow-400">接続中</h1>
        </span>
      )}
    </div>
  </li>
);

const TestStakeButton = ({
  poolId,
  onCheck,
}: {
  poolId: string;
  onCheck: any;
}) => {
  const wallets = useWalletList();
  const [hideMenuList, setHideMenuList] = useState(true);
  const { connect, connecting, connected, name } = useWallet();

  return (
    <div
      style={{ width: 'fit-content' }}
      onMouseEnter={() => setHideMenuList(false)}
      onMouseLeave={() => setHideMenuList(true)}
    >
      {/*委任ボタン表示 ホバーしたらリストが出る */}
      <div className="dropdown dropdown-hover dropdown-end">
        <label
          tabIndex={0}
          className="btn m-1"
          onClick={() => setHideMenuList(!hideMenuList)}
        >
          {connected ? (
            <Delegate poolId={poolId} onCheck={onCheck} />
          ) : connecting ? (
            <>Connecting...</>
          ) : (
            <>Connect</>
          )}
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
        >
          {/* <button hidden={hideMenuList || connected} className="btn"> */}
          {wallets.length > 0 ? (
            wallets.map((wallet, index) => (
              <MenuItem
                key={index}
                icon={wallet.icon}
                label={wallet.name}
                action={() => {
                  connect(wallet.name);
                  setHideMenuList(!hideMenuList);
                }}
                active={name === wallet.name}
              />
            ))
          ) : (
            <span>No Wallet Found</span>
          )}
          {/* </button> */}
        </ul>
      </div>
      {/* 委任ボタン表示・終了 */}
    </div>
  );
};

export default TestStakeButton;

const Delegate = ({ poolId, onCheck }: { poolId: string; onCheck: any }) => {
  const tx = useWalletTx();
  const { wallet } = useWallet();
  const rewardAddress = useRewardAddress();
  const [error, setError] = useState<unknown>();
  const [checking, setChecking] = useState(false);
  const [accountInfo, setAccountInfo] = useState<AccountInfo>();
  const [processing, setProcessing] = useState(false);
  const [done, setDone] = useState(false);

  const checkAccountStatus = async () => {
    try {
      setChecking(true);

      if (rewardAddress) {
        const info = await onCheck(rewardAddress);
        setAccountInfo(info);
      }

      setChecking(false);
    } catch (error) {
      setError(error);
    }
  };

  const registerAddress = async () => {
    setProcessing(true);
    setDone(false);
    try {
      if (rewardAddress) {
        const unsignedTx = await tx
          .registerStake(rewardAddress)
          .delegateStake(rewardAddress, poolId)
          .build();

        const signedTx = await wallet.signTx(unsignedTx);
        const txHash = await wallet.submitTx(signedTx);
        console.log('txHash', txHash);
        setDone(true);
      }
    } catch (error) {
      console.error('error', error);
      setError(error);
    }
    setProcessing(false);
  };

  const delegateStake = async () => {
    setProcessing(true);
    setDone(false);
    try {
      if (rewardAddress) {
        const unsignedTx = await tx
          .delegateStake(rewardAddress, poolId)
          .build();

        const signedTx = await wallet.signTx(unsignedTx);
        const txHash = await wallet.submitTx(signedTx);
        setDone(true);
      }
    } catch (error) {
      console.error('error', error);
      setError(error);
    }
    setProcessing(false);
  };

  useEffect(() => {
    checkAccountStatus();
  }, [rewardAddress]);

  if (checking) {
    return <span>Checking...</span>;
  }
  if (processing) {
    return <span>Loading...</span>;
  }
  if (done) {
    return <span>Stake Delegated</span>;
  }

  if (accountInfo?.active) {
    return accountInfo.poolId === poolId ? (
      <span>Stake Delegated</span>
    ) : (
      <span onClick={delegateStake}>Delegate Stake</span>
    );
  }

  return <span onClick={registerAddress}>Register Address</span>;
};
