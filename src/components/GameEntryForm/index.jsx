import React, { useState } from 'react';
import FormGroup from '../FormGroup';
import Card from '../Card';
import Input from '../Input';
import Button from '../Button';
import './gameEntry.scss';

export default function GameEntryForm({ handleSubmit }) {
  const [rows, setRows] = useState(0);
  const [columns, setColumns] = useState(0);
  return (
    <div className="game-entry-wrapper">
      <Card>
        <FormGroup label="No of Rows">
          <Input value={rows} onChange={(e) => setRows(e.target.value)} />
        </FormGroup>
        <FormGroup label="No of Rows">
          <Input value={columns} onChange={(e) => setColumns(e.target.value)} />
        </FormGroup>
        <div className="btn-wrapper">
          <Button onClick={() => handleSubmit(rows, columns)} >
            Submit
          </Button>
        </div>
      </Card>
    </div>
  )
}