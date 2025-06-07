import React, { useEffect, useState } from "react"
import { useTheme as useAppTheme } from "../contexts/AppThemeProvider"
import type { SkipData } from "../types/Skip"
import { ArrowRight, ChevronDown, Eye } from "react-feather"

import {
  Box,
  Typography,
  Button,
  IconButton,
  Paper,
  Fade,
} from "@mui/material"

interface SelectedSkipCardProps {
  skip: SkipData
  onBack: () => void
  onContinue: () => void
}

const SelectedSkipCard: React.FC<SelectedSkipCardProps> = ({ skip, onBack, onContinue }) => {
  const [isVisible, setIsVisible] = useState(false)
  const [isHidden, setIsHidden] = useState(false)
  const { isDarkMode } = useAppTheme()
 

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 50)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    setIsHidden(false)
    setIsVisible(true)
  }, [skip])

  const handleToggleHide = () => {
    setIsHidden(!isHidden)
  }

  return (
    <>
      {/* Main Card */}
      <Fade in={isVisible && !isHidden}>
        <Paper
          elevation={6}
          sx={{
            position: "fixed",
            bottom: 24,
            right: 24,
            zIndex: 1300,
            width: 320,
            borderRadius: 2,
            bgcolor: isDarkMode ? "grey.900" : "background.paper",
            transform: isVisible && !isHidden ? "translate(0, 0)" : "translate(100%, 64px)",
            transition: "transform 0.3s ease-in-out",
            overflow: "hidden",
          }}
        >
          <Box sx={{ p: 2, position: "relative" }}>
            <IconButton
              onClick={handleToggleHide}
              size="small"
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
                color: isDarkMode ? "grey.400" : "grey.700",
              }}
              aria-label="Hide"
            >
              <ChevronDown size={16} />
            </IconButton>

            <Typography variant="h6" fontWeight="bold" color={isDarkMode ? "common.white" : "text.primary"} gutterBottom>
              {skip.size} Yard Skip
            </Typography>

            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography   variant="h5"
  fontWeight="bold"
  sx={{
    color: isDarkMode ? "common.white" : "primary.main",
  }}>
                £{skip.price_before_vat.toFixed(0)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {skip.hire_period_days} day hire
              </Typography>
            </Box>

            <Box
              sx={{
                backgroundColor: isDarkMode ? "grey.800" : "grey.100",
                borderRadius: 1,
                p: 1.5,
                mb: 2,
              }}
            >
              <Typography variant="caption" color="text.secondary">
                Imagery and information shown throughout this website may not reflect the exact shape or size
                specification, colours may vary, options and/or accessories may be featured at additional cost.
              </Typography>
            </Box>

            <Box display="flex" flexDirection="column" gap={1}>
             <Button
  variant="outlined"
  onClick={onBack}
  sx={{
    borderColor: "primary.main",
    color: isDarkMode ? "common.white" : "text.primary",
    "&:hover": {
      bgcolor: isDarkMode ? "grey.800" : "grey.100",
      borderColor: "primary.main", // keep the blue border on hover
    },
  }}
>
  Back
</Button>

              <Button
                variant="contained"
                onClick={onContinue}
                endIcon={<ArrowRight size={16} />}
              >
                Continue
              </Button>
            </Box>
          </Box>
        </Paper>
      </Fade>

      {/* Hidden State Icon */}
      {isHidden && (
        <Fade in={isVisible}>
          <Box
            sx={{
              position: "fixed",
              bottom: 24,
              right: 24,
              zIndex: 1300,
              transform: "translate(0, 0)",
              transition: "transform 0.3s ease-in-out",
            }}
          >
            <IconButton
              onClick={handleToggleHide}
              sx={{
                width: 48,
                height: 48,
                backgroundColor: "primary.main",
                color: "common.white",
                "&:hover": {
                  bgcolor: "primary.dark",
                },
              }}
              aria-label="Show selected skip"
            >
              <Eye size={20} />
            </IconButton>
          </Box>
        </Fade>
      )}
    </>
  )
}

export default SelectedSkipCard
