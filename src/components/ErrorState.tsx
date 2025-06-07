
import React from "react"
import { Typography, Button, Paper, Stack } from "@mui/material"
import ErrorRoundedIcon from "@mui/icons-material/ErrorRounded"

interface ErrorStateProps {
  error: string
  onRetry: () => void
}

const ErrorState: React.FC<ErrorStateProps> = ({ error, onRetry }) => {
  return (
    <Paper
      elevation={6}
      sx={{
        maxWidth: 420,
        mx: "auto",
        mt: 6,
        p: 4,
        bgcolor: (theme) =>
          theme.palette.mode === "dark" ? "rgba(255, 69, 58, 0.15)" : "#ffeaea",
        borderRadius: 3,
        border: (theme) =>
          `1.5px solid ${
            theme.palette.mode === "dark" ? "#ff453a" : "#ff7a7a"
          }`,
        textAlign: "center",
        boxShadow: "0 6px 12px rgba(255, 69, 58, 0.2)",
      }}
    >
      <Stack
        alignItems="center"
        spacing={2}
        mb={3}
        sx={{
          color: (theme) =>
            theme.palette.mode === "dark" ? "#ff453a" : "#d32f2f",
        }}
      >
        <ErrorRoundedIcon sx={{ fontSize: 60 }} />
        <Typography variant="h5" fontWeight={700}>
          Oops! Something went wrong
        </Typography>
      </Stack>

      <Typography
        variant="body1"
        color={(theme) =>
          theme.palette.mode === "dark" ? "#ffb3ab" : "#b00020"
        }
        mb={4}
        sx={{ minHeight: 48 }}
      >
        {error}
      </Typography>

      <Button
        variant="contained"
        color="error"
        onClick={onRetry}
        sx={{
          px: 5,
          py: 1.5,
          fontWeight: "bold",
          borderRadius: 2,
          textTransform: "none",
          boxShadow: "0 4px 8px rgba(255, 69, 58, 0.3)",
          ":hover": {
            bgcolor: "#c62828",
            boxShadow: "0 6px 12px rgba(198, 40, 40, 0.5)",
          },
        }}
      >
        Retry
      </Button>
    </Paper>
  )
}

export default ErrorState
