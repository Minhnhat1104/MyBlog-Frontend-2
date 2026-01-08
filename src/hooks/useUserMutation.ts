import axios from '~/tools/axios';
import { useMutation } from '@tanstack/react-query';
import { useSnackbar } from '~/hooks/useSnackbar';
import { queryKeys } from '~/config/queryKeys';

export const useUserMutation = () => {
  const { enqueueSuccess, enqueueError } = useSnackbar();

  const mSetAvatar = useMutation({
    mutationKey: [queryKeys.userSetAvatar],
    mutationFn: async (params: any) => {
      const res = await axios.post('/v1/user/avatar', params, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

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

  const mProfileUpdate = useMutation({
    mutationKey: [queryKeys.userUpdateProfile],
    mutationFn: async (params: any) => {
      const res = await axios.post('/v1/user/profile', params);

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

  return { mSetAvatar, mProfileUpdate };
};
