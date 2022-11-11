<script setup>
  import BoxLine from './BoxLine.vue';
  import TurnDashboard from './TurnDashboard.vue';
  import ScoreDashboard from './ScoreDashboard.vue';
</script>
<template>
    <TurnDashboard :playerNo="this.currentPlayer"/>
    <ScoreDashboard :playerScores="this.playerScores"/>
    <div>
      <svg viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
        <template v-for="lineComponent in Object.entries(lineComponents)">
          <BoxLine 
          :id="'line-'+lineComponent[0]"
          :boxId="lineComponent[1]" 
          :lineCoordinates="lineComponent[0]" 
          stroke="blue"
          cursor="pointer"
          @increaseBoxCount="increaseBoxCount"
          />
        </template>
        <circle v-for="dotComponent in dotComponents" :cx="dotComponent[0]" :cy="dotComponent[1]" r="20" fill="red"/>
      </svg>
    </div>
</template>
<script>

export default {
    props: {
        dotsNo: {
            type: Number,
            default: 4
        },
        noOfPlayers: {
          type: Number,
          default: 2
        }
    },
   
    data() {
        return {
            rowsAndColumnsNo: null,
            boxes: [], 
            dotComponents: [],
            lineComponents: [],
            sizeMultiplier: 200,
            boxCountArray: [],
            boxesCompleted: 0,
            currentPlayer: 1,
            playerScores: [],
            playerColors: ["red", "yellow", "green"]
        }
    },

    beforeMount(){
      this.rowsAndColumnsNo = this.$props.dotsNo-1
      this.setSvgData()
      this.initialiseBoxCount()
      this.initialisePlayerScore()
    },

    computed: {

      // gameOver(){
      //   if (this.boxesCompleted == (this.$props.dotsNo -1)*(this.$props.dotsNo -1)){
      //     alert("YESSSSSS GAME OVER")
      //   }
      // },
    },

    methods: {

      initialisePlayerScore(){
        var scoresArray = []

        for (let scoreNo = 0; scoreNo < this.noOfPlayers; scoreNo++) {
          scoresArray.push(0)
        }
        this.playerScores = scoresArray
      },

      changeTurn(){
        if(this.currentPlayer == this.$props.noOfPlayers){
          this.currentPlayer = 1
        }
        else {
          this.currentPlayer = this.currentPlayer + 1
        }
      },

      gameOverMessage(){
        if (this.boxesCompleted == (this.$props.dotsNo -1)*(this.$props.dotsNo -1)){
          alert("YESSSSSS GAME OVER")
        }
      },

      setSvgData(){
        this.setCircleSvgData()
        this.getLinesSvgData()
      },


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

        // changePlayerTurn(){
        //     this.currentPlayerID = ((this.currentPlayerID) % this.$props.totalPlayers)+1 ;
        //     console.log(this.playerTurn)
        // },

        initialiseBoxCount(){
          var boxArray = []
          for(let boxNo = 0; boxNo <this.boxes.length; boxNo++){
            boxArray[boxNo] =0
          }
          this.boxCountArray = boxArray
        },

        increaseBoxCount(boxIds, lineCoordinates){
          
          // First printing which line
          const lineElement = document.getElementById('line-'+lineCoordinates)
          lineElement.setAttribute("stroke", this.playerColors[this.currentPlayer-1])
          lineElement.setAttribute("visibility","visible")
          lineElement.removeAttribute("cursor")
          
          var boxesCompletedThisTurn = false
          for(const boxId of boxIds){
            this.boxCountArray[boxId]++
            if(this.boxCountArray[boxId]==4){
              console.log(boxId,' completed')
              this.boxesCompleted += 1
              this.playerScores[this.currentPlayer-1]++
              boxesCompletedThisTurn = true
            }
          }
          if(!boxesCompletedThisTurn){
            console.log('yes')
            this.changeTurn()
          }
          
          setTimeout(() => this.gameOverMessage(), 200)

          
        }
    }

}
</script>

