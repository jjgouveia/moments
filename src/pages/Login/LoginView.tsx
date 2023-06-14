import { Input, Spacer, Text } from "@nextui-org/react";
import { theme } from "antd";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/moments.png";
import SignUpDrawer from "../../components/SignUpDrawer";
import SubmitLoginButton from "../../components/SubmitLoginBtn";
import MomentsLogo from "../../components/momentsLogo/MomentsLogo";
import { SignUpContext } from "../../context/createUser/register.context";
import { login } from "../../services/authentication.service";
import { LoginData } from "../../types/LoginData";
import EmailValidator from "../../utils/validators/EmailValidator";
import PasswordValidator from "../../utils/validators/PasswordValidator";
import "./style.css";


const LoginView: React.FC = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<LoginData>();


  const redirect = useNavigate();

  const [email, password] = watch(["email", "password"]);
  const { signUpValues } = React.useContext(SignUpContext);

  console.log(signUpValues);


  const emailValidator = EmailValidator({ email });

  const passwordHelper = PasswordValidator({ password });

  const onSubmit: SubmitHandler<LoginData> = async ({
    email,
    password,
  }: LoginData) => {
    try {
      const { data } = await login(email, password);
      localStorage.setItem("token", JSON.stringify(data));
      redirect("/");
    } catch (error) {
      console.log(error);
    }
  };

  const { token } = theme.useToken();
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const containerStyle: React.CSSProperties = {
    position: "relative",
    overflow: "hidden",
    borderRadius: token.borderRadiusLG,
  };

  return (
      <div className="login-container">
        <div className="login-wrapper">
          <div className="login-slogan">
            <MomentsLogo size={52} />
            <Text h3 size={25}>
              Aprecie sem pressão
            </Text>
            <Text>
              Em vez de incentivar o excesso de publicações que colocam pressão
              na busca pela validação dos outros, nosso desejo é promover a
              apreciação de cada <span>momento</span> que represente o melhor -
              ou o pior - do seu dia.
            </Text>
          </div>
          <div className="login-form-wrapper">
            <img src={logo} alt="Moments Logo" />
            <div style={containerStyle}>
              <form onSubmit={handleSubmit(onSubmit)} className="login-form">
                <Input
                  clearable
                  autoComplete="true"
                  status={
                    emailValidator.color as "default" | "success" | "error"
                  }
                  color={
                    emailValidator.color as "default" | "success" | "error"
                  }
                  helperColor={
                    emailValidator.color as "default" | "success" | "error"
                  }
                  helperText={emailValidator.text}
                  aria-label="Email"
                  type="emaill"
                  placeholder="Seu email"
                  css={{ width: "100%" }}
                  {...register("email", {
                    required: "O email é obrigatório",
                  })}
                  aria-invalid={errors.email ? "true" : "false"}
                />
                {errors.email && <p>{errors.email.message}</p>}
                <Spacer y={1} />
                <Input.Password
                  clearable

                  aria-label="Senha"
                  status={
                    passwordHelper.color as "default" | "success" | "error"
                  }
                  color={
                    passwordHelper.color as "default" | "success" | "error"
                  }
                  helperColor={
                    passwordHelper.color as "default" | "success" | "error"
                  }
                  helperText={passwordHelper.text}
                  placeholder="Sua senha"
                  css={{ width: "100%" }}
                  {...register("password", {
                    required: "A senha é obrigatória",
                  })}
                  aria-invalid={errors.password ? "true" : "false"}
                />
                {errors.password && <p>{errors.password.message}</p>}
                <Spacer y={1} />
                <SubmitLoginButton
                  disabled={
                    emailValidator.color !== "success" ||
                    passwordHelper.color !== "success"
                  }
                  btnText="Apreciar"
                  css={{
                    width: "100%",
                  }}
                />{" "}
              </form>
              <SignUpDrawer />
            </div>
            {/* <div className="register-wrapper">
              {!open ? (
                <p>Ainda não tem uma conta?</p>
              ) : (
                <p>Preparado para o novo?</p>
              )}
              <Button
                type="primary"
                onClick={open ? Sig : showDrawer}
                style={{}}
              >
                {!open ? "Clique aqui" : "Cadastrar"}
              </Button>
            </div> */}
          </div>
        </div>
        <div className="login-footer">
          <p>© 2021 Moments. Todos os direitos reservados.</p>
        </div>
      </div>
  );
};

export default LoginView;
