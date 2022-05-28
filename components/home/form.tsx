import {Grid, TextField, Button, Box} from "@mui/material";
import { useForm, useFieldArray } from "react-hook-form";
import React from "react";
import blog from "../../api/blog"


const Form = (props: any) => {

    console.log(props)

    const { register, control, handleSubmit, reset, watch } = useForm({
        defaultValues: {
            title: props.data.title || '',
            authorName: props.data.authorName || '',
            description: props.data.description || '',
            delete: false
        }
    });

    const {
        fields,
        append,
        remove,
        insert,

    } = useFieldArray({
        control,
        name: "description"
    });

    const onSubmit = (data : any) => {
        blog.updateBlog(props.data._id, data).then((res: { data: any; }) => {
            console.log(res.data)
            reset()
        })
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid sx={{mt: .5}} container spacing={2}>
                <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                    <TextField {...register("title")} fullWidth label="Title"/>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                    <TextField {...register("authorName")} fullWidth label="Author Name"/>
                </Grid>
            </Grid>
                {fields.map((item, index) => {
                    return (
                        <Box key={index}>
                            <Grid sx={{mt: .5}} container spacing={2}>
                                <Grid item xs={12} sm={8} md={8} lg={9} xl={9}>
                                    <TextField
                                        id="outlined-multiline-static"
                                        multiline
                                        rows={4}
                                        defaultValue=""
                                        {...register(`description.${index}.paragraph`)}
                                        fullWidth
                                        label={`Paragraph ${index + 1}`}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4} md={4} lg={3} xl={3}>
                                    <Box>
                                        <Button variant="outlined" onClick={() => {
                                            insert(parseInt(String(index+1), 10), {paragraph: ""})
                                        }}>
                                            Add More
                                        </Button>
                                    </Box>
                                    <Box>
                                        {fields.length >1 && (
                                            <Button sx={{mt: 1}} variant="outlined" type="button" onClick={() => remove(index)}>
                                                Delete
                                            </Button>
                                        )}
                                    </Box>
                                </Grid>
                            </Grid>

                        </Box>

                    );
                })}
            {fields.length===0 && (
                <Button sx={{mt: 2}} variant="outlined" onClick={() => {append({ paragraph: "" });}}>
                    Add Paragraph
                </Button>
            )}



            <Box>
                <Button sx={{mt: 2}} variant="outlined" type={"submit"}>
                    Update Blog
                </Button>
            </Box>


        </form>
    )
}

export default Form