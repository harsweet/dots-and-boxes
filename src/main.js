import { createApp, h } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import './assets/stylesheets/main.css';

import App from './App.vue'
import StartGame from './StartGame.vue'
import GameOver from './GameOver.vue'
import GameScreen from './GameScreen.vue'


const app = createApp(App)

const routes = [
    { path: '/', component: StartGame },
    { path: '/gameOver', component: GameOver, name: 'gameOver' , props: true},
    { path: '/gameScreen', component: GameScreen },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})
  
app.use(router)
app.mount('#app')
