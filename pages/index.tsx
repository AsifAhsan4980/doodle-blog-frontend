import type { NextPage } from 'next'
import {Box} from "@mui/material";
import AddBlog from "../components/home/addBlog";
import HomeLayout from "../layout/homeLayout";
import AllBlog from "../components/home/allBlog";
import blog from "../api/blog"
import {useState} from "react";


const Home: NextPage = (blogs) => {

    const [state , setState] = useState(false)

    console.log(state)

    const flag = () => {
        setState(!state)
    }

  return (
    <Box>
        <main >
          <HomeLayout title={'Home'}>
              <AddBlog flag={()=>flag()} state={state}/>
              <AllBlog data={blogs} state={state}  />
          </HomeLayout>
        </main>

    </Box>
  )
}

export default Home

export async function getServerSideProps() {

    const info: any = await blog.getBlog()
    const blogs : [] = await info.data;

    return { props: { blogs } }
}
