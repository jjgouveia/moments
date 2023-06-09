// 1. Import `createTheme`
import { createTheme } from "@nextui-org/react";

// 2. Call `createTheme` and pass your custom values
const theme = createTheme({
    type: "light", // it could be "light" or "dark"
    theme: {
        colors: {
            blue50: '#EDF5FF',
            // ...
            blue900: '#00254D',
            // brand colors
            primaryLight: '#F5A524',
            primaryLightHover: '$yellow800',
            primaryLightActive: '$yellow400',
            primaryLightContrast: '$yellow600',
            primary: '#F5A524',
            secondary: '#F6AD37',
            primaryBorder: '$red500',
            primaryBorderHover: '$yellow600',
            primarySolidHover: '$yellow700',
            primarySolidContrast: '$white',
            primaryShadow: '$yellow500',

            gradient: 'linear-gradient(112deg, $yellow600 -25%, $yellow600 -10%, $yellow500 80%)',
            link: '#5E1DAD',

            // you can also create your own color
            momentsColor: '#dec129',

            // ...  more colors
        },
        space: {},
        fonts: {
            sans: 'Source Sans Pro, sans-serif',
            mono: 'PT Mono, monospace',
        }
    },

})

export default theme;
