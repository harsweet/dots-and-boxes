<template>
    <div class="turn-dasboard">
        <h5 class="turn-dashboard-text">Turn: Player {{this.currentPlayer}}</h5>
    </div>
</template>

<script>
export default {
    props: { 
        playerNo: {
            type: Number,
            required: true
        }
    
    },


    computed: {
        currentPlayer(){
            return this.$props.playerNo
        }
    }

}
</script>
