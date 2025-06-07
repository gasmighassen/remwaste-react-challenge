
import React from "react"
import { AppBar, Toolbar, Typography, Box, IconButton, useTheme } from "@mui/material"
import { Sun, Moon } from "react-feather"
import { useTheme as useAppTheme } from "../contexts/AppThemeProvider" // Assuming this toggles MUI theme

const Header: React.FC = () => {
  const theme = useTheme()
  const { isDarkMode, toggleTheme } = useAppTheme()

  return (
    <AppBar
      position="sticky"
      elevation={1}
      sx={{
        backgroundColor: theme.palette.background.default,
        borderBottom: `1px solid ${theme.palette.divider}`,
        zIndex: theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", px: 3 }}>
        {/* Logo & Title */}
        <Box display="flex" alignItems="center" gap={2}>
          <Box
            sx={{
              width: 32,
              height: 32,
              backgroundColor: theme.palette.primary.main,
              borderRadius: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="body2" fontWeight="bold" color="white">
              W
            </Typography>
          </Box>
          <Typography variant="h6" fontWeight="bold" color={theme.palette.text.primary}>
            WeWantWaste
          </Typography>
        </Box>

        {/* Theme Toggle */}
        <IconButton
          onClick={toggleTheme}
          sx={{
            bgcolor: theme.palette.action.hover,
            "&:hover": { bgcolor: theme.palette.action.selected },
          }}
        >
          {isDarkMode ? (
            <Sun size={20} color={theme.palette.warning.main} />
          ) : (
            <Moon size={20} color={theme.palette.text.secondary} />
          )}
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}

export default Header
