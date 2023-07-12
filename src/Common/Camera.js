import React from 'react';
import { useTranslation } from 'react-i18next';
import { CameraScreen } from 'react-native-camera-kit';
const Camera = ({ cancelHandler, onImageCapture }) => {
    const { t } = useTranslation();
    const onBottomButtonPressed = (event) => {
        const { type } = event;
        switch (type) {
            case 'left':
                cancelHandler();
                break;
            case 'capture':
                onImageCapture(event.captureImages[0].uri);
                break;
            default:
                break;
        }
    };

    return (
        <CameraScreen
            actions={{ leftButtonText: t('buttons.cancel') }}
            cameraType="back"
            flashMode="auto"
            frameColor="white"
            captureButtonImage={require('../../assets/Images/UPC/cameraButton.png')}
            torchOnImage={require('../../assets/Images/UPC/torchOn.png')}
            torchOffImage={require('../../assets/Images/UPC/torchOff.png')}
            onBottomButtonPressed={onBottomButtonPressed}
            flashImages={{
                on: require('../../assets/Images/UPC/flashOn.png'),
                off: require('../../assets/Images/UPC/flashOff.png'),
                auto: require('../../assets/Images/UPC/flashAuto.png'),
            }}
            showCapturedImageOverlay={false} // Disable the default image preview overlay

        />
    )
}

export default Camera