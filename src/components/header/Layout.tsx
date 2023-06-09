import { Box } from "./Box.tsx";

export const Layout = ({ children }) => (
  <Box
    css={{
      maxW: "200px",
      maxH: "100%",
    }}
  >
    {children}
  </Box>
);
