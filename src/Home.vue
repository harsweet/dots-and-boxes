<template>
    <!-- Our home page for the app with the start game button -->
    <div class="home-setting page-background">
        <div class="flex-column">
            <p class="page-header">
                Welcome to Dots and Boxes
            </p>
            <p class="page-description">
                Whether you are an expert or a newbie, 
                this game is always fun!
            </p>
            <template v-if="totalInRoom<=0">
              <div>
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

            <span v-if="joinUnsuccessful" class="page-description" style="color: red;">
              Couldn't join in (Maybe the passcode is wrong or room is full). Try Again!
            </span>
            </template>
            
            <div v-else>
                <span v-if="totalInRoom==3" class="page-description" style="color:aqua">
                  All Three Players have joined. Starting the game shortly!!
                </span>
                <span v-else class="page-description" style="color:chartreuse;">
                  Your in the room with passcode {{this.roomId}}. Waiting For Others (Total People in the room: {{(totalInRoom)}}/3)
                </span>
            </div>
            
        </div>
    </div>
</template>

<script>
import { nanoid } from 'nanoid'

export default {
  data() {
      return {
        socket: {},
        roomId: null,
        waitingForOthers: false,
        joinUnsuccessful: false,
        totalInRoom: 0,
        joinRoomId: null,
        playerId: null
      }
  },

  watch: {

    goodToStart(newState){
        if(newState==true){
            setTimeout(() => {
                this.$router.push({
                    name: 'gameScreen',
                    params: {
                        playerId: this.playerId,
                        roomId: this.roomId
                    }
                })
            }, "3000")
        }
    }
  },


  mounted() {
    // Recieved when there is a new member in the room (could be the person itself)
    this.$mysocket.on('aNewMember', (memberCount) => {
      this.totalInRoom = parseInt(memberCount) 
    })

    // Received only when you successfully join in a room
    this.$mysocket.on("joinSuccessful",(successDetails) => {
      this.playerId = successDetails.playerId
      this.roomId = successDetails.roomId
    })
 
    // In case the Join turns out to be unsuccessful
    this.$mysocket.on("joinUnsuccessful",(successDetails) => {
      this.joinUnsuccessful = true
    })
  },


  computed: {

    goodToStart(){
        return this.totalInRoom == 3
    },

    showButtons(){
        return this.totalInRoom<=0
    },
  },
  methods: {
    handleNewRoom(){
      this.roomId = nanoid(8)
      this.$mysocket.emit("createNewRoom", this.roomId)
    },

    handleExistingRoom(){
      this.joinUnsuccessful = false
      this.$mysocket.emit("joinExistingRoom", this.joinRoomId)
    },
  }   
}
</script>