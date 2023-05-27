import { Button } from "@nextui-org/react";

import React, { CSSProperties } from "react";

interface Properties {
  btnText: string;
  css?: CSSProperties;
  disabled?: boolean;
}

const SubmitButton: React.FC<Properties> = ({ btnText, css, disabled, ...props }) => {


  return (
    <Button
      type="submit"
      css={{
        borderRadius: "$xs", // radii.xs
        border: "$space$1 solid transparent",
        background: "$primary", // colors.pink800
        height: "$12", // space[12]
        color: "$primarySolidContrast",
        fontSize: "$xg",
        fontWeight: "$bold",
        transition: "all 0.5s",

        "&:hover": {
          background: "$darkBlack",
          color: "#A66908"
        },
        "&:active": {
          background: "$primarySolidActive",
        },
        "&:focus": {
          borderColor: "$primaryBorderFocus",
        },
        ...css,
        ...props,
      }}
      disabled={disabled}
      auto
    >
      {
        btnText
      }
    </Button>
  );
};

export default SubmitButton;
