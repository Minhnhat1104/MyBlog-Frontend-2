import { Button, Stack } from '@mui/material';

const NavList = () => {
  return (
    <Stack direction="row" alignItems="center" component="nav">
      <Button
        size="large"
        sx={{
          position: 'relative',
          color: 'text.primary',
          textTransform: 'none',
          fontWeight: 500,

          '&::after': {
            content: '""',
            position: 'absolute',
            left: 0,
            bottom: 0,
            width: '100%',
            height: '2px',
            backgroundColor: 'primary.main',
            transform: 'scaleX(0)',
            transformOrigin: 'left',
            transition: 'transform 0.3s ease',
          },

          '&:hover::after': {
            transform: 'scaleX(1)',
            transformOrigin: 'left',
          },
        }}
      >
        Explore
      </Button>

      <Button
        size="large"
        sx={{
          position: 'relative',
          color: 'text.primary',
          textTransform: 'none',
          fontWeight: 500,

          '&::after': {
            content: '""',
            position: 'absolute',
            left: 0,
            bottom: 0,
            width: '100%',
            height: '2px',
            backgroundColor: 'primary.main',
            transform: 'scaleX(0)',
            transformOrigin: 'left',
            transition: 'transform 0.3s ease',
          },

          '&:hover::after': {
            transform: 'scaleX(1)',
            transformOrigin: 'left',
          },
        }}
      >
        My Photos
      </Button>
    </Stack>
  );
};

export default NavList;
