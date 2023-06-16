import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'

const BenefitsList = ({ benefit, onSelect }) => {
    const selectBenefit = () => {
        onSelect(benefit.Card)
    }
    return (
        <TouchableOpacity className="w-full h-fit" onPress={selectBenefit}>
            <View className="flex-row justify-between mt-1">
                <Image source={require("../../assets/Benefits/benefit_05.png")} style={{ width: 85, height: 70, resizeMode: 'center' }} />
                <Text className="mt-6 w-10 mr-2 font-bold">{benefit.RemainingQuantity} {benefit.FoodPackageSize}</Text>
            </View>
            <Text className="px-2 my-1">{benefit.FoodShoppingListDescription}</Text>
        </TouchableOpacity>
    )
}
export default BenefitsList