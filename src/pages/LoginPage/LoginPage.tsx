import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/c-clean-53__blanc 1.png";
import LoginForm from "../../components/LoginForm/LoginForm";
import styles from "./LoginPage.module.scss";
import IconButton from "../../components/layout/IconButton/IconButton";

function LoginPage() {
  const navigate = useNavigate();

  return (
    <div className={styles.grid_container}>
      <LoginForm />
      <div className={styles.register_container}>
        <img src={logo} alt="Logo C'Clean53" />
        <div className={styles.register_block}>
          <h2>Bonjour !</h2>
          <p>
            C'est ton premier jour ?<br />
            pas de souci. Entre tes identifiants
            <br />
            Pour créer tom compte
          </p>
          <IconButton
            text="Inscription"
            fontWeight="bold"
            onClick={() => navigate("/register")}
            specialClass={styles.specialButton}
            isDisabled={false}
            variant={"outlined"}
            color={"white"}
            isRounded={true}
          />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
