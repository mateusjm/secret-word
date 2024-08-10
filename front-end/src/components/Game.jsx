import './Game.css'

// stage 1 'game'
const Game = ({verifyLetter}) => {
  return (
    <div className=''>
      <div className="game">
        <p className="points">
          <span>Pontuação: 000</span>
        </p>
      </div>
      <h1>Advinhe a palavra:</h1>
      <h3 className="tip">
        Dica sobre a palavra: <span>Dica...</span>
      </h3>
      <div className='wordcontainer'>
        <span className='letter'>A</span>
        <span className="blankSquare"></span>
        <div className="letterContainer">
          <p>Tente advinhar uma letra da palavra:</p>
          <form>
            <input type="text" name='letter' maxLength='1' required/>
            <button>Jogar!</button>
          </form>
        </div>
        <div className="wrongLettersContainer">
          <p>Letras já utilizadas:</p>
          <span>a</span>
          <span>b</span>
        </div>
      </div>
    </div>
  )
}

export default Game