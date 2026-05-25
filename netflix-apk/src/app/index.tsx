import React from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';

export default function Index() {
  return (
    <View style={{ flex: 1 }}>
      <WebView
        source={{ uri: 'https://netflix-clone-beta-ten-24.vercel.app' }}
        style={{ flex: 1 }}
      />
    </View>
  );
}