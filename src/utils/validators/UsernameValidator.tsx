import React from "react";

const usernameValidator = (value: string) => {
    return value.match(/^.{3,}$/);
  };

type UsernameValidatorProps = {
  username: string;
};

const UsernameValidator = ({ username }: UsernameValidatorProps) => {
    const helper = React.useMemo(() => {
        if (!username)
        return {
            text: "",
            color: "",
        };
        const isValid = usernameValidator(username);
        return {
        text: isValid ? "Senha válida" : "Entre com uma senha válida",
        color: isValid ? "success" : "error",
        };
    }, [username]);

    return helper;
};

export default UsernameValidator;