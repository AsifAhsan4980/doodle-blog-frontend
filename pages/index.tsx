import type {NextPage} from 'next'
import {Box, Button, Container, Grid, Paper, TextField, Typography} from "@mui/material";
import HomeLayout from "../layout/homeLayout";
import {useForm} from "react-hook-form";
import {useState} from "react";
import Fiserv from "../api/fiservTestBackend";
import parse from 'html-react-parser';
import { useRouter } from 'next/router'


const Home: NextPage = () => {

    const router = useRouter()

    const [value, setValue] = useState({
        cardNumber: "4761739001010010",
        expiryMonth: "10",
        expiryYear: "22",
        securityCode: "002",
        iframeCode: null,
        transactionId: "",
        transactionState: "Unknown",
        paymentComplete: false,
        status: "",
        clientId: null
    })

    const {register, handleSubmit, watch, formState: {errors}} = useForm({
        defaultValues: {
            cardNumber: "4005520000000129",
            expiryMonth: "10",
            expiryYear: "22",
            securityCode: "002",
        }
    });

    function setPatchRequest() {
        Fiserv.payPatch(value.transactionId).then(r => console.log(r.data))
    }

    const onSubmit = data => {
        console.log(data)
        Fiserv.payment(data).then(async r => {
                console.log(r.data)

                // await Fiserv.TreeDSPost(r.data.authenticationResponse.params.termURL + `?referencedTransactionId=${r.data.ipgTransactionId}`, { cres: r.data.clientRequestId })
                // setValue({
                //     ...value,
                //     // iframeCode: r.data.authenticationResponse.secure3dMethod.methodForm,
                //     transactionId: r.data.ipgTransactionId,
                //     clientId:r.data.clientRequestId
                // })
                const data = await Fiserv.payPatch({tid: r.data.ipgTransactionId, cid: r.data.clientRequestId})

                let cReq = data.data.authenticationResponse.params.cReq;
                let url = data.data.authenticationResponse.params.acsURL;
                let termURL = data.data.authenticationResponse.params.termURL;
                let tID = data.data.ipgTransactionId;

                //let response = await Fiserv.TreeDSPost(termURL+ `?referencedTransactionId=${tID}`, {cres: cReq});

                // console.log('Data after:::', response.data)

                postData(url, {
                    creq: cReq,
                    tid : 'ascsac'
                });

            //await router.push('/billingAddress')
            }
        )
    };

    function postData(path: string, params: any, method: string = "post") {
        // The rest of this code assumes you are not using a library.
        // It can be made less wordy if you use one.
        const form = document.createElement("form");
        form.method = method;
        form.action = path;

        for (const key in params) {
            if (params.hasOwnProperty(key)) {
                const hiddenField = document.createElement("input");
                hiddenField.type = "hidden";
                hiddenField.name = key;
                hiddenField.value = params[key];

                form.appendChild(hiddenField);
            }
        }


        document.body.appendChild(form);
        form.submit();
    }

    return (
        <>
            <main>
                <HomeLayout title={'Home'}>
                    <Container sx={{mt: 2}}>
                        <Paper sx={{p: 4}} elevation={3}>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <TextField fullWidth {...register("cardNumber", {required: true})}
                                           label={"Card Number"}/>
                                {errors.cardNumber && <span>This field is required</span>}
                                <Grid container sx={{mt: 1}} spacing={2}>
                                    <Grid item sm={6}>
                                        <TextField {...register("expiryMonth", {required: true})} fullWidth
                                                   label={"Expire Month"}/>
                                        {errors.expiryMonth && <span>This field is required</span>}
                                    </Grid>
                                    <Grid item sm={6}>
                                        <TextField fullWidth {...register("expiryYear", {required: true})}
                                                   label={"Expire Year"}/>
                                        {errors.expiryYear && <span>This field is required</span>}
                                    </Grid>
                                </Grid>
                                <TextField fullWidth {...register("securityCode", {required: true})} sx={{mt: 2}}
                                           label={"Security Code"}/>
                                {errors.securityCode && <span>This field is required</span>}
                                <Button fullWidth type={'submit'} variant={'outlined'} sx={{mt: 2}}>
                                    Submit
                                </Button>
                            </form>
                        </Paper>
                        {value.iframeCode && (
                            <div
                                dangerouslySetInnerHTML={{__html: value.iframeCode}}
                            />
                        )}
                    </Container>
                </HomeLayout>
            </main>
        </>
    )
}

export default Home

