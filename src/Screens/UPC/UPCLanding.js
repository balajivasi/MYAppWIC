import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../../slices/loaderSlice';
import { UPCLookupService } from '../../Services/apiService';
import { handleInvalidWICAccount } from '../../Common/handleInvalidWICAccount';
import UPCApproved from '../../Common/UPCApproved';
import UPCNotApproved from '../../Common/UPCNotApproved';

const UPCLanding = () => {
    const Token = useSelector(state => state.user.Token);
    const Barcode = useSelector(state => state.user.ScannedUPC);
    const [UPCDetails, setUPCDetails] = useState();
    const dispatch = useDispatch();
    console.log('[UPCLanding]', Barcode)
    const checkBarcode = async () => {
        //dispatch(setLoading(true));
        if (Barcode) {
            try {
                const response = await UPCLookupService(Token, Barcode);
                console.log('[checkBarcode--response--]', response)
                if (response.Status === 1) {
                    console.log('[checkBarcode]', response.ServiceResponse)
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
        }

        dispatch(setLoading(false));
    }

    useEffect(() => {
        console.log('[useEffect]', Barcode)
        checkBarcode()
    }, [Barcode])
    return (
        <View>
            {Barcode ? UPCDetails ? <UPCApproved UPCData={UPCDetails} UPCCode={Barcode} /> : <UPCNotApproved UPCCode={Barcode} /> : null}
        </View>
    )
}

export default UPCLanding