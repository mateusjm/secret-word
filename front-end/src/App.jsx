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

const guessesQty = 3

function App() {

  // start game in stage 'start'
  const [gameStage, setGameStage] = useState(stages[0].name)

  // words list
  const [words] = useState(wordsList)

  const [pickedWord, setPickedWord] = useState('')
  const [pickedCategory, setPickedCategory] = useState('')
  const [letters, setLetters] = useState([])

  const [guessedLetters, setGuessedLetters] = useState([])
  const [wrongLetters, setWrongLetters] = useState([])
  const [guesses, setGuesses] = useState(guessesQty)
  const [score, setScore] = useState(0)

  const pickWordAndCategory = useCallback(() => {
    // pick a random category
    const categories = Object.keys(words)

    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)]
    console.log(category)

    // pick a random word
    const word = words[category][Math.floor(Math.random() * words[category].length)]
    console.log(word)

    return {word, category}
  }, [words])


  // starts the secret word game
  const startGame = useCallback(() => {
    // clear all letters
    clearLetterStates()

    // pick word and pick category
    const {word, category} = pickWordAndCategory()

    // create an array of letters
    let wordLetters = word.split('')
    
    // changing the word to lowerCase
    wordLetters = wordLetters.map((l) => l.toLowerCase())

    console.log(word, category)
    console.log(wordLetters)

    // fill states
    setPickedWord(word)
    setPickedCategory(category)
    setLetters(wordLetters)

    setGameStage(stages[1].name)
  }, [pickWordAndCategory])

  // process the letter input
  const verifyLetter = (letter) => {
    const normalizedLetter = letter.toLowerCase()

    // check if letter has already been utilized
    if(guessedLetters.includes(normalizedLetter) || wrongLetters.includes(normalizedLetter)) {
      return
    }

  // push guessed letter or remove a guess
  if(letters.includes(normalizedLetter)) {
    setGuessedLetters((actualGuessedLettters)=> [
      ...actualGuessedLettters,
      normalizedLetter
    ])
  } else {
    setWrongLetters((actualWrongLetters)=> [
      ...actualWrongLetters,
      normalizedLetter
    ])

    setGuesses((actualGuesses)=> actualGuesses - 1)
  }
  }

  const clearLetterStates = () => {
    setGuessedLetters([])
    setWrongLetters([])
  }

  // check if guesses endend
  useEffect(()=> {
    if(guesses <= 0) {
      // reset all states
      clearLetterStates()

      setGameStage(stages[2].name)
    }
  }, [guesses])

  // check win condition
  useEffect(()=> {
    const uniqueLetters = [...new Set(letters)]
    console.log(uniqueLetters)

    // win condition
    if(guessedLetters.length === uniqueLetters.length) {
      // add score
      setScore((actualScore)=> actualScore += 100)

      // restart game with new word
      startGame()
    }

  }, [guessedLetters, letters, startGame])

  // restarts the game
  const retry = () => {
    setScore(0)
    setGuesses(guessesQty)

    setGameStage(stages[0].name)
  }

  const [count, setCount] = useState(0)

  return (
    <>
      <div className='App'>
        {/* game start */}
        {gameStage === 'start' && <StartScreen startGame={startGame} />}
        {/* game game */}
        {gameStage === 'game' && (
          <Game 
            verifyLetter={verifyLetter} 
            pickedWord={pickedWord} 
            pickedCategory={pickedCategory} 
            letters={letters} 
            guessedLetters={guessedLetters}
            wrongLetters={wrongLetters}
            guesses={guesses}
            score={score}
            retry = {retry}
          />
        )}
        {/* game end */}
        {gameStage === 'end' && <GameOver retry={retry} score={score}/>}
      </div>
    </>
  )
}

export default App
