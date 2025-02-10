import React, { Component } from 'react';

export default class DetectedImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: this.props.image,
      predictions: []
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.predictions !== prevProps.predictions) {
      this.setState({
        predictions: this.props.predictions,
        image: this.props.image
      });
    }
    this.drawImage();
  }

  drawImage() {
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = this.state.image;
    img.onload = () => {
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      this.state.predictions.map(prediction => {
        ctx.beginPath();
        let color = '#' + Math.floor(Math.random() * 16777215).toString(16);
        ctx.strokeStyle = color;
        ctx.fillStyle = color;

        ctx.rect(
          prediction.bbox[0],
          prediction.bbox[1],
          prediction.bbox[2],
          prediction.bbox[3]
        );
        ctx.stroke();
        ctx.font = '20px Courier';
        ctx.fillText(
          prediction.class,
          prediction.bbox[0] - 20,
          prediction.bbox[1] - 20
        );
        ctx.fillText(prediction.score, prediction.bbox[1], prediction.bbox[1]);
      });
    };
  }

  render() {
    return (
      <div>
        <canvas ref='canvas' width={800} />
      </div>
    );
  }
}
