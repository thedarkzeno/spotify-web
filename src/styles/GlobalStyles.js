import { createGlobalStyle } from "styled-components";
import Wallpaper from "../Assets/wallpaper.png";
export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  *, input, button {
    font-family: sans-serif;
  }
  html {
    background-color: #000;
    
    background-image: url(${Wallpaper});
    
  
    background-repeat: no-repeat;
  }
`;
