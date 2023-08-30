import { FC } from 'react';
import dynamic from 'next/dynamic';

const DynamicPicker = dynamic(() => import('@emoji-mart/react').then(module => module.default), {
  ssr: false // Prevent SSR for this component
});

const EmojiPage: FC = () => {
  return (
    <div>
      <h1>Emoji Picker</h1>
      <DynamicPicker />
    </div>
  );
};

export default EmojiPage;