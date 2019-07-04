import React from 'react';
import logo from './logo.svg';
import './App.css';

// button that toggles on and off
class Button extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state = {isToggleOn: true};

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick()
  {
    this.setState(state => ({
      isToggleOn: !state.isToggleOn
    }));
  }

  render() {
    console.log(this.state.isToggleOn);    
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'Show' : 'Hide'}
      </button>
    );
  }
}

// filters through the data
class Filter extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state = {lineValue: null, serviceTypeValue: null, carCountValue: null};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event)
  {
    this.setState({value: event.target.value});
  }

  handleSubmit(event)
  {
    event.preventDefault();
  }
  
  render()
  {
    return (
      <form onSubmit={this.handleSubmit}>
        
        <label>
          What line?
          <select lineValue ={this.state.lineValue} onChange = {this.handleChange}>
            <option lineValue="RD">Red</option>
            <option lineValue="BL">Blue</option>
            <option lineValue="YL">Yellow</option>
            <option lineValue="OR">Orange</option>
            <option lineValue="GR">Green</option>
            <option lineValue="SV">Silver</option>
          </select>
        </label>
        
        <br />
       
        <label>
          Which service type?
          <select serviceTypeValue ={this.state.serviceTypeValue} onChange = {this.handleChange}>
            <option serviceTypeValue="NoPassengers">No Passengers</option>
            <option serviceTypeValue="Normal">Normal</option>
            <option serviceTypeValue="Special">Special</option>
            <option serviceTypeValue="Unknown">Unknown</option>
          </select>
        </label>

        <br />

        <label>
          Which car count?
          <select carCountValue ={this.state.carCountValue} onChange = {this.handleChange}>
            <option carCountValue="0">0</option>
            <option carCountValue="6">6</option>
            <option carCountValue="8">8</option>
          </select>
        </label>

        <br />
        <input type="submit" value="Submit"/>
      </form>
    )
  }
}

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

  render() {
    const { error, isLoaded, TrainPositions } = this.state;
    if (error) 
    {
      return <div>Error: {error.message}</div>;
    }
    else if (!isLoaded)
    {
      return <div>Loading!</div>;
    }
    else
    {
      return (
        <ul>
          {TrainPositions.map(TrainPositions =>(
            <li key={TrainPositions.TrainId}>
              Train #{TrainPositions.TrainId}, Line: {TrainPositions.LineCode}, Service Type: {TrainPositions.ServiceType}, Car Count: {TrainPositions.CarCount}
            </li>
          ))}
        </ul>
      );
    }
  }
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          WMATA Metro Train App
        </p>
        <Button showTrainPositions/>
        <Filter>
        </Filter>
        <TrainPositions/>
      </header>
    </div>
  );
}

export default App;
