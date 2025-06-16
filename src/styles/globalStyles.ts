import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    
  html, body, #root {
    height: 100%;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
      
  /* Скидання стилів браузера */
  *, *::before, *::after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    background-color: #f9f9f9;
    color: #222;
    line-height: 1.6;
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0 0 1rem 0;
    font-weight: 600;
  }

  p {
    margin: 0 0 1rem 0;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  ul, ol {
    padding-left: 1.5rem;
  }

  button {
    font-family: inherit;
    cursor: pointer;
    border: none;
    background: none;
  }

  img {
    max-width: 100%;
    display: block;
  }

  /* Додаткові класи, якщо потрібно */
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }
`;

export default GlobalStyle;
