import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import EditorForm from './EditorForm';
const MainNavigation = ({
  timekq,
  sendRename,
  navigation,
  selectedValue,
  setSelectedValue,
  setArraysBloc,
  readFile,
  sendScreen,
}) => {
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setSelectedValue('thang1');
      setArraysBloc();
    });
    return unsubscribe;
  });
  return (
    <View style={styles.container}>
      <ImageBackground
        source={{
          uri:
            'https://firebasestorage.googleapis.com/v0/b/apptinhgio.appspot.com/o/images.jpge?alt=media&amp;token=5dde9fe3-c9c2-4149-94cb-139f234646f1',
        }}
        style={styles.customImages}>
        <Text style={styles.customTextInside}>Khánh ❤ Trà</Text>
      </ImageBackground>
      <EditorForm sendRename={sendRename} timekq={timekq} />
      <View style={styles.flex7}>
        <Picker
          selectedValue={selectedValue}
          style={styles.customPiker}
          mode="dialog"
          onValueChange={(itemValue, itemIndex) => {
            setSelectedValue(itemValue);
          }}>
          <Picker.Item label="Tháng 1" value="thang1" />
          <Picker.Item label="Tháng 2" value="thang2" />
          <Picker.Item label="Tháng 3" value="thang3" />
          <Picker.Item label="Tháng 4" value="thang4" />
          <Picker.Item label="Tháng 5" value="thang5" />
          <Picker.Item label="Tháng 6" value="thang6" />
          <Picker.Item label="Tháng 7" value="thang7" />
          <Picker.Item label="Tháng 8" value="thang8" />
          <Picker.Item label="Tháng 9" value="thang9" />
          <Picker.Item label="Tháng 10" value="thang10" />
          <Picker.Item label="Tháng 11" value="thang11" />
          <Picker.Item label="Tháng 12" value="thang12" />
        </Picker>
        <TouchableOpacity
          style={styles.customTouchOpacity}
          onPress={() => {
            readFile(selectedValue);
            sendScreen(false);
            navigation.navigate('List');
          }}>
          <Text style={styles.textStyle2}>Tổng DT</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  customPiker: {height: 50, width: 140},
  flex7: {
    flex: 1,
    marginRight: 10,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  containers: {
    flex: 1,
  },
  customTextInside: {
    position: 'absolute',
    bottom: 0,
    color: '#fff',
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: 'center',
    width: '100%',
    backgroundColor: '#000000a0',
  },
  customImages: {
    flex: 1,
    backgroundColor: 'red',
    resizeMode: 'cover',
  },
  container: {flex: 1, marginTop: 0, marginLeft: 0},
  textStyle2: {fontSize: 17, color: 'white'},
  customTouchOpacity: {
    backgroundColor: 'blue',
    width: 125,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
});
export default MainNavigation;
