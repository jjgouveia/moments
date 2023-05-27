import { Input, Spacer, Text } from "@nextui-org/react";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/moments.png";
import SubmitButton from "../../components/SubmitButton";
import MomentsLogo from "../../components/momentsLogo/MomentsLogo";
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

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <div className="login-slogan">
          <MomentsLogo  size={60}/>
          <Text h3 size={25}>Aprecie sem pressão</Text>
          <Text>
            Em vez de incentivar o excesso de publicações que colocam pressão na
            busca pela validação dos outros, nosso desejo é promover a
            apreciação de cada <span>momento</span> que represente o melhor - ou
            o pior - do seu dia.
          </Text>
        </div>
        <div className="login-form-wrapper">
          <img src={logo} alt="Moments Logo" />
          <form onSubmit={handleSubmit(onSubmit)} className="login-form">
            <Input
              clearable
              autoComplete="true"
              status={emailValidator.color as "default" | "success" | "error"}
              color={emailValidator.color as "default" | "success" | "error"}
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
              status={passwordHelper.color as "default" | "success" | "error"}
              color={passwordHelper.color as "default" | "success" | "error"}
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
            <SubmitButton
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

          <div className="register-wrapper">
            <p>Ainda não tem uma conta?</p>
            <a href="/cadastrar">Cadastre-se</a>
          </div>
        </div>
      </div>
      <div className="login-footer">
        <p>© 2021 Moments. Todos os direitos reservados.</p>
      </div>
    </div>
  );
};

export default LoginView;
