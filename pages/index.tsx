import type { NextPage } from "next"
import { useState } from "react"
import ResponsiveLayout from "@/components/Layout"
import ImageUpload from "@/components/UploadImage"
import SaveInfo from "@/components/SaveInfo"
import DisplayImages from "@/components/DisplayImages"
import Metrics from "@/components/Metrics"
import { saveImageInfo, saveImageMetadata } from "@/APIcalls"
import { makeStyles } from "@material-ui/core/styles"
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
} from "@material-ui/core"
import { AddPhotoAlternate, Close } from "@material-ui/icons"

const Home: NextPage = () => {
  // const [metaData, setMetaData] = useState("")
  // const [imageId, setImageId] = useState("")
  // const [imageUrl, setImageUrl] = useState("")
  const [openDialog, setOpenDialog] = useState(false)

  // const onUpload = (response: any) => {
  //   setMetaData(response.metaData)
  //   setImageId(response.metaData.imageId)
  //   setImageUrl(response.metaData.imageUrl)
  //   console.log(response)
  //   setOpenDialog(false)
  // }

  // const onSubmit = (data: any) => {
  //   console.log(data)
  //   saveImageInfo({
  //     ...data,
  //     imageId: imageId,
  //     imageUrl: imageUrl,
  //   })
  //   saveImageMetadata(metaData)
  // }

  return (
    <ResponsiveLayout>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "sticky",
            top: "70px",
            zIndex: 1000,
            background: "white",
            borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddPhotoAlternate />}
            onClick={() => setOpenDialog(true)}
          >
            Upload Image
          </Button>
        </div>
        <Dialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>
            Upload Image
            <IconButton
              edge="end"
              color="inherit"
              onClick={() => setOpenDialog(false)}
              aria-label="close"
              style={{ position: "absolute", right: "8px", top: "8px" }}
            >
              <Close />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <ImageUpload />
            {/* <ImageUpload onUpload={onUpload} />
            <SaveInfo onSubmit={onSubmit} /> */}
          </DialogContent>
        </Dialog>

        <Metrics />
        <DisplayImages />
      </div>
    </ResponsiveLayout>
  )
}

export default Home
