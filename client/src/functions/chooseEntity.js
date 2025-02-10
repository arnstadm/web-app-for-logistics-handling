const chooseEntity = (type) => {
  switch (type) {
    case 'user':
      return 'users';
    case 'item':
      return 'items';
    case 'itemtype':
      return 'itemtypes';
    case 'project':
      return 'projects';
    default:
      return '';
  }
};
export default chooseEntity;
