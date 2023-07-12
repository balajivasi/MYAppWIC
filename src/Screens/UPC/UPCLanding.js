import { View } from 'react-native'
import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../../slices/loaderSlice';
import { UPCLookupService } from '../../Services/apiService';
import { handleInvalidWICAccount } from '../../Common/handleInvalidWICAccount';
import UPCApproved from '../../Common/UPCApproved';
import UPCNotApproved from '../../Common/UPCNotApproved';
import { CommonActions } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

const UPCLanding = ({ navigation }) => {
    const { t } = useTranslation();
    const Token = useSelector(state => state.user.Token);
    const Barcode = useSelector(state => state.user.ScannedUPC);
    const [UPCDetails, setUPCDetails] = useState();
    const dispatch = useDispatch();
    const checkBarcode = useCallback(async () => {
        if (Barcode) {
            dispatch(setLoading(true));
            try {
                const response = await UPCLookupService(Token, Barcode);
                if (response.Status === 1) {
                    setUPCDetails(response.ServiceResponse[0]);
                } else {
                    try {
                        await handleInvalidWICAccount(response, dispatch);
                    } catch (error) {
                        console.log('handleInvalidWICAccount failed.', error)
                    }
                }
            } catch {
                console.error('Getting UPC Data Failed', error);
            }
            dispatch(setLoading(false));
        }
    }, [Barcode]);
    const submitUPC = () => {
        navigation.navigate('UPCScanInfo')
    }
    const resetUPCScanStack = () => {
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: 'UPCScan' }]
            })
        );
    };

    useEffect(() => {
        checkBarcode()
    }, [Barcode])

    useLayoutEffect(() => {
        if (UPCDetails) {
            navigation.setOptions({
                title: t('pageText.WICApproved'),
            });
        } else {
            navigation.setOptions({
                title: t('pageText.NotWICApproved'),
            });
        }

    }, [UPCDetails]);

    return (
        <View>
            {Barcode ? UPCDetails ? <UPCApproved UPCData={UPCDetails} UPCCode={Barcode} cancelClicked={resetUPCScanStack} /> : <UPCNotApproved UPCCode={Barcode} submitUPC={submitUPC} cancelClicked={resetUPCScanStack} /> : null}
        </View>
    )
}

export default UPCLanding