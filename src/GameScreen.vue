<script setup>
    import Board from './components/Board.vue';
</script>
<template>
    <!-- Shows the board -->
    <div class="game-setting page-background">
        <div class="flex-column">
            <div class="board-holder">
            <Board :playerId="$props.playerId" :roomId="$props.roomId" :pNames="$props.playerNames"/>
            </div>
        </div>   
    </div>
</template>

<script>

export default {
    props: {
        playerId: {
            type: Number
        },
        roomId: {
            type: String
        },
        playerNames: {
            type: String
        }
    },
}
</script>

