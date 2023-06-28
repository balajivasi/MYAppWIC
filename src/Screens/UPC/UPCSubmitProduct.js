import { View, Text, Image, Dimensions } from 'react-native';
import React, { useState } from 'react';
import CustomButton from '../../Common/CustomButton';
import { useTranslation } from 'react-i18next';
import Camera from '../../Common/Camera';
import ImgToBase64 from 'react-native-image-base64';



const UPCSubmitProduct = ({ navigation, getProductPic }) => {
    const { t } = useTranslation();
    const [capturedImage, setCapturedImage] = useState(null);

    const cancelHandler = () => {
        navigation.goBack();
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
        getProductPic(capturedImage)
    }

    return (
        <View className="h-full flex">
            {capturedImage ? <View className="flex-1 h-screen">
                <View className="flex-row justify-center footer absolute top-0 left-0 z-10 bg-black w-full opacity-70">
                    <Text className="text-white py-5">1.{t('pageText.productPic')}</Text>
                </View>
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

export default UPCSubmitProduct