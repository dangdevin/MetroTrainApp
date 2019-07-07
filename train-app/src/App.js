import React from 'react';
import logo from './logo.svg';
import './App.css';

// filters through the data
class FilterMenu extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state = {
      linevalue: null, 
      servicetypevalue: null, 
      carcountvalue: null
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event)
  {
    console.log(event.target.value);
    this.setState({ [event.target.name] : event.target.value });
  }

  handleSubmit(event)
  {
    event.preventDefault();
    alert('Searching for ' + this.state.linevalue + ' ' + this.state.servicetypevalue + ' ' + this.state.carcountvalue + ' type of train.');
    console.log(this.lineFilter);
    console.log(this.serviceTypeFilter);
    console.log(this.carCountFilter);
  }

  componentDidMount()
  {
    this.props.passRefUpward(this.refs);
  }
  
  render()
  {
    return (
      <form onSubmit={this.handleSubmit}>
        
        <label>
          What line?
          <select name = "linevalue" linevalue ={this.state.linevalue} onChange = {this.handleChange} ref={lineFilter => this.lineFilter = lineFilter}>
            <option linevalue></option>
            <option linevalue="RD">Red</option>
            <option linevalue="BL">Blue</option>
            <option linevalue="YL">Yellow</option>
            <option linevalue="OR">Orange</option>
            <option linevalue="GR">Green</option>
            <option linevalue="SV">Silver</option>
          </select>
        </label>
        
        <br />
       
        <label>
          Which service type?
          <select name ="servicetypevalue" servicetypevalue ={this.state.servicetypevalue} onChange = {this.handleChange} ref={serviceTypeFilter => this.serviceTypeFilter = serviceTypeFilter}>
            <option servicetypevalue></option>
            <option servicetypevalue="NoPassengers">No Passengers</option>
            <option servicetypevalue="Normal">Normal</option>
            <option servicetypevalue="Special">Special</option>
            <option servicetypevalue="Unknown">Unknown</option>
          </select>
        </label>

        <br />

        <label>
          Which car count?
          <select name = "carcountvalue" carcountvalue ={this.state.carcountvalue} onChange = {this.handleChange} ref={carCountFilter => this.carCountFilter = carCountFilter}>
            <option carcountvalue></option>
            <option carcountvalue="0">0</option>
            <option carcountvalue="6">6</option>
            <option carcountvalue="8">8</option>
          </select>
        </label>

        <br />
        <input type="submit" value="Submit" />
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
      TrainPositions: {},
      lineFilter: null
    };
    this.getRefsFromFilterMenu = this.getRefsFromFilterMenu.bind(this);
  }

  getRefsFromFilterMenu(childRefs)
  {
    this.setState({
      myRefs: childRefs
    });
    console.log(this.state.myRefs);
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
        <div>
          <FilterMenu passRefUpward = {this.getRefsFromFilterMenu}/>
          <table>
            <tbody>{TrainPositions.map(TrainPositions =>(
              <tr key={TrainPositions.TrainId}>
                <td>Train #{TrainPositions.TrainNumber}</td> 
                <td>Line: {TrainPositions.LineCode}</td> 
                <td>Service Type: {TrainPositions.ServiceType}</td> 
                <td>Car Count: {TrainPositions.CarCount}</td>
              </tr>
            ))}</tbody>
          </table>

        </div>
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
        <TrainPositions/>
      </header>
    </div>
  );
}

export default App;
