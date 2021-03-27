import database from '@react-native-firebase/database';
export const timeConvert = (n) => {
  var num = n;
  var hours = num / 60;
  var rhours = Math.floor(hours);
  var minutes = (hours - rhours) * 60;
  var rminutes = Math.round(minutes);
  return num + ' Phút = ' + rhours + ' Giờ ' + rminutes + ' Phút';
};
export const parseDayTime = (timeBD) => {
  var d = new Date(),
    s = formatTime(timeBD),
    parts = s.match(/(\d+)\:(\d+) (\w+)/),
    hours = /am/i.test(parts[3])
      ? parseInt(parts[1], 10)
      : parseInt(parts[1], 10) + 12,
    minutes = parseInt(parts[2], 10);
  d.setHours(hours, minutes, 0, 0);
  return d;
};
export const formatTime = (date) => {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
};
export const sumTime = (arr) => {
  var total = 0;
  for (var i = 0; i < arr.length; i++) {
    total = total + parseInt(arr[i].timekq.split(' ')[0], 10);
  }
  return total;
};
export const sum = (arr) => {
  var total = 0;
  for (var i = 0; i < arr.length; i++) {
    total = total + arr[i].tien;
  }
  return total;
};
export const numberWithCommas = (x) => {
  x = x.toString();
  var pattern = /(-?\d+)(\d{3})/;
  while (pattern.test(x)) {
    x = x.replace(pattern, '$1.$2');
  }
  return x;
};
export const timeConverts = (n) => {
  var num = n;
  var hours = num / 60;
  var rhours = Math.floor(hours);
  var minutes = (hours - rhours) * 60;
  var rminutes = Math.round(minutes);
  return rhours + ' Giờ ' + rminutes + ' Phút';
};
// return
export const formatDate = (date) =>
  date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear();
// export const formatDateTime = (startDate, endDate) =>
//   (parseDayTime(endDate).getHours() - parseDayTime(startDate).getHours()) * 60 -
//   (parseDayTime(startDate).getMinutes() - parseDayTime(endDate).getMinutes());
export const sortDate = (arraysBloc) =>
  arraysBloc.sort(
    (a, b) => new Date(b.date).getDate() - new Date(a.date).getDate(),
  );
export const fecthData = (month, mCheckdata) =>
  database().ref(
    (mCheckdata ? '/cafe/' : '/users/') +
      (month.toString().includes('thang') ? month : 'thang' + month),
  );

export const formatDateTimeTatoll = (star, end) =>
  (new Date(end).getTime() - new Date(star).getTime()) / 60000;
