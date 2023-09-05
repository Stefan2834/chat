import React, { useState, ChangeEvent, KeyboardEvent } from 'react';
import axios from 'axios'

function PhotoUploader() {
  const [selectedPhoto, setSelectedPhoto] = useState<File | null>(null);
  const [uploadedPhoto, setUplaodedPhoto] = useState('')

  const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedPhoto(e.target.files[0]);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent the form submission
      handlePhotoUpload();
    }
  };

  const handlePhotoUpload = async () => {
    if (!selectedPhoto) return;

    try {
      const formData = new FormData();
      formData.append('photo', selectedPhoto);

      const response = await fetch('http://localhost:9000/upload-photo', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const s3Url: string = await response.text();
        // Display the photo using s3Url
        console.log('Uploaded photo URL:', s3Url);
        setUplaodedPhoto(s3Url)
      } else {
        console.error('Error uploading photo');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={handlePhotoChange}
        onKeyDown={handleKeyDown}
      />
      <button onClick={handlePhotoUpload}>Upload Photo</button>
      <img src={uploadedPhoto} />
    </div>
  );
}

export default PhotoUploader;

