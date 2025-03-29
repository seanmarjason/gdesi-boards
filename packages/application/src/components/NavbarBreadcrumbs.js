import * as React from 'react';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Breadcrumbs, { breadcrumbsClasses } from '@mui/material/Breadcrumbs';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import Link from '@mui/material/Link';

export default function NavbarBreadcrumbs({ nav=['']}) {

  const lastNav = nav.slice(nav.length-1)
  const prevNav = nav.slice(0, -1)

  return (
    <Breadcrumbs
      aria-label="breadcrumb"
      separator={<NavigateNextRoundedIcon fontSize="small" />}
    >
      { prevNav.map((link, index) =>
          <Typography variant="body1" key={`breadcrumb-${index}`}>
              <Link href={`${'../'.repeat(nav.length - index)}${link.toLowerCase().replace(/ /g,"-")}`}>
                {link}
              </Link>
          </Typography>
      )}
      <Typography variant="body1" sx={{ color: 'text.primary', fontWeight: 600 }}>
        {lastNav}
      </Typography>
    </Breadcrumbs>
  );
}
