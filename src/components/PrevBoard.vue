<template>
    <div>
        <svg viewBox="0 0 42 42" xmlns="http://www.w3.org/2000/svg">
            
            <circle cx="2" cy="2" r="2" fill="red" />
            <circle cx="40" cy="2" r="2" fill="red" />
            <circle cx="2" cy="40" r="2" fill="red" />
            <circle cx="40" cy="40" r="2" fill="red" />
            <line x1="2" y1="2" x2="2" y2="40" stroke="black"/>
            <line x1="2" y1="40" x2="40" y2="40" stroke="black"/>
            <line x1="40" y1="40" x2="40" y2="2" stroke="black"/>
            <line x1="40" y1="2" x2="2" y2="2" stroke="black"/>
        </svg>
    </div>
  </template>
  
  <style scoped>
    svg {
        position: relative;
    }
  </style>
  