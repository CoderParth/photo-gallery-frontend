import React, { useEffect, useState } from "react"
import { getMetrics } from "@/APIcalls"
import { Box, Typography } from "@material-ui/core"

const Metrics: React.FC = () => {
  const [metrics, setMetrics] = useState<any>(null)

  //   useEffect(() => {
  //     const fetchMetrics = async () => {
  //       const metricsData = await getMetrics()
  //       setMetrics(metricsData)
  //     }
  //     fetchMetrics()
  //   }, [])

  return (
    <Box mt={2}>
      <Typography variant="h6">Metrics</Typography>
      {metrics ? (
        <Box mt={2}>
          <Typography>
            Total upload calls:{" "}
            {`${metrics["pg-serverless-upload-dev-uploadImage"].invocations}`}
          </Typography>
          {/* <Typography>Total users: {metrics.totalUsers}</Typography>
          <Typography>
            Images uploaded today: {metrics.imagesUploadedToday}
          </Typography>
          <Typography>
            Images uploaded this week: {metrics.imagesUploadedThisWeek}
          </Typography> */}
        </Box>
      ) : (
        <Typography>Loading metrics data...</Typography>
      )}
    </Box>
  )
}

export default Metrics
