import { createStyles } from "antd-style";


export const dashStyles = createStyles(({ css }) => ({
  container: css`
    display: flex;
    flex-direction: column;
    position: relative;
    background: #e4e2e6;
    height: 100vh;
    overflow-x: hidden;
  `,
  logoContainer: css`
  width: 200px; /* Set the width of the logo container */
  height: 80px; /* Set the height of the logo container */
  display: flex;
  align-items: center;
  justify-content: center;
  background: #e4e2e6; /* Set background color for the logo container */
  
  `,
  sidebar: css`
 background-color: black; /* Set the background color for the sidebar */
 position: sticky;
 top: 0;
 left: 0;
 height: 100%; /* Set the height of the sidebar to 100% of its container */
 width: 200px; /* Set the width of the sidebar */
 z-index: 99; 
  `,
  layout: css`
    position: relative;
    min-height: 90vh;
    flex: 1;
    margin-left: 200px; /* Adjust the margin to accommodate the sidebar */
  `,
  logo: css`
    max-width: 80%;
    max-height: 80%;
    width: auto;
    height: auto;
    
  `,
  header: css`
    padding: 0;
    background-color: purple;
  `,
  h1: css`
    padding-bottom: 20px; 
  `,
  content: css`
    margin: 0 16px;
  `,

  menuItemHover: css`
    &:hover {
      background-color: #dc5cd4!important; /* Set the background color to purple */
      color: #ffffff !important; /* Set the text color to white */
    }
  `,
}));



  
  // Override Ant Design colors using CSS variables
 
  
  