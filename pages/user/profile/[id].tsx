import HomeLayout from "../../../layout/homeLayout";
import {Container, Grid, Paper} from "@mui/material";
import ProfileMain from "../../../components/Profile/ProfileMain";
import {useEffect, useState} from "react";

const Profile = () => {

    const [info, setInfo] = useState({})

    useEffect(()=> {

    }, [])

    return (
        <HomeLayout title={'profile'}>
            <Container sx={{mt:2}}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={4} lg={3} xl={3} >
                        <Paper elevation={2} sx={{p: 2}}>
                            <ProfileMain/>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6} md={8} lg={9} xl={9}>
                        <Paper elevation={2} sx={{p: 2}}>
                            asc
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </HomeLayout>
    )
}

export default Profile