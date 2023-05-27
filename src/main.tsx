import { NextUIProvider, createTheme } from "@nextui-org/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import ProfileProvider from "./context/profile/profile.provider.tsx";
import "./index.css";
import router from "./routes/routes.tsx";

const theme = createTheme({
  type: "light", // it could be "light" or "dark"
  theme: {
      colors: {
          // you can use object notation with nest selectors
          primaryStatus: '$yellow400',
          blue50: '#EDF5FF',
          // ...
          blue900: '#00254D',
          // brand colors
          primaryLight: '#F5A524',
          primaryLightHover: '#704705',
          primaryLightActive: '$yellow400',
          primarySolidContrast: '$black',
          primary: '#F5A524',
          secondary: '#FEF7EC',
          primaryBorder: '$red500',
          primaryBorderHover: '$yellow600',
          primarySolidHover: '$yellow700',
          primaryShadow: '$yellow500',
          primarySolidActive: '$yellow600',
          primaryBorderFocus: '$yellow900',



          gradient: 'linear-gradient(112deg, $yellow600 -25%, $yellow600 -10%, $yellow500 80%)',
          momentsGradient: "45deg, $yellow500 -20%, $momentsColor 100%",
          momentsGradientVariant: 'linear-gradient(112deg, $yellow600 -25%, $yellow600 -10%, $yellow500 80%)',
          link: '#5E1DAD',

          // you can also create your own color
          momentsColor: '#dec129',
          red: '#FF0000',
          darkBlack: '#000000',

          // ...  more colors
      },
      space: {},
      fonts: {
          sans: 'Source Sans Pro, sans-serif',
          mono: 'PT Mono, monospace',
      }
  },

})

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <NextUIProvider theme={ theme }>
      <ProfileProvider>
        <RouterProvider router={router} />
      </ProfileProvider>
    </NextUIProvider>
  </React.StrictMode>
);
