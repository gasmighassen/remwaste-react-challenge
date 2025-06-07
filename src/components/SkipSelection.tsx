import React, { useState } from "react";
import {
  Box,
  Typography,
  useTheme as useMuiTheme,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
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
  const [sortOption, setSortOption] = useState<
    "none" | "price-asc" | "price-desc" | "size-asc" | "size-desc"
  >("none");

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

  const sortedSkips = (skips || []).slice().sort((a, b) => {
    switch (sortOption) {
      case "price-asc":
        return a.price_before_vat - b.price_before_vat;
      case "price-desc":
        return b.price_before_vat - a.price_before_vat;
      case "size-asc":
        return a.size - b.size;
      case "size-desc":
        return b.size - a.size;
      default:
        return 0;
    }
  });

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
    <Box
  mb={4}
  display="flex"
  flexDirection={{ xs: "column", md: "row" }}
  alignItems={{ md: "center" }}
  justifyContent="space-between"
  gap={2}
>
  <Box>
    <Typography
      variant="h5"
      fontWeight={700}
      color={
        muiTheme.palette.mode === "dark"
          ? "common.white"
          : "text.primary"
      }
    >
      Choose Your Skip Size
    </Typography>
    <Typography
      variant="body2"
      color="text.secondary"
      sx={{ mt: 0.5 }}
    >
      Select the skip size that best suits your needs
    </Typography>
  </Box>

  <Box maxWidth={240} width="100%">
    <FormControl fullWidth size="small">
      <InputLabel id="sort-label">Sort by</InputLabel>
      <Select
        labelId="sort-label"
        value={sortOption}
        label="Sort by"
        onChange={(e) =>
          setSortOption(
            e.target.value as
              | "none"
              | "price-asc"
              | "price-desc"
              | "size-asc"
              | "size-desc"
          )
        }
      >
        <MenuItem value="none">None</MenuItem>
        <MenuItem value="price-asc">Price: Low to High</MenuItem>
        <MenuItem value="price-desc">Price: High to Low</MenuItem>
        <MenuItem value="size-asc">Size: Small to Large</MenuItem>
        <MenuItem value="size-desc">Size: Large to Small</MenuItem>
      </Select>
    </FormControl>
  </Box>
</Box>



          {error && <ErrorState error={error} onRetry={refetch} />}

          {loading ? (
            <LoadingState />
          ) : (
            <SkipGrid
              skips={sortedSkips}
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
