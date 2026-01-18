import React, { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { loginPathState, userState } from '~/atoms';

const GuestGuardContext = () => {
  const user = useRecoilValue(userState);
  const loginPath = useRecoilValue(loginPathState);

  if (user) {
    return <Navigate to={loginPath} />;
  }

  return (
    <>
      <Outlet />
    </>
  );
};

export default GuestGuardContext;
