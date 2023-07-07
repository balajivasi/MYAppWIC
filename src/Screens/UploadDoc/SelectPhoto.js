import React, { useEffect, useState } from 'react';
import { View, Image, Dimensions, Text } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import ImgToBase64 from 'react-native-image-base64';
import CustomButton from '../../Common/CustomButton';
import { useTranslation } from 'react-i18next';

const SelectPhoto = ({ cancelClicked, getDocumentPic }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const { t } = useTranslation();
    const selectPhotoFromGallery = () => {
        launchImageLibrary(
            {
                mediaType: 'photo',
            },
            response => {
                if (response.didCancel) {
                    console.log('User cancelled image picker');
                    cancelClicked();
                } else if (response.error) {
                    console.log('Image picker error:', response.error);
                } else if (response.customButton) {
                    console.log('User tapped custom button:', response.customButton);
                } else {
                    handleImageSelect(response.assets[0].uri);
                }
            }
        );
    };
    const { width, height } = Dimensions.get('window');
    const handleImageSelect = async (ImageUrl) => {
        console.log('[handleImageSelect]', ImageUrl)
        try {
            ImgToBase64.getBase64String(ImageUrl)
                .then(base64String => setSelectedImage(base64String)).catch(error => console.log('Error converting image to base64:', error));
        } catch (error) {
            console.log('Error converting image to base64:', error);
        }

    };
    const sendProductPic = () => {
        getDocumentPic(selectedImage)
    }
    useEffect(() => {
        selectPhotoFromGallery()
    }, [])

    const reSelect = () => {
        setSelectedImage(null);
        selectPhotoFromGallery()
    }

    return (
        <View className="h-full flex">
            {selectedImage && <View className="flex-1 h-screen">
                <Image style={{ height, width }} source={{ uri: `data:image/jpeg;base64,${selectedImage}` }} />
                <View className="flex-row justify-center gap-5 footer absolute bottom-10 left-10">
                    <CustomButton title={t('buttons.reSelect')} CSSName="w-2/5" onPress={reSelect} /><Text>&nbsp;&nbsp;&nbsp;</Text>
                    <CustomButton title={t('buttons.continue')} CSSName="w-2/5" onPress={() => sendProductPic()} />
                </View>
            </View>}
        </View>
    );
};

export default SelectPhoto