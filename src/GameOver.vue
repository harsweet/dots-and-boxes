<script setup>

</script>
<template>
    <div class="home-setting page-background">
        <div class="flex-column">
            <p class="page-header">
                And The Winner of the Game is Player 1
            </p>
            <p class="page-description">
                If players want, you can start a new game
                or go back to the Home Page
            </p>
            <button class="page-link-btn" type="button"
            >
                START ANOTHER GAME
            </button>
            <button class="page-link-btn" type="button"
            @click="this.$router.push('/gameScreen')">
                GO BACK TO HOME
            </button>
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


