import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Link, NavLink } from 'react-router-dom';

import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, Typography, useTheme } from '@mui/material';

import { LabelValue } from '~/types';
import { LockOutlined, LogoutOutlined, PersonOutline, SettingsOutlined, SvgIconComponent } from '@mui/icons-material';

interface ActionListProps {
  handleLogout: () => void;
  onAfterClick?: () => void;
}

interface ProfileItemInterface extends LabelValue<string, number> {
  icon: SvgIconComponent;
  onClick: () => void; // if onClick is defined, url is not used
}

const ActionList = (props: ActionListProps) => {
  const { handleLogout, onAfterClick } = props;
  const navigate = useNavigate();

  const profileItems: ProfileItemInterface[] = [
    {
      label: 'Your profile',
      value: 0,
      onClick: () => navigate('/profile'),
      icon: PersonOutline,
    },
    {
      label: 'Setting',
      value: 1,
      onClick: () => navigate('/setting'),
      icon: SettingsOutlined,
    },
    {
      label: 'Change password',
      value: 2,
      onClick: () => navigate('/change-password'),
      icon: LockOutlined,
    },
    {
      label: 'Logout',
      value: 3,
      onClick: () => handleLogout(),
      icon: LogoutOutlined,
    },
  ];

  return (
    <List>
      {profileItems?.map((_item: ProfileItemInterface) => {
        const Icon = _item?.icon;

        return (
          <ListItem key={_item?.value} disablePadding>
            <ListItemButton
              LinkComponent={Link}
              onClick={() => {
                _item?.onClick();
                onAfterClick && onAfterClick();
              }}
              // selected={isActive}
            >
              <ListItemIcon sx={{ minWidth: 32 }}>
                <Icon sx={{ fontSize: 20 }} />
              </ListItemIcon>
              <ListItemText primary={_item.label} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
};

export default ActionList;
