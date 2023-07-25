<script setup lang='ts'>
import hooks from "@/hooks";

import projectDemo  from '@/utils/projectDemo'
import { Vue3SeamlessScroll } from "vue3-seamless-scroll";

const { useFilter } = hooks;

const { toThousands } = useFilter();

console.log('projectUseData', projectDemo.projectUseData)
const getBackgroundClassName = ({ type }) => {
  let className = "project-list-item__icon";
  switch (type) {
    case "web":
      className += " web";
      break;
    case "design":
      className += " design";
      break;
    case "app":
      className += " app";
      break;
    case "project":
      className += " project";
      break;
  }
  return className;
};

const getIconClassName = ({ type }) => {
  let className = "iconfont";

  switch (type) {
    case "web":
      className += " icon-webduan";
      break;
    case "design":
      className += " icon-shejimeigong";
      break;
    case "app":
      className += " icon-appyingyong";
      break;
    case "project":
      className += " icon-app";
      break;
  }

  return className;
};
</script>

<template>
    <div class='project-scroll'>
        <div class="project-list">
            <Vue3SeamlessScroll :list="projectDemo.projectUseData" :step="0.3" :hover="true">
              <div
                class="project-list-item"
                v-for="(item, index) in projectDemo.projectUseData"
                :key="'project-item' + index"
              >
                <div :class="getBackgroundClassName(item)">
                  <i :class="getIconClassName(item)"></i>
                </div>
                <div class="project-list-item__name ellipsis">
                  {{ item.name }}
                </div>
                <div class="statistics-card">
                  <span class="statistics-card__num font-16">{{
                    toThousands(item.users)
                  }}</span>
                  <span class="statistics-card__text mt-5">累计使用人数</span>
                </div>
                <div class="statistics-card ml-10">
                  <span>
                    <el-tag v-if="item.status === 1" effect="dark" type="success"
                      >正常</el-tag
                    >
                    <el-tag v-if="item.status === -1" effect="dark" type="">维护</el-tag>
                  </span>
                  <span class="statistics-card__text mt-5">当前状态</span>
                </div>
              </div>
            </Vue3SeamlessScroll>
          </div>
    </div>
</template>

<style lang='less' scoped>
    .project-scroll{
        height: 100%;
        .flex-space-between {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .pre-icon {
            height: calc(40 * var(--app-base-unit));
            width: calc(40 * var(--app-base-unit));
            min-width: calc(40 * var(--app-base-unit));
            // background: #8675f9;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius:  calc(4 * var(--app-base-unit));

            .iconfont {
                font-size:  calc(22 * var(--app-base-unit));
            }
            }
        .project-list {
            width: 100%;
            height: calc(100% - 30 * var(--app-base-unit));
            overflow: hidden;

            &-item {
                margin-bottom: 15 calc(15 * var(--app-base-unit));;
                background: rgba(87, 170, 255, 0.15);
                padding: calc(10 * var(--app-base-unit));;
                margin-bottom: calc(10 * var(--app-base-unit));;
                align-items: center;

                .flex-space-between();

                .statistics-card {
                min-width: calc(60 * var(--app-base-unit));
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;

                &__num {
                    display: block;
                    height: calc(24 * var(--app-base-unit));
                    line-height: calc(24 * var(--app-base-unit));
                    color: color(yellow);
                }

                &__text {
                    color: color(gray);
                    font-size: calc(12 * var(--app-base-unit));
                }
                }

                &__icon {
                .pre-icon();

                &.web {
                    background-image: linear-gradient(#3368ff, #42daf5);
                }

                &.design {
                    background-image: linear-gradient(#ff4ee1, #fd9d65);
                }

                &.app {
                    background-image: linear-gradient(#42cdff, #3fc47b);
                }

                &.project {
                    background-image: linear-gradient(#9f23fd, #6594fd);
                }
                }

                &__name {
                margin-left: calc(10 * var(--app-base-unit));
                flex: 1;
                font-size: calc(16 * var(--app-base-unit));
                min-width: calc(120 * var(--app-base-unit));
                }
            }
            }
    }
</style>