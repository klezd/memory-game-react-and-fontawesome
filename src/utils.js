export const shuffleAllItemsInArr = (arr) => {
  return [...arr].sort(() => 0.5 - Math.random());
};

export const getMultipleRandItems = (arr, num) => {
  const shuffled = shuffleAllItemsInArr(arr);
  return shuffled.slice(0, num);
};
