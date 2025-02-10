import classes from './classes';
const getClasses = (req, res) => {
  return res.status(200).json({ classes: classes });
};
module.exports = { getClasses };
