<template>
    <div class="score-dasboard">
        <template v-for="(score, index) in this.$props.playerScores">
            <div class="score-dashboard-text">
                <h5>Player {{index+1}} Score: {{score}}</h5>
            </div>
        </template>
    </div>
</template>

<script>
export default {
    props: { 
        playerScores: {
            type: Array,
            required: true
        }
    
    },

    

}
</script>

<style scoped>
.turn-dashboard{
    height: 50px  !important;
    width: 100% !important;
    
}

.score-dashboard-text{
    font-size: larger;
    width: 100% !important;
    color:gold !important;
}


</style>

