import Login from '../TestApp';
import React from 'react';
import { mount, shallow } from 'enzyme';
import { act } from 'react-dom/test-utils';

describe('<Login /> with no props', () => {
  const wrapper = shallow(<Login />);
  /*it('should match the snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
*/
  it('should have email and password fields and a button', () => {
    expect(wrapper.find('input[type="email"]').length).toEqual(1);
    expect(wrapper.find('input[type="password"]').length).toEqual(1);
    expect(wrapper.find('input[type="button"]').length).toEqual(1);
  });

  it('should be possible to login using email and password', () => {
    const emailInput = wrapper.find('input[type="email"]');
    const passwordInput = wrapper.find('input[type="password"]');
    const submitButton = wrapper.find('input[type="button"]');
    emailInput.simulate('change', {
      target: { value: 'test33@test.no' },
    });
    expect(emailInput.prop('value')).toEqual('test33@test.no');
    passwordInput.simulate('change', {
      target: { value: '12345' },
    });
    expect(passwordInput.prop('value')).toEqual('12345');
    submitButton.simulate('click');
    //expect(initialProps.onSubmit).toHaveBeenCalledTimes(1);
  });
});
