<script setup>

</script>
<template>
    <div class="home-setting page-background">
        <div class="flex-column">
            <p class="page-header">
                {{ messageToDisplay }}
            </p>
            <button class="page-link-btn" type="button"
            @click="$router.push('/')">
                GO BACK TO HOME
            </button>
        </div>
    </div>
</template>


<script>

export default {
    // Takes in the winner array
    // Also prohibits entry just by Url
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
      // Computes suitable message before mounting
      this.getTheMessage()
    },

    methods: {
        // Getting suitable message
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
