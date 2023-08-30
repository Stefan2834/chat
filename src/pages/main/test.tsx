import { FC } from 'react';
import Picker from '@emoji-mart/react';

const EmojiPage: FC = () => {
  return (
    <div>
      <h1>Emoji Picker</h1>
      <Picker  />
    </div>
  );
};

export default EmojiPage;