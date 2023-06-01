import { Button, Modal, Text } from "@nextui-org/react";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { IComment } from "../../interfaces/IComment";
import { ICommentResponse } from "../../interfaces/ICommentReponse";
import { createComment } from "../../services/comment.service";
import CommentCard from "../commentCard";

interface CommentModalProps {
  comentList: Array<ICommentResponse>;
  momentId: string;
}

const NewCommentModal: React.FC<CommentModalProps> = ({
  comentList,
  momentId,
}) => {
  const [visible, setVisible] = React.useState(false);
  const handler = () => setVisible(true);
  const closeHandler = () => {
    setVisible(false);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IComment>({});
  const [comments, setComments] = useState(comentList);

  const onSubmit: SubmitHandler<IComment> = async (info) => {
    const { data } = await createComment(momentId, info);
    setComments([...comments, data]);
  };

  const handleFormSubmit = (data: any) => {
    onSubmit(data);
  };
  return (
    <div>
      <Button
        flat
        auto
        css={{ color: "#94f9f0", bg: "#94f9f026" }}
        onPress={handler}
      >
        <box-icon
          type="regular"
          name="comment"
          color="#dec129"
          background="#dec129"
          animation="tada-hover"
        >{comments.length}</box-icon>
      </Button>
      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Comentários:
          </Text>
        </Modal.Header>
        <Modal.Body>
          <form
            onSubmit={handleSubmit(handleFormSubmit)}
            encType="multipart/form-data"
          >
            <textarea
            style={{width: '78%', resize: 'none', height: '100px', overflowY: 'auto', color: '#000000'}}
              className="modal-comment-input"
              {...register("content", { required: "Este campo é obrigatório" })}
              placeholder="Digite seu comentário"
            ></textarea>
            <span>{errors.content && errors.content.message}</span>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button auto type="submit" onPress={handleSubmit(handleFormSubmit)}>
            Publicar
          </Button>
        </Modal.Footer>
        <div className="modal-comment-container">
        {comments?.map((coment: ICommentResponse) => (
          <li key={coment.id}>
            <CommentCard {...coment} />
          </li>
        ))}
      </div>

      </Modal>
    </div>
  );
};

export default NewCommentModal;
