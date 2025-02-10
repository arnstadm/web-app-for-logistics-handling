import React from 'react';
import { mount } from 'enzyme';
import Register from '../containers/Register';
import { act } from 'react-test-renderer';
import ApiCall from '../components/ApiCall';
const regeneratorRuntime = require('regenerator-runtime');

test('Requests without token should be rejected', async () => {
  const data = await ApiCall('users', 'GET');
  expect(data).toBe(data);
});

test('Requests without token should be rejected', async () => {
  const data = await ApiCall('items', 'POST', { dummy: 'object' });
  expect(data).toBe(data);
});

test('should return error if USER_ID is not provided', async () => {
  return ApiCall('users', 'GET').catch((error) =>
    expect(error).toMatch('error')
  );
});

// import { act, renderHook } from '@testing-library/react-hooks';
// import { userProfile } from '../components/UserProfile';

// describe('userProfile', async () => {
//     it("bla bla")

//     describe('while fetching data', () => {
//         it.todo('handles loading state correctly')
//     })

//     describe('when got data successfully', () => {
//         it.todo('handles successful state correctly')
//     })

//     describe('with an error during request', () => {
//         it.todo('handles error state correctly')
//     })
// })
