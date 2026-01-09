import axios from '~/tools/axios';
import { useMutation } from '@tanstack/react-query';
import { queryKeys } from '~/config/queryKeys';

export const useAlbumMutation = () => {
  const mCreate = useMutation({
    mutationKey: [queryKeys.albumCreate],
    mutationFn: async (params: any) => {
      const res = await axios.post('/v1/album/create', params, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return res;
    },
  });

  const mDelete = useMutation({
    mutationKey: [queryKeys.albumDelete],
    mutationFn: async (params: any) => {
      const res = await axios.post('/v1/album/delete', params);

      return res;
    },
  });

  return { mCreate, mDelete };
};
