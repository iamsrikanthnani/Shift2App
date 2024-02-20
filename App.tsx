import React, {useRef, useEffect, useState} from 'react';
import {View, BackHandler, ToastAndroid, StatusBar} from 'react-native';
import WebView, {WebViewNavigation} from 'react-native-webview';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';

const App: React.FC = () => {
  const insets = useSafeAreaInsets();
  // Ref to WebView component
  const webViewRef = useRef<WebView | null>(null);

  // State to track whether WebView can go back
  const [canGoBack, setCanGoBack] = useState<boolean>(false);

  // State to track back button click count for exit confirmation
  const [backClickCount, setBackClickCount] = useState<number>(0);

  // State to track status bar color
  const statusBarColor = '#20232a';

  useEffect(() => {
    // Function to handle back button press
    const backAction = (): boolean => {
      if (canGoBack) {
        // If WebView can go back, navigate back
        webViewRef.current?.goBack();
        return true;
      } else {
        if (backClickCount === 0) {
          // If backClickCount is 0, show toast and set count to 1
          ToastAndroid.show('Press back again to exit', ToastAndroid.SHORT);
          setBackClickCount(1);
          // Reset count after 2 seconds
          setTimeout(() => setBackClickCount(0), 2000);
          return true;
        } else {
          // If backClickCount is not 0, exit the app
          return false;
        }
      }
    };

    // Add event listener for hardware back press
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    // Remove event listener when component unmounts
    return () => backHandler.remove();
  }, [canGoBack, backClickCount]);

  // Function to handle WebView navigation state change
  const handleNavigationStateChange = (navState: WebViewNavigation): void => {
    // Update canGoBack state based on navigation state
    setCanGoBack(navState.canGoBack);
  };

  return (
    <SafeAreaView
      edges={['right', 'top', 'left']}
      style={{flex: 1, backgroundColor: statusBarColor}}>
      {/* Status bar */}
      <StatusBar backgroundColor={statusBarColor} />

      {/* WebView component */}
      <WebView
        ref={webViewRef}
        source={{uri: 'https://reactnative.dev/'}}
        javaScriptEnabled={true} // Enable JavaScript
        domStorageEnabled={true} // Enable DOM storage
        startInLoadingState={true} // Start with loading indicator
        automaticallyAdjustContentInsets={false} // Do not adjust content insets automatically
        onNavigationStateChange={handleNavigationStateChange} // Handle navigation state change
      />
    </SafeAreaView>
  );
};

export default App;
