import {JSXElementConstructor, Key, ReactElement, ReactFragment, ReactPortal, SetStateAction, useState} from "react";
import {Container, Paper, Typography, Box} from "@mui/material";
import Link from "next/link"
import Pagination from '@mui/material/Pagination';
import usePagination from "../../utils/pagination";

const AllBlog = (props: any) => {

    const [blogs, setBlogs] = useState(props.data.blogs)
    let [page, setPage] = useState(1);
    const PER_PAGE = 10;

    const count = Math.ceil(blogs.length / PER_PAGE);
    const _DATA : any  = usePagination(blogs, PER_PAGE);

    const handleChange = (e: any, p: SetStateAction<number>) => {
        setPage(p);
        _DATA.jump(p);
    };


    // @ts-ignore
    return (
        <>


            <Container sx={{mt: 4}}>
                {
                    _DATA.currentData()?.map((data: any, index: Key | null | undefined) => {
                        return (
                            <Link key={index} href={`/blog/${data._id}`}>
                                <Paper sx={{mt: 1, p: 2, maxHeight: '10rem', overflow: "hidden", cursor: "pointer"}} key={index} elevation={3} >
                                    <Typography sx={{p: 0}} variant="h6" component="div">
                                        {data.title}
                                    </Typography>
                                    <Typography variant="caption" display="block" gutterBottom>
                                        {data.authorName}
                                    </Typography>
                                    {
                                        data.description?.map((para: { paragraph: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; }, i: any)=> {
                                            return(
                                                <Typography key={i} sx={{mt:1}} variant="body1" gutterBottom>
                                                    {para.paragraph}
                                                </Typography>
                                            )
                                        })
                                    }

                                </Paper>
                            </Link>

                        )
                    })
                }
                <Pagination
                    sx={{mt: 2}}
                    count={count}
                    size="large"
                    page={page}
                    variant="outlined"
                    shape="rounded"
                    onChange={handleChange}
                />
            </Container>
        </>


    )
}

export default AllBlog