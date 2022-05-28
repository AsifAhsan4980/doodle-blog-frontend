import type { NextPage } from 'next'
import {Box} from "@mui/material";
import AddBlog from "../components/home/addBlog";
import HomeLayout from "../layout/homeLayout";
import AllBlog from "../components/home/allBlog";
import blog from "../api/blog"


const Home: NextPage = (blogs) => {
  return (
    <Box>
        <main >
          <HomeLayout title={'Home'}  >
              <AddBlog />
              <AllBlog data={blogs} />
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
