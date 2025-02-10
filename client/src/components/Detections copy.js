import React, { Component } from 'react';
import { getItemTypes } from '../components/UserFunctions';

export default class Detections extends Component {
  constructor(props) {
    super(props);
    this.state = {
      predictions: props.predictions,
      predicted: false
    };
  }

  componentDidMount() {
    this.fetchData();
  }
  fetchData() {
    getItemTypes()
      .then(res => {
        this.setState({
          types: res.data
        });
      })
      .catch(error => {});
  }

  componentDidUpdate(prevProps) {
    if (this.props.predictions !== prevProps.predictions) {
      this.setState({
        predictions: this.props.predictions,
        predicted: true
      });
    }
  }

  render() {
    const predictions = this.state.predictions.map((item, i) => {
      return (
        <div key={i} className='predictionCard'>
          <p>
            Item class: <input value={item.class}></input>
          </p>
          <p> Score: {item.score}</p>
          <p> Antall: </p>
        </div>
      );
    });

    return <div>{predictions}</div>;
  }
}
