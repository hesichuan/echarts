<script setup lang='ts'>
    import { Loading } from '@dataview/datav-vue3';
</script>

<template>
    <div class='global-loading'>
        <Loading style="width:150px; height:150px;">Loading</Loading>
    </div>
</template>

<style lang='less' scoped>
    .global-loading{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
</style>