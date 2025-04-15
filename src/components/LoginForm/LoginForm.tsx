import * as React from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import { userAuthentication } from "../../hooks/userAuthentication";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import styles from "./LoginForm.module.scss";

function LoginForm()  {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const navigate = useNavigate();    

    const handleLogin = async () => {
        const data = await userAuthentication(email, password);
        if (data && data.token) {
            sessionStorage.setItem("token", data.token);
            navigate("/");
        }
    }

    return (
        <Box className={styles.login_form_container}>
            <h1>Connexion</h1>
            <Box
                component="form"
                className={styles.login_form}
                method="post"
            >
                <TextField
                    className={styles.text_field}
                    id="email"
                    label="Adresse email"
                    variant="outlined"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <TextField
                    className={styles.text_field}
                    id="password"
                    label="Mot de passe"
                    variant="outlined"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <Link className={styles.link} href="/password-reset">
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
    )
}

export default LoginForm;