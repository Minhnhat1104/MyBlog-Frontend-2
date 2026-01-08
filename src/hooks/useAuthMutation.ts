import axios from '~/tools/axios';
import { useMutation } from '@tanstack/react-query';
import { useSnackbar } from '~/hooks/useSnackbar';
import { queryKeys } from '~/config/queryKeys';
export const useAuthMutation = () => {
  const { enqueueSuccess, enqueueError } = useSnackbar();

  const mRegisterUser = useMutation({
    mutationKey: [queryKeys.userRegister],
    mutationFn: async (params: any) => {
      const res = await axios.post('/v1/auth/register', params);

      return res;
    },
    onSuccess(res: any, variables, context) {
      enqueueSuccess('Register user successfully!');
    },
    onError(res: any, variables, context) {
      enqueueError(res?.data?.msg || 'Register user failed!');
    },
  });

  const mUserLogin = useMutation({
    mutationKey: [queryKeys.userLogin],
    mutationFn: async (params: any) => {
      const res = await axios.post('/v1/auth/login', params);

      return res;
    },
    onSuccess(res: any, variables, context) {
      enqueueSuccess('Login successfully!');
    },
    onError(res: any, variables, context) {
      enqueueError(res?.data?.msg || 'Login failed!');
    },
  });

  const mUserLogout = useMutation({
    mutationKey: [queryKeys.userLogout],
    mutationFn: async (params: any) => {
      const res = await axios.post('/v1/auth/logout', params);

      return res;
    },
    onSuccess(res: any, variables, context) {
      enqueueSuccess('Logout successfully!');
    },
    onError(res: any, variables, context) {
      enqueueError(res?.data?.msg || 'Logout failed!');
    },
  });

  const mUserForgetPassword = useMutation({
    mutationKey: [queryKeys.userSendForgetPassword],
    mutationFn: async (params: any) => {
      const res = await axios.post('/v1/auth/forgot-password', params);

      return res;
    },
    onSuccess(res: any, variables, context) {
      enqueueSuccess(res?.data?.msg || 'Logout successfully!');
    },
    onError(res: any, variables, context) {
      enqueueError(res?.data?.msg || 'Logout failed!');
    },
  });

  const mUserResetPassword = useMutation({
    mutationKey: [queryKeys.userResetPassword],
    mutationFn: async (params: any) => {
      const res = await axios.post('/v1/auth/reset-password', params);

      return res;
    },
    onSuccess(res: any, variables, context) {
      if (res?.data?.msg) {
        enqueueSuccess(res?.data?.msg);
      }
    },
    onError(res: any, variables, context) {
      if (res?.data?.msg) {
        enqueueError(res?.data?.msg);
      }
    },
  });

  return { mRegisterUser, mUserLogin, mUserLogout, mUserForgetPassword, mUserResetPassword };
};
