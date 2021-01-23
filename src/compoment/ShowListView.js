import React from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import {FlatList, RectButton} from 'react-native-gesture-handler';
import AppleStyleSwipeableRow from './AppleStyleSwipeableRow';
import BottomModal from './BottomModal';
import moment from 'moment';
import CustomActivityIndicator from './CustomActivityIndicator';
import EditorForm from './EditorForm';
import {sumTime, sum, numberWithCommas, timeConverts} from '../saga/libs';
export default ({
  arraysBloc,
  isEditing,
  timekq,
  sendRename,
  selectedValue,
  check,
}) => {
  const [selectChoose, setSelectChoose] = React.useState(false);
  const [chooseIndex, setChooseIndex] = React.useState(0);
  const handleEdits = (index) => {
    console.log(' EDIT: ', arraysBloc[index]);
    setChooseIndex(index);
    setSelectChoose(true);
  };
  const Item = ({date, tien, timedb, timekt}) => (
    <RectButton
      style={styles.rectButton}
      onPress={() =>
        Alert.alert(
          tien + '   -   ' + date + '\nBD: ' + timedb + '   -   KT: ' + timekt,
        )
      }>
      <View style={styles.item}>
        <View style={styles.column}>
          <Text style={styles.title}>
            {moment(new Date(date)).format('DD/MM/YYYY')}
          </Text>
          <Text>TG bắt đầu: {timedb}</Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.title}>{numberWithCommas(tien)} VNĐ</Text>
          <Text>TG Kết thúc: {timekt}</Text>
        </View>
      </View>
    </RectButton>
  );
  const SwipeableRow = ({item, handleEdit}) => {
    return (
      <AppleStyleSwipeableRow handleEdit={handleEdit}>
        <Item
          date={item?.date}
          tien={item?.tien}
          timedb={item?.timedb}
          timekt={item?.timekt}
        />
      </AppleStyleSwipeableRow>
    );
  };
  return (
    <View style={styles.flex}>
      <BottomModal
        visible={selectChoose}
        heightPercent={0.35}
        close={() => setSelectChoose(false)}>
        <EditorForm
          check={check}
          sendRename={sendRename}
          timekq={timekq}
          chooseIndex={chooseIndex}
          selectedValue={selectedValue}
        />
      </BottomModal>
      <View style={styles.viewContai}>
        {isEditing ? (
          <FlatList
            data={arraysBloc}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            renderItem={({item, index}) => (
              <SwipeableRow item={item} handleEdit={() => handleEdits(index)} />
            )}
            keyExtractor={(item, index) => `message ${index}`}
          />
        ) : (
          <CustomActivityIndicator />
        )}
      </View>
      <View style={styles.viewContainer}>
        <Text style={[styles.viewTextContainer(true), styles.left]}>
          TT: {numberWithCommas(sum(arraysBloc))} Đ
        </Text>
        <Text style={[styles.viewTextContainer(false), styles.right]}>
          TG: {timeConverts(sumTime(arraysBloc))}
        </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  left: {
    left: 18,
  },
  right: {
    right: 18,
  },
  flex: {flex: 1},
  column: {
    flexDirection: 'column',
  },
  item: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 14,
  },
  viewContainer: {
    flex: 1,
    backgroundColor: '#000000a0',
    alignContent: 'center',
    justifyContent: 'center',
  },
  viewTextContainer: (check) => ({
    position: 'absolute',
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: check ? 'left' : 'right',
    width: '100%',
  }),
  viewContai: {flex: 9},
  rectButton: {
    flex: 1,
    height: 80,
    padding: 15,
    paddingLeft: 20,
    paddingRight: 20,
    marginVertical: 8,
    justifyContent: 'space-between',
    flexDirection: 'column',
    backgroundColor: '#f9c2ff',
  },
  separator: {
    backgroundColor: 'rgb(200, 199, 204)',
    height: StyleSheet.hairlineWidth,
  },
});
