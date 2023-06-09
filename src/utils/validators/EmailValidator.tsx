import React from "react";

type EmailValidatorProps = {
  email: string;
};

const validateEmail = (value: string) => {
  return value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i);
};

const EmailValidator = ({ email }: EmailValidatorProps) => {
  const helper = React.useMemo(() => {
    if (!email)
      return {
        valid: false,
        text: "",
        color: "",
      };
    const isValid = validateEmail(email);
    return {
      valid: isValid,
      text: isValid ? "Email válido" : "Entre com um email válido",
      color: isValid ? "success" : "error",
    };
  }, [email]);

  return helper;
};

export default EmailValidator;
