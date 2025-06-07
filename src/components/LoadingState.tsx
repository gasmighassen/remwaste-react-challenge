import React from "react";
import { Box, Grid, Skeleton, useTheme } from "@mui/material";

const LoadingState: React.FC = () => {
  const theme = useTheme();

  return (
    <Grid container spacing={2}>
      {Array.from({ length: 6 }).map((_, i) => (
        <Grid item xs={12} sm={6} md={4} key={i}>
          <Box
            sx={{
              bgcolor: theme.palette.background.paper,
              borderRadius: 2,
              p: 2,
              boxShadow: 1,
              height: "100%",
            }}
          >
            <Skeleton variant="rectangular" height={140} />
            <Skeleton variant="text" height={32} width="80%" sx={{ mt: 2 }} />
            <Skeleton variant="text" height={20} width="60%" />
            <Skeleton variant="text" height={20} width="40%" />
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default LoadingState;
