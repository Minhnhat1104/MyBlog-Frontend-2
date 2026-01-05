import { DarkMode, DarkModeOutlined, LightModeOutlined } from '@mui/icons-material';
import { IconButton, Switch } from '@mui/material';
import React from 'react';
import useConfig from '~/hooks/useConfig';

const ThemeToggle = () => {
  const { mode, onChangeMode } = useConfig();

  return (
    <>
      <IconButton onClick={(e) => onChangeMode(mode === 'light' ? 'dark' : 'light')}>
        {mode === 'light' ? <DarkModeOutlined /> : <LightModeOutlined />}
      </IconButton>
    </>
  );
};

export default ThemeToggle;
