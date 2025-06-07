import React from "react"
import { Backdrop, CircularProgress, Typography, useTheme } from "@mui/material"

const LoadingState: React.FC = () => {
  const theme = useTheme()

  return (
    <Backdrop
      open
      sx={{
        color: "#fff",
        zIndex: theme.zIndex.modal + 1,
        flexDirection: "column",
      }}
    >
      <CircularProgress color="inherit" size={60} thickness={5} />
      <Typography
        variant="h6"
        sx={{ mt: 3, color: theme.palette.grey[100], textAlign: "center", fontWeight: 500 }}
      >
        Hang tight — we’re loading the best skip options for you!
      </Typography>
    </Backdrop>
  )
}

export default LoadingState
