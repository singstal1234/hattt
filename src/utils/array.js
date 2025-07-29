function cyclicShiftRight(arr, shift) {
  const len = arr.length;
  if (!len) return arr; // Обработка пустого массива

  const actualShift = shift % len; // Учитываем сдвиг, превышающий длину массива
  if (actualShift === 0) return [...arr]; // Если сдвиг равен 0, возвращаем копию

  const shiftedArr = [
    ...arr.slice(len - actualShift),
    ...arr.slice(0, len - actualShift),
  ];
  return shiftedArr;
}
