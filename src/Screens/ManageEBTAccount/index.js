import { View, ScrollView, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import Card from '../../Common/Card';
import ActiveCard from '../../Common/ActiveCard';
import { ManageEBTAccountService } from '../../Services/apiService';
import { onSelectCard, makeDefault, removeCard } from '../../Utils/manageEBTAccountUtils';
import CustomButton from '../../Common/CustomButton';
import { setLoading } from '../../slices/loaderSlice'
import ErrorText from '../../Common/ErrorText';
import { handleInvalidWICAccount } from '../../Common/handleInvalidWICAccount';

export default function ManageEBTAccount({ navigation }) {
  const { t } = useTranslation()
  const user = useSelector(state => state.user);
  const [Accounts, setAccounts] = useState([]);
  const [serverError, setServerError] = useState('');
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);


  const getEBTCards = async () => {
    dispatch(setLoading(true));
    try {
      const response = await ManageEBTAccountService(user.Token);
      if (response.Status === 1) {
        setAccounts(response.ServiceResponse);
      } else {
        setServerError(response.ServiceResponse[0].Message);
        try {
          await handleInvalidWICAccount(response, dispatch);
        } catch (error) {
          console.log('handleInvalidWICAccount failed.', error)
        }
      }
    } catch {
      console.error('Getting All EBT Cards Failed', error);
    }
    dispatch(setLoading(false));
  };

  const handleRemoveCard = async (card) => {
    if (card.defaultcard == "1") {
      Alert.alert("You can't remove default card.")
      return false;
    }
    if (user.EBTCardNumber == card.Card) {
      Alert.alert("Active Card can't be removeCard.");
      return false;
    }
    try {
      dispatch(setLoading(true));
      await removeCard(card.Card, user.Token, 1, 0);
      await getEBTCards();
      dispatch(setLoading(false));
    } catch (error) {
      console.error('Remove Card Failed', error);
    }
  };

  const handleSelectCard = (card) => {
    if (card.Verify == 0) {
      Alert.alert("Please Verify card to select.")
      return false;
    }
    if (user.EBTCardNumber == card.Card) {
      Alert.alert('This card already active card.');
      return false;
    }
    dispatch(setLoading(true));
    onSelectCard(user, card.Card, setServerError, dispatch, (response) => {
      // Handle the response here
      if (response.Status === 1) {
        navigation.navigate('Home');
        dispatch(setLoading(false));
      }
    });

  }

  const handleMakeDefault = async (EBTCard) => {
    try {
      await makeDefault(EBTCard, user.Token, 0, 1);
      await getEBTCards();
    } catch (error) {
      console.error('Make Default Failed', error);
    }
  };
  const editNickname = (cardNum) => {
    setIsModalVisible(true);
    navigation.push('EditNickName', { Card: cardNum });
  };

  const VerifyCard = (cardNum) => {
    setIsModalVisible(true);
    navigation.push('AddCard', { Card: cardNum, PageTitle: "Verify Card", isVerify: true });
  };
  const clickedAddCard = () => {
    setIsModalVisible(true);
    navigation.push('AddCard', { PageTitle: "Add Card", isVerify: false });
  };

  /*
  const closeModal = () => {
    setIsModalVisible(false); 
  };*/
  /*
    useEffect(() => {
      getEBTCards();
    }, [isModalVisible]);
  */

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getEBTCards();
    });
    return unsubscribe;
  }, [navigation]);



  return (
    <View className="min-h-full">
      <CustomButton title={t('buttons.addCard')} CSSName="w-4/5 mx-auto" onPress={() => clickedAddCard()} />
      {serverError ? <ErrorText message={serverError} /> : null}
      <ScrollView className="flex-1">
        <View className=" w-11/12 mx-auto">
          {Accounts.map((card, index) => {
            return (
              <Card
                data={card}
                key={index}
                clickHandler={editNickname}
                mkDefHandler={(EBTCard) => handleMakeDefault(EBTCard)}
                cardRemove={() => handleRemoveCard(card)}
                onSelect={() => handleSelectCard(card)}
                verifyCard={VerifyCard}
              />
            );
          })}
        </View>
      </ScrollView>
      <ActiveCard />
    </View>
  );
}
