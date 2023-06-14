import { useState } from "react";
import { ISignUp } from "../../types/ISignUp";
import { SignUpContext, SignUpContextType } from "./register.context";

interface RegisterProviderProps {
  children: React.ReactNode;
}

const RegisterProvider: React.FC<RegisterProviderProps> = ({ children }) => {
  const [signUpValues, setSignUpValues] = useState<ISignUp>({} as ISignUp);

  const registerValue: SignUpContextType = {
    signUpValues,
    setSignUpValues,
  };

  return (
    <SignUpContext.Provider value={registerValue}>
      {children}
    </SignUpContext.Provider>
  );
};

export default RegisterProvider;
