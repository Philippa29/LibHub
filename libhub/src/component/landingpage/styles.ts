import { createStyles } from "antd-style";

export const landingstyles = createStyles(({ css }) => ({
    card: css`
        width: 500px;
        margin: 10px;
        colour: red; 
    `,
    
    loading: css`
        min-height: 100vh; 
        display: flex; 
        justify-content: center; 
        align-items: center; 
        flex-direction: column; 
    `,
    container: css`
    
    background-color: #e4e2e6;
     height: 50vh;
        width: 30vh; 
    `,
    titles : css`
        text-align: center; 
        padding: 10px; 
        colour: #dc5cd4;
    `,
    cardContainer : css`
        display: flex;
        justify-content: center;
       
        
        
    `, 
      
    buttonContainer : css `
        display: flex;
        justify-content: center;
        margin-top: 10px; 
    `,
}));
