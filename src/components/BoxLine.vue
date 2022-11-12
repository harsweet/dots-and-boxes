<template>
    <line 
        :style="styleObject"
        :x1="this.lineStartX" 
        :y1="this.lineStartY" 
        :x2="this.lineEndX" 
        :y2="this.lineEndY" 
        :fill="this.strokeColor"
        stroke-width="5"
        @click="changeColor()"
    />
</template>

<script>
export default {

    props: {
        boxId: {
            type: Array,
            required: true
        },
        lineCoordinates: {
            type: String,
            required: true
        }
    },

    data(){
        return {
            strokeColor: "yellow",
            lineStartX: null,
            lineStartY: null,
            lineEndX: null,
            lineEndY: null,
            alreadyClicked: false,
            lineVisibility: "hidden"
        }
    },

    beforeMount(){
        const coordinates = this.$props.lineCoordinates.split(',')
        this.lineStartX = coordinates[0]
        this.lineStartY = coordinates[1]
        this.lineEndX = coordinates[2]
        this.lineEndY = coordinates[3]
    },

    computed: {
        styleObject() {
            return {
                '--visibility': "hidden",
                '--visibility-hover': "visible"
            }
        }
    },


    methods: {
        changeColor(){
            if(!this.alreadyClicked){
                this.alreadyClicked = true
                console.log("line of BoxID(s) ", this.boxId, " clicked")
                this.$emit('increaseBoxCount', this.boxId, this.$props.lineCoordinates)
            }
        },

        changeVisibility(){
            this.lineVisibility = "visible"
        }
    }
}
</script>