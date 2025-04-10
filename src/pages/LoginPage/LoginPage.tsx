import * as React from "react";
import styles from "./LoginPage.module.scss";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import logo from "../../assets/images/c-clean-53__blanc 1.png";
import { userAuthentication } from "../../hooks/userAuthentication";
import { useNavigate } from "react-router-dom";



function LoginPage() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const navigate = useNavigate();
    

    const handleLogin = async() => {
        const data = await userAuthentication(email, password);
        if (data && data.token) {
            console.log("Login successful", data);
            localStorage.setItem("token", data.token);
            navigate("/");
        }
    }

    return (
        <Container className={styles["grid-container"]}>
            <Box className={styles["login-form-container"]}>
                <h1 className={styles["title"]}>Connexion</h1>
                <Box
                    component="form"
                    className={styles["login-form"]}
                    method="post"
                >
                    <TextField
                        className={styles["text-field"]}
                        id="email"
                        label="Adresse email"
                        variant="outlined"
                        onChange={(e) => setEmail(e.target.value)}
                        
                    />

                    <TextField
                        className={styles["text-field"]}
                        id="password"
                        label="Mot de passe"
                        variant="outlined"
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <Link className={styles["link"]} href="/password-reset">
                        Mot de passe oublié ?
                    </Link>

                    <Button 
                        variant="contained"
                        color="primary"
                        type="button"
                        onClick={() => handleLogin()}
                    >
                        Connexion
                    </Button>
                </Box>
            </Box>
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