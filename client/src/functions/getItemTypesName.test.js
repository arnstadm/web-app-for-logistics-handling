import getItemTypesName from './getItemTypesName';

describe('Unit test for getItemTypesName', () => {
  it('should return an error when trying to fetch without token', async () => {
    const res = await getItemTypesName();
    expect(res.message).toEqual('Unauthorized');
  });
});
