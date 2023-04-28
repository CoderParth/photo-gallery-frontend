import React, { useState } from "react"
import { uploadImage } from "@/APIcalls"

interface ImageUploadProps {
  onUpload: (response: any) => void
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onUpload }) => {
  const [file, setFile] = useState<File | null>(null)

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0])
    } else {
      setFile(null)
    }
  }

  const handleUploadButtonClick = async () => {
    if (file) {
      try {
        const response = await uploadImage(file)
        console.log(response)
        onUpload(response)
        // handle successful upload
      } catch (error) {
        console.error(error)
        // handle upload error
      }
    } else {
      // handle no file selected error
    }
  }

  return (
    <div>
      <input type="file" onChange={handleFileInputChange} />
      <button onClick={handleUploadButtonClick}>Upload</button>
    </div>
  )
}

export default ImageUpload
