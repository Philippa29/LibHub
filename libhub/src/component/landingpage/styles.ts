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
     
    `,
    titles : css`
        text-align: center; 
        padding: 10px; 
        colour: #dc5cd4;
    `,
}));
