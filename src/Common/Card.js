import { View, Text, Alert } from 'react-native';
import React from 'react';
import { TrashIcon, UserCircleIcon, PencilSquareIcon, CheckCircleIcon,ShieldCheckIcon } from 'react-native-heroicons/outline';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

const Card = ({data,clickHandler,mkDefHandler,cardRemove,onSelect,verifyCard}) => {
  const { t } =useTranslation();
  const ActiveCard = useSelector(state => state.user.EBTCardNumber || state.auth.user.authData[0]?.EBTCardNumber);
  const ChildClickHandler =()=>{
    clickHandler(data.Card)
  }
  const mkChildDefHandler=()=>{
    mkDefHandler(data.Card)
  }
  const removeChildCard=()=>{
    cardRemove(data.Card)
  }
  const selectCard=()=>{
    onSelect(data.Card)
  }
  const VerifyCard=()=>{
    verifyCard(data.Card)
  }
  return (
    <View className="border-b py-5 border-gray-300">
       <TouchableOpacity onPress={selectCard}>
      <Text className="text-2xl">{data.Card}</Text>
      <View className="flex-row justify-between" >
        <View>
        <Text className="text-lg">{data.nickName.length > 30 ? `${data.nickName.substring(0, 30)}...` : data.nickName}</Text>
          <Text className="text-lg">
            { 
              (data.defaultcard === "1" && data.Verify === "1") ? t('pageText.VerifiedDefaultCard') : (data.Verify === "1") ? t('pageText.Verified') : t('pageText.NotVerified')
            }
          </Text>
        </View>
        <CheckCircleIcon size={40} color={(ActiveCard != data.Card) ? "#e2e2e2" : "#006666" } />
      </View>
      </TouchableOpacity>
      <View className="flex-row pt-3 justify-between">
        <TouchableOpacity onPress={removeChildCard}>
          <View className="flex-row"><TrashIcon title='Remove' size={25}  /><Text className="ml-1 text-lg">{t('buttons.remove')}</Text></View>
        </TouchableOpacity>
        { 
        (data.defaultcard == "0" && data.Verify == "1") ? 
          <TouchableOpacity onPress={mkChildDefHandler}><View className="flex-row"><UserCircleIcon title='make Default' size={25}  /><Text className="ml-1 text-lg">{t('buttons.makeDefault')}</Text></View></TouchableOpacity> 
              : (data.Verify == "0") ? <TouchableOpacity  onPress={VerifyCard}><View className="flex-row"><ShieldCheckIcon size={25} /><Text className="ml-1 text-lg text-red-600">{t('buttons.verify')}</Text></View></TouchableOpacity>  :''
        }
        <TouchableOpacity onPress={ChildClickHandler}>
          <View className="flex-row"><PencilSquareIcon size={25} /><Text className="ml-1 text-lg">{t('buttons.edit')}</Text></View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Card