import { Avatar, Box, Button, Stack, useTheme } from '@mui/material';
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useUserMutation } from '~/hooks/useUserMutation';
import userImagePlaceholder from '~/assets/img/UserPlaceholder.png';
import { useRecoilState } from 'recoil';
import { userState } from '~/atoms';
import { getUserAvatarSrc } from '~/tools/image';
import { LangKey } from '~/lang/langKey';
import { t } from 'i18next';
import BaseAvatar from '~/components/BaseAvatar';
import AvatarCrop from './AvatarCrop';
import { Edit } from '@mui/icons-material';

function AvatarWrite() {
  const theme = useTheme();
  const [user, setUser] = useRecoilState(userState);
  const { mSetAvatar } = useUserMutation();

  const [openAvatarWrite, setOpenAvatarWrite] = useState<{ isOpen: boolean; file: File | null }>({
    isOpen: false,
    file: null,
  });
  const { getRootProps, getInputProps, open } = useDropzone({
    noClick: true,
    accept: { 'image/*': [] },
    onDrop: async (acceptedFiles, fileRejections, event) => {
      setOpenAvatarWrite({ isOpen: true, file: acceptedFiles[0] });
    },
    maxFiles: 1,
  });

  const handleSave = ({ file, editFile }: { file: File; editFile: File | null }) => {
    const formData = new FormData();

    formData.append('photo', editFile || file);
    mSetAvatar.mutateAsync(formData);
  };

  return (
    <>
      <Stack direction="row" alignItems="center" spacing={2}>
        <img
          src={getUserAvatarSrc(user?.id || '')}
          style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 999 }}
        />

        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <Button variant="contained" onClick={open} loading={mSetAvatar.isPending} size="small">
            {t(LangKey.changeAvatar)}
          </Button>
        </div>

        <Button variant="contained" onClick={open} loading={mSetAvatar.isPending} size="small" color="secondary">
          Delete
        </Button>
      </Stack>

      {openAvatarWrite?.isOpen && openAvatarWrite?.file && (
        <AvatarCrop
          isOpen={openAvatarWrite?.isOpen}
          file={openAvatarWrite?.file}
          onClose={() => setOpenAvatarWrite({ isOpen: false, file: null })}
          onSave={handleSave}
        />
      )}
    </>
  );
}

export default AvatarWrite;
