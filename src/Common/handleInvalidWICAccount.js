import { Alert } from 'react-native';
import { logoutUser } from '../Services/authActions';

export const handleInvalidWICAccount = (response,dispatch) => {
  const status = response?.Status;
  const message = response.ServiceResponse[0]?.Message;
  if (status === 0 && message === '1003') {
    Alert.alert(
      'Invalid WIC Account',
      'Invalid WIC account information.',
      [
        {
          text: 'OK',
          onPress: () => {
            console.log('[handleInvalidWICAccount] Dispatching logoutUser');
            dispatch(logoutUser()); // Trigger dispatch action
          },
        },
      ]
    );
  }
};
