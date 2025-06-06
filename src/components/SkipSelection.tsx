"use client";

import React, { useState, useEffect } from "react";
import { Box, Typography, useTheme as useMuiTheme } from "@mui/material";
import type { SkipData } from "../types/Skip";
import Header from "./Header";
import Sidebar from "./Sidebar";
import SkipGrid from "./SkipGrid";
import LoadingState from "./LoadingState";
import ErrorState from "./ErrorState";
import SelectedSkipCard from "./SelectedSkipCard";

const SkipSelection: React.FC = () => {
  const muiTheme = useMuiTheme();
  const [skips, setSkips] = useState<SkipData[]>([]);
  const [selectedSkip, setSelectedSkip] = useState<SkipData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSkips();
  }, []);

  const fetchSkips = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(
        "https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch skip options");
      }
      const data = await response.json();
      console.log(data)
      setSkips(data);
    } catch (error) {
      setError("Failed to load skip options. Please try again.");
      console.error("Error fetching skips:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSkipSelect = (skip: SkipData) => {
    setSelectedSkip((prev) => (prev?.id === skip.id ? null : skip));
  };

  const handleContinue = () => {
    console.log("Continue with skip:", selectedSkip);
  };

  const handleBack = () => {
    setSelectedSkip(null);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
      minWidth:"99vw",
        bgcolor: muiTheme.palette.mode === "dark" ? "background.default" : "#f5f5f5",
        transition: "all 0.3s",
      }}
    >
      <Header />

      <Box display="flex">
        <Sidebar selectedSkip={selectedSkip} />

        <Box
          component="main"
          sx={{
            flex: 1,
            p: { xs: 2, md: 4 },
            mt: { xs: 10, md: 0 },
            transition: "all 0.3s",
            width: "100%",
          }}
        >
          <Box mb={4}>
            <Typography
              variant="h4"
              fontWeight="bold"
              color={muiTheme.palette.mode === "dark" ? "common.white" : "text.primary"}
              gutterBottom
            >
              Choose Your Skip Size
            </Typography>
            <Typography
              variant="body1"
              color={muiTheme.palette.mode === "dark" ? "text.secondary" : "text.secondary"}
            >
              Select the skip size that best suits your needs
            </Typography>
          </Box>

          {error && <ErrorState error={error} onRetry={fetchSkips} />}

          {loading ? (
            <LoadingState />
          ) : (
            <SkipGrid
              skips={skips}
              selectedSkip={selectedSkip}
              onSkipSelect={handleSkipSelect}
              
            />
          )}
        </Box>
      </Box>

      {selectedSkip && (
        <SelectedSkipCard
          skip={selectedSkip}
          
          onBack={handleBack}
          onContinue={handleContinue}
        />
      )}
    </Box>
  );
};

export default SkipSelection;
