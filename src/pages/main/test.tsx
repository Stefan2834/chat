import React, { useState } from 'react';
import EmojiPicker from 'emoji-picker-react';

const EmojiPickerComponent = () => {
  const [chosenEmoji, setChosenEmoji] = useState<any>(null);

  const handleEmojiClick = (event: any, emojiObject: any) => {
    setChosenEmoji(emojiObject);
  };

  return (
    <div>
      <h1>Emoji Picker</h1>
      <EmojiPicker onEmojiClick={handleEmojiClick} />
      {chosenEmoji && <p>Chosen Emoji: {chosenEmoji?.emoji}</p>}
    </div>
  );
};

export default EmojiPickerComponent;