import React from "react";
import { Box } from '@material-ui/core';

export default function ModalTitle({title}) {
    return (
      <Box sx={{marginBottom: 20 }}>
            <h5>{title}</h5>
      </Box>
    );
  }
