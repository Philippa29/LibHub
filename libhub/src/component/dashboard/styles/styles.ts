import { createStyles } from "antd-style";

export const dashStyles = createStyles(({ css })=> ({
  container: css`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 90vh;
  `,
  secondaryContainer: css`
    width: 80%;  
    max-width: 1200px;  
    padding: 20px; 
  `,
  card: css`
    background-color: #e4e2e6; 
    border-bottom: none; 
    height: 30vh; 
  `,
  numbers: css`
    font-size: 100px; 
    margin: 0; 
  `,
  image: css`
    margin: 0 50px;
  `,
}));

