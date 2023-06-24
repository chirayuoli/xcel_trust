import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  NativeModules,
  Button,
} from 'react-native';

const {RNTrustWallet} = NativeModules;

function App(): JSX.Element {
  const [walletData, setWalletData] = useState({
    mnemonic: '',
    addresses: {
      ETH: '',
      BTC: '',
      BNB: '',
    },
  });
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    generateMnemonic();
  }, []);

  const generateMnemonic = async () => {
    try {
      const [
        mnemonicResult,
        addressETHResult,
        addressBTCResult,
        addressBNBResult,
      ] = await RNTrustWallet.generateMnemonic();

      const updatedWalletData = {
        mnemonic: mnemonicResult,
        addresses: {
          ETH: addressETHResult,
          BTC: addressBTCResult,
          BNB: addressBNBResult,
        },
      };

      setWalletData(updatedWalletData);
      setDataLoaded(true);
    } catch (error) {
      console.error('Error generating mnemonic:', error);
    }
  };

  const handleRegenerateMnemonic = () => {
    setWalletData({
      mnemonic: '',
      addresses: {
        ETH: '',
        BTC: '',
        BNB: '',
      },
    });
    setDataLoaded(false);
    generateMnemonic();
  };

  return (
    <SafeAreaView style={styles.container}>
      {dataLoaded ? (
        <>
          <Text style={styles.text}>Mnemonic: {walletData.mnemonic}</Text>
          <View style={styles.addressList}>
            {Object.entries(walletData.addresses).map(([currency, address]) => (
              <View style={styles.addressItem} key={currency}>
                <Text style={styles.name}>{currency}:</Text>
                <Text style={styles.address}>{address}</Text>
              </View>
            ))}
          </View>
          <Button
            title="Regenerate Mnemonic"
            onPress={handleRegenerateMnemonic}
          />
        </>
      ) : (
        <ActivityIndicator size="large" />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  text: {
    fontSize: 16,
    marginVertical: 8,
    color: 'white',
  },
  addressList: {
    marginVertical: 16,
    backgroundColor: '#555555',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    width: '90%',
  },
  addressItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  name: {
    width: 60,
    marginRight: 8,
    color: 'white',
  },
  address: {
    flex: 1,
    flexWrap: 'wrap',
    color: 'white',
  },
});

export default App;
