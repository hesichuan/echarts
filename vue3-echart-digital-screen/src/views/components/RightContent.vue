<script setup lang='ts'>
    import ChartProject from '@/components/ChartLibs/ChartProject.vue'
</script>

<template>
    <div class='right-content'>
        <div class="right-content__item">
            <!-- <CompanyDevice/> -->
        </div>
        <div class="right-content__item">
            <ChartProject/>
        </div>
        <div class="right-content__item">
            <!-- <ChartFour/> -->
        </div>
    </div>
</template>

<style lang='less' scoped>
.right-content{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    &__item{
        flex:1;
        overflow: hidden;
    }
}
</style>