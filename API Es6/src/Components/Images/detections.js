//import tf from '@tensorflow/tfjs-node';
//import toUint8Array from 'base64-to-uint8array';
//import { cocossd } from './cocossd';

const toUint8Array = require('base64-to-uint8array');
const cocossd = require('./cocossd');
const tf = require('@tensorflow/tfjs-node');

const imageDetections = async (req, res) => {
  const imageData = req.body.imageData
    .replace('data:image/jpeg;base64', '')
    .replace('data:image/png;base64', '');
  const imageArray = toUint8Array(imageData);
  const tensor3d = tf.node.decodeJpeg(imageArray, 3);
  const model = await cocossd.load({
    base: 'mobilenet_v2',
  });
  const predictions = await model.detect(tensor3d);

  return res.status(200).json(predictions);
};

module.exports = { imageDetections };
