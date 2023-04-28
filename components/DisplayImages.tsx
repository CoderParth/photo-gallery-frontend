// import React, { useEffect, useState } from "react"
// import { makeStyles } from "@material-ui/core/styles"
// import Grid from "@material-ui/core/Grid"
// import Card from "@material-ui/core/Card"
// import CardMedia from "@material-ui/core/CardMedia"
// import CardContent from "@material-ui/core/CardContent"
// import Typography from "@material-ui/core/Typography"
// import { getAllImagesInfo, getAllImagesMetadata } from "@/APIcalls"

// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//     padding: theme.spacing(2),
//   },
//   card: {
//     maxWidth: 345,
//   },
//   media: {
//     height: 0,
//     paddingTop: "56.25%", // 16:9
//   },
// }))

// interface ImageMetadata {
//   FileExtension: string
//   UploadDate: string
//   ImageUrl: string
//   FileSize: number
//   ImageID: string
// }

// const DisplayImages = () => {
//   const classes = useStyles()
//   const [imagesInfo, setImagesInfo] = useState([])
//   const [imagesMetadata, setImagesMetadata] = useState([])

//   useEffect(() => {
//     const fetchImages = async () => {
//       const infoResponse = await getAllImagesInfo()
//       if (infoResponse) {
//         const infoData = infoResponse.imageInfo
//         console.log("infosresponse", infoResponse)
//         setImagesInfo(infoData)
//       }

//       const metadataResponse = await getAllImagesMetadata()
//       if (metadataResponse) {
//         const metadataData = metadataResponse.metadata
//         setImagesMetadata(metadataData)
//       }
//     }
//     fetchImages()
//   }, [])

//   const getImageMetadata = (imageId: string): ImageMetadata | undefined => {
//     return imagesMetadata.find(
//       (metadata: ImageMetadata) => metadata.ImageID === imageId
//     )
//   }

//   const getImageInfo = (imageId: string) => {
//     return imagesInfo.find((info: any) => info.imageInfo.image_id === imageId)
//   }

//   return (
//     <div className={classes.root}>
//       <Grid container spacing={2}>
//         {Array.isArray(imagesInfo) && imagesInfo.length > 0 ? (
//           imagesInfo.map((info: any, index) => (
//             <Grid item xs={12} sm={6} md={4} key={index}>
//               <Card className={classes.card}>
//                 <CardMedia
//                   className={classes.media}
//                   image={info?.image_url}
//                   title={info?.description}
//                 />
//                 <CardContent>
//                   <Typography gutterBottom variant="h5" component="h2">
//                     {info?.description}
//                   </Typography>
//                   <Typography
//                     variant="body2"
//                     color="textSecondary"
//                     component="p"
//                   >
//                     tags here
//                     {/* {info?.tags.join(", ")} */}
//                   </Typography>
//                   <Typography
//                     variant="body2"
//                     color="textSecondary"
//                     component="p"
//                   >
//                     Uploaded by {info?.username}
//                   </Typography>
//                   {/* Metadata goes here */}
//                   <Typography
//                     variant="body2"
//                     color="textSecondary"
//                     component="p"
//                   >
//                     {`File Extension: ${
//                       getImageMetadata(info.image_id)?.FileExtension || "-"
//                     }`}
//                   </Typography>
//                   <Typography
//                     variant="body2"
//                     color="textSecondary"
//                     component="p"
//                   >
//                     {`File Size: ${
//                       getImageMetadata(info.image_id)?.FileSize || "-"
//                     } bytes`}
//                   </Typography>
//                   <Typography
//                     variant="body2"
//                     color="textSecondary"
//                     component="p"
//                   >
//                     {`Upload Date: ${
//                       getImageMetadata(info.image_id)?.UploadDate || "-"
//                     }`}
//                   </Typography>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))
//         ) : (
//           <div>No images</div>
//         )}
//       </Grid>
//     </div>
//   )
// }

// export default DisplayImages

import React, { useEffect, useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import Card from "@material-ui/core/Card"
import CardMedia from "@material-ui/core/CardMedia"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
import { getAllImagesInfo, getAllImagesMetadata } from "@/APIcalls"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  card: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
}))

interface ImageMetadata {
  FileExtension: string
  UploadDate: string
  ImageUrl: string
  FileSize: number
  ImageID: string
  FileName: string
}

interface ImageInfo {
  id: number
  username: string
  image_url: string
  description: string
  tags: string
  image_id?: number | string
}

interface MergedImage extends ImageInfo, ImageMetadata {
  image_id?: string | number
}

const DisplayImages = () => {
  const classes = useStyles()
  const [imagesInfo, setImagesInfo] = useState([])
  const [imagesMetadata, setImagesMetadata] = useState([])

  useEffect(() => {
    const fetchImages = async () => {
      const infoResponse = await getAllImagesInfo()
      if (infoResponse) {
        const infoData = infoResponse.imageInfo
        setImagesInfo(infoData)
      }

      const metadataResponse = await getAllImagesMetadata()
      if (metadataResponse) {
        const metadataData = metadataResponse.metadata
        setImagesMetadata(metadataData)
      }
    }
    fetchImages()
  }, [])

  function mergeImageInfoAndMetadata(
    imageInfoArray: ImageInfo[],
    imageMetadataArray: ImageMetadata[]
  ): MergedImage[] {
    const mergedArray: MergedImage[] = []

    imageInfoArray.forEach((imageInfo) => {
      const matchingMetadata = imageMetadataArray.find(
        (metadata) => metadata.ImageID === String(imageInfo.image_id)
      )

      if (matchingMetadata) {
        mergedArray.push({ ...imageInfo, ...matchingMetadata })
      } else {
        mergedArray.push({
          ...imageInfo,
          FileExtension: "",
          UploadDate: "",
          ImageUrl: "",
          FileSize: 0,
          ImageID: "",
          FileName: "",
        })
      }
    })

    imageMetadataArray.forEach((metadata) => {
      if (!mergedArray.some((image) => image.image_id === metadata.ImageID)) {
        mergedArray.push({
          ...metadata,
          id: -1,
          username: "",
          image_url: "",
          description: "",
          tags: "",
        })
      }
    })

    return mergedArray
  }

  const mergedImages = mergeImageInfoAndMetadata(imagesInfo, imagesMetadata)

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        {Array.isArray(mergedImages) && mergedImages.length > 0 ? (
          mergedImages.map((image: MergedImage, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.media}
                  image={image.ImageUrl || image.image_url || ""}
                  title={image.description || ""}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {image.description || ""}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {`Tags: ${image.tags.split(",").join(", ")}`}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {`Uploaded by ${image.username || ""}`}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {`File Extension: ${image.FileExtension || "-"}`}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {`File Size: ${
                      image.FileSize ? `${image.FileSize} bytes` : "-"
                    }`}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {`Upload Date: ${image.UploadDate || "-"}`}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <div>No images</div>
        )}
      </Grid>
    </div>
  )
}

export default DisplayImages
