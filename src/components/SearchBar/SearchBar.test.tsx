import React from 'react';
import { shallow } from 'enzyme';
import SearchBar from './SearchBar';
import { SearchInput, SearchContainer } from './SearchBar.styles';

describe('SearchBar component', () => {
    it('renders without crashing', () => {
        const wrapper = shallow(<SearchBar />);
        expect(wrapper.exists()).toBe(true);
    });

    it('renders SearchContainer and SearchInput styled components', () => {
        const wrapper = shallow(<SearchBar />);
        expect(wrapper.find(SearchContainer).length).toBe(1);
        expect(wrapper.find(SearchInput).length).toBe(1);
    });

    it('has empty initial query value', () => {
        const wrapper = shallow(<SearchBar />);
        expect(wrapper.find(SearchInput).prop('value')).toBe('');
    });

    it('updates query state and calls onSearch prop on input change', () => {
        const onSearchMock = jest.fn();
        const wrapper = shallow(<SearchBar onSearch={onSearchMock} />);
        const input = wrapper.find(SearchInput);

        input.simulate('change', { target: { value: 'test query' } });

        expect(wrapper.find(SearchInput).prop('value')).toBe('test query');
        expect(onSearchMock).toHaveBeenCalledWith('test query');
    });

    it('does not throw error or call onSearch if onSearch prop is not provided', () => {
        const wrapper = shallow(<SearchBar />);
        const input = wrapper.find(SearchInput);

        expect(() => {
            input.simulate('change', { target: { value: 'test' } });
        }).not.toThrow();
    });

    it('prevents form submission default behavior', () => {
        const wrapper = shallow(<SearchBar />);
        const form = wrapper.find('form');
        const preventDefaultMock = jest.fn();

        form.simulate('submit', { preventDefault: preventDefaultMock });

        expect(preventDefaultMock).toHaveBeenCalled();
    });
});
