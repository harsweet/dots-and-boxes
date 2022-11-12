<script setup>
  import BoxLine from './BoxLine.vue';
</script>
<template>
  <!-- The Two Action Buttons -->
  <button class="page-link-btn" type="button"
  @click="this.$router.go()">
    RESTART THE GAME
  </button>
  <button class="page-link-btn" type="button"
  @click="this.$router.push('/')">
    GO BACK TO HOME
  </button>

  <!-- Uses the playerScores array to show the scores -->
  <template v-for="(score, index) in this.playerScores">
    <h5 class="score-dashboard-text board-element" :style="{'color': this.playerColors[index]}">Player {{index+1}} Score: {{score}}</h5>
  </template>

  <!-- Informs the players of the player turns -->
  <h5 class="turn-dashboard-text board-element">Turn: Player {{this.currentPlayer}}</h5>
  
  <!-- Draws the acutal board -->
  <!-- First come the lines -->
  <svg id="board-svg" viewBox="0 0 170 170" xmlns="http://www.w3.org/2000/svg">
    <template v-for="lineComponent in Object.entries(lineComponents)">
      <BoxLine 
      :id="'line-'+lineComponent[0]"
      :boxId="lineComponent[1]" 
      :lineCoordinates="lineComponent[0]" 
      stroke="white"
      cursor="pointer"
      @increaseBoxCount="increaseBoxCount"
      />
    </template>

    <!-- For drawing the circles -->
    <circle v-for="dotComponent in dotComponents" :cx="dotComponent[0]" :cy="dotComponent[1]" :r="sizeMultiplier/5" fill="purple"/>
    
    <!-- For display who won which box -->
    <template v-for="(playerBoxesWon, index) in this.boxesWon">
      <template v-for="boxWon in playerBoxesWon">
        <text :x="boxWon.xStart+(sizeMultiplier/4.2)" :y="boxWon.yStart+(sizeMultiplier/1.6)" :fill="this.playerColors[index]" class="box-text">P{{index+1}}</text>
      </template>
    </template>
  </svg>
</template>
<script>

