import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';
import leftArrow from '../../assets/left-arrow.svg';
import rightArrow from '../../assets/right-arrow.svg';
import upArrow from '../../assets/up-arrow.svg';
import downArrow from '../../assets/down-arrow.svg';
import './grid.scss';

const HERO_POSITION = "heroPosition";
const ENEMY_POSITION = "enemyPosition";

const getRandomNumbers = (rowLength) => {
  let randomNumbers = [];
  while (randomNumbers.length < rowLength) {
    const random = Math.round(Math.random() * rowLength * rowLength);
    if (!randomNumbers.includes(random)) {
      randomNumbers = [...randomNumbers, random];
    }
  }
  return randomNumbers;
}

export default function Grid({ rowLength, columnLength, quit }) {
  const rows = [...Array(rowLength).keys()];
  const columns = [...Array(columnLength).keys()];
  const [randomSprites, setRandomSprites] = useState([]);
  const [movesCount, setMovesCount] = useState(0);
  const [gameOverStatus, setGameOverStatus] = useState(false);
  const [soliderHeroPosition, setSoliderHeroPosition] = useState(rowLength % 10 === 0 ? Math.round((rowLength * columnLength) / 2) - (rowLength / 10) * 5 : Math.round((rowLength * columnLength) / 2));

  useEffect(() => {
    const randomSprites = getRandomNumbers(rowLength);
    setRandomSprites(randomSprites);
  }, [rowLength, setRandomSprites]);

  const restartGame = () => {
    const randomSprites = getRandomNumbers(rowLength);
    setRandomSprites(randomSprites);
    setMovesCount(0);
    setGameOverStatus(false);
  }

  const getSpritePosition = (position) => {
    if (position === soliderHeroPosition) {
      return HERO_POSITION;
    }
    return randomSprites && randomSprites.includes(position) && position !== soliderHeroPosition ? ENEMY_POSITION : "";
  }

  useEffect(() => {
    window.addEventListener('keydown', moveSolider);
    return () => {
      window.removeEventListener('keydown', moveSolider);
    }
  });

  useEffect(() => {
    if (randomSprites.length === 0 && movesCount > 0) {
      setGameOverStatus(true);
    }
  }, [randomSprites, movesCount]);

  const moveSolider = (e) => {
    const code = e.keyCode;
    const arrowKeys = [37, 38, 39, 40];
    const currentRow = Math.ceil(soliderHeroPosition / rowLength);
    if (arrowKeys.includes(code) && randomSprites.length > 0) {
      switch (code) {
        case 37:
          if (soliderHeroPosition > 1) {
            setMovesCount(movesCount + 1);
            setSoliderHeroPosition(soliderHeroPosition - 1);//left
            if (randomSprites.includes(soliderHeroPosition - 1)) {
              let updatedRandomSprites = randomSprites.filter((spritePosition) => soliderHeroPosition - 1 !== spritePosition);
              setRandomSprites(updatedRandomSprites);
            }
          }
          break;
        case 38:
          if (soliderHeroPosition > rowLength) {
            setMovesCount(movesCount + 1)
            setSoliderHeroPosition(soliderHeroPosition - rowLength) //Up
            if (randomSprites.includes(soliderHeroPosition - rowLength)) {
              let updatedRandomSprites = randomSprites.filter((spritePosition) => soliderHeroPosition - rowLength !== spritePosition);
              setRandomSprites(updatedRandomSprites);
            }
          }
          break;
        case 39:
          if (soliderHeroPosition < rowLength * columnLength) {
            setMovesCount(movesCount + 1);
            setSoliderHeroPosition(soliderHeroPosition + 1); //right
            if (randomSprites.includes(soliderHeroPosition + 1)) {
              let updatedRandomSprites = randomSprites.filter((spritePosition) => soliderHeroPosition + 1 !== spritePosition);
              setRandomSprites(updatedRandomSprites);
            }

          }
          break;
        case 40:
          if (soliderHeroPosition < rowLength * columnLength - currentRow) {
            setMovesCount(movesCount + 1);
            setSoliderHeroPosition(soliderHeroPosition + rowLength);//down
            if (randomSprites.includes(soliderHeroPosition + rowLength)) {
              let updatedRandomSprites = randomSprites.filter((spritePosition) => soliderHeroPosition + rowLength !== spritePosition);
              setRandomSprites(updatedRandomSprites);
            }
          }
          break;
        default:
          break;
      }
    }
  }
  let position = 0;
  return (
    <div>
      <div className="row-box">
        <p>Left <img className="icon" src={leftArrow} alt="" /></p>
        <p>Right <img className="icon" src={rightArrow} alt="" /></p>
        <p>Up <img className="icon" src={upArrow} alt="" /></p>
        <p>Down <img className="icon" src={downArrow} alt="" /></p>
      </div>
      <div className="row-box">
        {gameOverStatus && movesCount && movesCount > 0
          && <h3 className="text-success">No of Moves {movesCount}</h3>}
        {gameOverStatus && <h3 className="text-success">Game Over</h3>}
        {gameOverStatus &&
          <div className="btn-wrapper">
            <Button onClick={() => restartGame()}>Play Again</Button>
          </div>
        }
        {gameOverStatus &&
          <div className="btn-wrapper">
            <Button onClick={() => quit(0, 0)}>Quit</Button>
          </div>
        }
      </div>
      <table className="grid">
        <tbody>
          {columns.map((column) => {
            return <tr key={column}>
              {rows.map((row) => {
                position += 1;
                return <td key={position}
                  className={getSpritePosition(position) === HERO_POSITION ?
                    "fill-sprites-hero" : getSpritePosition(position) === ENEMY_POSITION ?
                      "fill-sprites" : ""} >
                </td>
              })}
            </tr>
          })}
        </tbody>
      </table >
    </div>
  )
}

Grid.propTypes = {
  rowLength: PropTypes.number.isRequired,
  columnLength: PropTypes.number.isRequired
}