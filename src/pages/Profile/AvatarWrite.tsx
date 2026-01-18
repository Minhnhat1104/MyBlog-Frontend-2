import { Avatar, Button, Stack } from '@mui/material';
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useUserMutation } from '~/hooks/useUserMutation';
import userImagePlaceholder from '~/assets/img/UserPlaceholder.png';
import { useRecoilState } from 'recoil';
import { userState } from '~/atoms';
import { getUserAvatarSrc } from '~/tools/image';
import { LangKey } from '~/lang/langKey';
import { t } from 'i18next';
import BaseAvatar from '~/components/BaseAvatar';

function AvatarWrite() {
  const [user, setUser] = useRecoilState(userState);
  const { getRootProps, getInputProps, open } = useDropzone({
    noClick: true,
    accept: { 'image/*': [] },
    onDrop: async (acceptedFiles, fileRejections, event) => {
      const formData = new FormData();
      formData.append('photo', acceptedFiles[0]);
      mSetAvatar.mutateAsync(formData);
    },
    maxFiles: 1,
  });

  const { mSetAvatar } = useUserMutation();

  return (
    <Stack direction="row" alignItems="center" spacing={3}>
      <BaseAvatar id={user?.id} name={user?.first_name} size="extra-large" />

      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <Button variant="contained" onClick={open} loading={mSetAvatar.isPending}>
          {t(LangKey.changeAvatar)}
        </Button>
      </div>
    </Stack>
  );
}

export default AvatarWrite;
