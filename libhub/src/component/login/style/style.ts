import { createStyles } from "antd-style";


export const loginStyles = createStyles(({ css }) => ({
  body: css`
    margin: 0;
    padding: 0;
    background-color: #eeee;
    width: 100%;
    height: 80%;
    display: flex;
    flex-direction: row;
    align-items: center;
  `,
  image: css`
    background-color: #eeeeee;
    background-repeat: no-repeat;
    width: 50%;
    height: 100vh;
    position: relative;
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: center;
  `,
  outerbox: css`
    background-color: #eeeeee;
    width: 50%;
    height: 100vh;
    position: relative;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
  `,
  signin: css`
    margin-top: 20px;
    color: #2c2738;
  `,
  h1: css`
    font-family: 'Inter', sans-serif;
  `,
  p: css`
    font-family: sans-serif;
  `,
  loginForm: css`
    
     width: 500px;
     margin: 0 auto;
     margin-top: 20px;
  `,
  loginFormButton: css`
    
    background-color: #dc5cd4;
    width: 100%;
  `,
  buttonHover: css`
    &:hover {
      background-color:#7e5af7;
    }
  `,
  responsiveStyles: css`
    @media only screen and (max-width: 767px) {
      .body {
        flex-direction: column;
        height: auto;
      }

      .image,
      .outerbox {
        width: 100%;
        height: auto;
      }

      #signin {
        margin-top: 100px;
      }

      .header {
        grid-template-columns: 100%;
      }

      .image img {
        display: none; /* Hide the logo within .image on smaller screens */
      }
    }
  `,
}));

