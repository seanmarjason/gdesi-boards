import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

import DevicesRoundedIcon from '@mui/icons-material/DevicesRounded';
import Dashboard from '@mui/icons-material/Dashboard';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import SmartToyIcon from '@mui/icons-material/SmartToy';

const items = [
  {
    icon: <Dashboard />,
    title: 'Team Task Boards',
    description:
      'Collaborate with your team asynchronously, continuously capturing the latest updates on your work in a central location.',
    imageLight: `url("${process.env.TEMPLATE_IMAGE_URL || 'https://gdesi-boards.vercel.app'}/Dashboard.png")`,
    imageDark: `url("${process.env.TEMPLATE_IMAGE_URL || 'https://gdesi-boards.vercel.app'}/Dashboard.png")`,
  },
  {
    icon: <HowToRegIcon />,
    title: 'Check Ins',
    description:
      'Preiodically check in with your team manager to showcase your progress, and highlight your achievements or where you might need support.',
    imageLight: `url("${process.env.TEMPLATE_IMAGE_URL || 'https://gdesi-boards.vercel.app'}/Check-in.png")`,
    imageDark: `url("${process.env.TEMPLATE_IMAGE_URL || 'https://gdesi-boards.vercel.app'}/Check-in.png")`,  },
  {
    icon: <SmartToyIcon />,
    title: 'Two-way communication with OpenAI',
    description:
      'Harness the power of OpenAI to simulate two-way comnunication, ensuring you give the right amount of information to your team members when they need it.',
    imageLight: `url("${process.env.TEMPLATE_IMAGE_URL || 'https://gdesi-boards.vercel.app'}/OpenAI.png")`,
    imageDark: `url("${process.env.TEMPLATE_IMAGE_URL || 'https://gdesi-boards.vercel.app'}/OpenAI.png")`,  },
];

export default function Features() {
  const [selectedItemIndex, setSelectedItemIndex] = React.useState(0);

  const handleItemClick = (index) => {
    setSelectedItemIndex(index);
  };

  const selectedFeature = items[selectedItemIndex];

  return (
    <Container id="features" sx={{ py: { xs: 8, sm: 16 } }}>
      <Box sx={{ width: { sm: '100%', md: '60%' } }}>
        <Typography
          component="h2"
          variant="h4"
          gutterBottom
          sx={{ color: 'text.primary' }}
        >
          Product features
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: 'text.secondary', mb: { xs: 2, sm: 4 } }}
        >
          Experience the latest features to improve how you work remotely.
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row-reverse' },
          gap: 2,
        }}
      >
        <div>
          <Box
            sx={{
              display: { xs: 'none', sm: 'flex' },
              flexDirection: 'column',
              gap: 2,
              height: '100%',
            }}
          >
            {items.map(({ icon, title, description }, index) => (
              <Box
                key={index}
                component={Button}
                onClick={() => handleItemClick(index)}
                sx={[
                  (theme) => ({
                    p: 2,
                    height: '100%',
                    width: '100%',
                    '&:hover': {
                      backgroundColor: (theme.vars || theme).palette.action.hover,
                    },
                  }),
                  selectedItemIndex === index && {
                    backgroundColor: 'action.selected',
                  },
                ]}
              >
                <Box
                  sx={[
                    {
                      width: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'left',
                      gap: 1,
                      textAlign: 'left',
                      textTransform: 'none',
                      color: 'text.secondary',
                    },
                    selectedItemIndex === index && {
                      color: 'text.primary',
                    },
                  ]}
                >
                  {icon}

                  <Typography variant="h6">{title}</Typography>
                  <Typography variant="body2">{description}</Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </div>
        <Box
          sx={{
            display: { xs: 'none', sm: 'flex' },
            width: { xs: '100%', md: '70%' },
            height: 'var(--items-image-height)',
          }}
        >
          <Card
            variant="outlined"
            sx={{
              height: '100%',
              width: '100%',
              display: { xs: 'none', sm: 'flex' },
              pointerEvents: 'none',
            }}
          >
            <Box
              sx={(theme) => ({
                m: 'auto',
                width: 420,
                height: 500,
                backgroundSize: 'contain',
                backgroundImage: 'var(--items-imageLight)',
                ...theme.applyStyles('dark', {
                  backgroundImage: 'var(--items-imageDark)',
                }),
              })}
              style={
                items[selectedItemIndex]
                  ? {
                      '--items-imageLight': items[selectedItemIndex].imageLight,
                      '--items-imageDark': items[selectedItemIndex].imageDark,
                    }
                  : {}
              }
            />
          </Card>
        </Box>
      </Box>
    </Container>
  );
}
