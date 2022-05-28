import * as React from 'react';
import {Container, Paper, Button, Box} from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Form from "./children/form"



const AddBlog = () => {
    const [open, setOpen] = React.useState(false);


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Container sx={{mt: 4}}>
            <Paper sx={{p:2}} elevation={3}>
                <Button variant="outlined" onClick={handleClickOpen}>
                    Add New Blog
                </Button>
            </Paper>

            <Dialog
                fullWidth
                maxWidth={"md"}
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>Add new blog</DialogTitle>
                <DialogContent>
                    <Form/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </Container>
    )
}
export default AddBlog