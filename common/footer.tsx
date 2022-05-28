import Link from '@mui/material/Link';
import {Box, SxProps, Theme, Typography, TypographyClasses} from "@mui/material";
import {CommonProps} from "@mui/material/OverridableComponent";
import {SystemProps} from "@mui/system";
import {ElementType, ReactNode} from "react";

const Footer = (props :any) => {
    return (
        <Box sx={{mt: 2}}>
            <footer>
                <Typography variant="body2" color="text.secondary" align="center" {...props}>
                    {'Copyright © '}
                    <Link color="inherit" href="/">
                        Asif Ahsan
                    </Link>{' '}
                    {new Date().getFullYear()}
                    {'.'}
                </Typography>
            </footer>
        </Box>
    )
}

export default Footer