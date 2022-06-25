import React, {useState} from 'react';
import {View, StyleSheet, Button, TouchableOpacity} from 'react-native';
import TagReader from './TagReader';
import TagSimulator from './TagSimulator';
import NfcManager from 'react-native-nfc-manager';

import LottieView from 'lottie-react-native';
import {useRef} from 'react';
// import anim from './animations.json';

// NfcManager.start();

function App() {
  const [mode, setMode] = useState<'read' | 'tag'>('read');
  const [show, setShow] = useState(false);

  const animationRef = useRef<LottieView>(null);

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        style={styles.w}
        onPress={() => animationRef.current.play()}>
        <LottieView
          ref={animationRef}
          loop={false}
          source={require('./60044-locked.json')}
          // autoPlay={show}
        />
      </TouchableOpacity>
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
    </View>
  );
}

const styles = StyleSheet.create({
  w: {width: 300, height: 300},
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
