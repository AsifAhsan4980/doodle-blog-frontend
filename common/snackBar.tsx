import * as React from 'react';
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';

export interface State extends SnackbarOrigin {
    open: boolean;
}

export default function PositionedSnackbar(props : any) {

    const state = {
        open: true,
        vertical: 'bottom',
        horizontal: 'right'
    }

    const { vertical, horizontal, open } = state;

    return (
        <div>
            <Snackbar
                anchorOrigin={{ vertical: 'bottom',
                    horizontal: 'right' }}
                open={open}
                autoHideDuration={6000}
                message={`${props.message}`}
                key={vertical + horizontal}
            />
        </div>
    );
}
