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
import {useRootStore} from '../stores/storeProvider';
import {observer} from 'mobx-react';
import button from '../res/sinaya_knopka_open_door2.json';

import LottieView from 'lottie-react-native';

const ONE_SECOND_IN_MS = 400;

const PATTERN = [ONE_SECOND_IN_MS, ONE_SECOND_IN_MS];

function ClientKeyApp() {
  const [playing, setPlaying] = useState(false);
  const store = useRootStore();
  const animationRef = useRef<LottieView>(null);

  useEffect(() => {
    store.tagStore.run();
    store.bleClientStore.run();
  }, [store]);

  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Logo width={50} />
      </View>
      <View style={{marginBottom: -70, marginTop: 70}}>
        {store.tagStore.active ? (
          <Text style={{color: '#8490D2', fontSize: 24}}>Scanning</Text>
        ) : (
          <Text>Loading</Text>
        )}
      </View>
      <Text>{store.tagStore.token}</Text>
      {/* <Text>sfd</Text> */}
      <TouchableOpacity
        style={{width: 400, height: 400}}
        // disabled={true}
        onPress={play}>
        <LottieView
          style={{opacity: playing ? 0.65 : 1}}
          ref={animationRef}
          loop={true}
          source={button}
        />
      </TouchableOpacity>
    </View>
  );

  function play() {
    setPlaying(true);
    animationRef.current.play();
    Vibration.vibrate(PATTERN);
  }

  function stop() {
    setPlaying(false);
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
