import Picker from '@emoji-mart/react'
import data from '@emoji-mart/data'


const ProgressBar = () => {
  return (
    <div className='w-full bg-red-400'>

      <Picker data={data}
      />
    </div>
  )

};

export default ProgressBar;