import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
   @import url('https://fonts.googleapis.com/css2?family=Gowun+Batang:wght@400;700&family=Sofadi+One&display=swap');
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    body{
        font-family: 'Sofadi One';
    }

    body::-webkit-scrollbar{
        width: 0px;
    }
`;