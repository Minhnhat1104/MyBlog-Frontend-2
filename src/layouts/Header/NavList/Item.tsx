import { Button } from '@mui/material';
import React from 'react';
import { Link, useMatch } from 'react-router-dom';
import { LabelValue } from '~/types';

interface ItemProps {
  data: LabelValue;
}

const Item = ({ data }: ItemProps) => {
  const isActive = useMatch(data?.value);
  return (
    <Button
      size="large"
      sx={{
        position: 'relative',
        color: isActive ? 'primary.main' : 'text.primary',
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
      component={Link}
      to={data?.value}
    >
      {data?.label}
    </Button>
  );
};

export default Item;
