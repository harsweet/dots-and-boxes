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


<style scoped>

.turn-dashboard{
    height: 50px  !important;
    width: 100% !important;
    
}

.turn-dashboard-text{
    font-size: larger;
    width: 100% !important;
    color: aqua !important;
}

</style>