import { View, Text, Image, ScrollView, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ContentImageService } from '../../Services/apiService';
import { useSelector } from 'react-redux';

const BenefitsDetails = ({ route, navigation }) => {
  const { t } = useTranslation();
  const user = useSelector(state => state.user);
  const { Benefit, EffDateCode } = route.params;
  const [imageHeight, setImageHeight] = useState(0);
  const [contentImage, setContentImage] = useState('');
  useLayoutEffect(() => {
    navigation.setOptions({
      title: Benefit.FoodShoppingListDescription,
    });
  }, [navigation]);

  // let base64content = '';
  // if (contentImage) {
  //   base64content = `data:image/jpg;base64,${contentImage}`;
  // }
  const LoadDetails = async () => {
    try {
      const response = await ContentImageService(EffDateCode, Benefit.CategoryCode, Benefit.SubCategoryCode, user.language);
      if (response.Status === 1) {
        response.ServiceResponse.length != 0 ? setContentImage(`data:image/jpg;base64,${response.ServiceResponse[0].content_file}`) : setContentImage('');
      } else {
        setContentImage('');
      }
    } catch (error) {
      console.log('Fail to load current Benefits', error);
    }
  }

  useEffect(() => {
    LoadDetails()
    if (contentImage != '') {
      Image.getSize(contentImage, (width, height) => {
        const screenWidth = Dimensions.get('window').width;
        const scaleFactor = screenWidth / width;
        const imageHeight = height * scaleFactor;
        setImageHeight(imageHeight);
      }, error => {
        console.error('Error loading image size:', error);
      });
    }
  }, [contentImage]);
  return (
    <ScrollView className="h-screen">
      <View className="w-11/12 mx-auto">
        <Text className="text-xl">{Benefit.FoodDescription}</Text>
        <Text className="text-base">{t('pageText.issuedQuantity')} {Benefit.IssuedQuantity} {Benefit.FoodPackageSize}</Text>
        <Text className="text-base mb-2">{t('pageText.issuedQuantity')} {Benefit.RemainingQuantity} {Benefit.FoodPackageSize}</Text>
        <View style={{ height: imageHeight, marginBottom: 10 }}>
          {contentImage ? <Image source={{ uri: contentImage }} style={{ width: '100%', height: '100%', flex: 1, }} resizeMode='contain' /> : null}
        </View>

      </View>
    </ScrollView>
  )
}

export default BenefitsDetails