import React, { useState } from "react"
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Fade,
  Tooltip,
  useTheme as useMuiTheme,
} from "@mui/material"
import { Check, X, ShoppingCart } from "react-feather"
import { useTheme } from "../contexts/AppThemeProvider"
import type { SkipData } from "../types/Skip"

interface SkipCardProps {
  skip: SkipData
  isSelected: boolean
  onSelect: () => void

  animationDelay: number
}

const SkipCard: React.FC<SkipCardProps> = ({
  skip,
  isSelected,
  onSelect,
  animationDelay,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false)
  const { isDarkMode } = useTheme()
  const theme = useMuiTheme()

  const imageName = `${skip.size}-yarder-skip.jpg`

  return (
    <Card
      onClick={onSelect}
      sx={{
        cursor: "pointer",
        height: "100%",
        borderRadius: 2,
        transition: "all 0.3s ease",
        position: "relative",
        border: isSelected
          ? `2px solid ${theme.palette.primary.main}`
          : "1px solid transparent",
        backgroundColor: isDarkMode ? theme.palette.grey[900] : "#fff",
        "&:hover": {
          boxShadow: 6,
          transform: "scale(1.02)",
          borderColor: !isSelected ? theme.palette.grey[300] : undefined,
        },
        animation: `fadeIn 0.3s ease ${animationDelay}ms forwards`,
        opacity: 0,
        "@keyframes fadeIn": {
          to: { opacity: 1 },
        },
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Image */}
      <Box
        sx={{
          position: "relative",
          height: "9rem",
          borderTopLeftRadius: theme.shape.borderRadius,
          borderTopRightRadius: theme.shape.borderRadius,
          overflow: "hidden",
          backgroundColor: isDarkMode
            ? theme.palette.grey[800]
            : theme.palette.grey[100],
          flexShrink: 0,
        }}
      >
        <Fade in={imageLoaded}>
          <img
            src={`/assets/${imageName}`}
            alt={`${skip.size} Yard Skip`}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
            onLoad={() => setImageLoaded(true)}
          />
        </Fade>
      </Box>

      <CardContent
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          gap:0.5,
          color: isDarkMode ? "#fff" : "inherit",
          py:1
        }}
      >
        {/* Title */}
        <Typography
          variant="subtitle1"
          fontWeight={600}
          color={isDarkMode ? "#fff" : theme.palette.primary.main}
        >
          {skip.size} Yard Skip
        </Typography>

        {/* Hire Period */}
        <Box
          sx={{
            bgcolor: isDarkMode ? theme.palette.grey[800] : theme.palette.grey[200],
            borderRadius: 1,
            px: 1,
            py: 0.5,
            width: "fit-content",
            fontSize: "0.75rem",
            fontWeight: 500,
            color: isDarkMode ? "#ccc" : theme.palette.text.secondary,
          }}
        >
          {skip.hire_period_days} day hire period
        </Box>

        {/* Features */}
        <Box
          sx={{
            mt: 1,
            display: "flex",
            flexDirection: "column",
            gap: 1,
            flexGrow: 1,
          }}
        >
          {[
            { label: "Road Placement", value: skip.allowed_on_road },
            { label: "Heavy Waste", value: skip.allows_heavy_waste },
          ].map((feature, idx) => (
            <Box
              key={idx}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              sx={{ color: isDarkMode ? "#fff" : theme.palette.text.primary }}
            >
              <Typography variant="body2">{feature.label}</Typography>
              <Tooltip title={feature.value ? "Included" : "Not Included"} arrow>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: feature.value
                      ? theme.palette.success.main
                      : theme.palette.error.main,
                    color: "#fff",
                    borderRadius: "50%",
                    width: 26,
                    height: 26,
                  }}
                >
                  {feature.value ? <Check size={16} /> : <X size={16} />}
                </Box>
              </Tooltip>
            </Box>
          ))}
        </Box>

        {/* Divider */}
        <Box sx={{ mt: 2, borderBottom: `1px solid ${theme.palette.divider}` }} />

        {/* Size + Price */}
        <Box
          sx={{
            mt: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          <Box
            sx={{
              backgroundColor: theme.palette.secondary.main,
              color: "#000",
              fontWeight: "bold",
              borderRadius: 1,
              px: 1.5,
              py: 0.5,
              fontSize: "0.875rem",
              userSelect: "none",
              whiteSpace: "nowrap",
            }}
          >
            {skip.size} Yards
          </Box>

          <Typography
            variant="h4"
            fontWeight={900}
            color={isDarkMode ? "#fff" : theme.palette.primary.main}
            sx={{
              textShadow: isDarkMode
                ? `0 0 8px ${theme.palette.primary.light}`
                : "none",
              whiteSpace: "nowrap",
              userSelect: "none",
            }}
          >
            £{skip.price_before_vat.toFixed(0)}
          </Typography>
        </Box>

        {/* Select Button */}
        <Button
          variant="contained"
          fullWidth
          startIcon={!isSelected && <ShoppingCart size={18} />}
          sx={{
            mt: 2,
            textTransform: "none",
            fontWeight: 600,
            backgroundColor: isSelected
              ? theme.palette.primary.main
              : theme.palette.grey[300],
            color: isSelected ? "#fff" : "#000",
            "&:hover": {
              backgroundColor: isSelected
                ? theme.palette.primary.dark
                : theme.palette.grey[400],
            },
          }}
        >
          {isSelected ? "Selected" : "Choose This Skip"}
        </Button>
      </CardContent>
    </Card>
  )
}

export default SkipCard
