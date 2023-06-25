import React from 'react';
import { CameraScreen } from 'react-native-camera-kit';
const Camera = ({ cancelHandler, onImageCapture }) => {

    const onBottomButtonPressed = (event) => {
        cancelHandler();
        onImageCapture(event.captureImages[0].uri);
    }

    return (
        <CameraScreen
            actions={{ rightButtonText: 'Done', leftButtonText: 'Cancel' }}
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