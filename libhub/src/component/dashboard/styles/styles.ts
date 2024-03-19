
import { createStyles } from "antd-style";


export const dashStyles = createStyles(({ css, token }) => ({
    container: css`
      display: flex;
      flex-direction: column;
      position: relative;
    `,
    logoContainer: css`
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1000;
    `,
    sidebar: css`
    outline: black;
    background-color: #dc5cd4; /* Set sidebar background color */
    color: black; /* Set text color */
    height: 90vh;
    position: fixed;
    left: 0;
    z-index: 100;
    top: 60px; /* Adjust the top position to make space for the logo */
    width: 200px; /* Adjust the width of the sidebar */
    padding-top: 16px; /* Adjust padding-top to accommodate logo */
  `,
    layout: css`
      position: relative;
      min-height: 100vh;
      flex: 1;
    `,
    logo: css`
      width: 120px;
      height: auto;
      margin-right: 16px;
    `,
    header: css`
      padding: 0;
      background: none;
    `,
    h1: css`
      padding-bottom: 20px; 
    `,
    content: css`
      margin: 0 16px;
    `,
    footer: css`
      text-align: center;
        background: #dc5cd4;
        margin-top: auto; 
    `,
  }));
  
  // Override Ant Design colors using CSS variables
 
  
  