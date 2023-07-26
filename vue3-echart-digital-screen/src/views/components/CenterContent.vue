<script setup lang='ts'>
    import CountStatistic from '@/components/ChartLibs/CountStatistic.vue'
    import ChinaChart from '@/components/ChartLibs/ChinaChart.vue';
</script>

<template>
    <div class='center-content'>
        <div class="center-content__top">
            <CountStatistic/>
        </div>
        <div class="center-content__center">
            <ChinaChart />
        </div>
        <div class="center-content__bottom" style="fontSize: 30px">
            底部内容
        </div>
    </div>
</template>

<style lang='less' scoped>
    .center-content{
        height: calc(100vh - 55 * var(--app-base-unit));
        display: flex;;
        flex-direction: column;
        &__top{
            height: calc(150 * var(--app-base-unit))
        }
        &__center{
            flex: 1;
            // height: calc(500 * var(--app-base-unit))
        }
        &__bottom{
            height: calc(200 * var(--app-base-unit));
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
</style>