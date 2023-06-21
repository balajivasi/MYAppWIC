import { View, Text, Alert } from 'react-native';
import React from 'react';
import { CameraScreen } from 'react-native-camera-kit';
const BarcodeScanner = () => {

    const onBarcodeScan = (qrValue) => {
        console.log(qrValue)
    };
    return (
        <CameraScreen
            showFrame={false}
            // Show/hide scan frame
            scanBarcode={true}
            // Can restrict for the QR Code only
            laserColor={'blue'}
            // Color can be of your choice
            frameColor={'yellow'}
            // If frame is visible then frame color
            colorForScannerFrame={'black'}
            // Scanner Frame color
            onReadCode={(event) =>
                onBarcodeScan(event.nativeEvent.codeStringValue)
            }
        />
    )
}

export default BarcodeScanner