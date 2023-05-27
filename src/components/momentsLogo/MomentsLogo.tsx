import { Text } from "@nextui-org/react";
import React from "react";
import "./styles.css";

type momentsLogoProps = {
    size: number;
}

const MomentsLogo: React.FC<momentsLogoProps> = ({ size }) => {
    return (
        <Text
        h1
        size={size}
        css={{
          textGradient: "$momentsGradient",
          filter: "drop-shadow(0px 0px 3px #121212)",
          width: "100%",
          textAlign: "center",
        }}
      >
        Moments
      </Text>
    )
}

export default MomentsLogo;