import { createStyles } from "antd-style";

export const userComponentStyles = createStyles(({ css }) => ({
  container: css`
    padding: 20px;
  `,
  searchInput: css`
    margin-bottom: 16px;
    padding: 8px 16px; // Adjust padding as needed
  `,
  tableContainer: css`
    overflow-x: auto;
  `,
  table: css`
    width: 100%;
  `,
}));
