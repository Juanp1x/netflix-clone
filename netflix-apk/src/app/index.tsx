import React from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';

export default function Index() {
  return (
    <View style={{ flex: 1 }}>
      <WebView
        source={{ uri: 'https://netflix-clone-omega-green-24.vercel.app' }}
        style={{ flex: 1 }}
      />
    </View>
  );
}