import React, { useState } from 'react';
import FormGroup from '../FormGroup';
import Card from '../Card';
import Input from '../Input';
import Button from '../Button';
import { isNumeric } from '../../utilities/validations';

import './gameEntry.scss';


export default function GameEntryForm({ handleSubmit }) {
  const [rows, setRows] = useState("");
  const [columns, setColumns] = useState("");
  const [error, setError] = useState({
    rows: "",
    columns: ""
  });
  const handleBtnClick = () => {
    if (!rows || !isNumeric(rows)) {
      setError((prevState) => ({
        ...prevState,
        rows: "No of rows required"
      }))
      return false;
    } else {
      setError((prevState) => ({
        ...prevState,
        rows: ""
      }))
    }
    if (!columns || !isNumeric(columns)) {
      setError((prevState) => ({
        ...prevState,
        columns: "No of columns required"
      }))
      return false;
    } else {
      setError((prevState) => ({
        ...prevState,
        columns: ""
      }))
    }
    if (rows && columns) {
      handleSubmit(rows, columns);
    }
  }
  return (
    <div className="game-entry-wrapper">
      <Card>
        <FormGroup label="No of Rows for game board">
          <Input value={rows} onChange={(e) => setRows(e.target.value)} />
          {error.rows && <p className="text-danger"> {error.rows}</p>}
        </FormGroup>
        <FormGroup label="No of Columns for game board">
          <Input value={columns} onChange={(e) => setColumns(e.target.value)} />
          {error.columns && <p className="text-danger"> {error.columns}</p>}
        </FormGroup>
        <div className="btn-wrapper">
          <Button onClick={handleBtnClick} >
            Start
          </Button>
        </div>
      </Card>
    </div>
  )
}