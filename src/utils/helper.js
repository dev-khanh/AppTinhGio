import {Dimensions, Platform} from 'react-native';

export const toCamel = (s) =>
  s.replace(/([-_][a-z])/gi, ($1) =>
    $1.toUpperCase().replace('-', '').replace('_', ''),
  );

export const isArray = (a) => Array.isArray(a);

export const isObject = (o) =>
  o === Object(o) && !isArray(o) && typeof o !== 'function';

export const keysToCamel = (o) => {
  if (isObject(o)) {
    const n = {};

    Object.keys(o).forEach((k) => {
      n[toCamel(k)] = keysToCamel(o[k]);
    });

    return n;
  }
  if (isArray(o)) {
    return o.map((i) => keysToCamel(i));
  }

  return o;
};
export default function Util() {}

Util.isPortrait = () => {
  const dim = Dimensions.get('screen');
  return dim.height >= dim.width;
};
export const textSpread = (str) =>
  str.length > 9 ? `${str.slice(0, str.length - 5)}...` : str;

export const isValidFileType = (fName) =>
  ['m4v', 'avi', 'mpg', 'mp4', 'webm', 'MOV'].indexOf(
    fName?.split('.')?.pop(),
  ) > -1;

export const isValidEmail = (email) =>
  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email);

const imageAllowedTypes = ['image/gif', 'image/jpeg', 'image/png'];
export const isValidImageType = (fileType) =>
  imageAllowedTypes.includes(fileType);

const videoAllowedTypes = [
  'application/mp4',
  'video/mp4',
  'video/3gp2',
  'video/3gpp',
  'audio/mp4',
  'audio/3gpp',
  'video/quicktime',
  'video/x-flv',
  'application/x-mpegURL',
  'video/MP2T',
  'video/x-msvideo',
  'video/x-ms-wmv',
];
export const isValidVideoType = (fileType) =>
  videoAllowedTypes.includes(fileType);

export const getFileNameFromUri = (uri) => uri && uri.split('/').pop();

export const isLocalUri = (uri) => uri && uri.split(':').shift() === 'file';

export const replaceSpeaker = (str) =>
  str.length > 3 ? `${str} ` : str.replace(' - ', '');

export const replaceAllSpaces = (str) => str.replace(/ /g, '');

export const checkLoadingRender = (arrayList, id) =>
  arrayList?.id && arrayList?.id.toString() !== id.toString()
    ? null
    : arrayList;

export const splitFileExtension = (str) =>
  str?.length ? str.split('.').pop() : '';

export const isCheckRegexColor = (strColor) =>
  /^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/gm.exec(strColor) !== null;

export const mapArrayCheckBox = (data) =>
  data.map((e) => ({value: e.id, label: e.name}));

export const addIdForArray = (data) =>
  data.map((e, index) => ({...e, id: index}));

export const removeEmptyObject = (obj) => {
  for (var propName in obj) {
    if (obj[propName] === null || obj[propName] === undefined) {
      delete obj[propName];
    }
  }
  return obj;
};

export const handleColor = (colorStr, defaultColor) => {
  const strTrim = colorStr?.trim();
  if (isCheckRegexColor(strTrim)) {
    return strTrim;
  }
  return defaultColor;
};

export const addArraysList = (arrayList, item) =>
  arrayList.map((e) => {
    if (e.id === item.id) {
      return item;
    }
    return e;
  });

export const selectValueToArray = (data) => {
  if (data) {
    const array = Object.entries(data).reduce((obj, item) => {
      const [key, value] = item;
      return value ? [...obj, key] : obj;
    }, []);
    return array;
  }
  return [];
};

export const createArrayFormData = (formData, data, key) => {
  if (Array.isArray(data)) {
    data?.forEach((e, i) => {
      if (Array.isArray(e)) {
        createArrayFormData(formData, e, `${key}[${i}]`);
      } else {
        formData.append(`${key}[]`, data[i]);
      }
    });
  } else {
    formData.append(key, data);
  }
};
export const createAdditionalFormData = (formData, data, key) => {
  if (Array.isArray(data)) {
    data.forEach((map, i) => {
      Object.entries(map).map((e) => {
        const [ekey, evalue] = e;
        formData.append(`${key}[${i}][${ekey}]`, evalue);
        return e;
      }, []);
    });
  } else {
    formData.append(key, data);
  }
};
export const createArtworkFormData = (formData, data, key) => {
  if ((typeof data === 'object' && data !== null) || Array.isArray(data)) {
    data.forEach((map, i) => {
      Object.entries(map).map((e) => {
        const [ekey, evalue] = e;
        if (Array.isArray(evalue)) {
          createArrayFormData(formData, evalue, `${key}[${i}][${ekey}]`);
        } else {
          formData.append(`${key}[${i}][${ekey}]`, evalue);
        }
        return e;
      }, []);
    });
  } else {
    formData.append(key, data);
  }
};
export const isEqualString = (a, b) => a?.toString() === b?.toString();

export const convertDurationToString = (duration) => {
  const hours = duration / 60;
  const minutes = duration % 60;
  return `${hours}h ${minutes}m`;
};

export const convert24hourTo12hour = (hours) => {
  const time = hours % 12 || 12;
  const midday = hours / 12 ? 'pm' : 'am';
  return `${time} ${midday}`;
};

let throttleTimer = 0;
export const throttle = (func, time) => {
  if (!time || typeof time !== 'number' || time < 0) {
    return func;
  }
  return (...args) => {
    clearTimeout(throttleTimer);
    throttleTimer = setTimeout(() => {
      func(...args);
    }, time);
  };
};

export const getNoteContent = (item) =>
  item?.notes?.data?.length ? item.notes?.data[0]?.attributes?.content : '';

export const getNoteId = (item, userId) => {
  const listNoteData = item?.notes?.data || [];

  if (!listNoteData?.length) {
    return null;
  }

  const index = listNoteData.findIndex((data) =>
    isEqualString(data?.attributes?.user?.data?.id, userId),
  );

  if (index > -1) {
    return listNoteData[index].id;
  }
  return null;
};

export const getVideoUrlFromS3Response = (xml) => {
  const regexDomain = /<Location>(https:\/\/.*com\/)upload/;
  const regexPath = /<Key>(.*)<\/Key>/;
  var match = regexDomain.exec(xml);
  const domain = match[1];
  match = regexPath.exec(xml);
  const path = match[1];
  return domain + path;
};

export const handleRegexhtml = (str) => {
  const regex = /.*?(?:class="talk-title">(.*)(?=<\/h4)).*?(?:class="question-text">(.*)(?=<\/p><p)).*?(?:class="owner">(.*)(?=<\/p>))/g;
  let m;
  while ((m = regex.exec(str)) !== null) {
    return [m[1], m[2], m[3]];
  }
};

export const getFileType = (str) => str?.split('.')?.pop() || '';

export const isVideo = (uri) =>
  ['m4v', 'avi', 'mpg', 'mp4', 'webm', 'MOV'].indexOf(uri?.split('.')?.pop()) >
  -1;

export const isImages = (uri) =>
  ['png', 'jpg', 'jpeg'].indexOf(uri?.split('.')?.pop()) > -1;

export const IS_IOS = Platform.OS === 'ios';
