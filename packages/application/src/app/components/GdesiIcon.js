import * as React from 'react';
import SvgIcon from '@mui/material/SvgIcon';
import Box from '@mui/material/Box';

export default function GdesiIcon() {
  return (
    <Box
      component="img"
      sx={{
        height: 25,
        width: 100,
        maxHeight: { xs: 233, md: 167 },
        maxWidth: { xs: 350, md: 250 },
      }}
      alt="The house from the offer."
      src="desi-sm-to2.png"
    />
  );
}
