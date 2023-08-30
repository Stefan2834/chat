import dynamic from 'next/dynamic'

const Picker = dynamic(() => import('@emoji-mart/react'),{ ssr: false })



const EmojiPage = () => {
  return (
    <div>
      <h1>Emoji Picker</h1>
      <Picker  />
    </div>
  );
};

export default EmojiPage;