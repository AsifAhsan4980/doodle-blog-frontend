import {Avatar, Box, Button, Grid, TextField, Typography} from "@mui/material";
import * as React from "react";
import {useForm} from "react-hook-form";
import {useState} from "react";
import blog from "../../../api/blog"

const Comment = (data: any) => {
    const para = data.data

    const [paraId, setId] = useState(null)

    const handleChange = (id : any) => {
        setId(id)
    }

    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const onSubmit = (info: any) => {
        console.log('sub', info, paraId, data);

        let array = data.blog.description



        for (let i=0; i<array.length; i++){
            if (array[i]._id === paraId){
                array[i].comment= [...array[i].comment, info.comment]
            }
        }

        const d = {
            description : [
                ...array
            ]
        }




        blog.addComment(d, data.blog._id).then(r=>console.log(r.data))
    }

    return (
        <Box>
            <Typography sx={{mt: 1}} variant="body1" gutterBottom>
                {para.paragraph}
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container>
                    <Grid item xs={12} sm={12}>
                        {para.comment?.map((d: any, i: any)=> {
                            return (
                                <Box key={i} sx={{display: 'flex', p:1}}>
                                    <Avatar/>
                                    <Typography sx={{p:1}}>
                                        {d}
                                    </Typography>
                                </Box>

                            )
                        })}
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField onClick={()=>handleChange(para._id)} {...register("comment")} size={'small'} label="Add Comment" fullWidth/>
                    </Grid>

                    <Grid item xs={12} sm={6} >
                        <Button sx={{ml: 2}} variant="outlined" type={"submit"}>
                            Add Comment
                        </Button>
                    </Grid>
                </Grid>
            </form>


        </Box>
    )
}

export default Comment