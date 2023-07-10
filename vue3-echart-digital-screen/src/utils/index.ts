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