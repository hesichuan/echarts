<script setup lang='ts'>
    import CountStatistic from '@/components/ChartLibs/CountStatistic.vue'
</script>

<template>
    <div class='center-content'>
        <div class="center-content__top">
            <CountStatistic/>
        </div>
    </div>
</template>

<style lang='less' scoped>
    .center-content{
        &__top{
            // height:  calc(170 * var(--app-base-unit));
        }
    }
</style>