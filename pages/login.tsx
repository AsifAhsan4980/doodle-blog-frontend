import HomeLayout from "../layout/homeLayout";
import LoginPage from "../components/login/LoginPage";

const Login = () => {
    return (
        <HomeLayout title={'login'}>
            <LoginPage/>
        </HomeLayout>
    )
}

export default Login