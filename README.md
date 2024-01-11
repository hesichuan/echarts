### API

| 属性         | 说明                                                                                                                                                        | 类型                             | 默认值 |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- | ------ |
| selfAdaption | 是否进行自适应                                                                                                                                              | Boolean                          | true   |
| width        | 大屏宽度                                                                                                                                                    | `Number` or `String`             | 1920   |
| height       | 大屏高度                                                                                                                                                    | `Number` or `String`             | 1080   |
| autoScale    | 自适应配置，配置为 boolean 类型时，为启动或者关闭自适应，配置为对象时，若 x 为 true，x 轴产生边距，y 为 true 时，y 轴产生边距，启用 fullScreen 时此配置失效 | Boolean or {x:boolean,y:boolean} | true   |
| delay        | 窗口变化防抖延迟时间                                                                                                                                        | Number                           | 500    |
| fullScreen   | 全屏自适应，启用此配置项时会存在拉伸效果，同时 autoScale 失效，非必要情况下不建议开启                                                                       | Boolean                          | false  |
| boxStyle     | 修改容器样式，如居中展示时侧边背景色，符合 Vue 双向绑定 style 标准格式                                                                                      | Object                           | null   |
| wrapperStyle | 修改自适应区域样式，符合 Vue 双向绑定 style 标准格式                                                                                                        | Object                           | null   |
