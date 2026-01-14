import { Inventory2Outlined } from '@mui/icons-material';
import { Stack, Typography, useTheme } from '@mui/material';
import { t } from 'i18next';
import React from 'react';
import { LangKey } from '~/lang/langKey';

interface NoDataProps {
  label?: string;
}

const NoData = ({ label = t(LangKey.noData) }: NoDataProps) => {
  const theme = useTheme();
  return (
    <Stack
      sx={{
        flex: 1,
        minHeight: 0,
        height: '100%',
        mx: 'auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.palette.secondary.main,
      }}
    >
      <Inventory2Outlined fontSize="large" sx={{ mx: 'auto' }} />
      <Typography sx={{ mx: 'auto', mt: 1 }}>{label}</Typography>
    </Stack>
  );
};

export default NoData;
