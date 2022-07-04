import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    fontWeight: 400,
                },
            },
        },
    },
    palette: {
        primary: {
            contrastText: "#fff",
            dark: "#00756A",
            light: "#0eafa0",
            main: "#00756A",
        },
        secondary: {
            contrastText: "#444",
            dark: "#FAB70B",
            light: "#71708C",
            main: "#FAB70B",
        },
    },
});

export default theme;