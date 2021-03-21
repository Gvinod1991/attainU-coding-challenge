import React, { useState } from 'react';
import Grid from './components/Grid';
import GameEntryForm from './components/GameEntryForm';
import './index.scss';

function App() {
  const [rows, setRows] = useState(0);
  const [columns, setColumns] = useState(0);
  const minRows = 5;
  const minColumns = 5;
  const handleSubmit = (rows, columns) => {
    setRows(parseInt(rows));
    setColumns(parseInt(columns));
  }
  return (
    <div className="App">
      <h1 className="text-center">Board Game</h1>
      {rows === 0 && columns === 0 &&
        <GameEntryForm handleSubmit={handleSubmit} />
      }
      {rows > minRows && columns > minColumns ?
        <Grid rowLength={rows} columnLength={columns} />
        : null
      }
    </div>
  );
}

export default App;
