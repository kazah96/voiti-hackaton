import React, {useEffect, useRef, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Button} from 'react-native';
import NfcManager, {NfcTech, TagEvent} from 'react-native-nfc-manager';
import {observer} from 'mobx-react';
// Pre-step, call this before any NFC operations
import axios from 'axios';
import DeviceInfo from 'react-native-device-info';
import Toast from 'react-native-toast-message';

import LottieView from 'lottie-react-native';
import {useRootStore} from '../stores/storeProvider';
import button from '../res/ZAMOK DVA 4ERNYI.json';

// 0 - 15 Закрытие
// 15 -
function ReaderApp() {
  const {readerStore, blePeripheralStore} = useRootStore();

  const animationRef = useRef<LottieView>(null);
  useEffect(() => {
    readerStore.run();

    blePeripheralStore.run();
  }, [readerStore, blePeripheralStore]);

  useEffect(() => {
    console.log(readerStore.doorState);
    if (readerStore.doorState === 'idle') {
      // animationRef.current?.play(32, 15);
      animationRef.current?.reset();
      animationRef.current?.play(15, 15);
    }
    if (readerStore.doorState === 'opened') {
      animationRef.current?.play(15, 0);
    }

    if (readerStore.doorState === 'error') {
      console.log('error');
      animationRef.current?.play(30, 90);
    }
  }, [readerStore.doorState]);

  return (
    <View style={[styles.wrapper]}>
      {/* <Text>{}</Text> */}
      {/* <AllKeys keyPairs={readerStore.keysTable} /> */}
      <Text
        style={{
          fontSize: 24,
          color: '#8490D2',
          marginTop: 200,
          marginBottom: -200,
        }}>
        {readerStore.name}
      </Text>
      <TouchableOpacity style={{width: 600, height: 600}}>
        <LottieView ref={animationRef} source={button} loop={false} />
      </TouchableOpacity>
    </View>
  );
}

// function AllKeys({keyPairs}) {
//   return (
//     <View>
//       {Object.keys(keyPairs).map(key => (
//         <Text>
//           {key}: {keyPairs[key].name}
//         </Text>
//       ))}
//     </View>
//   );
// }

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  opened: {
    backgroundColor: 'green',
  },
  closed: {
    backgroundColor: 'red',
  },
});

export default observer(ReaderApp);
