type Points = {
  [key: number]: number;
};

const points = {
  0: 10, // 10-8級
  1: 20, // 7級
  2: 40, // 6級
  3: 80, // 5級
  4: 160, // 4級
  5: 320, // 3級
  6: 640, // 2級
  7: 1280, // 1級
  8: 2560, // 初段
  9: 5120, // 二段
  10: 10240, // 三段
  11: 20480, // 四段
  12: 40960, // 五段
} as Points;

export default points;