import axios from 'axios';
import getEnvVars from '../../config';
const envVars = getEnvVars();
const apiUrl = envVars.API_URL;
const APIToken = envVars.APIToken;
const APPVersion = "3.0";

export const NotificationOptions = (token, language) => {
    return {
        APIToken: APIToken,
        Version: APPVersion,
        Token: token,
        Language: language,
    };
}

export const ResentOTPOptions = (email) => {
    return {
        "LoginType": "1",
        "LoginEmail": email,
        "APIToken": APIToken,
        "Version": "3.0"
    }
}
export const RegisterOptions = (email, password, wicEbtNumber, birthDate, zipCode, nickName) => {
    return {
        "LoginType": "1",
        "LoginTypeId": email,
        "LoginEmail": email,
        "LoginPassword": password,
        "EBTCard": wicEbtNumber,
        "BirthDate": birthDate,
        "ZipCode": zipCode,
        "NickName": nickName,
        "APIToken": APIToken,
        "Version": APPVersion,
    }
}

export const ValidateOTPOptions = (email, confirmCode) => {
    return {
        "LoginEmail": email,
        "OtpCode": confirmCode,
        "APIToken": APIToken,
        "Version": APPVersion
    }
}


export const ManageEBTOptions = (token) => {
    return {
        "Token": token,
        "APIToken": APIToken
    }
}
export const SelectCardOptions = (token, EBTCard) => {
    return {
        "Token": token,
        "APIToken": APIToken,
        "EBTCard": EBTCard
    }
}
export const ProfileOptions = (token) => {
    return {
        "Token": token,
        "APIToken": APIToken
    }
}
export const ManageAccount = (EBTCard, token, remove, addDefault) => {
    return {
        "EBTCard": EBTCard,
        "APIToken": APIToken,
        "Token": token,
        "Remove": remove,
        "AddDefault": addDefault
    }
}

export const AddAccount = (wicEbtNumber, birthDate, zipCode, nickName, Token) => {
    return {
        "EBTCard": wicEbtNumber,
        "ZipCode": zipCode,
        "BirthDate": birthDate,
        "NickName": nickName,
        "APIToken": APIToken,
        "Token": Token
    }
}
export const NicknameOptions = (Token, EBTCard, nickName) => {
    return {
        "APIToken": APIToken,
        "EBTCard": EBTCard,
        "NickName": nickName,
        "Token": Token
    }
}
export const VerifyAccount = (OldEBTCard, wicEbtNumber, birthDate, zipCode, Token) => {
    return {
        "OldEBTCard": OldEBTCard,
        "EBTCard": wicEbtNumber,
        "ZipCode": zipCode,
        "BirthDate": birthDate,
        "APIToken": APIToken,
        "Token": Token
    }
}
export const Appointments = (Token) => {
    return {
        "APIToken": APIToken,
        "Token": Token
    }
}
export const Signatures = (Token, language) => {
    return {
        "APIToken": APIToken,
        "Token": Token,
        "Language": language
    }
}
export const SignaturesDoc = (Token, SignDocID, CLDDocID, language, Completed = 0) => {
    return {
        "APIToken": APIToken,
        "Token": Token,
        "SignDocID": SignDocID,
        "CLDDocID": CLDDocID,
        "Language": language,
        "Completed": Completed
    }
}

export const MobSignOption = (Token, SignDocID, SigneeID, language, signatureData) => {
    return {
        "FileType": "jpg",
        "APIToken": APIToken,
        "Token": Token,
        "SignDocID": SignDocID,
        "SigneeID": SigneeID,
        "Language": language,
        "SignDoc": signatureData
    }
}
export const ChangPassOption = (Token, OldPassword, NewPassword) => {
    return {
        "Token": Token,
        "OldPassword": OldPassword,
        "NewPassword": NewPassword,
        "APIToken": APIToken
    }
}
export const FeedbackOption = (Token, FeedBackType, FeedBackText) => {
    return {
        "Token": Token,
        "APIToken": APIToken,
        "FeedBackType": FeedBackType,
        "FeedBackText": FeedBackText
    }
}
export const ClinicOption = (Token, Lat, Lng, Distance, signal) => {
    return {
        "Token": Token,
        "Lat": Lat,
        "Lng": Lng,
        "Distance": Distance,
        "APIToken": APIToken,
        "signal": signal
    }
}

export const CurrentBenefitsOption = (Token, EffDateCode) => {
    return {
        "Token": Token,
        "APIToken": APIToken,
        "EffDateCode": EffDateCode,
        "Language": 'en'
    }
}
export const FutureBenefitsListOption = (Token) => {
    return {
        "Token": Token,
        "APIToken": APIToken
    }
}

export const FutureBenefitsOption = (Token, IssueMonth, IssueYear) => {
    return {
        "Token": Token,
        "IssueMonth": IssueMonth,
        "IssueYear": IssueYear,
        "APIToken": APIToken
    }
}
export const UPCLookupOption = (Token, UPCCode) => {
    return {
        "Token": Token,
        "UPC": UPCCode,
        "APIToken": APIToken
    }
}
export const UPCSubmitOption = (Token, UPCCode, UPCDescription, UPCPackageSize, UPCEmail, UPCPhoneNumber, UPCFrontImage, UPCNutritionLabel) => {
    return {
        "Token": Token,
        "UPCCode": UPCCode,
        "UPCDescription": UPCDescription,
        "UPCFrontImage": UPCFrontImage,
        "APIToken": APIToken,
        "UPCPackageSize": UPCPackageSize,
        "UPCEmail": UPCEmail,
        "UPCPhoneNumber": UPCPhoneNumber,
        "UPCNutritionLabel": UPCNutritionLabel
    }
}
export const UploadDocOption = (Token, FileType, Notes, FileDoc) => {
    return {
        "Token": Token,
        "FileType": FileType,
        "Notes": Notes,
        "APIToken": APIToken,
        "FileDoc": FileDoc
    }
}





export const ApiService = axios.create({
    baseURL: apiUrl,
    timeout: 10000, // Adjust the timeout as per your needs
});

