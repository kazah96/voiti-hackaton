/* eslint-disable react-native/no-inline-styles */
import React, {useState, useRef, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Vibration,
  View,
} from 'react-native';
import Logo from '../res/main_logo.svg';
import NFCLogo from '../res/NFC.svg';
import {useRootStore} from '../stores/storeProvider';
import {observer} from 'mobx-react';
import button from '../res/sinaya_knopka_open_door2.json';

import LottieView from 'lottie-react-native';

const ONE_SECOND_IN_MS = 400;

const PATTERN = [ONE_SECOND_IN_MS, ONE_SECOND_IN_MS];

function ClientKeyApp() {
  const store = useRootStore();
  const animationRef = useRef<LottieView>(null);
  const [buttonCooldown, setButtonCooldown] = useState(false);

  const isDeviceFound = store.bleClientStore.isDeviceFound;
  useEffect(() => {
    store.tagStore.run();
    store.bleClientStore.run();
  }, [store]);

  useEffect(() => {
    if (store.bleClientStore.isDeviceFound) {
      stop();
    } else {
      play();
    }
  }, [store.bleClientStore.isDeviceFound]);

  // const isButtonDisabled =

  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Logo width={50} />
      </View>
      <View style={{marginBottom: -100, marginTop: 50}}>
        {!isDeviceFound ? (
          <Text style={{color: '#8490D2', fontSize: 24}}>Поиск...</Text>
        ) : (
          <Text style={{color: '#8490D2', fontSize: 24}}>Дверь найдена</Text>
        )}
      </View>

      <TouchableOpacity
        style={{width: 400, height: 400}}
        disabled={!store.bleClientStore.device || buttonCooldown}
        onPress={open}>
        <LottieView
          style={{
            opacity: !store.bleClientStore.device || buttonCooldown ? 0.45 : 1,
          }}
          ref={animationRef}
          loop={true}
          source={button}
        />
        <View
          style={{
            bottom: -440,
            // left: '40%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{marginBottom: 20, color: 'lightgray'}}>
            или приложите к считывателю
          </Text>
          <NFCLogo></NFCLogo>
        </View>
      </TouchableOpacity>
    </View>
  );

  function open() {
    store.bleClientStore.open();
    setButtonCooldown(true);

    setTimeout(() => {
      setButtonCooldown(false);
    }, 5000);
  }

  function play() {
    if (animationRef.current) {
      animationRef.current.play();
      Vibration.vibrate(PATTERN);
    }
  }

  function stop() {
    animationRef.current?.reset();
    animationRef.current?.pause();
  }
}

export const styles = StyleSheet.create({
  logo: {
    marginTop: -70,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});

export default observer(ClientKeyApp);
