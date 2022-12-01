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
            <div v-if="totalInRoom<=0">
                <input v-model="joinRoomId" placeholder="RoomID" />

                <button class="page-link-btn" type="button" 
                @click="handleExistingRoom">
                    JOIN A ROOM
                </button>
                <button class="page-link-btn" type="button" 
                @click="handleNewRoom">
                    CREATE A NEW ROOM
                </button>
            </div>
            <div v-else>
                <span v-if="totalInRoom==3">All Three Players have joined. Starting the game shortly!!</span>
                <span v-else>Your room ID is {{this.roomId}}.Waiting For Others</span>
            </div>
            
        </div>
    </div>
</template>

<script>
import { io } from 'socket.io-client';

export default {
  data() {
      return {
        socket: {},
        roomId: null,
        waitingForOthers: false,
        totalInRoom: 0,
        joinRoomId: null,
      }
  },

  watch: {

    goodToStart(newState){
        if(newState==true){
            setTimeout(() => {
                this.$router.push('/gameScreen')
            }, "3000")
        }
    }
  },

  created(){
    this.socket = io("http://localhost:3000")
    this.socket.emit('my message', 'Hello there from Vue.')
  } ,

  mounted() {
    this.socket.on('a New Member', (memberCount) => {
        console.log("yeah it worked")
        console.log(memberCount)
        this.totalInRoom = parseInt(memberCount) 
        console.log(this.totalInRoom)
    })

 
  },

//   beforeUnmount() {
//     if (this.socket) {
//       this.socket.disconnect();
//     } 
//   }

  computed: {

    goodToStart(){
        return this.totalInRoom == 3
    },


    showButtons(){
        return this.totalInRoom<=0
    },

   
    
  },
  methods: {
    getRandomRoomNumber(min, max){
      return Math.floor(Math.random() * (max - min) + min)
    },

    handleNewRoom(){
      this.roomId = "room" + String(this.getRandomRoomNumber(1, 10000))
      this.socket.emit("join", this.roomId)
    },

    handleExistingRoom(){
      this.socket.emit("join", this.joinRoomId)
      this.roomId = this.joinRoomId
    },
  }   
}
</script>