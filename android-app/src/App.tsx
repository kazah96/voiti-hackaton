import React, {useState, useRef} from 'react';
import {View, StyleSheet, Button, TouchableOpacity, Text} from 'react-native';
import TagReader from './TagReader';
import TagSimulator from './TagSimulator';
import NfcManager from 'react-native-nfc-manager';
import Toast from 'react-native-toast-message';

import LottieView from 'lottie-react-native';
import AddKey from './pages/AddKey';
import {RootStore} from './stores/base.store';
import {RootStoreProvider} from './stores/storeProvider';
import Main from './Main';
// import anim from './animations.json';

// const staore = new RootStore()
// const RootStoreProvider = ({children}) => <View>{children}</View>;
console.log(RootStoreProvider);

// NfcManager.start();

function App() {
  const [mode, setMode] = useState<'read' | 'tag'>('read');
  const [show, setShow] = useState(false);

  const animationRef = useRef<LottieView>(null);

  return (
    <View style={styles.wrapper}>
      <RootStoreProvider>
        <Main />

        {/* <View style={styles.wrapper}>
        <AddKey />
        
      <Text>dsfsdf</Text> */}
        {/* <TouchableOpacity
        style={styles.w}
        onPress={() => animationRef.current.play()}>
        <LottieView
        ref={animationRef}
        loop={false}
        source={require('./test2.json')}
        // autoPlay={show}
        />
      </TouchableOpacity> */}
        {/* <View style={{flexDirection: 'row'}}>
        <Button
        title="Read mode"
        onPress={() => setMode('read')}
        disabled={mode === 'read'}
        />
        <Button
        title="Tag mode"
        onPress={() => setMode('tag')}
        disabled={mode === 'tag'}
        />
      </View> */}
        {/* {mode === 'read' ? <TagReader /> : <TagSimulator />} */}
        {/* </View> */}
      </RootStoreProvider>
      <Toast />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: '100%',
  },
});

export default App;
