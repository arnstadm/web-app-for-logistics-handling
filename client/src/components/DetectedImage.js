import React, { useRef, useEffect } from 'react';

const DetectedImage = (props) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = props.image;
    img.onload = () => {
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      props.predictions.map((prediction) => {
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
        return null;
      });
    };
  }, [props]);

  return (
    <div>
      <canvas ref={canvasRef} width={800} />
    </div>
  );
};
export default DetectedImage;
