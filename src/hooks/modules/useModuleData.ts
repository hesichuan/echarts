import { inject, watch, unref } from "vue";
export default function (handleApiData) {
  const apiData = inject("getApiData", null);
  const apiLoading = inject("getApiLoading", false);
  const contrastRatio = inject("getContrastRatio", 1);

  // watch(
  //   () => apiData.value,
  //   (val) => {
  //     if (handleApiData && isFunction(handleApiData)) {
  //       handleApiData(val);
  //     }
  //   },
  //   {
  //     immediate: true,
  //   }
  // );

  const calcFont = (fontSize: number): number => {

    return unref(contrastRatio) * fontSize
  }

  return {
    apiData,
    apiLoading,
    contrastRatio,
    calcFont
  };
}
