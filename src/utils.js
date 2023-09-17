export const shuffleAllItemsInArr = (arr) => {
  return [...arr].sort(() => 0.5 - Math.random());
};

export const getMultipleRandItems = (arr, num) => {
  const shuffled = shuffleAllItemsInArr(arr);
  return shuffled.slice(0, num);
};

export const getElementByPropsVal = (arr, props, val, sortByProps = null) => {
  if (!arr) return [];

  let newArr = arr;
  if (sortByProps) {
    newArr = sortDataByProps(arr, sortByProps);
  }

  const res = newArr.filter((el) => {
    return el[props] === val;
  });

  return res;
};

export const sortDataByProps = (arr, props) => {
  if (!arr) return [];

  const res = arr.sort((a, b) => (a[props] - b[props]) * -1);
  return res;
};

export const getModifiedDate = (dateInMs) => {
  const now = Date.now();
  const duration = now - dateInMs;
  const inSec = duration / 1000;
  const inMin = inSec / 60;
  const inHour = inMin / 60;
  let text = "";
  if (inSec < 60) {
    text = "just now";
  } else if (inMin < 60) {
    const min = Math.floor(inMin);
    text = min + " minutes ago";
  } else if (inHour < 24) {
    const hour = Math.floor(inHour);
    text = hour + " hours ago";
  } else {
    const date = new Date(dateInMs);
    text = date.toDateString();
  }
  return text;
};