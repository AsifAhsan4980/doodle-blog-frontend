import HomeLayout from "../layout/homeLayout";
import {Button, Container, Paper, TextField, Typography} from "@mui/material";

const BillingAddress = () => {




    return (
        <HomeLayout title={'Home'}>
            <Container>
                <Paper sx={{p: 4}} elevation={3}>
                    <TextField>

                    </TextField>
                    <Button>
                        Submit
                    </Button>
                </Paper>

            </Container>
        </HomeLayout>
    )
}

export default BillingAddress