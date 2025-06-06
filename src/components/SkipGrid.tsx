"use client"

import React from "react"
import type { SkipData } from "../types/Skip"
import SkipCard from "./SkipCard"
import { Grid, Box } from "@mui/material"

interface SkipGridProps {
  skips: SkipData[]
  selectedSkip: SkipData | null
  onSkipSelect: (skip: SkipData) => void
 
}

const SkipGrid: React.FC<SkipGridProps> = ({
  skips,
  selectedSkip,
  onSkipSelect,

}) => {
  return (
    <Box sx={{ width: "100%" }}>
      <Grid container spacing={4}>
        {skips.map((skip, index) => (
          <Grid
            key={skip.id}
            item
            xs={12}
            sm={6}
            lg={4}
          >
            <SkipCard
              skip={skip}
              isSelected={selectedSkip?.id === skip.id}
              onSelect={() => onSkipSelect(skip)}
            
              animationDelay={index * 100}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default SkipGrid
