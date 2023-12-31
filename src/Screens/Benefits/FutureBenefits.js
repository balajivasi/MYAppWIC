import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, ScrollView, RefreshControl } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { FutureBenefitsListService, FutureBenefitsService } from '../../Services/apiService';
import BenefitsList from '../../Common/BenefitsList';
import FutureBenefitsTab from '../../Common/FutureBenefitsTab';
import { handleInvalidWICAccount } from '../../Common/handleInvalidWICAccount'
import { setLoading } from '../../slices/loaderSlice';
import { ExclamationTriangleIcon } from 'react-native-heroicons/outline';
import { useTranslation } from 'react-i18next';
const FutureBenefits = ({ navigation }) => {
  const Token = useSelector(state => state.user.Token);
  const [futureBenList, setFutureBenList] = useState([]);
  const [futureBenStart, setFutureBenStart] = useState();
  const [futureBenEnd, setFutureBenEnd] = useState();
  const [benefits, setBenefits] = useState([]);
  const [serverError, setServerError] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [selectedTab, setSelectedTab] = useState();
  const ActiveCardNumber = useSelector(state => state.user.EBTCardNumber);
  const dispatch = useDispatch();
  const { t } = useTranslation()

  const loadFutureListBenefits = async () => {
    dispatch(setLoading(true));
    try {
      const response = await FutureBenefitsListService(Token);
      if (response.Status === 1) {
        setFutureBenList([]);
        setBenefits([]);
        response.ServiceResponse.length !== 0 ? setFutureBenList(response.ServiceResponse) : setFutureBenList([]);
        if (response.ServiceResponse.length > 0) {
          const IssueMonth = response.ServiceResponse[0].IssueMonth;
          const IssueYear = response.ServiceResponse[0].IssueYear;
          loadBenefits(IssueMonth, IssueYear);
        }
        setRefreshing(false)
        dispatch(setLoading(false));
      } else {
        setServerError(response.ServiceResponse[0].Message);
        try {
          await handleInvalidWICAccount(response, dispatch);
        } catch (error) {
          console.log('handleInvalidWICAccount failed.', error);
        }
        setRefreshing(false)
        dispatch(setLoading(false));
      }
    } catch (error) {
      console.log('Fail to load current Benefits', error);
      setRefreshing(false)
      dispatch(setLoading(false));
    }

  };

  const loadBenefits = async (IssueMonth, IssueYear) => {
    if (IssueMonth && IssueYear) {
      setSelectedTab(IssueMonth);
      IssueMonth = IssueMonth.toString().padStart(2, '0');
      const benefitsResponse = await FutureBenefitsService(Token, IssueMonth, IssueYear);
      if (benefitsResponse.Status === 1) {
        benefitsResponse.ServiceResponse.length > 0 ? setBenefits(benefitsResponse.ServiceResponse) : setBenefits([]);
        setFutureBenStart(benefitsResponse?.ServiceResponse[0].BenefitStartDate);
        setFutureBenEnd(benefitsResponse?.ServiceResponse[0].BenefitEndDate)
      }
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadFutureListBenefits();
  }, []);

  useEffect(() => {
    loadFutureListBenefits();
  }, [ActiveCardNumber]);

  const handleSelectCard = (benefit) => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 2).toString().padStart(2, '0');
    const EffDateCode = `${year}${month}`;

    navigation.push('BenefitsDetails', { Benefit: benefit, EffDateCode: EffDateCode });
  };

  const onSelectTab = (tab) => {
    setSelectedTab(tab);
    const selectedMonth = futureBenList.find(data => data.IssueMonth === tab);
    if (selectedMonth) {
      const IssueMonth = selectedMonth.IssueMonth;
      const IssueYear = selectedMonth.IssueYear;
      loadBenefits(IssueMonth, IssueYear);
    }
  };

  return (
    <View className="mx-auto mt-2">
      <FutureBenefitsTab futureBenList={futureBenList} StartDate={futureBenStart} EndDate={futureBenEnd} selectedTab={selectedTab} onSelectTab={onSelectTab} />
      {/* {benefits[0] && (
        <Text className="text-center text-sm mb-3">
          {benefits[0]?.BenefitStartDate} - {benefits[0]?.BenefitEndDate}
        </Text>
      )} */}
      <ScrollView className="mb-14" refreshControl={<RefreshControl
        refreshing={refreshing}
        onRefresh={onRefresh}
      />}>
        <View className="w-screen flex-row flex-wrap gap-2 items-stretch">
          {benefits.length <= 0 ? <View className="w-screen pb-96 pt-16" style={{ alignItems: "center" }}>
            <ExclamationTriangleIcon size={150} color={'gray'} />
            <Text className="text-center text-gray-500">{t('pageText.noBenefits')}</Text>
          </View> : null}
          {benefits?.map((benefit, index) => {
            return (
              <View key={index} className="border border-gray-500 bg-slate-300 rounded-lg" style={{ width: '31%' }}>
                <BenefitsList benefit={benefit} onSelect={() => handleSelectCard(benefit)} />
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default FutureBenefits;
