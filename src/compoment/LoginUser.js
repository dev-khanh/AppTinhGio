import React, {useEffect, useState} from 'react';
import {
  View,
  TextInput,
  ImageBackground,
  Dimensions,
  StyleSheet,
} from 'react-native';
const {width, height} = Dimensions.get('window');
export default ({navigation}) => {
  const [textInput, setTextInput] = useState('');
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setTextInput('');
    });
    return unsubscribe;
  });
  return (
    <View style={styles.container}>
      <ImageBackground
        source={{uri: 'https://i.redd.it/ravmjkbpojg21.jpg'}}
        style={styles.customImagesBackGourd}>
        <View style={styles.viewContainer}>
          <TextInput
            style={styles.customTextInput}
            placeholder="Đăng nhập"
            value={textInput}
            onChangeText={(text) => {
              setTextInput(text);
              if (text === 'Traham') {
                navigation.navigate('main');
              }
            }}
          />
        </View>
      </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1},
  customImagesBackGourd: {
    width: width,
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewContainer: {
    backgroundColor: 'white',
    width: 150,
    height: 40,
  },
  customTextInput: {
    height: 40,
  },
});
