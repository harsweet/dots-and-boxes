<template>
    <!-- Our home page for the app with the start game button -->
    <div class="home-setting page-background">
        <div class="flex-column">
            <p class="page-header">
                Welcome to Dots and Boxes
            </p>
            <p class="page-description">
                Whether you are an expert or a newbie, 
                this game is always fun! Click the 
                button below to start a new game
            </p>
            <button class="page-link-btn" type="button" 
            @click="this.$router.push('/gameScreen')">
                START A GAME
            </button>
        </div>
    </div>
</template>
