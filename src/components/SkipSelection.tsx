import React, { useState } from "react";
import { Box, Typography, useTheme as useMuiTheme } from "@mui/material";
import type { SkipData } from "../types/Skip";
import Header from "./Header";
import Sidebar from "./Sidebar";
import SkipGrid from "./SkipGrid";
import LoadingState from "./LoadingState";
import ErrorState from "./ErrorState";
import SelectedSkipCard from "./SelectedSkipCard";
import useFetch from "../hooks/useFetch"; 

const SkipSelection: React.FC = () => {
  const muiTheme = useMuiTheme();
  const [selectedSkip, setSelectedSkip] = useState<SkipData | null>(null);

  const {
    data: skips,
    loading,
    error,
    refetch,
  } = useFetch<SkipData[]>(
    "https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft"
  );

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
        minWidth: "99vw",
        bgcolor:
          muiTheme.palette.mode === "dark"
            ? "background.default"
            : "#f5f5f5",
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
              color={
                muiTheme.palette.mode === "dark"
                  ? "common.white"
                  : "text.primary"
              }
              gutterBottom
            >
              Choose Your Skip Size
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
            >
              Select the skip size that best suits your needs
            </Typography>
          </Box>

          {error && <ErrorState error={error} onRetry={refetch} />}

          {loading ? (
            <LoadingState />
          ) : (
            <SkipGrid
              skips={skips || []}
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
