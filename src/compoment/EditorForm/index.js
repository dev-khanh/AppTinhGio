import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './style';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';

export default ({sendRename, timekq, chooseIndex, selectedValue, check}) => {
  const [showDate, setShowDate] = useState(false);
  const [showTimeBD, setShowTimeBD] = useState(false);
  const [showTimeKT, setShowTimeKT] = useState(false);
  const [ennable, setEnable] = useState(false);
  const [date, setDate] = useState(new Date());
  const [timeDB, setTimeDB] = useState(new Date());
  const [timeKT, setTimeKT] = useState(new Date());

  const onChange = (event, selectedDate) => {
    setDate(selectedDate || date);
    setShowDate(false);
  };
  const onChangeTimeDB = (event, selectedDate) => {
    setTimeDB(selectedDate || timeDB);
    setShowTimeBD(false);
  };
  const onChangeTimeKT = (event, selectedDate) => {
    setTimeKT(selectedDate || timeKT);
    setShowTimeKT(false);
  };
  return (
    <View style={styles.containerGroub}>
      <View style={styles.viewCustom}>
        <TouchableOpacity
          style={styles.customTouchOpacity}
          onPress={() => setShowDate(true)}>
          <Text style={styles.textStyle2}>Nhập Ngày: </Text>
        </TouchableOpacity>
        <Text style={styles.customText}>
          {moment(date).format('DD-MM-YYYY')}
        </Text>
        {showDate && (
          <DateTimePicker
            style={styles.flex}
            testID="dateTimePicker"
            value={date}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )}
      </View>
      <View style={styles.customVuewTime}>
        <TouchableOpacity
          style={styles.customTouchOpacity}
          onPress={() => setShowTimeBD(true)}>
          <Text style={styles.textStyle2}>Thời Gian BD: </Text>
        </TouchableOpacity>
        <Text style={styles.customText}>{moment(timeDB).format('h:mm a')}</Text>

        {showTimeBD && (
          <DateTimePicker
            style={styles.flex}
            testID="dateTimePicker"
            value={timeDB}
            mode="time"
            is24Hour={true}
            display="default"
            onChange={onChangeTimeDB}
          />
        )}
      </View>
      <View style={styles.customVuewTime}>
        <TouchableOpacity
          style={styles.customTouchOpacity}
          onPress={() => setShowTimeKT(true)}>
          <Text style={styles.textStyle2}>Thời Gian KT: </Text>
        </TouchableOpacity>
        <Text style={styles.customText}>{moment(timeKT).format('h:mm a')}</Text>
        {showTimeKT && (
          <DateTimePicker
            style={styles.flex}
            testID="dateTimePicker"
            value={timeKT}
            mode="time"
            is24Hour={true}
            display="default"
            onChange={onChangeTimeKT}
          />
        )}
      </View>
      {ennable ? (
        <TouchableOpacity
          style={styles.touchableOpa}
          onPress={() => {
            setEnable(false);
            sendRename(date, timeDB, timeKT, chooseIndex, selectedValue, check);
            setDate(new Date());
            setTimeDB(new Date());
            setTimeKT(new Date());
          }}>
          <Text style={styles.textStyle}>Gửi</Text>
        </TouchableOpacity>
      ) : null}
      <TouchableOpacity
        style={styles.viewNew}
        onPress={() => {
          setEnable(true);
        }}>
        <Text style={styles.textStyle}>Mới</Text>
      </TouchableOpacity>
      <Text style={styles.showTime}>{timekq}</Text>
    </View>
  );
};
