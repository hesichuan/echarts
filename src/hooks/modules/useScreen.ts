import { provide, ref, reactive, onMounted, onUnmounted } from "vue";
import useResize from "./useResize";

export default function(handleResizeScreen: Function) {
  const { initResizeEvent, destroyResizeEvent } = useResize();

  // 设计稿高宽
  const design = reactive({
    width: 1920,
    height: 1080,
    ratio: 1920 / 1080,
  });

  // 设备屏幕高宽 (初始值)
  const screen = reactive({
    width: 1920,
    height: 1080,
  });

  // 字体可缩放的最小尺寸
  const minScreen = reactive({
    width: 1400,
    height: 820,
  });

  // 响应式比率
  const contrastRatio = ref(1);  

  // 顶级组件通过provide传递给子孙组件
  provide("getDesign", design);
  provide("getScreen", screen);
  provide("getContrastRatio", contrastRatio);

  onMounted(() => {    
    handleResizeScreen();
    initResizeEvent(handleResizeScreen);
  });

  onUnmounted(() => {
    destroyResizeEvent(handleResizeScreen)
  });

  return {
    design,
    screen,
    minScreen,
    contrastRatio,
  };
}
