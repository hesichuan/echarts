import { isFunction } from "lodash";

export default function () {
  /**
   * 初始化屏幕尺寸改变事件
   */
  const initResizeEvent = (handleResizeScreen: Function) => {
    if (handleResizeScreen && isFunction(handleResizeScreen)) {
      window.addEventListener("resize", handleResizeScreen);
    }
  };

  /**
   * 销毁屏幕尺寸改变事件
   */
  const destroyResizeEvent = (handleResizeScreen: Function) => {
    if (handleResizeScreen && isFunction(handleResizeScreen)) {
      window.removeEventListener("resize", handleResizeScreen);
    }
  };

  return {
    initResizeEvent,
    destroyResizeEvent,
  };
}
