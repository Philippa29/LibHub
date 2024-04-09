import { createStyles } from "antd-style";


export const loginStyles = createStyles(({ css }) => ({
  body: css`
    margin: 0;
    //background-image: url('/background-geometry.jpg');
    padding-left: 30vh;
    // padding-right: 90px;
    background-color: #EEEE;
    //width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: row;
    align-items: center;
  `,
  image: css`
    background-color: #EEEE;
    background-repeat: no-repeat;
    //border: solid 1px red;
    width: 50%;
    height: 50vh;
    position: relative;
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: center;
    margin-top: 0vh;
  `,
  outerbox: css`
    background-color: #EEEE;
    //border: solid 1px blue;
    width: 30%;
    height: 50vh;
    position: relative;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 5vh;
  `,
  signin: css`
  text-align : left;
    margin-top: 30px;
    //border: solid 1px red;
    color: #2c2738;
  `,
  h1: css`
    font-family: 'Inter', sans-serif;
    color: black; 
    
    
  `,
  p: css`
    font-family: sans-serif;
  `,
  loginForm: css`
    text-color: black;
    text-thickness: 2px;
    max-width: 250px;
    //margin: 0 auto;
  // margin-top: 20px;
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

