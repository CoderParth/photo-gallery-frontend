import React, { useEffect, useState } from "react"
import { getMetrics } from "@/APIcalls"
import { Box, Typography, Grid } from "@material-ui/core"
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts"

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

interface Props {
  submitted: boolean
}

const Metrics: React.FC<Props> = ({ submitted }) => {
  const [metrics, setMetrics] = useState<any>(null)

  const fetchMetrics = async () => {
    const metricsData = await getMetrics()
    setMetrics(metricsData)
  }

  useEffect(() => {
    fetchMetrics()
  }, [])

  useEffect(() => {
    if (submitted) {
      fetchMetrics()
    }
  }, [submitted])

  const formatMetricsData = (data: any) => {
    return Object.keys(data).map((key) => ({
      name: key,
      invocations: data[key].invocations,
      errors: data[key].errors,
    }))
  }

  const totalInvocations = (formattedData: any) =>
    formattedData.reduce((sum: number, item: any) => sum + item.invocations, 0)

  const totalErrors = (formattedData: any) =>
    formattedData.reduce((sum: number, item: any) => sum + item.errors, 0)

  return (
    <Box>
      <Typography variant="h6">
        Backend API Metrics Over Last Two hours
      </Typography>
      {metrics ? (
        <>
          <Box>
            <Typography>
              Total API Calls: {totalInvocations(formatMetricsData(metrics))}
            </Typography>
            <Typography>
              Total Success:{" "}
              {totalInvocations(formatMetricsData(metrics)) -
                totalErrors(formatMetricsData(metrics))}
            </Typography>
            <Typography>
              Total Errors: {totalErrors(formatMetricsData(metrics))}
            </Typography>
          </Box>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Box>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={formatMetricsData(metrics)}>
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="invocations" fill="#8884d8" />
                    <Bar dataKey="errors" fill="#ff4c4c" />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={formatMetricsData(metrics)}
                      dataKey="invocations"
                      nameKey="name"
                      outerRadius="80%"
                      fill="#8884d8"
                    >
                      {formatMetricsData(metrics).map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </Grid>
          </Grid>
        </>
      ) : (
        <Typography>Loading metrics data...</Typography>
      )}
    </Box>
  )
}

export default Metrics
