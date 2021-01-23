import React, {useState} from 'react';
import {Animated, StyleSheet, Text, View} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Icon from 'react-native-vector-icons/Fontisto';

export default ({children, handleEdit}) => {
  let _swipeableRow = useState(null);
  const renderRightAction = (text, color, x, progress) => {
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [x, 0],
    });
    const pressHandler = () => {
      close();
      handleEdit(text);
    };
    return (
      <Animated.View style={styles.animatedContainer(trans)}>
        <RectButton
          style={[styles.rightAction, {backgroundColor: color}]}
          onPress={pressHandler}>
          <Icon name="folder" size={18} color="#AFAFAF" />
          <Text style={styles.actionText(color)}>{text}</Text>
        </RectButton>
      </Animated.View>
    );
  };
  const renderRightActions = (progress) => (
    <View style={styles.containerView}>
      {renderRightAction('Sửa', 'white', 84, progress)}
    </View>
  );
  const updateRef = (ref) => {
    _swipeableRow = ref;
  };
  const close = () => {
    _swipeableRow.close();
  };
  return (
    <Swipeable
      ref={updateRef}
      friction={2}
      enableTrackpadTwoFingerGesture
      leftThreshold={30}
      rightThreshold={40}
      renderRightActions={renderRightActions}>
      {children}
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  animatedContainer: (trans) => ({flex: 1, transform: [{translateX: trans}]}),
  containerView: {
    marginTop: 8,
    width: 84,
    height: 80,
    flexDirection: 'row',
  },
  leftAction: {
    flex: 1,
    backgroundColor: '#497AFC',
    justifyContent: 'center',
  },
  actionText: (color) => ({
    color: color === 'white' ? 'black' : 'white',
    fontSize: 16,
    backgroundColor: 'transparent',
    padding: 10,
  }),
  rightAction: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});
