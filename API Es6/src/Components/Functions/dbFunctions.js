import pgp from 'pg-promise';

const setValues = (obj) => {
  const props = Object.keys(obj);
  const s = props.map((m) => {
    return m + '=${' + m + '}';
  });
  return pgp.as.format(s.join(', '), obj);
};

module.export = setValues;
