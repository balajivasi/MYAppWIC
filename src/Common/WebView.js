import React  from 'react'
import { WebView } from 'react-native-webview';


export const WebViewReader = (Data) =>{
    const  HTMLContent=Data.Data;
    return(<WebView source={{html:HTMLContent}} originWhitelist={['*']} className="text-xl" />);
}
