import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';

export const HeaderWrapper = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 32px;
    background-color: #f8f9fa;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const LeftSection = styled.div`
    display: flex;
    align-items: center;
    gap: 32px;
`;

export const Logo = styled.div`
    font-size: 24px;
    font-weight: bold;
`;

export const NavLinks = styled.nav`
    font-size: 18px;
    font-weight: bolder;
    display: flex;
    gap: 20px;
`;

export const NavLink = styled(RouterLink)`
    text-decoration: none;
    color: #333;
    font-weight: 500;

    &:hover {
        color: #21867a;
    }
`;

export const SearchWrapper = styled.div`
    flex: 2;
    max-width: 800px;
    margin: 0 0 0 -200px;
`;

export const CartIconWrapper = styled.div`
    position: relative;
    cursor: pointer;
    display: inline-block;
`;

export const CartCountBadge = styled.div`
  position: absolute;
  top: -10px;
  right: -10px;
  background-color: #21867a;
  color: white;
  font-size: 10px;
  font-weight: 700;
  padding: 2px 5px;
  border-radius: 10px;
  min-width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
  user-select: none;
  pointer-events: none;
`;
