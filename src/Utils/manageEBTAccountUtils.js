import { Alert } from 'react-native';
import { SelectAccountService, ManageAccountService } from '../Services/apiService';
import { setEBTCardNumber, setProfileFullName } from '../slices/profileSlice';
import { setLoading } from '../slices/loaderSlice';
export const onSelectCard = async (user, EBTCard, setServerError, dispatch, callback) => {
    try {
        Alert.alert(
            'Confirmation',
            'Are you sure you want to select this EBT Card?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                    onPress: () => {
                        // Handle cancel button click here
                        dispatch(setLoading(false));
                    },
                },
                {
                    text: 'OK',
                    onPress: async () => {
                        try {
                            const response = await SelectAccountService(user.Token, EBTCard);
                            if (response.Status === 1) {
                                dispatch(setProfileFullName(`${response.ServiceResponse[0].FirstName} ${response.ServiceResponse[0].LastName}`));
                                dispatch(setEBTCardNumber(response.ServiceResponse[0].EBTCardNumber));
                            } else {
                                setServerError(response.ServiceResponse[0].Message);
                            }
                            callback(response);
                        } catch (error) {
                            console.error('Select EBT Card Failed', error);
                        }
                    },
                },
            ],
            { cancelable: false }
        );
    } catch (error) {
        console.error('Alert Error', error);
    }
};

export const makeDefault = async (EBTCard, token, remove, addDefault) => {
    try {
        const response = await ManageAccountService(EBTCard, token, remove, addDefault);
        if (response.Status === 1) {
            console.log('[make Default]', response)
        } else {
            setServerError(response.ServiceResponse[0].Message);
        }
    } catch (error) {
        console.error('Select EBT Card Failed', error);
    }
};

export const removeCard = async (EBTCard, token, remove, addDefault) => {
    try {
        Alert.alert(
            'Confirmation',
            'Are you sure you want to Remove this EBT Card?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'OK',
                    onPress: async () => {
                        try {
                            const response = await ManageAccountService(EBTCard, token, remove, addDefault);
                            if (response.Status === 1) {
                                console.log('removed the card');
                            } else {
                                setServerError(response.ServiceResponse[0].Message);
                            }
                        } catch (error) {
                            console.error('Remove EBT Card Failed', error);
                        }
                    },
                },
            ],
            { cancelable: false }
        );
    } catch (error) {
        console.error('Alert Error', error);
    }

};

