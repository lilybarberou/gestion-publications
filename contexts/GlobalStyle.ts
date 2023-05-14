import { createGlobalStyle } from "styled-components";

export const globalTheme = {
    primary: '#2663de',
    primaryDark: '#2b1a97',
    background: '#1e1e1e',
    font: "'Poppins', sans-serif",
};

export const GlobalStyle = createGlobalStyle<{ theme: { background: string; primary: string; font: string } }>`
    body {
        font-family: ${({ theme }) => theme.font};
        background: ${({ theme }) => theme.background};
        color: white;
    }

    *::selection {
        color: #fff;
        background-color: ${({ theme }) => theme.primary};
    }

    * {
        margin: 0;
        padding: 0;
    }

    a {
        text-decoration: none;
        color: white;
        transition: .3s;
        
        :hover {
            color: ${({ theme }) => theme.primary};
        }
    }

    &::-webkit-scrollbar {
        width: 7px;
        height: 7px;
        background-color: transparent;
    }

    &::-webkit-scrollbar-thumb {
        background-color: #fff;
    }

    &::-webkit-scrollbar-track {
        border-radius: 0px;
        background-color: transparent;
    }
`;
