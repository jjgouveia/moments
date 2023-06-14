import { createContext } from "react";
import { ISignUp } from "../../types/ISignUp";

export interface SignUpContextType {
    signUpValues: ISignUp;
    setSignUpValues: (signUp: ISignUp) => void;

};

export const SignUpContext = createContext<SignUpContextType>({} as SignUpContextType);