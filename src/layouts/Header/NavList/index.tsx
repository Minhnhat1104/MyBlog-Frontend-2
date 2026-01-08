import { Button, Stack } from '@mui/material';
import { Link, useMatch } from 'react-router-dom';
import { LabelValue } from '~/types';
import Item from './Item';

const items: LabelValue[] = [
  {
    label: 'Explore',
    value: '/explore',
  },
  {
    label: 'My photos',
    value: '/my-photos',
  },
];

const NavList = () => {
  const isExplore = useMatch('/explore');
  const isMyPhoto = useMatch('/my-photos');
  return (
    <Stack direction="row" alignItems="center" component="nav">
      {items?.map((_item) => (
        <Item key={_item?.value} data={_item} />
      ))}
    </Stack>
  );
};

export default NavList;
