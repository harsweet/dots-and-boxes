<script setup>

</script>
<template>
    <div class="home-setting page-background">
        <div class="flex-column">
            <p class="page-header">
                {{this.messageToDisplay}}
            </p>
            <p class="page-description">
                If players want, you can start a new game
                or go back to the Home Page
            </p>
            <button class="page-link-btn" type="button"
            @click="this.$router.push('/gameScreen')">
                START ANOTHER GAME
            </button>
            <button class="page-link-btn" type="button"
            @click="this.$router.push('/')">
                GO BACK TO HOME
            </button>
        </div>
    </div>
</template>


<script>

export default {
    props: {
        winner: {
            type: Array,
            required: true
        },
    },
   
    data() {
        return {
            messageToDisplay:""
        }
    },

    beforeMount(){
      this.getTheMessage()
    },

    methods: {
        getTheMessage(){
            if(this.$props.winner.length > 1){
                this.messageToDisplay = `And This is a tie, Players ${this.$props.winner.join(', ')} have all won!`
            }
            if(this.$props.winner.length == 1){
                this.messageToDisplay = `And the winner is Player ${this.$props.winner[0]}`
            }
        }
    }
}
</script>
