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
            @click="">
                JOIN A ROOM
            </button>
            <button class="page-link-btn" type="button" 
            @click="">
                CREATE A NEW ROOM
            </button>
        </div>
    </div>
</template>

<script>
import { io } from 'socket.io-client';

export default {
  data() {
      return {
        socket: {}
      }
  },

  created(){
    this.socket = io("http://localhost:3000");
    this.socket.emit('my message', 'Hello there from Vue.');
  } ,

  computed:
    function() {
      this.socket.on('my broadcast', (data) => {
        console.log(data);
      });
  },


  beforeUnmount() {
    if (this.socket) {
      this.socket.disconnect();
    } 
  }
}
</script>