/**
 * localstorage写入本地缓存
 *
 * @param {*} key key名
 * @param {*} value 值
 */
export function setLocalS(key: string, value: any) {
    localStorage.setItem(key, value);
  }
  
  /**
   * localstorage获取本地缓存
   *
   * @param {*} key key名
   */
  export function getLocalS(key: string) : unknown {
    const res = localStorage.getItem(key);
    if (res && res !== "null") return res;
    else return false;
  }
  
  /**
   * localstorage删除本地储存
   *
   * @param {*} key key名
   */
  export function delLocalS(key: string) {
    localStorage.removeItem(key);
  }
  /**
 * 清除定时器
 *
 * @returns {*} timers
 */
 export function clearTimer(timers: Array<T>) : void {
  timers.forEach((e) => {
      if (e) {
          clearInterval(e);
          clearTimeout(e);
      }
      e = null;
  });
}
// 时间戳转年月日
export function timestamp(stamp, type) {
  // type = 1: 月-日 时-分   type = 2: 年-月-日 时-分-秒 type = 3: 20 08 type=4 : 2019年12月12日
  const now = new Date(stamp)
  const year = now.getFullYear()
  const month = now.getMonth() + 1
  const day = now.getDate()
  const hour = now.getHours()
  const minute = now.getMinutes()
  const second = now.getSeconds()

  const _mouth = month > 9 ? month : '0' + month
  const _day = day > 9 ? day : '0' + day
  const _hour = hour > 9 ? hour : '0' + hour
  const _minute = minute > 9 ? minute : '0' + minute
  if (type === 1) {
    return _mouth + '-' + _day + ' ' + _hour + ':' + _minute
  } else if (type === 2) {
    const months = month <= 9 ? '0' + month : month
    const days = day <= 9 ? '0' + day : day
    const hours = hour <= 9 ? '0' + hour : hour
    const minutes = minute <= 9 ? '0' + minute : minute
    const seconds = second <= 9 ? '0' + second : second
    return year + '-' + months + '-' + days + ' ' + hours + ':' + minutes + ':' + seconds
  } else if (type === 3) {
    return _mouth + '.' + _day
  } else if (type === 4) {
    return year + '年' + _mouth + '月' + _day + '日'
  } else if (type === 5) {
    return year + '-' + _mouth + '-' + _day
  } else if (type === 6) {
    const months = month <= 9 ? '0' + month : month
    const days = day <= 9 ? '0' + day : day
    const hours = hour <= 9 ? '0' + hour : hour
    const minutes = minute <= 9 ? '0' + minute : minute
    return months + '-' + days + ' ' + hours + ':' + minutes
  } else if (type === 7) {
    const months = month <= 9 ? '0' + month : month
    const days = day <= 9 ? '0' + day : day
    return months + '-' + days
  } else if (type === 8) {
    return year + '-' + _mouth + '-' + _day + ' ' + _hour + ':' + _minute
  }
}