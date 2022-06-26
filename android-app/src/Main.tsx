import React from 'react';
import {Text, View} from 'react-native';

import {observer} from 'mobx-react';

import AddKey from './pages/AddKey';
import {useRootStore} from './stores/storeProvider';
import ClientKeyApp from './pages/ClientKeyApp';
import ReaderApp from './pages/ReaderApp';

function TestComp() {
  return (
    <View>
      <Text>Test</Text>
    </View>
  );
}

function Main() {
  const store = useRootStore();
  return (
    <>
      {store.currentPage === 'addKey' && <AddKey />}
      {store.currentPage === 'test' && <TestComp />}
      {store.currentPage === 'client' && <ClientKeyApp />}
      {store.currentPage === 'reader' && <ReaderApp />}
    </>
  );
}

export default observer(Main);
