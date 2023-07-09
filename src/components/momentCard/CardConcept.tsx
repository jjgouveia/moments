import { Button, Card, Col, Row, Text } from "@nextui-org/react";
import { Card as AntdCard, Divider, Image, List, Skeleton } from "antd";
import "boxicons";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ICommentResponse } from "../../interfaces/ICommentReponse";
import { ProfileInfo } from "../../interfaces/IProfileInfo";
import { addLike, hasLiked, removeLike } from "../../services/like.service";
import { getProfile } from "../../services/profile.service";
import OwnAccordion from "../OwnAccordion";
import CommentModal from "../commentModal";
import PreviewComments from "../previewComments/index";
import "./style.css";


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
  const [cardLoaded, setCardLoaded] = useState(false);

  const navigate = useNavigate();

  const data = new Date(date);

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
      setCardLoaded(true);
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


  return (
    <List.Item className="card-list-item">
      <Card className="moment-wrapper">
      {cardLoaded ? (<Card
        css={{ w: "100%", h: "fit-content", backgroundColor: "#f5f5d3" }}
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
                    alt={username + " profile picture"} />
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
          <AntdCard
            hoverable
            cover={<Image src={imgUrl} alt="moment" fallback="https://via.placeholder.com/400" style={{
              borderRadius: "0",
            }}
              preview={false} />} />
        </Card.Body>
        <Card.Footer
          isBlurred
          css={{
            position: "relative",
            bgBlur: "#0f111466",
            borderTop: "$borderWeights$light solid $gray800",
            bottom: 54,
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
                <CommentModal comentList={comments} momentId={id} />
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
                    css={{ color: "#dec129" }}
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
        <OwnAccordion title={title} content={description}/>
        <PreviewComments commentList={comments} isFeedPreview={true} />
      </Card>) : (<Skeleton active avatar paragraph={{ rows: 5 }} />)}
    </Card>
    <Divider />
    </List.Item>
  );
};
