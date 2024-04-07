import { createStyles } from "antd-style";

export const navstyles = createStyles(({ css }) => ({
  header: css`
    display: flex; /* Use flexbox to align items */
    justify-content: space-between; /* Space between items */
    align-items: center; /* Center items vertically */
    padding: 0;
    background-color: #e4e2e6;
    height: 80px; /* Set the height of the header */
  `,
  logoContainer: css`
    display: flex; /* Use flexbox to align items */
    align-items: center; /* Center items vertically */
    padding-left: 10px; /* Add padding to the left */
    height: 20%; /* Take up the full height of the header */
    background-color: transparent;
    max-width: 10%;
  `,
  logo: css`
    max-width: 100%;
    max-height: 50%;
    width: auto;
    height: auto;
    pointerEvents: 'none';
  `,
  menu: css`
    flex: 1; /* Take remaining space */
    display: flex; /* Use flexbox */
    justify-content: center; /* Center items horizontally */
    background-color: #e4e2e6;
  `,
  profileIcon: css`
    padding-right: 50px; /* Add padding to the right */
  `,
  menudiv: css`
    display: flex; /* Use flexbox to align items */
    align-items: center; /* Center items vertically */
    padding-right: 16px; /* Add padding to the right */
    height: 20%; /* Take up the full height of the header */
    background-color: transparent;
  `,
}));
