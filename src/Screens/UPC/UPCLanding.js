import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../../slices/loaderSlice';
import { UPCLookupService } from '../../Services/apiService';
import { handleInvalidWICAccount } from '../../Common/handleInvalidWICAccount';
import UPCApproved from '../../Common/UPCApproved';
import UPCNotApproved from '../../Common/UPCNotApproved';

const UPCLanding = ({ route }) => {
    //const { Barcode, PageTitle } = route.params;
    const [Barcode, setBarcode] = useState('');
    const Token = useSelector(state => state.user.Token);
    const [UPCDetails, setUPCDetails] = useState("");
    const dispatch = useDispatch();

    const checkBarcode = async () => {
        //dispatch(setLoading(true));

        try {

            const response = await UPCLookupService(Token, Barcode);
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
        dispatch(setLoading(false));
    }

    useEffect(() => {
        setBarcode('75370150043');
        checkBarcode()
    }, [Barcode])
    return (
        <View>
            {UPCDetails ? <UPCApproved UPCData={UPCDetails} UPCCode={Barcode} /> : <UPCNotApproved UPCCode={Barcode} />}
        </View>
    )
}

export default UPCLanding