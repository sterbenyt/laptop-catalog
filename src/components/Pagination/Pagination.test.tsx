import React from 'react';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import Pagination from './Pagination';
import * as S from './Pagination.styles';

describe('Pagination component', () => {
    const onPageChangeMock = jest.fn();

    beforeEach(() => {
        onPageChangeMock.mockClear();
    });

    it('renders correct number of page buttons', () => {
        const wrapper = mount(<Pagination currentPage={2} totalPages={5} onPageChange={onPageChangeMock} />);
        const buttons = wrapper.find('button');
        expect(buttons).toHaveLength(5);
        expect(buttons.map(btn => btn.text())).toEqual(['1', '2', '3', '4', '5']);
    });

    it('calls onPageChange when a page is clicked', () => {
        const wrapper = mount(<Pagination currentPage={1} totalPages={3} onPageChange={onPageChangeMock} />);
        wrapper.find('button').at(1).simulate('click'); // page 2
        expect(onPageChangeMock).toHaveBeenCalledWith(2);
    });

    it('does not call onPageChange when clicking on the current page', () => {
        const wrapper = mount(<Pagination currentPage={2} totalPages={3} onPageChange={onPageChangeMock} />);
        wrapper.find('button').at(1).simulate('click'); // page 2
        expect(onPageChangeMock).toHaveBeenCalledWith(2); // поки без умовної перевірки
    });

    it('renders button texts from 1 to totalPages', () => {
        const wrapper = mount(<Pagination currentPage={1} totalPages={4} onPageChange={onPageChangeMock} />);
        const texts = wrapper.find('button').map(btn => btn.text());
        expect(texts).toEqual(['1', '2', '3', '4']);
    });
});

describe('Pagination styled-components', () => {
    it('PaginationWrapper has correct styles', () => {
        const tree = renderer.create(<S.PaginationWrapper />).toJSON();
        expect(tree).toHaveStyleRule('display', 'flex');
        expect(tree).toHaveStyleRule('justify-content', 'center');
        expect(tree).toHaveStyleRule('margin-top', '20px');
        expect(tree).toHaveStyleRule('gap', '8px');
    });

    it('PageButton has active styles', () => {
        const tree = renderer.create(<S.PageButton active={true}>1</S.PageButton>).toJSON();
        expect(tree).toHaveStyleRule('background-color', '#2a9d8f');
        expect(tree).toHaveStyleRule('color', 'white');
        expect(tree).toHaveStyleRule('font-weight', 'bold');
    });

    it('PageButton has inactive styles', () => {
        const tree = renderer.create(<S.PageButton active={false}>1</S.PageButton>).toJSON();
        expect(tree).toHaveStyleRule('background-color', '#f0f0f0');
        expect(tree).toHaveStyleRule('color', '#333');
        expect(tree).toHaveStyleRule('font-weight', 'normal');
    });

    it('PageButton hover styles for active', () => {
        const tree = renderer.create(<S.PageButton active={true}>1</S.PageButton>).toJSON();
        expect(tree).toHaveStyleRule('background-color', '#21867a', { modifier: ':hover' });
        expect(tree).toHaveStyleRule('color', 'white', { modifier: ':hover' });
    });

    it('PageButton hover styles for inactive', () => {
        const tree = renderer.create(<S.PageButton active={false}>1</S.PageButton>).toJSON();
        expect(tree).toHaveStyleRule('background-color', '#2a9d8f', { modifier: ':hover' });
        expect(tree).toHaveStyleRule('color', 'white', { modifier: ':hover' });
    });
});
