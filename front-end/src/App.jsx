// CSS
import './App.css'

// React
import { useCallback, useEffect, useState } from 'react'

// data
import {wordsList} from './data/words'

// components
import StartScreen from './components/StartScreen'
import GameOver from './components/GameOver'
import Game from './components/Game'

// stages in game
const stages = [
  {id: 1, name: 'start'},
  {id: 2, name: 'game'},
  {id: 3, name: 'end'}
]

function App() {

  // start game in stage 'start'
  const [gameStage, setGameStage] = useState(stages[0].name)

  // words list
  const [words] = useState(wordsList)

  const [pickedWord, setPickedWord] = useState('')
  const [pickedCategory, setPickedCategory] = useState('')
  const [letters, setLetters] = useState([])

  const pickWordAndCategory = () => {
    // pick a random category
    const categories = Object.keys(words)

    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)]
    console.log(category)

    // pick a random word
    const word = words[category][Math.floor(Math.random() * words[category].length)]
    console.log(word)

    return {word, category}
  }


  // starts the secret word game
  const startGame = () => {

    // pick word and pick category
    const {word, category} = pickWordAndCategory()

    // create an array of letters
    let wordLetters = word.split('')
    
    // changing the word to lowerCase
    wordLetters = wordLetters.map((l) => l.toLowerCase())
    console.log(wordLetters)

    // fill states
    setPickedCategory(word)
    setPickedCategory(category)
    setLetters(letters)

    setGameStage(stages[1].name)
  }

  // process the letter input
  const verifyLetter = () => {
    setGameStage(stages[2].name)
  }

  // restarts the game
  const retry = () => {
    setGameStage(stages[0].name)
  }

  const [count, setCount] = useState(0)

  return (
    <>
      <div className='App'>
        {/* game start */}
        {gameStage === 'start' && <StartScreen startGame={startGame} />}
        {/* game game */}
        {gameStage === 'game' && <Game verifyLetter={verifyLetter} />}
        {/* game end */}
        {gameStage === 'end' && <GameOver retry={retry}/>}
      </div>
    </>
  )
}

export default App
