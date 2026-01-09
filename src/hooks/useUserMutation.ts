import axios from '~/tools/axios';
import { useMutation } from '@tanstack/react-query';
import { queryKeys } from '~/config/queryKeys';

export const useUserMutation = () => {
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
  });

  const mProfileUpdate = useMutation({
    mutationKey: [queryKeys.userUpdateProfile],
    mutationFn: async (params: any) => {
      const res = await axios.post('/v1/user/profile', params);

      return res;
    },
  });

  return { mSetAvatar, mProfileUpdate };
};
