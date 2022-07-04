import HomeLayout from "../layout/homeLayout";
import LoginPage from "../components/login/LoginPage";
import SignUpPage from "../components/signup/signup";

const Login = () => {
    return (
        <HomeLayout title={'login'}>
            <SignUpPage/>
        </HomeLayout>
    )
}

export default Login