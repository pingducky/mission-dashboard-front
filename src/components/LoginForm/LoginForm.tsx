import * as React from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import styles from "./LoginForm.module.scss";
import { userAuthentication } from "../../hooks/userAuthentication";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';

function LoginForm()  {
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
        <Box className={styles["login-form-container"]}>
            <h1>Connexion</h1>
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
    )
}

export default LoginForm;