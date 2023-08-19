import React from 'react'
export default function Notifications() {
  return (
      <div className='flex items-center justify-center w-full h-screen text-4xl'>
        Aceasta pagina este in lucru, te rugam sa revi mai tarziu Notifications
      </div>
  )
}

// import React, { useState } from 'react'

// export default function ImageUpload() {
//   const [imageURL, setImageURL] = useState<string | null>(null);

//   const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       const image = URL.createObjectURL(file);
//       console.log(image)
//       setImageURL(image);
//       // Store the image URL in Local Storage
//     }
//   };

//   // Retrieve the stored image URL from Local Storage

//   return (
//     <div className='flex items-center justify-center'>
//       <input type="file" accept="image/*" onChange={handleImageUpload} />
//       {imageURL && <img src={imageURL} alt="Uploaded" />}
//     </div>
//   );
// }