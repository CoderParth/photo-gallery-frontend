import React, { useState } from "react"
import { uploadImage } from "@/APIcalls"
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Typography,
  makeStyles,
} from "@material-ui/core"
import { CloudUpload, Delete } from "@material-ui/icons"
import LinearProgress from "@material-ui/core/LinearProgress"
import SaveInfo from "./SaveInfo"
import { saveImageInfo, saveImageMetadata } from "@/APIcalls"

const useStyles = makeStyles((theme) => ({
  uploadButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: theme.spacing(2),
  },
  avatar: {
    width: theme.spacing(15),
    height: theme.spacing(15),
    marginBottom: theme.spacing(2),
  },
}))

interface Props {
  setOpenDialog: (value: boolean) => void
  setSubmitted: (value: boolean) => void
}

const ImageUpload: React.FC<Props> = ({ setOpenDialog, setSubmitted }) => {
  const classes = useStyles()
  const [file, setFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [progress, setProgress] = useState(0)
  const [metaData, setMetaData] = useState("")
  const [imageId, setImageId] = useState("")
  const [imageUrl, setImageUrl] = useState("")

  const resetState = () => {
    setFile(null)
    setPreviewUrl(null)
    setUploading(false)
    setProgress(0)
    setMetaData("")
    setImageId("")
    setImageUrl("")
  }

  const onUpload = (response: any) => {
    setMetaData(response.metaData)
    setImageId(response.metaData.imageId)
    setImageUrl(response.metaData.imageUrl)
    console.log("imageresponse", response)
  }

  const onSubmit = async (data: any) => {
    console.log(data)
    setSaving(true)
    try {
      await saveImageInfo({
        ...data,
        imageId: imageId,
        imageUrl: imageUrl,
      })
      await saveImageMetadata(metaData)
      resetState()
      setSubmitted(true)
    } catch (error) {
      console.error(error)
    } finally {
      setSaving(false)
      setOpenDialog(false)
    }
  }

  const handleFileInputChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0])
      setPreviewUrl(URL.createObjectURL(event.target.files[0]))

      // Start uploading the file immediately after selecting it
      try {
        setUploading(true)
        const response = await uploadImage(
          event.target.files[0],
          (percentage) => {
            setProgress(percentage)
          }
        )
        console.log(response)
        onUpload(response)
      } catch (error) {
        console.error(error)
      } finally {
        setUploading(false)
      }
    } else {
      setFile(null)
      setPreviewUrl(null)
    }
  }

  const handleDeleteButtonClick = () => {
    setFile(null)
    setPreviewUrl(null)
  }

  return (
    <Box mt={2} textAlign="center">
      <input
        type="file"
        onChange={handleFileInputChange}
        style={{ display: "none" }}
        id="file-input"
      />
      <label htmlFor="file-input">
        <Button
          variant="contained"
          color="secondary"
          component="span"
          startIcon={<CloudUpload />}
        >
          Choose File
        </Button>
      </label>
      {uploading && (
        <div>
          <LinearProgress variant="determinate" value={progress} />
        </div>
      )}
      {previewUrl ? (
        <>
          <Box mt={2}>
            <Avatar src={previewUrl} alt="Preview" className={classes.avatar} />
          </Box>
          <Box>
            <IconButton color="secondary" onClick={handleDeleteButtonClick}>
              <Delete />
            </IconButton>
          </Box>
        </>
      ) : (
        <Typography variant="body2" color="textSecondary">
          No file chosen
        </Typography>
      )}
      <Box mt={2}>
        {/* <Button
          variant="contained"
          color="primary"
          disabled={!file}
          onClick={handleUploadButtonClick}
        >
          Upload
        </Button> */}
      </Box>
      <SaveInfo onSubmit={onSubmit} saving={saving} />
    </Box>
  )
}

export default ImageUpload
