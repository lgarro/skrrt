/* eslint-disable no-unused-vars */
import App from '../app'
import React from 'react'
import { shallow } from 'enzyme'

describe('App', () => {
    test('should match snapshot', () => {
        const wrapper = shallow(<App />)
        expect(wrapper.find('div').text()).toBe('Welcome to Skrrt React Boilerplate!')
        expect(wrapper).toMatchSnapshot()
    })
})