export default {
  // A possible extension of this future where we can have dynamic player numbers and board sizes
  // Not required for this assignment as we only need a 4 * 4 grid and 3 player support
  props: {
        dotsNo: {
            type: Number,
            default: 4
        },
        noOfPlayers: {
          type: Number,
          default: 3
        }
    },
   
    data() {
        return {
            rowsAndColumnsNo: null,
            boxes: [], 
            dotComponents: [],
            lineComponents: [],
            sizeMultiplier: 32,
            boxCountArray: [],
            boxesCompleted: 0,
            currentPlayer: 1,
            playerScores: [],
            playerColors: ["red", "yellow", "green"],   // To help identify players
            boxesWon: [],
        }
    },

    beforeMount(){
      // Befor mounting the app (showing the game), we initialise some stuff
      this.rowsAndColumnsNo = this.$props.dotsNo-1
      this.setSvgData()
      this.initialiseBoxCount()
      this.initialisePlayerScore()
      this.initialiseBoxesWon()
    },

    methods: {

      // Initialising the scores array
      initialisePlayerScore(){
        var scoresArray = []

        for (let scoreNo = 0; scoreNo < this.noOfPlayers; scoreNo++) {
          scoresArray.push(0)
        }
        this.playerScores = scoresArray
      },

      // Initialising the boxesWon array
      initialiseBoxesWon(){
        var boxesWonArray = []

        for (let scoreNo = 0; scoreNo < this.noOfPlayers; scoreNo++) {
          boxesWonArray.push([])
        }
        this.boxesWon = boxesWonArray
      },

      // For calculating next player Turn
      changeTurn(){
        if(this.currentPlayer == this.$props.noOfPlayers){
          this.currentPlayer = 1
        }
        else {
          this.currentPlayer = this.currentPlayer + 1
        }
      },

      // For getting the winner(s)
      getWinners(){
        const highestScore = Math.max(...this.playerScores);
        const winners = []
        this.playerScores.forEach((score, index) => score === highestScore ? winners.push(index+1): null);
        return winners
      },

      // Checks whether to call it a game or not
      gameOverCheck(){
        if (this.boxesCompleted == (this.$props.dotsNo -1)*(this.$props.dotsNo -1)){
          const winners = this.getWinners()
          this.$router.push({
            name: 'gameOver',
            params: {
              winner: winners
            }
          }) 
        }
      },

      // Setting svg Coordinates
      setSvgData(){
        this.setCircleSvgData()
        this.getLinesSvgData()
      },

      // Setting the boxes info
      // Each box should know which line belongs to it
      setBoxes(){

        var myBoxes = []
        var BoxNo=0
        for (let row = 1; row <= this.rowsAndColumnsNo; row++) {
          for (let column = 1; column <= this.rowsAndColumnsNo; column++){
            var boxInfo = {}
            boxInfo['boxId'] = BoxNo
            boxInfo['xStart'] = row*this.sizeMultiplier
            boxInfo['xEnd'] = (row+1)*this.sizeMultiplier
            boxInfo['yStart'] = column*this.sizeMultiplier
            boxInfo['yEnd'] = (column+1)*this.sizeMultiplier

            myBoxes.push(boxInfo)
            BoxNo++
          }
        }
        this.boxes = myBoxes
      },

      // For getting data for drawing using the boxes
      getLinesSvgData(){
        this.setBoxes()
        var allLines = []

        for (let boxNo = 0; boxNo <this.boxes.length; boxNo++){
          
          var aBox = this.boxes[boxNo]
          const line1 = [aBox.xStart, aBox.yStart, aBox.xEnd, aBox.yStart]
          const line2 = [aBox.xStart, aBox.yEnd, aBox.xEnd, aBox.yEnd]
          const line3 = [aBox.xStart, aBox.yStart, aBox.xStart, aBox.yEnd]
          const line4 = [aBox.xEnd, aBox.yStart, aBox.xEnd, aBox.yEnd]

          const lines = [line1, line2, line3, line4]

          for (const line of lines) { 
            if(!allLines[[line]]){
              allLines[[line]] = new Array()
              allLines[[line]].push(aBox.boxId)
            }
            else{
              allLines[[line]].push(aBox.boxId)
            }
          }
        }

        this.lineComponents = allLines
        },

        // Setting coordinates for circles
        setCircleSvgData(){

          // Setting up the circles
          for (let i = 1; i <= this.$props.dotsNo; i++) {  
              var xCoordinate = i*this.sizeMultiplier;
              for (let j = 1; j <= this.$props.dotsNo; j++) {
                var yCoordinate = j*this.sizeMultiplier;
                this.dotComponents.push([xCoordinate,yCoordinate])
              }
          }
        },

        // Initialise boxCountArray (tracks how many lines belonging to a given box have been clicked)
        initialiseBoxCount(){
          var boxArray = []
          for(let boxNo = 0; boxNo <this.boxes.length; boxNo++){
            boxArray[boxNo] =0
          }
          this.boxCountArray = boxArray
        },

        // TO increase box count of boxes to which a line belong, invoked when it clicked
        increaseBoxCount(boxIds, lineCoordinates){
          
          // Getting the the Line by its Id
          const lineElement = document.getElementById('line-'+lineCoordinates)
          lineElement.setAttribute("stroke", this.playerColors[this.currentPlayer-1])
          lineElement.setAttribute("visibility","visible")
          lineElement.removeAttribute("cursor")
          
          // Updating stuff
          var boxesCompletedThisTurn = false
          for(const boxId of boxIds){
            this.boxCountArray[boxId]++
            if(this.boxCountArray[boxId]==4){
              this.boxesCompleted += 1
              this.playerScores[this.currentPlayer-1]++
              const boxWonDetails = this.boxes.filter(box => box.boxId == boxId)[0]
              this.boxesWon[this.currentPlayer-1].push(boxWonDetails)
              boxesCompletedThisTurn = true
            }
          }
          if(!boxesCompletedThisTurn){
            this.changeTurn()
          }

          // In order to give some time for showing the line color change, before
          // going to the gameOver page, when condition is met
          // Also it repeatedly checks for whether gameOver condition is met, after
          // each line click 
          setTimeout(() => this.gameOverCheck(), 200)
        }
    }
}
</script>
