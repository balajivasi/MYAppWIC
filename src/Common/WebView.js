import React from 'react'
//import { WebView } from 'react-native-webview';
import RenderHtml from 'react-native-render-html';

export const WebViewReader = (Data) => {
    const HTMLContent = Data.Data;
    //return(<WebView source={{html:HTMLContent}} originWhitelist={['*']} className="text-xl" />);
    return (<RenderHtml source={{ html: HTMLContent }} className="text-xl" />);
}
