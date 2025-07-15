import React, { useCallback, useState } from 'react';
import Cropper from 'react-easy-crop';
import getCroppedImg from './CropImageHelper';
import '../styles/imageCropper.css';

const ImageCropper = ({ image, onCropDone, onCancel }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback((_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleDone = async () => {
    try {
      const croppedImage = await getCroppedImg(image, croppedAreaPixels);
      onCropDone(croppedImage);
    } catch (error) {
      console.error('Crop failed:', error);
    }
  };

  return (
    <div className="cropper-modal">
      <div className="cropper-box">
        <div className="cropper-area">
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={1}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
        </div>
        <div className="cropper-controls">
          <input
            type="range"
            min={1}
            max={3}
            step={0.1}
            value={zoom}
            onChange={(e) => setZoom(e.target.value)}
          />
          <div className="cropper-buttons">
            <button onClick={handleDone} className="btn crop-btn">Crop</button>
            <button onClick={onCancel} className="btn cancel-btn">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageCropper;
