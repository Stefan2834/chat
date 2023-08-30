import { useEffect, useState } from 'react';
import Picker from '@emoji-mart/react'
import data from '@emoji-mart/data'


const ProgressBar = () => {
  return (
    <Picker data={data}
      theme={'light'}
      autoFocus={true}
    />
  )

};

export default ProgressBar;