import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import NfcManager, {NfcTech, TagEvent} from 'react-native-nfc-manager';
// Pre-step, call this before any NFC operations
import axios from 'axios';
import DeviceInfo from 'react-native-device-info';
import Toast from 'react-native-toast-message';

const ax = axios.create({
  baseURL: 'http://192.168.0.108:3001',
  headers: {'Content-Type': 'application/json'},
});

function App() {
  const [tt, setTag] = useState<TagEvent | null>(null);
  const [isDoorOpened, setOpenDoor] = useState(false);
  const [fromUrl, setFromUrl] = useState(null);
  const [result, setResult] = useState('');
  const [androidInfo, setAndroidInfo] = useState(null);

  useEffect(() => {
    ax.get('/test_anonymous_role').then(res => {
      console.warn(res.data);
      setFromUrl(res.data);
    });
    readNdef();

    DeviceInfo.getAndroidId().then(e => {
      setAndroidInfo(e);
    });

    return () => {
      NfcManager.cancelTechnologyRequest();
    };
  }, []);

  async function readNdef() {
    try {
      // register for the NFC tag with NDEF in it
      console.warn('Trying read');
      await NfcManager.requestTechnology(NfcTech.Ndef);
      // the resolved tag object will contain `ndefMessage` property
      console.warn('Readed');
      const tag = await NfcManager.getTag();
      const payload = tag?.ndefMessage[0].payload;

      const chars = payload?.slice(3);
      const r = chars?.map(item => String.fromCharCode(item)).join('');

      const isValid = r === 'pass';
      if (isValid) {
        openDoor();
      }

      sendLog(true);
      setResult(r);
      setTag(tag);
      console.warn('Tag found', tag);
    } catch (ex) {
      console.warn('Oops!', ex);
    } finally {
      // stop the nfc scanning
      await NfcManager.cancelTechnologyRequest();
      await readNdef();
    }
  }

  async function sendLog(isValid: boolean) {
    const currentDate = Date.now();
    console.log('sending log');
    Toast.show({
      type: 'success',
      text1: 'Sended',
    });

    const data = {
      time: currentDate,
      deviceId: androidInfo || 'sdfdsf',
      deviceInfo: 'ergerg',
    };
    try {
      await ax.post('/logs/add', JSON.stringify(data));
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <View
      style={[styles.wrapper, isDoorOpened ? styles.opened : styles.closed]}>
      {fromUrl ? <Text>{fromUrl}</Text> : null}
      <Toast />
      <Text>{androidInfo}</Text>
      <Text>{result}</Text>
      {tt && <Text>{tt?.ndefMessage[0].payload}</Text>}
    </View>
  );

  function openDoor() {
    if (isDoorOpened) {
      return false;
    }

    setOpenDoor(true);

    setTimeout(() => {
      setOpenDoor(false);
    }, 3000);
  }
}

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

export default App;
