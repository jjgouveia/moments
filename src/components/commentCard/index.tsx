import { Grid } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { ICommentResponse } from "../../interfaces/ICommentReponse";
import { getUserByUserId } from "../../services/user.service";

const CommentCard: React.FC<ICommentResponse> = (comment) => {
  const { token } = JSON.parse(localStorage.getItem("token") || "{}");
  const [username, setUsername] = useState<string>("");
  useEffect(() => {
    const getUsername = async () => {
      const { data, status } = await getUserByUserId(token, comment.userId);
      if (status === 200) {
        setUsername(data.username);
      }
    };

    getUsername();
  }, [comment, token]);

  return (
    <div
      style={{
        height: "fit-content",
        display: "flex",
        flexDirection: "row",
        width: "360px",
      }}
    >
      <Grid.Container
        gap={1}
        css={{
          display: "flex",
          width: "100%",
        }}
      >
        <Grid>
          <p style={{ fontSize: "14px", fontWeight: "600" }}>{username}: </p>
        </Grid>
        <Grid
          xs
          css={{
            marginLeft: "0 auto",
            width: "100%",
          }}
        >

          {comment.content.length > 100 ? (
            <p style={{ fontSize: "14px" }}>
              {comment.content.substring(0, 120)}{" "}
              <button
                style={{
                  border: "none",
                  background: "none",
                  cursor: "pointer",
                }}
              >
                ...
              </button>
            </p>
          ) : (
            <p style={{ fontSize: "14px" }}>{comment.content}</p>
          )}
        </Grid>
      </Grid.Container>
    </div>
  );
};

export default CommentCard;
