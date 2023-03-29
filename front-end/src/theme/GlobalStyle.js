import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  body {
    background-color: ${(props) => props.theme.body};
    z-index: -1;
    #root {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .all {
      opacity: ${(props) => props.theme.opacity};;
    }
    .login {
      color: ${(props) => props.theme.fontColor};;
    }
    span, p, label, tr {
      color: ${(props) => props.theme.fontColor};;
    }
    h1 {
      color: ${(props) => props.theme.fontColor};;
    }
    .search-div{
      /* background-color: ${(props) => props.theme.body}; */
    }
    .button {
      &:disabled {
        color: ${(props) => props.theme.fontColor};
    }
    }
    .card, .order-header {
      color: ${(props) => props.theme.fontColor};
      background: ${(props) => props.theme.cardColor};
    }
    .header-div {
      border-bottom: solid 2px ${(props) => props.theme.headerBorder};
    }
    .header-btn {
      color: ${(props) => props.theme.fontColor};;
    }
    .music_card-false {
      border: solid 1px ${(props) => props.theme.fontColor};
    }
    .favorite {
      border: solid 1px ${(props) => props.theme.fontColor};
    }
  }
`;
