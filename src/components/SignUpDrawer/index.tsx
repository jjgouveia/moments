import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Input } from "@nextui-org/react";
import { Button, Drawer } from "antd";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/authentication.service";
import { signup } from "../../services/signup.service";
import { ISignUp } from "../../types/ISignUp";
import EmailValidator from "../../utils/validators/EmailValidator";
import PasswordValidator from "../../utils/validators/PasswordValidator";
import UsernameValidator from "../../utils/validators/UsernameValidator";
import SubmitLoginButton from "../SubmitLoginBtn";
import "./styles.css";

// type Props = {
//   open: boolean;
//   onClose: () => void;
// };

const SignUpDrawer: React.FC = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<ISignUp>();

  const redirect = useNavigate();

  const [email, password, username] = watch(["email", "password", "username"]);
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const emailValidator = EmailValidator({ email });

  const passwordHelper = PasswordValidator({ password });

  const usernameHelper = UsernameValidator({ username });

  const onSubmit: SubmitHandler<ISignUp> = async ({
    username,
    email,
    password,
  }: ISignUp) => {
    try {
      const { status } = await signup(username, email, password);
      if (status === 201) {
        alert("Conta criada com sucesso!");
        const { data, status } = await login(email, password);

        if (status === 200) {
          localStorage.setItem("token", JSON.stringify(data));
          redirect("/create-profile");
        }
      } else {
        alert("Erro ao criar conta!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="register-container">
      <Drawer
        placement="bottom"
        closable={true}
        open={open}
        getContainer={false}
        onClose={onClose}
        style={{
          backgroundColor: "#f7e1a4",
          width: "100%",
          margin: "0 auto",
        }}
        maskStyle={{
          backgroundColor: "transparent",
        }}
        bodyStyle={{
          height: "270px",
          position: "absolute",
          top: "28%",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          padding: 10,
          backgroundColor: "#f7e1a4",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            width: "100%",
          }}
        >
          <button
            style={{
              backgroundColor: "transparent",
              border: "none",
              cursor: "pointer",
              width: "fit-content",
              height: "25px",
            }}
            onClick={onClose}
          >
            <FontAwesomeIcon icon={faClose} />
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="login-form">

          <Input
            className="register-input"
            type="email"
            aria-label="email"
            placeholder="Seu email"
            status={emailValidator.color as "default" | "success" | "error"}
            color={emailValidator.color as "default" | "success" | "error"}
            helperColor={
              emailValidator.color as "default" | "success" | "error"
            }
            helperText={emailValidator.text}
            {...register("email", {
              required: "O email é obrigatório",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Email inválido",
              },
            })}
            aria-invalid={errors.email ? "true" : "false"}
          />
          <Input
            className="register-input"
            aria-label="username"
            placeholder="Nome de usuário"
            aria-placeholder="Nome de usuário"
            clearable
            status={
              usernameHelper.color as "default" | "success" | "error"
            }
            color={
              usernameHelper.color as "default" | "success" | "error"
            }
            helperColor={
              usernameHelper.color as "default" | "success" | "error"
            }
            helperText={usernameHelper.text}
            {...register("username", {
              required: "O usuário é obrigatório",
            })}
            aria-invalid={errors.username ? "true" : "false"}
          />
          <Input.Password
            className="register-input"
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
                  {...register("password", {
                    required: "A senha é obrigatória",
                  })}
                  aria-invalid={errors.password ? "true" : "false"}
          />
          <SubmitLoginButton btnText="Cadastrar" disabled={
            emailValidator.color !== "success" ||
            passwordHelper.color !== "success" ||
            usernameHelper.color !== "success"
          } />
        </form>
      </Drawer>
      <div className="register-wrapper">
        {!open ? (
          <p>Ainda não tem uma conta?</p>
        ) : (
          <p>Preparado para o novo?</p>
        )}
        <Button type="primary" onClick={showDrawer} style={{}}>
          Criar conta
        </Button>
      </div>
    </div>
  );
};

export default SignUpDrawer;
