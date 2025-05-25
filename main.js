import './style.css'
import { setupCounter } from './counter.js'

// Initialise le bouton uniquement (plus de innerHTML)
const counterButton = document.querySelector('#counter')
setupCounter(counterButton)

