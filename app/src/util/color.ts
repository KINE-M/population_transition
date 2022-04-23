export const randomColorHex = (): string => {
  let color: string = Math.ceil(16777215 * Math.random()).toString(16);
  let length: number = color.length;
  while (length < 6) {
    color = '0' + color;
    length++;
  }
  return '#' + color;
};
