<template>
    <line 
        :style="styleObject"
        :x1="lineStartX" 
        :y1="lineStartY" 
        :x2="lineEndX" 
        :y2="lineEndY" 
        :fill="strokeColor"
        stroke-width="5"
        @click="handleClick()"
    />
</template>

<script>
export default {
    // We use this prop info for plotting the lines
    // Each line has knowledge about which box it belongs
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
        // Setting up the coordinates for the line to be draw
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
        // For when the line is clicked
        // Only works it had not been 'alreadyClicked'
        changeColor(){
            if(!this.alreadyClicked){
                this.alreadyClicked = true
                this.$emit('increaseBoxCount', this.boxId, this.$props.lineCoordinates)
            }
        },

        changeVisibility(){
            this.lineVisibility = "visible"
        }
    }
}
</script>