import React from "react";

const validatePassword = (value: string) => {
    // return value.match(/^(?=.*[a-z])/*(?=.*[A-Z])*/(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{6,}$/);
    return value.match(/^.{6,}$/);
  };

type PasswordValidatorProps = {
  password: string;
};

const PasswordValidator = ({ password }: PasswordValidatorProps) => {
    const helper = React.useMemo(() => {
        if (!password)
        return {
            text: "",
            color: "",
        };
        const isValid = validatePassword(password);
        return {
        text: isValid ? "Senha válida" : "Entre com uma senha válida",
        color: isValid ? "success" : "error",
        };
    }, [password]);

    return helper;
};

export default PasswordValidator;