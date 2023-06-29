import { View, Text, Switch, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { ArrowUpTrayIcon, CursorArrowRaysIcon, PhotoIcon, CameraIcon, PencilIcon } from 'react-native-heroicons/outline'
import CustomButton from './CustomButton'
import { useTranslation } from 'react-i18next'

const UploadInfo = ({ continueClick }) => {
    const { t } = useTranslation()
    const [isEnabled, setIsEnabled] = useState(false);
    const continueHandel = () => {
        continueClick()
    }
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const screenHeight = Dimensions.get('window').height;
    const iconSize = screenHeight / 9;
    return (
        <View className="mx-auto h-full flex w-11/12">
            <View className="flex-1">
                <Text className="text-xl text-center pt-4">Follow these 3 Simple Steps to Upload Your Document</Text>
                <View className="border-b border-gray-400 py-4" style={{ alignItems: 'center' }}>
                    <CursorArrowRaysIcon size={iconSize} color={'gray'} />
                    <Text className="text-base">Select Method</Text>
                </View>
                <View className="border-b border-gray-400 py-4 flex-row justify-around">
                    <View className="justify-center" style={{ alignItems: 'center' }}>
                        <CameraIcon size={iconSize} color={'gray'} />
                        <Text className="text-base">Take a Picture</Text>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <PhotoIcon size={iconSize} color={'gray'} />
                        <Text className="text-base">Select a Photo</Text>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <ArrowUpTrayIcon size={iconSize} color={'gray'} />
                        <Text className="text-base">Upload a File</Text>
                    </View>
                </View>
                <View className="py-4" style={{ alignItems: 'center' }}>
                    <PencilIcon size={iconSize} color={'gray'} />
                    <Text className="text-base">Enter Description and Submit</Text>
                </View>

            </View>
            <View className="flex-col justify-center gap-5 ml-0 footer">
                <View className="flex-row justify-around mt-5" style={{ alignItems: 'center' }}>
                    <Text className="text-base">Don't show this page again</Text>
                    <Switch onValueChange={toggleSwitch}
                        value={isEnabled} />
                </View>
                <CustomButton title={t('buttons.continue')} onPress={continueHandel} />
            </View>
        </View>
    )
}

export default UploadInfo