import { useState } from 'react';

export const useMail = () => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [mail, setMail] = useState('');

  const send = async () => {
    await fetch('/api/mail', {
      method: 'POST',
      body: `
名前
${name}

メールアドレス
${mail}

お問い合わせ内容
${message}
`,
    });
  };

  return {
    setName,
    setMail,
    setMessage,
    send,
  };
};

// https://zenn.dev/tiwu_dev/articles/a7ebe4d36e4b74
// https://nodemailer.com/about/
