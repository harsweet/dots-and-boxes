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
              <div id="info-getter">
                <input type="text" v-model="playerName" placeholder="Player Name" required/>
                <input type="text" v-model="joinRoomId" placeholder="Room ID" />
                <div id="button-holder">
                <button type="submit" class="page-link-btn"
                @click="handleExistingRoom">
                    JOIN A ROOM
                </button>
                <button type="submit" class="page-link-btn"  
                @click="handleNewRoom">
                    CREATE A NEW ROOM
                </button>
                </div>
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
        playerId: null,
        playerName: null,
        allNames: {}
      }
  },

  watch: {

    goodToStart(newState){
        if(newState==true){
          // Telling others your name before moving forward
          const nameObject = {
            id: this.playerId,
            name: this.playerName
          }
          const details = {
            roomId: this.roomId,
            nameDetails: nameObject
          }
          this.$mysocket.emit("hearMyName", details)
            setTimeout(() => {
                this.$router.push({
                    name: 'gameScreen',
                    params: {
                        playerId: this.playerId,
                        roomId: this.roomId,
                        playerNames: JSON.stringify(this.allNames)
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

    this.$mysocket.on("hearNames", (otherDetails) => {
      const newName = {}
      newName[otherDetails.id] = otherDetails.name
      Object.assign(this.allNames, newName);
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