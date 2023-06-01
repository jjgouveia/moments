import { Button, Card, Col, Collapse, Row, Text } from "@nextui-org/react";
import "boxicons";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ICommentResponse } from "../../interfaces/ICommentReponse";
import { ProfileInfo } from "../../interfaces/IProfileInfo";
import { addLike, hasLiked, removeLike } from "../../services/like.service";
import { getProfile } from "../../services/profile.service";
import CommentsToShow from "../commentsToShow";
import NewCommentModal from "../modal/newCommentModal";

export const Card5 = ({
  id,
  title,
  description,
  imgUrl,
  username,
  date,
  comments,
}: {
  id: string;
  title: string;
  description: string;
  imgUrl: string;
  username: string;
  date: string;
  comments: Array<ICommentResponse>;
}) => {
  const [profileInfo, setProfileInfo] = useState([] as unknown as ProfileInfo);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const navigate = useNavigate();

  const data = new Date(date);

  // const dia = data.getDate().toString().padStart(2, "0");
  // const mes = (data.getMonth() + 1).toString().padStart(2, "0");
  // const ano = data.getFullYear().toString().substr(-2);

  // const dataFormatada = `${dia} - ${mes} - ${ano}`;



  const timeHasPassed = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / 60000);

    if (diffInMinutes === 0) {
      return "Agora";
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes} minutos atrás`;
    } else if (diffInMinutes < 1440) {
      const diffInHours = Math.floor(diffInMinutes / 60);
      if (diffInHours === 1) return `${diffInHours} hora atrás`;
      return `${diffInHours} horas atrás`;
    } else {
      const diffInDays = Math.floor(diffInMinutes / 1440);
      if (diffInDays === 1) return `${diffInDays} dia atrás`;
      return `${diffInDays} dias atrás`;
    }
  };

  const likeId = `like-${id}`;
  const iconLike = document.getElementById(likeId);

  const { token } = JSON.parse(localStorage.getItem("token") || "");

  const like = async () => {
    try {
      const type = iconLike?.getAttribute("type");
      if (type === "regular") {
        await addLike(id);
        iconLike?.setAttribute("type", "solid");
      } else {
        await removeLike(id);
        iconLike?.setAttribute("type", "regular");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const goToMoment = (momentId: string) => {
    navigate(`/moment/${momentId}`);
  };




  useEffect(() => {
    const getInfo = async () => getProfile(token, username);
    getInfo().then((res) => {
      setProfileInfo(res);
    });
  }, [token, username]);

  useEffect(() => {
    const hasAlreadyLiked = async () => {
      const { data, status } = await hasLiked(id);

      if (status === 200 && data === true) {
        iconLike?.setAttribute("type", "solid");
      }
    };

    hasAlreadyLiked();
  }, [iconLike, id]);

  // const handleOpenModal = () => {
  //   setModalIsOpen(true);
  // };

  // const handleCloseModal = () => {
  //   setModalIsOpen(false);
  // };

  return (
    <Card className="moment-wrapper">
      <Card
        css={{ w: "400px", h: "fit-content", backgroundColor: "#f5f5d3" }}
        key={id}
      >
        <Card.Header
          isBlurred
          css={{
            position: "relative",
            bgBlur: "#0f111466",
            zIndex: 1,
            h: "50px",
          }}
        >
          <Row>
            <Col>
              <Row css={{ alignItems: "center" }}>
                <Col span={2}>
                  <Card.Image
                    src={profileInfo?.profilePicture}
                    css={{ bg: "black", br: "50%" }}
                    height={40}
                    width={40}
                    alt={username + " profile picture"}
                  />
                </Col>
                <Col
                  css={{
                    display: "flex",
                    justifyContent: "left",
                    alignItems: "center",
                    marginLeft: "5px",
                    height: "50px",
                  }}
                >
                  <Row
                    css={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-around",
                      height: "100%",
                      width: "fit-content",
                    }}
                  >
                    <Text
                      color="#000000"
                      size={13}
                      css={{
                        fontWeight: "bold",
                        height: "18px",
                      }}
                    >
                      {profileInfo?.name}
                    </Text>
                    <Text
                      color="#000000"
                      size={13}
                      css={{
                        fontWeight: "600",
                      }}
                    >
                      {username}
                    </Text>
                  </Row>
                  <Text
                    color="#000000"
                    size={13}
                    css={{
                      marginLeft: "auto",
                      width: "fit-content",
                      fontWeight: "600",
                    }}
                  >
                    {timeHasPassed(data)}
                  </Text>
                </Col>
              </Row>
            </Col>
          </Row>
        </Card.Header>
        <Card.Body css={{ p: 0 }}>
          <Card.Image
            src={imgUrl}
            objectFit="cover"
            width="100%"
            height="100%"
            alt={title}
            zIndex={2}
          />
        </Card.Body>
        <Card.Footer
          isBlurred
          css={{
            position: "relative",
            bgBlur: "#0f111466",
            borderTop: "$borderWeights$light solid $gray800",
            bottom: 50,
            zIndex: 1,
            borderRadius: "0 0 5px 5px",
            h: "55px",
          }}
        >
          <Row>
            <Col>
              <Row justify="center">
                <Button
                  flat
                  auto
                  css={{ color: "#94f9f0", bg: "#94f9f026" }}
                  onPress={like}
                >
                  <box-icon
                    id={likeId}
                    type="regular"
                    name="heart"
                    color="#dec129"
                    background="#dec129"
                    animation="tada-hover"
                  ></box-icon>
                </Button>
              </Row>
            </Col>
            <Col>
              <Row justify="center">
                <NewCommentModal comentList={comments} momentId={id} />
              </Row>
            </Col>

            <Col>
              <Row justify="flex-end">
                <Button
                  flat
                  auto
                  rounded
                  css={{ color: "#94f9f0", bg: "#94f9f026" }}
                  onPress={() => goToMoment(id)}
                >
                  <Text
                    css={{ color: "inherit" }}
                    size={12}
                    weight="bold"
                    transform="uppercase"
                  >
                    Ir ao Momento
                  </Text>
                </Button>
              </Row>
            </Col>
          </Row>
        </Card.Footer>
        <Collapse
          title={title}
          css={{ marginTop: "-65px", pl: "15px", zIndex: -2 }}
          divider={false}
          shadow
        >
          <Text css={{ p: "10px" }}>{description}</Text>
        </Collapse>
        <CommentsToShow commentList={comments} />
      </Card>
    </Card>
  );
};
