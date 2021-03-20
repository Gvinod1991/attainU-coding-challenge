import Grid from './components/Grid';
import './index.scss';

function App() {
  return (
    <div className="App">
      <h1 className="text-center">Board Game</h1>
      <Grid rowLength={10} columnLength={10} />
    </div>
  );
}

export default App;
