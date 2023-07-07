import React, { useEffect, useState } from 'react';
import { View, Text, Image, Dimensions } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import CustomButton from '../../Common/CustomButton';

const UploadFIle = ({ cancelClicked, getDocumentPic }) => {
    const [selectedFile, setSelectedFile] = useState(null);

    const selectFileFromCloud = async () => {
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles],
            });

            console.log('[selectFileFromCloud]', res)
            setSelectedFile(res);
        } catch (error) {
            if (DocumentPicker.isCancel(error)) {
                console.log('User cancelled file picker');
                cancelClicked();
            } else {
                console.log('File picker error:', error);
            }
        }
    };
    const handleFileSelect = async (ImageUrl) => {
        console.log('[handleFileSelect]', ImageUrl)
        try {
            ImgToBase64.getBase64String(ImageUrl)
                .then(base64String => setSelectedFile(base64String)).catch(error => console.log('Error converting image to base64:', error));
        } catch (error) {
            console.log('Error converting image to base64:', error);
        }

    };
    const { width, height } = Dimensions.get('window');
    useEffect(() => {
        selectFileFromCloud()
    }, [])

    const reSelect = () => {
        setSelectedFile(null);
        selectFileFromCloud()
    }

    return (
        <View className="h-full flex">
            {selectedFile && <View className="flex-1 h-screen">
                <Image style={{ height, width }} source={{ uri: `data:image/jpeg;base64,${selectedFile}` }} />
                <View className="flex-row justify-center gap-5 footer absolute bottom-10 left-10">
                    <CustomButton title={t('buttons.reSelect')} CSSName="w-2/5" onPress={reSelect} /><Text>&nbsp;&nbsp;&nbsp;</Text>
                    <CustomButton title={t('buttons.continue')} CSSName="w-2/5" onPress={() => sendProductPic()} />
                </View>
            </View>}
        </View>
    );
};

export default UploadFIle