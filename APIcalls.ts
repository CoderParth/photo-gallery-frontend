import axios from "axios"

const metricsDomain =
  "https://o4tuy2cb73.execute-api.ap-southeast-2.amazonaws.com/dev/metrics"

const allImagesInfoDomain =
  "https://6sl2lcuqgb.execute-api.ap-southeast-2.amazonaws.com/dev/images/info"

const allImagesMetadataDomain =
  "https://gg8qy9nvi0.execute-api.ap-southeast-2.amazonaws.com/dev/images/metadata"

const infoFromIdDomain =
  "https://v2k1dz51mk.execute-api.ap-southeast-2.amazonaws.com/dev/images/123456/info"

const metadataFromIdDomain =
  "https://9xh99fpg4d.execute-api.ap-southeast-2.amazonaws.com/dev/images/123456/metadata"

const saveInfoDomain =
  " https://jdxuyl7271.execute-api.ap-southeast-2.amazonaws.com/dev/images/info"

const saveMetadataDomain =
  "https://v0cybuter5.execute-api.ap-southeast-2.amazonaws.com/dev/images/metadata"

const uploadImageDomain =
  "https://7p5rgp3p79.execute-api.ap-southeast-2.amazonaws.com/dev/images/upload"

const lambdaCors =
  "https://wq8ngbc7hi.execute-api.ap-southeast-2.amazonaws.com/dev/"

export const uploadImage = async (file: File) => {
  try {
    const formData = new FormData()
    formData.append("file", file)
    const response = await axios.post(uploadImageDomain, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    return response.data
  } catch (error) {
    console.error(error)
    throw new Error("Failed to upload image")
  }
}

// export const getMetrics = async () => {
//   try {
//     const response = await axios.get()
//     console.log(response)
//     return response.data
//   } catch (error) {
//     console.error(error)
//     throw new Error("Failed to get metrics")
//   }
// }
export const saveImageInfo = async (data: any) => {
  try {
    console.log(data)
    // If tags is an array, convert it to a comma-separated string
    if (Array.isArray(data.tags)) {
      data.tags = data.tags.join(", ")
    }

    console.log("splitting")
    console.log(data)
    const response = await axios.post(saveInfoDomain, data)

    console.log("this is the response", response)
    if (response.status === 201) {
      const responseData = response.data
      console.log("Image info saved successfully:", responseData)
      return responseData
    }
  } catch (error) {
    console.error("Error saving image info:", error)
    throw error
  }
}

export const saveImageMetadata = async (metadata: any) => {
  try {
    const response = await axios.post(saveMetadataDomain, metadata)

    console.log(response)
    if (response.status === 200) {
      const responseData = response.data
      console.log("Image metadata saved successfully:", responseData)
      return responseData
    }
  } catch (error) {
    console.error("Error saving image metadata:", error)
    throw error
  }
}

export const getMetrics = async () => {
  try {
    const response = await axios.get(metricsDomain)

    if (response.status === 200) {
      const responseData = response.data
      console.log("Metrics data retrieved successfully:", responseData)
      return responseData
    } else {
      throw new Error("Failed to retrieve metrics data")
    }
  } catch (error) {
    console.error("Error retrieving metrics data:", error)
    throw error
  }
}

export const getAllImagesInfo = async () => {
  try {
    const response = await axios.get(allImagesInfoDomain)
    console.log(response)
    if (response.status === 200) {
      const data = response.data
      return data
    } else {
      throw new Error("Failed to fetch images info")
    }
  } catch (error) {
    console.error("Error fetching images info:", error)
    throw error
  }
}

export const getAllImagesMetadata = async () => {
  try {
    const response = await axios.get(allImagesMetadataDomain)
    console.log(response)
    if (response.status === 200) {
      const data = response.data
      return data
    } else {
      throw new Error("Failed to fetch images metadata")
    }
  } catch (error) {
    console.error("Error fetching images metadata:", error)
    throw error
  }
}
