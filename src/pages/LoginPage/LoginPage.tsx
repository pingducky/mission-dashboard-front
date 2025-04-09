import * as React from "react";
import styles from "./LoginPage.module.scss";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import logo from "../../assets/images/c-clean-53__blanc 1.png";

const LoginPage: React.FC = () => (
    <Container className={styles["grid-container"]}>
        <Box className={styles["login-form-container"]}>
            <h1 className={styles["title"]}>Connexion</h1>
            <Box
                component="form"
                className={styles["login-form"]}
                method="post"
            >
                <TextField className={styles["text-field"]} id="identifiant" label="Identifiant" variant="outlined"/>
                <TextField className={styles["text-field"]} id="password" label="Mot de passe" variant="outlined"/>
                <Link className={styles["link"]} href="/password-reset">
                    Mot de passe oublié ?
                </Link>
                <Button variant="contained" color="primary" type="submit">
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

export default LoginPage;