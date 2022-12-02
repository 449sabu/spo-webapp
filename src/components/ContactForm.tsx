import { NextPage } from 'next';
import { useMail } from '../hooks/useMail';

const ContactForm: NextPage = () => {
  const { setName, setMail, setMessage, send } = useMail();

  return (
    <section>
      <div className="container flex flex-col flex-1 px-6 py-12 mx-auto">
        <div className="flex-1 lg:flex lg:items-center lg:-mx-6 justify-center">
          <div className="mt-8 lg:w-1/2 lg:mx-6">
            <div className="w-full px-8 py-10 mx-auto overflow-hidden bg-white shadow-2xl rounded-xl dark:bg-gray-900 lg:max-w-xl">
              <h1 className="text-2xl font-medium text-gray-700 dark:text-gray-200">
                お問い合わせ
              </h1>
              {/* <p className="mt-4 text-gray-500 dark:text-gray-400">
                CIEL Stake
                Poolでは、ステーキングサービス等のCardanoに関するご興味、ご質問を受け付けております。
              </p> */}
              <form className="mt-6">
                <div className="flex-1">
                  <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                    名前
                  </label>
                  <input
                    type="text"
                    placeholder="お名前を入力してください"
                    onChange={(e) => setName(e.target.value)}
                    className="block w-full px-5 py-3 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                  />
                </div>
                <div className="flex-1 mt-6">
                  <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                    メール
                  </label>
                  <input
                    type="email"
                    onChange={(e) => setMail(e.target.value)}
                    placeholder="johndoe@example.com"
                    className="block w-full px-5 py-3 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                  />
                </div>
                <div className="w-full mt-6">
                  <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                    コメントまたはメッセージ
                  </label>
                  <textarea
                    onChange={(e) => setMessage(e.target.value)}
                    className="block w-full h-32 px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md md:h-48 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                    placeholder="Message"
                  ></textarea>
                </div>
                <p className="mt-4 text-gray-500 dark:text-gray-400">
                  送信前に内容に誤りがないか、もう一度ご確認ください。
                </p>
                <button
                  onClick={send}
                  className="w-full px-6 py-3 mt-6 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-400 focus:ring-opacity-50"
                >
                  送信
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
