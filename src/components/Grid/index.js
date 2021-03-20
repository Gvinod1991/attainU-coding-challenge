import React from 'react';
import PropTypes from 'prop-types';
import './grid.scss';


const HERO_POSITION = "heroPosition";
const ENEMY_POSITION = "enemyPosition";

export default function Grid({ rowLength, columnLength }) {
  const rows = [...Array(rowLength).keys()];
  const columns = [...Array(columnLength).keys()];
  const soliderHeroPosition = rowLength % 10 === 0 ? Math.round((rowLength * columnLength) / 2) - (rowLength / 10) * 5 : Math.round((rowLength * columnLength) / 2);

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

  const randomSprites = getRandomNumbers(rowLength);

  const getSpritePosition = (position) => {
    if (position === soliderHeroPosition) {
      return HERO_POSITION;
    }
    return randomSprites.includes(position) && position !== soliderHeroPosition ? ENEMY_POSITION : "";
  }
  let position = 0;
  return (
    <table className="grid">
      <tbody>
        {columns.map((column) => {
          return <tr>
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
  )
}

Grid.propTypes = {
  rowLength: PropTypes.number.isRequired,
  columnLength: PropTypes.number.isRequired
}