import { Row, Text } from "@nextui-org/react";
import { ICommentResponse } from "../../interfaces/ICommentReponse";
import CommentCard from "../commentCard";

interface CommentsToShowProps {
  commentList: Array<ICommentResponse>;
  isFeedPreview?: boolean;
}

const PreviewComments: React.FC<CommentsToShowProps> = ({ commentList, isFeedPreview=false }) => {

  let commentsToShow = Array<ICommentResponse>();

  if (isFeedPreview) {
    commentsToShow = commentList
    ?.sort((a: ICommentResponse, b: ICommentResponse) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    })
    .slice(0, 2);
  } else {
    commentsToShow = commentList
    ?.sort((a: ICommentResponse, b: ICommentResponse) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }

  return (
    <Row
      css={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        heigth: "fit-content",
      }}
    >
      {commentsToShow?.length > 0 ? (
        <Text
          css={{
            fontWeight: "bold",
            fontSize: "14px",
            marginBottom: "5px",
            marginLeft: "10px",
          }}
        >
          Comentários:
        </Text>
      ) : (
        <Text
          css={{
            color: "gray",
            fontSize: "12px",
            marginLeft: "10px",
            marginBottom: "-20px",
            marginTop: "5px",
          }}
        >
          Sem comentários
        </Text>
      )}
      <ul>
        {commentsToShow?.map((comment: ICommentResponse) => (
          <li key={comment.id}>
            <CommentCard {...comment} />
          </li>
        ))}
      </ul>
    </Row>
  );
};

export default PreviewComments;
