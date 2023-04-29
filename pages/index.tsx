import type { NextPage } from "next"
import { useState } from "react"
import ResponsiveLayout from "@/components/Layout"
import ImageUpload from "@/components/UploadImage"
import DisplayImages from "@/components/DisplayImages"
import Metrics from "@/components/Metrics"
import { makeStyles } from "@material-ui/core/styles"
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
} from "@material-ui/core"
import { AddPhotoAlternate, Close } from "@material-ui/icons"

const useStyles = makeStyles((theme) => ({
  uploadImage: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "sticky",
    top: "70px",
    zIndex: 1000,
    background: "white",
    borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
  },
  closeIcon: {
    position: "absolute",
    right: "8px",
    top: "8px",
  },
}))

const Home: NextPage = () => {
  const classes = useStyles()
  const [openDialog, setOpenDialog] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  return (
    <ResponsiveLayout>
      <div>
        <div className={classes.uploadImage}>
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
              className={classes.closeIcon}
            >
              <Close />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <ImageUpload
              setOpenDialog={setOpenDialog}
              setSubmitted={setSubmitted}
            />
          </DialogContent>
        </Dialog>

        <Metrics submitted={submitted} />
        <DisplayImages submitted={submitted} setSubmitted={setSubmitted} />
      </div>
    </ResponsiveLayout>
  )
}

export default Home
