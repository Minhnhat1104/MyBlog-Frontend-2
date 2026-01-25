import { DarkMode, DarkModeOutlined, LightModeOutlined } from '@mui/icons-material';
import { IconButton, Switch } from '@mui/material';
import React from 'react';
import { useRecoilState } from 'recoil';
import { configState } from '~/atoms/config';
import { LOCAL_STORAGE_KEY, localStorageService } from '~/tools/storages';

const ThemeToggle = () => {
  const [config, setConfig] = useRecoilState(configState);

  const toggleTheme = () => {
    const nVal = config?.mode === 'light' ? 'dark' : 'light';
    localStorageService.set(LOCAL_STORAGE_KEY.THEME_MODE, nVal);
    setConfig((prev) => ({ ...prev, mode: nVal }));
  };

  return (
    <>
      <IconButton onClick={toggleTheme}>
        {config?.mode === 'dark' ? <DarkModeOutlined /> : <LightModeOutlined />}
      </IconButton>
    </>
  );
};

export default ThemeToggle;
