import { createStyles } from "antd-style";

export const landingstyles = createStyles(({ css }) => ({
    card: css`
        width: 150px;
        margin: 10px;
    `,
    
    loading: css`
        min-height: 100vh; 
        display: flex; 
        justify-content: center; 
        align-items: center; 
        flex-direction: column; 
    `,
    container: css`
    display: flex; 
    flex-direction: column; /* Ensure content is stacked vertically */
    align-items: center; /* Center items horizontally */
    justify-content: center; /* Center items vertically */
    width: 200px; 
    padding-right: 15px;
    `,
    titles : css`
        text-align: center; 
        padding: 10px; 
    `,
}));
