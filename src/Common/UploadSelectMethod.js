import { View, Text, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'
import { ArrowUpTrayIcon, CameraIcon, InformationCircleIcon, PhotoIcon } from 'react-native-heroicons/outline'

const UploadSelectMethod = ({ selectedMethod }) => {
    const UploadMethod = (method) => {
        selectedMethod(method)
    }
    const screenHeight = Dimensions.get('window').height;
    const iconSize = screenHeight / 8;
    return (
        <View className="mx-auto h-full flex w-11/12">
            <View className="flex-1">
                <Text className="text-xl text-center pt-4">Step 1: Select Upload Method</Text>
                <View className="flex-col">
                    <TouchableOpacity onPress={() => UploadMethod('camera')}>
                        <View className="justify-center" style={{ alignItems: 'center' }}>
                            <CameraIcon size={iconSize} color={'gray'} />
                            <Text className="text-base">Take a Picture</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={{ alignItems: 'center' }} className="my-5">
                        <View className="w-16 h-16 rounded-full justify-center bg-rose-600">
                            <Text className="text-xl text-center text-white">OR</Text>
                        </View>
                    </View>
                    <TouchableOpacity onPress={() => UploadMethod('photo')}>
                        <View style={{ alignItems: 'center' }}>
                            <PhotoIcon size={iconSize} color={'gray'} />
                            <Text className="text-base">Select a Photo</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={{ alignItems: 'center' }} className="my-5">
                        <View className="w-16 h-16 rounded-full justify-center bg-rose-600">
                            <Text className="text-xl text-center text-white">OR</Text>
                        </View>
                    </View>
                    <TouchableOpacity onPress={() => UploadMethod('file')}>
                        <View style={{ alignItems: 'center' }}>
                            <ArrowUpTrayIcon size={iconSize} color={'gray'} />
                            <Text className="text-base">Upload a File</Text>
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