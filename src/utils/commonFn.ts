// 假设你要生成两个值之间的随机整数
export function getRandomBetween(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }