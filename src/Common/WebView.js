import React from 'react'
import { useWindowDimensions } from 'react-native';
//import { WebView } from 'react-native-webview';
import RenderHtml from 'react-native-render-html';

export const WebViewReader = (Data) => {
    const HTMLContent = Data.Data;
    const { width } = useWindowDimensions();
    //return(<WebView source={{html:HTMLContent}} originWhitelist={['*']} className="text-xl" />);
    return (<RenderHtml source={{ html: HTMLContent }} contentWidth={width} className="text-xl" />);
}
