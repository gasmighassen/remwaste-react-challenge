import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import {
  MapPin,
  Trash2,
  Package,
  Calendar,
  CreditCard,
  Check,
  File,
} from "react-feather";

interface SkipData {}

interface SidebarProps {
  selectedSkip: SkipData | null;
}

const Sidebar: React.FC<SidebarProps> = () => {
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  const currentStep = 2;
  const theme = useTheme();

  const steps = [
    { id: 0, name: "Postcode", icon: <MapPin size={14} /> },
    { id: 1, name: "Waste Type", icon: <Trash2 size={14} /> },
    { id: 2, name: "Select Skip", icon: <Package size={14} /> },
    { id: 3, name: "Permit Check", icon: <File size={14} /> },
    { id: 4, name: "Choose Date", icon: <Calendar size={14} /> },
    { id: 5, name: "Payment", icon: <CreditCard size={14} /> },
  ];

  const getCircleStyle = (isCompleted: boolean, isCurrent: boolean) => {
    if (isCompleted) {
      return {
        backgroundColor: theme.palette.success.main,
        color: "#fff",
        border: `2px solid ${theme.palette.success.main}`,
      };
    }
    if (isCurrent) {
      return {
        backgroundColor: theme.palette.primary.main,
        color: "#fff",
        border: `2px solid ${theme.palette.primary.main}`,
      };
    }
    return {
      backgroundColor:
        theme.palette.mode === "dark" ? "#424242" : "#e0e0e0",
      color: theme.palette.text.secondary,
      border: `2px solid ${
        theme.palette.mode === "dark" ? "#757575" : "#bdbdbd"
      }`,
    };
  };

  const getTextColor = (isCompleted: boolean, isCurrent: boolean) => {
    if (isCompleted) return theme.palette.success.main;
    if (isCurrent) return theme.palette.primary.main;
    return theme.palette.text.secondary;
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <Box
        sx={{
          display: { xs: "none", md: "block" },
          position: "sticky",
          top: "64px",
          height: "calc(100vh - 64px)",
          width: "130px",
          borderRight: `1px solid ${theme.palette.divider}`,
          backgroundColor: theme.palette.background.default,
          zIndex: 40,
        }}
      >
        <Box display="flex" flexDirection="column" px={1} py={2} height="100%">
          {steps.map((step, index) => {
            const isCompleted = step.id < currentStep;
            const isCurrent = step.id === currentStep;
            return (
              <Box
                key={step.id}
                display="flex"
                flexDirection="column"
                alignItems="center"
                flex={1}
                onMouseEnter={() => setHoveredStep(step.id)}
                onMouseLeave={() => setHoveredStep(null)}
                position="relative"
              >
                <Box
                  width={32}
                  height={32}
                  borderRadius="50%"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  sx={getCircleStyle(isCompleted, isCurrent)}
                >
                  {isCompleted ? <Check size={14} /> : step.icon}
                </Box>

                <Typography
                  variant="caption"
                  textAlign="center"
                  mt={0.5}
                  sx={{ color: getTextColor(isCompleted, isCurrent) }}
                >
                  {step.name}
                </Typography>

                {index < steps.length - 1 && (
                  <Box
                    flex={1}
                    width={2}
                    mt={1}
                    mb={2}
                    sx={{
                      backgroundColor: isCompleted
                        ? theme.palette.success.main
                        : theme.palette.divider,
                    }}
                  />
                )}

                {hoveredStep === step.id && (
                  <Paper
                    elevation={3}
                    sx={{
                      position: "absolute",
                      left: "80px",
                      top: 0,
                      px: 1.5,
                      py: 1,
                      bgcolor: theme.palette.background.paper,
                      color: theme.palette.text.primary,
                      border: `1px solid ${theme.palette.divider}`,
                      whiteSpace: "nowrap",
                    }}
                  >
                    <Box display="flex" alignItems="center" gap={1}>
                      {step.icon}
                      <Typography variant="body2">{step.name}</Typography>
                    </Box>
                  </Paper>
                )}
              </Box>
            );
          })}
        </Box>
      </Box>

      {/* Mobile Top Scrollable Stepper */}
      <Box
        sx={{
          position: "fixed",
          top: 55,
          left: 0,
          right: 0,
          zIndex: 1200,
          display: { xs: "flex", md: "none" },
          justifyContent:"space-between",
          alignItems:"center",
          overflowX: "auto",
          backgroundColor: theme.palette.background.default,
          borderBottom: `1px solid ${theme.palette.divider}`,
          px: 2,
          py: 1,
          gap: 3,
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        {steps.map((step) => {
          const isCompleted = step.id < currentStep;
          const isCurrent = step.id === currentStep;
          return (
            <Box
              key={step.id}
              display="flex"
              flexDirection="column"
              alignItems="center"
              minWidth="60px"
              flexShrink={0}
            >
              <Box
                width={32}
                height={32}
                borderRadius="50%"
                display="flex"
                alignItems="center"
                justifyContent="center"
                sx={getCircleStyle(isCompleted, isCurrent)}
              >
                {isCompleted ? <Check size={14} /> : step.icon}
              </Box>

              <Typography
                variant="caption"
                sx={{
                  fontSize: "10px",
                  color: getTextColor(isCompleted, isCurrent),
                  mt: 0.5,
                  textAlign: "center",
                }}
              >
                {step.name}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </>
  );
};

export default Sidebar;
