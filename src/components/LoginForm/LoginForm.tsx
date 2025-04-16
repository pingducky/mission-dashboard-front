import * as React from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import { userAuthentication } from "../../hooks/userAuthentication";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import { useAuth } from "../../context/AuthContext";
import styles from "./LoginForm.module.scss";

function LoginForm()  {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = async () => {
        try {
            const data = await userAuthentication(email, password);
            if (data?.token) {
                login(data.token);
                navigate("/");
            } else {
                alert("Identifiants incorrects");
            }
        } catch (err) {
            console.error("Erreur lors de la connexion", err);
            alert("Erreur de connexion");
        }
    };

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
                    onClick={handleLogin}
                >
                    Connexion
                </Button>
            </Box>
        </Box>
    );
}

export default LoginForm;
