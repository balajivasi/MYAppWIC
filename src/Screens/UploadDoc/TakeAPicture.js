import { View, Text, Image, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import CustomButton from '../../Common/CustomButton';
import { useTranslation } from 'react-i18next';
import Camera from '../../Common/Camera';
import ImgToBase64 from 'react-native-image-base64';

const TakeAPicture = ({ getDocumentPic, cancelClicked }) => {
    const { t } = useTranslation();
    const [capturedImage, setCapturedImage] = useState(null);

    const cancelHandler = () => {
        cancelClicked()
    }
    const handleImageCapture = async (ImageUrl) => {
        try {
            ImgToBase64.getBase64String(ImageUrl)
                .then(base64String => setCapturedImage(base64String)).catch(error => console.log('Error converting image to base64:', error));
        } catch (error) {
            console.log('Error converting image to base64:', error);
        }

    };
    const { width, height } = Dimensions.get('window');

    const sendProductPic = () => {
        getDocumentPic(capturedImage)
    }

    return (
        <View className="h-full flex">
            {capturedImage ? <View className="flex-1 h-screen">
                <Image style={{ height, width }} source={{ uri: `data:image/jpeg;base64,${capturedImage}` }} />
                <View className="flex-row justify-center gap-5 footer absolute bottom-10 left-10">
                    <CustomButton title={t('buttons.retake')} CSSName="w-2/5" onPress={() => setCapturedImage(null)} /><Text>&nbsp;&nbsp;&nbsp;</Text>
                    <CustomButton title={t('buttons.continue')} CSSName="w-2/5" onPress={() => sendProductPic()} />
                </View>
            </View> :
                <View className="flex-1 h-screen">
                    <Camera cancelHandler={cancelHandler} onImageCapture={handleImageCapture} />
                </View>}
        </View>
    )
}

export default TakeAPicture