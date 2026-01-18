import { BASE_URL } from '~/config/constants';

export function downloadURI(uri: string, name: string) {
  var link = document.createElement('a');
  link.download = name;
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export const getUserAvatarSrc = (id: number | string) => {
  return `${BASE_URL}/v1/user/avatar?id=${id}`;
};

// https://images.pexels.com/photos/31684231/pexels-p…ow-landscape.jpeg?auto=compress&cs=tinysrgb&w=600

export enum ImageAuto {
  compress = 'compress',
  format = 'format',
  enhance = 'enhance',
  metaData = 'metaData',
}

export enum ImageColorSpace {
  tinysrgb = 'tinysrgb',
  srgb = 'srgb',
}

export const getImageSrc = (
  imageId: number | string,
  opts: { v?: string | number; origin?: boolean; width?: number; autos?: ImageAuto[]; cs?: ImageColorSpace }
) => {
  let url = `${BASE_URL}/v1/image/file/${imageId}`;

  const querys: string[] = [];
  if (opts?.v) {
    querys.push(`v=${opts?.v}`);
  }
  if (opts?.origin) {
    querys.push(`origin=true`);
  }
  if (opts?.width) {
    querys.push(`width=${opts?.width}`);
  }

  if (opts?.cs) {
    querys.push(`cs=${opts?.cs}`);
  }

  if (Array.isArray(opts?.autos)) {
    opts?.autos?.forEach((_item) => {
      querys.push(`auto=${_item}`);
    });
  }

  if (querys?.length) {
    url += `?${querys?.join('&')}`;
  }

  return url;
};
