import React, { useRef, useState } from 'react';
import MiModal from '~/components/MiModal';
import Cropper, { Area } from 'react-easy-crop';
import { Box, Button, Stack } from '@mui/material';
import { getCroppedFile } from './helper';

interface AvatarCropProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (opts: { file: File; editFile: File | null }) => void;
  file: File;
}

const AvatarCrop = ({ isOpen, onClose, file, onSave }: AvatarCropProps) => {
  const cropRef = useRef<Cropper>(null);
  const url = useRef(URL.createObjectURL(file))?.current;

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [cropState, setCropState] = useState<{
    croppedArea: Area;
    croppedAreaPixels: Area;
  } | null>(null);
  const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
    setCropState({ croppedArea, croppedAreaPixels });
  };

  return (
    <MiModal
      title={'Edit image'}
      size="md"
      isOpen={isOpen}
      onClose={onClose}
      footer={
        <Stack direction="row" justifyContent="center" width={1}>
          <Button
            type="submit"
            //   loading={mCreate.isPending}
            variant="contained"
            sx={{ width: 'fit-content', margin: 'auto' }}
            onClick={async () => {
              const editFile = cropState?.croppedAreaPixels
                ? await getCroppedFile(url, cropState?.croppedAreaPixels, 'avatar.jpg')
                : null;
              onSave({
                file,
                editFile,
              });
            }}
          >
            Save
          </Button>
        </Stack>
      }
    >
      <Stack sx={{ p: 2, height: 500 }}>
        <Box sx={{ height: 400, position: 'relative' }}>
          <Cropper
            ref={cropRef}
            image={url}
            crop={crop}
            zoom={zoom}
            aspect={3 / 3}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
            cropShape="round"
          />
        </Box>

        <input
          type="range"
          value={zoom}
          min={0.5}
          max={1.5}
          step={0.1}
          aria-labelledby="Zoom"
          onChange={(e) => {
            setZoom(Number(e.target.value));
          }}
          className="zoom-range"
        />
      </Stack>
    </MiModal>
  );
};

export default AvatarCrop;
