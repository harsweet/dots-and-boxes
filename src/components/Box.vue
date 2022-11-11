<script setup>
  import BoxLine from './BoxLine.vue';
</script>
<template>
    <BoxLine :boxId="this.$props.boxId" :lineStartX="this.$props.xStart" :lineStartY="this.$props.yStart" :lineEndX="this.$props.xEnd" :lineEndY="this.$props.yStart" stroke="yellow"/>
    <BoxLine :boxId="this.$props.boxId" :lineStartX="this.$props.xEnd" :lineStartY="this.$props.yStart" :lineEndX="this.$props.xEnd" :lineEndY="this.$props.yEnd" stroke="yellow"/>
    <BoxLine :boxId="this.$props.boxId" :lineStartX="this.$props.xEnd" :lineStartY="this.$props.yEnd" :lineEndX="this.$props.xStart" :lineEndY="this.$props.yEnd" stroke="yellow"/>
    <BoxLine :boxId="this.$props.boxId" :lineStartX="this.$props.xStart" :lineStartY="this.$props.yEnd" :lineEndX="this.$props.xStart" :lineEndY="this.$props.yStart" stroke="yellow"/>
</template>


<script>
export default {
    props: {
        boxId: {
            type: Number,
            required: true
        },
        xStart: {
            type: Number,
            required: true
        },
        xEnd: {
            type: Number,
            required: true
        },
        yStart: {
            type: Number,
            required: true
        },
        yEnd: {
            type: Number,
            required: true
        }
    }
}
</script>
