<script setup>
    import ScoreDashboard from './components/ScoreDashboard.vue';
    import Board from './components/Board.vue';
</script>
<template>
    <div class="game-setting page-background">
        <div class="flex-column">
            <div class="board-holder">
            <Board/>
            </div>
        </div> 
        
    </div>
</template>
<script>

export default {
    props: {
       
    },
   
    data() {
        return {
            
        }
    },

    beforeMount(){
      
    },

    computed: {

    },

    methods: {

    }

}
</script>