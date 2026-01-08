import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '~/config/queryKeys';
import axios from '~/tools/axios';

const useImages = (params: any) => {
  const res = useQuery({
    queryFn: async () => {
      const res = await axios.get(`/v1/image`, { params });

      return res;
    },

    queryKey: [queryKeys.imageList, params],
    keepPreviousData: true,
  });

  return res;
};

export const useImage = (params: { id: string }) => {
  const res = useQuery({
    queryFn: async () => {
      const res = await axios.get(`/v1/image/${params.id}`, {});
      return res;
    },

    queryKey: [queryKeys.imageView, params.id],
    keepPreviousData: true,
  });

  return res;
};

export default useImages;
