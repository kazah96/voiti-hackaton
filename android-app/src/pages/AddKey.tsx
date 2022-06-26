/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, StyleSheet, Text, TextInput, NativeModules, Pressable} from 'react-native';
import Logo from '../res/main_logo.svg';
import Subtract from '../res/subtract.svg';
import {useRootStore} from '../stores/storeProvider';
import {observer} from 'mobx-react';
import Toast from 'react-native-toast-message';

function InputWithLabel({
  label,
  onChange,
}: {
  label: string;
  onChange: (str: string) => void;
}) {
  return (
    <View
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text style={{color: 'white', fontSize: 16}}>{label}</Text>
      <TextInput
        onChangeText={onChange}
        style={{
          borderBottomWidth: 1,
          fontSize: 20,
          color: 'white',
          textAlign: 'center',
          width: 300,
          borderBottomColor: 'lightgray',
        }}
      />
    </View>
  );
}

function AddKey({}) {
  const [key, setKey] = useState('');
  const store = useRootStore();

  return (
    <View style={styles.wrapper}>
      <View style={styles.subtract}>
        <Subtract />
      </View>
      <View style={styles.logo}>
        <Logo />
      </View>
      <Text>{store.tagStore.token}</Text>
      <View style={styles.formContainer}>
        <Text style={styles.header}>Вход</Text>
        <InputWithLabel label="Введите код активации" onChange={setKey} />
        <Text style={{marginTop: 20, color: 'lightgray'}}>
          Активировать режим
        </Text>
        <View style={{marginTop: 20}}>
          <Pressable style={styles.button} onPress={handleCardClick}>
            <Text style={styles.buttonText}>Режим карты</Text>
          </Pressable>
          <Pressable
            style={{...styles.button, marginTop: 20}}
            onPress={handleReader}>
            <Text style={styles.buttonText}>Режим считывателя</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );

  async function handleCardClick() {
    const result = await store.tagStore.tryActivate(key);
    if (result) {
      store.setCurrentPage('client');
    }
  }

  async function handleReader() {
    const result = await store.readerStore.tryActivate(key);
    if (result) {
      store.setCurrentPage('reader');
    }
    console.log('Page');
  }
}

const styles = StyleSheet.create({
  buttonText: {
    fontSize: 18,
    color: '#1976D2',
    fontWeight: '500',
  },
  button: {
    backgroundColor: 'white',
    color: 'black',
    borderRadius: 20,
    width: 300,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // paddingHorizontal: 110,
    paddingVertical: 20,
  },
  header: {
    fontSize: 32,
    color: 'white',
    fontWeight: '500',
    marginBottom: 60,
  },
  formContainer: {
    height: '60%',
    width: '100%',
    marginTop: 40,
    bottom: 0,
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  subtract: {
    position: 'absolute',
    top: 0,
  },
  logo: {},
  container: {},
  wrapper: {
    width: '100%',
    backgroundColor: '#1976D2',
    height: '100%',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});

export default observer(AddKey);
