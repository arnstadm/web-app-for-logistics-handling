import ApiCall from '../components/ApiCall';

const getItemTypesName = async () => {
  try {
    const type = await ApiCall('itemtypes', 'GET');
    return type;
  } catch (error) {
    console.log(error);
    return 'error';
  }
};
export default getItemTypesName;
