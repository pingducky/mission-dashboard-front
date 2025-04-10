import styles from "./LoginPage.module.scss";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import logo from "../../assets/images/c-clean-53__blanc 1.png";
import LoginForm from "../../components/LoginForm/LoginForm";


function LoginPage() {
    

    return (
        <Container className={styles["grid-container"]}>
            <LoginForm />
            <Box className={styles["register-container"]}>
                <img src={logo} alt="Logo C'Clean53" />
                <Box className={styles["register-block"]}>
                    <h2>Bonjour !</h2>
                    <p>
                        C'est ton premier jour ?<br/>
                        pas de souci. Entre tes identifiants<br/>
                        Pour créer tom compte
                    </p>
                    <Button variant="outlined" color="primary" type="link" href="/register">
                        Inscription
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}

export default LoginPage;