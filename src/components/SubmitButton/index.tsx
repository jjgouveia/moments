import { Button } from "@nextui-org/react";
import { CSSProperties } from "@nextui-org/react/types/theme";

import React from "react";

interface Props {
  btnText: string;
  css?: CSSProperties;
}

const SubmitButton: React.FC<Props> = ({ btnText, css }) => {

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
      }}
      auto
    >
      {
        btnText
      }
    </Button>
  );
};

export default SubmitButton;
