import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Drawer } from "antd";
import React from "react";

type Props = {
  open: boolean;
  onClose: () => void;
};

const SignUpDrawer: React.FC<Props> = ({ open, onClose }) => {
  // const { token } = theme.useToken();
  // const [open, setOpen] = useState(false);

  // const showDrawer = () => {
  //   setOpen(true);
  // };

  // const onClose = () => {
  //   setOpen(false);
  // };

  // const containerStyle: React.CSSProperties = {
  //   position: 'relative',
  //   height: 200,
  //   padding: 48,
  //   overflow: 'hidden',
  //   textAlign: 'center',
  //   background: token.colorFillAlter,
  //   border: `1px solid ${token.colorBorderSecondary}`,
  //   borderRadius: token.borderRadiusLG,
  // };

  return (
    <Drawer
      placement="bottom"
      closable={true}
      open={open}
      getContainer={false}
      onClose={onClose}
      style={{
        backgroundColor: "#f7e1a4",
      }}
      maskStyle={{
        backgroundColor: "transparent",
      }}
      bodyStyle={{
        height: "156px",
        position: "absolute",
        bottom: 0,
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap",
        overflow: "hidden",
        padding: 10,
        width: "257px",
        backgroundColor: "#f7e1a4",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <button
          style={{
            backgroundColor: "transparent",
            border: "none",
            cursor: "pointer",
            width: "fit-content",
          }}
          onClick={onClose}
        >
          <FontAwesomeIcon icon={faClose} />
        </button>
      </div>
      <form
        action=""
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <input
          type="text"
          name=""
          id=""
          style={{
            marginBottom: 10,
            width: "100%",
          }}
        />
        <input
          type="text"
          name=""
          id=""
          style={{
            marginBottom: 10,
            width: "100%",
          }}
        />
        <input
          type="text"
          name=""
          id=""
          style={{
            marginBottom: 10,
            width: "100%",
          }}
        />
      </form>
    </Drawer>
  );
};

export default SignUpDrawer;
