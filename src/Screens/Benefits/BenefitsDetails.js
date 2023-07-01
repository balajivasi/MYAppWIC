import { View, Text, Image, ScrollView, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';

const BenefitsDetails = ({ route, navigation }) => {
  const { t } = useTranslation()
  const { Benefit } = route.params;
  const [imageHeight, setImageHeight] = useState(0);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: Benefit.FoodShoppingListDescription,
    });
  }, [navigation]);
  var base64content = `data:image/jpg;base64,${Benefit.ContentFileBase}`;
  useEffect(() => {
    Image.getSize(base64content, (width, height) => {
      const screenWidth = Dimensions.get('window').width;
      const scaleFactor = screenWidth / width;
      const imageHeight = height * scaleFactor;
      setImageHeight(imageHeight);
    }, error => {
      console.error('Error loading image size:', error);
    });
  }, [base64content]);
  return (
    <ScrollView className="h-screen">
      <View className="w-11/12 mx-auto">
        <Text className="text-xl">{Benefit.FoodDescription}</Text>
        <Text className="text-base">{t('pageText.issuedQuantity')} {Benefit.IssuedQuantity} {Benefit.FoodPackageSize}</Text>
        <Text className="text-base mb-2">{t('pageText.issuedQuantity')} {Benefit.RemainingQuantity} {Benefit.FoodPackageSize}</Text>
        <View style={{ height: imageHeight, marginBottom: 10 }}>
          <Image source={{ uri: base64content }} style={{ width: '100%', height: '100%', flex: 1, }} resizeMode='contain' />
        </View>

      </View>
    </ScrollView>
  )
}

export default BenefitsDetails