import { View, Text, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'
import { ArrowUpTrayIcon, CameraIcon, InformationCircleIcon, PhotoIcon } from 'react-native-heroicons/outline'
import { useTranslation } from 'react-i18next'

const UploadSelectMethod = ({ selectedMethod }) => {
    const { t } = useTranslation();
    const UploadMethod = (method) => {
        selectedMethod(method)
    }
    const screenHeight = Dimensions.get('window').height;
    const iconSize = screenHeight / 8;
    return (
        <View className="mx-auto h-full flex w-11/12">
            <View className="flex-1">
                <Text className="text-xl text-center pt-4">{t('pageText.uploadStep1')}</Text>
                <View className="flex-col">
                    <TouchableOpacity onPress={() => UploadMethod('camera')}>
                        <View className="justify-center" style={{ alignItems: 'center' }}>
                            <CameraIcon size={iconSize} color={'gray'} />
                            <Text className="text-base">{t('pageText.takePicture')}</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={{ alignItems: 'center' }} className="my-5">
                        <View className="w-16 h-16 rounded-full justify-center bg-rose-600">
                            <Text className="text-xl text-center text-white">{t('buttons.or')}</Text>
                        </View>
                    </View>
                    <TouchableOpacity onPress={() => UploadMethod('photo')}>
                        <View style={{ alignItems: 'center' }}>
                            <PhotoIcon size={iconSize} color={'gray'} />
                            <Text className="text-base">{t('pageText.selectPhoto')}</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={{ alignItems: 'center' }} className="my-5">
                        <View className="w-16 h-16 rounded-full justify-center bg-rose-600">
                            <Text className="text-xl text-center text-white">{t('buttons.or')}</Text>
                        </View>
                    </View>
                    <TouchableOpacity onPress={() => UploadMethod('file')}>
                        <View style={{ alignItems: 'center' }}>
                            <ArrowUpTrayIcon size={iconSize} color={'gray'} />
                            <Text className="text-base">{t('pageText.uploadFile')}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <View className="flex-row justify-end mb-5 mr-5 footer">
                <TouchableOpacity onPress={() => UploadMethod('Info')}>
                    <InformationCircleIcon size={40} color={'gray'} />
                </TouchableOpacity>
            </View>
        </View >
    )
}

export default UploadSelectMethod