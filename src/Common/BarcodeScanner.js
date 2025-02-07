import React from 'react';
//import { CameraScreen } from 'react-native-camera-kit';
const BarcodeScanner = ({ barcode, cancelHandler }) => {

    /* const onBarcodeScan = (qrValue) => {
         barcode(qrValue)
     };
     const onBottomButtonPressed = (event) => {
         cancelHandler();
     }
     return (
         <CameraScreen
             actions={{ rightButtonText: 'Done', leftButtonText: 'Cancel' }}
             showFrame={true}
             cameraType={"back"}
             scanBarcode={true}
             laserColor={'red'}
             frameColor={'white'}
             colorForScannerFrame={'black'}
             onReadCode={(event) =>
                 onBarcodeScan(event.nativeEvent.codeStringValue)
             }
             torchOnImage={require('../../assets/Images/UPC/torchOn.png')}
             torchOffImage={require('../../assets/Images/UPC/torchOff.png')}
             onBottomButtonPressed={(event) => onBottomButtonPressed(event)}
         />
     )*/
    return null
}

export default BarcodeScanner