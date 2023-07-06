import * as Util from './apiUtils';
import { GoogleApiKey } from '../../env';


const makeApiRequest = (url, options) => {
  return Util.ApiService.post(url, options)
    .then(response => {
      return response.data
    })
    .catch(error => {
      if (error.response) {
        console.log('API error response:', error.response.data);
      } else if (error.request) {
        console.log('No API response received:', error.request);
      } else {
        console.log('Error occurred:', error.message);
      }
      throw error;
    });
};

// Registration Page Service
export const RegisterService = (email, password, wicEbtNumber, birthDate, zipCode, nickName) => {
  const options = Util.RegisterOptions(email, password, wicEbtNumber, birthDate, zipCode, nickName);
  return makeApiRequest('/Signup', options);
};

// Resend OTP Service
export const ResendOTP = (email) => {
  console.log('[ResendOTP]', email)
  const options = Util.ResentOTPOptions(email);
  console.log('[ResendOTP]', options)
  return makeApiRequest('/ResendOTP', options);
};

// Validate OTP Service
export const ValidateOTP = (email, confirmCode) => {
  const options = Util.ValidateOTPOptions(email, confirmCode);
  return makeApiRequest('/ValidateOTP', options);
};

// Notification Service
export const NotificationService = (token, language) => {
  const options = Util.NotificationOptions(token, language);
  return makeApiRequest('/getBroadcastMsgs', options);
};

// Manage EBT Accounts Service
export const ManageEBTAccountService = (token) => {
  const options = Util.ManageEBTOptions(token);
  return makeApiRequest('/AllAccounts', options);
};

// Select Account Service
export const SelectAccountService = (token, EBTCard) => {
  const options = Util.SelectCardOptions(token, EBTCard);
  return makeApiRequest('/SelectAccount', options);
};

// Profile Service
export const ProfileService = (token, EBTCard) => {
  const options = Util.ProfileOptions(token, EBTCard);
  return makeApiRequest('/GetBasicFamilyInfo', options);
};

// Manage Account Service
export const ManageAccountService = (EBTCard, token, remove, addDefault) => {
  const options = Util.ManageAccount(EBTCard, token, remove, addDefault);
  return makeApiRequest('/ManageAccount', options);
};

// Add Account Service
export const AddAccountService = (wicEbtNumber, birthDate, zipCode, nickName, Token) => {
  const options = Util.AddAccount(wicEbtNumber, birthDate, zipCode, nickName, Token);
  return makeApiRequest('/AddAccount', options);
};

// Update Nickname Service
export const UpdateNickNameService = (Token, EBTCard, nickName) => {
  const options = Util.NicknameOptions(Token, EBTCard, nickName);
  return makeApiRequest('/UpdateNickName', options);
};

// Verify Account Service
export const VerifyAccountService = (OldEBTCard, wicEbtNumber, birthDate, zipCode, Token) => {
  const options = Util.VerifyAccount(OldEBTCard, wicEbtNumber, birthDate, zipCode, Token);
  return makeApiRequest('/VerifyAccount', options);
};

// Appointments Service
export const AppointmentsService = (Token) => {
  const options = Util.Appointments(Token);
  return makeApiRequest('/GetNextAppointment', options);
};

// Signatures Service
export const SignaturesService = (Token, language) => {
  const options = Util.Signatures(Token, language);
  return makeApiRequest('/GetSignaturesList', options);
};
// Signatures Doc  Service
export const SignaturesDocService = (Token, SignDocID, CLDDocID, language, Completed) => {
  const options = Util.SignaturesDoc(Token, SignDocID, CLDDocID, language, Completed);
  return makeApiRequest('/GetSignatureDoc', options);
};

// Mobile Signature Service
export const MobileSignatureService = (Token, SignDocID, SigneeID, language, signatureData) => {
  const options = Util.MobSignOption(Token, SignDocID, SigneeID, language, signatureData);
  return makeApiRequest('/MobileSignature', options);
};

// Mobile Signature Service
export const ChangePasswordService = (Token, OldPassword, NewPassword) => {
  const options = Util.ChangPassOption(Token, OldPassword, NewPassword);
  return makeApiRequest('/ChangePassword', options);
};
// Mobile Signature Service
export const FeedbackService = (Token, FeedBackType, FeedBackText) => {
  const options = Util.FeedbackOption(Token, FeedBackType, FeedBackText);
  return makeApiRequest('/UpdateFeedback', options);
};

// Clinic Service
export const ClinicService = (lat, lng, Distance = 5, Token = "", signal) => {
  const options = Util.ClinicOption(Token, lat, lng, Distance, signal);
  return makeApiRequest('/GetNearbyClinics', options);
};
// Stores Service
export const StoresService = (lat, lng, Distance = 5, Token = "", signal) => {
  const options = Util.ClinicOption(Token, lat, lng, Distance, signal);
  return makeApiRequest('/GetNearbyAuthorizedStores', options);
};
// Current Benefits Service
export const CurrentBenefitsService = (Token, EffDateCode) => {
  const options = Util.CurrentBenefitsOption(Token, EffDateCode);
  return makeApiRequest('/GetCurrentBenefits', options);
};
//Future Benefits List Service
export const FutureBenefitsListService = (Token) => {
  const options = Util.FutureBenefitsListOption(Token);
  return makeApiRequest('/GetFutureBenefitList', options);
};
// Future Benefits Service
export const FutureBenefitsService = (Token, IssueMonth, IssueYear) => {
  const options = Util.FutureBenefitsOption(Token, IssueMonth, IssueYear);
  return makeApiRequest('/GetFutureBenefits', options);
};

// Future Benefits Service
export const UPCLookupService = (Token, UPCCode) => {
  const options = Util.UPCLookupOption(Token, UPCCode);
  return makeApiRequest('/UPCLookup', options);
};
// Future Benefits Service
export const UPCSubmitService = (Token, UPCCode, UPCDescription, UPCPackageSize, UPCEmail, UPCPhoneNumber, UPCFrontImage, UPCNutritionLabel) => {
  const options = Util.UPCSubmitOption(Token, UPCCode, UPCDescription, UPCPackageSize, UPCEmail, UPCPhoneNumber, UPCFrontImage, UPCNutritionLabel);
  return makeApiRequest('/UPCSubmit', options);
};

export const UploadDocService = (Token, FileType = 'png', Notes, FileDoc) => {
  const options = Util.UploadDocOption(Token, FileType, Notes, FileDoc);
  return makeApiRequest('/UploadClientDoc', options);
};

// Current Benefits Service
export const ContentImageService = (EffDateCode, Category, SubCategory, Language) => {
  const options = Util.ContentImageOption(EffDateCode, Category, SubCategory, Language);
  return makeApiRequest('/GetBenefitsBaseContentFile', options);
};

export const fetchCoordinates = async (address) => {
  const API_KEY = GoogleApiKey; // Replace with your Google Geocoding API key
  const encodedAddress = encodeURIComponent(address);
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${API_KEY}`;
  try {
    const response = await Util.ApiService.get(url);
    if (response.data.results.length > 0) {
      const { lat, lng } = response.data.results[0].geometry.location;
      return { lat, lng }
    } else {
      console.log('No results found for the address');
    }
  } catch (error) {
    console.error('Error fetching coordinates:', error);
  }
};



