import {SafeAreaProvider} from 'react-native-safe-area-context';
import App from './App';

const Root = () => {
  return (
    <SafeAreaProvider>
      <App />
    </SafeAreaProvider>
  );
};

export default Root;
