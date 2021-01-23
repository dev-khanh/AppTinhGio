import React from 'react';
import {StyleSheet, View, TouchableOpacity, Dimensions} from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Fontisto';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
const {height} = Dimensions.get('window');
export default ({
  children,
  visible,
  close,
  backdropColor,
  inTiming,
  outTiming,
  heightPercent,
  onModalShow,
}) => {
  const insets = useSafeAreaInsets();
  return (
    <Modal
      testID="modal"
      isVisible={visible}
      backdropColor={backdropColor || 'transparent'}
      onSwipeComplete={close}
      onBackdropPress={close}
      animationInTiming={inTiming || 400}
      animationOutTiming={outTiming || 300}
      backdropTransitionInTiming={inTiming || 400}
      backdropTransitionOutTiming={outTiming || 300}
      style={styles.view}
      onModalShow={onModalShow}>
      <View
        style={[
          styles.container,
          {
            paddingBottom: insets.bottom,
            height: height * (heightPercent || 0.75),
          },
        ]}>
        {close && (
          <View style={styles.header}>
            <TouchableOpacity onPress={close}>
              <Icon name="caret-down" size={14} color="#AFAFAF" />
            </TouchableOpacity>
          </View>
        )}
        {children}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  view: {
    justifyContent: 'flex-end',
    marginHorizontal: 0,
    marginBottom: 0,
  },
  container: {
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingTop: 10,
    borderRadius: 15,
  },
  header: {
    alignItems: 'center',
    paddingBottom: 10,
  },
});
