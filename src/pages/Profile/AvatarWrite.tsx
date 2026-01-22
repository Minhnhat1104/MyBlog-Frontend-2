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
    formData.append('photo', file);
    if (editFile) {
      formData.append('edit_photo', editFile);
    }
    mSetAvatar.mutateAsync(formData);
  };

  return (
    <>
      <Stack direction="row" alignItems="center" spacing={3}>
        <Box
          sx={{
            p: 0.75,
            boxShadow: 'rgba(0, 0, 0, 0.15) 1px 1px 1px',
            border: theme.border.light,
            cursor: 'pointer',
            position: 'relative',
          }}
        >
          <Edit sx={{ position: 'absolute', top: 0, right: 0, fontSize: 16 }} />
          <img src={getUserAvatarSrc(user?.id || '')} style={{ width: 120, height: 120, objectFit: 'cover' }} />
        </Box>

        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <Button variant="contained" onClick={open} loading={mSetAvatar.isPending}>
            {t(LangKey.changeAvatar)}
          </Button>
        </div>
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
