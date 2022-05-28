import HomeLayout from "../../layout/homeLayout";
import {Container, Paper, Typography, IconButton, Button, TextField, Box, Grid} from "@mui/material";
import {useRouter} from 'next/router'
import {JSXElementConstructor, ReactElement, ReactFragment, ReactPortal, useEffect, useState} from "react";
import blog from "../../api/blog"
import EditIcon from '@mui/icons-material/Edit';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Form from "../../components/home/form";
import DialogActions from "@mui/material/DialogActions";
import * as React from "react";
import {useForm} from "react-hook-form";
import Comment from "../../components/home/children/comment";

const Blog = () => {

    const router = useRouter()
    const {id} = router.query

    const [oneBlog, setOneBlog] = useState({
        authorName: undefined,
        description: [],
        title: undefined,
        _id: undefined
    })

    useEffect(() => {
        blog.getOneBlog(id).then(r => setOneBlog(r.data))
    }, [])

    const [open, setOpen] = React.useState(false);


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };




    return (
        <HomeLayout title={'Home'}>
            <Container>
                <Paper sx={{mt: 4, p: 2}} elevation={3}>
                    <IconButton onClick={()=>handleClickOpen()}>
                        <EditIcon /> Edit
                    </IconButton>

                    <Typography sx={{textAlign: 'center'}} variant="h3" component="div">
                        {oneBlog.title}
                    </Typography>
                    <Typography sx={{textAlign: 'center'}} variant="h6" display="block" gutterBottom>
                        {oneBlog.authorName}
                    </Typography>
                    {
                        oneBlog.description?.map((para: any, i: any) => {
                            return (
                                <Comment key={i} blog={oneBlog} data={para}/>

                            )
                        })
                    }

                </Paper>
            </Container>
            <Dialog
                fullWidth
                maxWidth={"md"}
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>Add new blog</DialogTitle>
                <DialogContent>
                    <Form data={oneBlog}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </HomeLayout>
    )
}

export default Blog