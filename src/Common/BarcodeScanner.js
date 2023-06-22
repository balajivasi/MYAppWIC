import { View, Text, Alert } from 'react-native';
import React from 'react';
import { CameraScreen } from 'react-native-camera-kit';
const BarcodeScanner = () => {

    const onBarcodeScan = (qrValue) => {
        console.log(qrValue)
    };
    const onBottomButtonPressed = (event) => {
        const captureImages = JSON.stringify(event.captureImages);
        Alert.alert(
            `"${event.type}" Button Pressed`,
            `${captureImages}`,
            [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
            { cancelable: false },
        );
    }
    return (
        <CameraScreen
            actions={{ rightButtonText: 'Done', leftButtonText: 'Cancel' }}
            showFrame={true}
            cameraType={"back"}
            // Show/hide scan frame
            scanBarcode={true}
            // Can restrict for the QR Code only
            laserColor={'red'}
            // Color can be of your choice
            frameColor={'white'}
            // If frame is visible then frame color
            colorForScannerFrame={'black'}
            // Scanner Frame color
            onReadCode={(event) =>
                onBarcodeScan(event.nativeEvent.codeStringValue)
            }
            torchOnImage={require('../../assets/Images/UPC/torchOn.png')}
            torchOffImage={require('../../assets/Images/UPC/torchOff.png')}
            onBottomButtonPressed={(event) => onBottomButtonPressed(event)}
            flashImages={{
                on: require('../../assets/Images/UPC/flashOn.png'),
                off: require('../../assets/Images/UPC/flashOff.png'),
                auto: require('../../assets/Images/UPC/flashAuto.png'),
            }}

        />
    )
}

export default BarcodeScanner