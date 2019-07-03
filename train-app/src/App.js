import React from 'react';
import logo from './logo.svg';
import './App.css';

// uses the WMATA Train Positions API
class TrainPositions extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      TrainPositions: {}
    };
  }

  //fetch the WMATA Train Positions API
  componentDidMount()
  {
    // API URL
    var url = 'https://api.wmata.com/TrainPositions/TrainPositions?contentType=json';

    fetch(url, {
      method: 'GET',
      headers: {
        // in a real app, need to hide api key
        'api_key': '8f953318a5d847e2b8f4fcca7c5d1b4c'
      }
    })
    .then(res => res.json())
    .then(
      // set state if api is accessed
      (result) => {
        this.setState({
          isLoaded: true,
          TrainPositions: result.TrainPositions
        });
      },
      // set error if api cannot be accessed
      (error) => {
        this.setState({
          isLoaded: true,
          error
        });
      }
    )
  }
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <ul>
          { TrainPositions.state.TrainPositions.map(TrainPositions =>
            <li key={TrainPositions.TrainId}>
              {TrainPositions.TrainId}
            </li>
          )}
        </ul>
      </header>
    </div>
  );
}

export default App;
