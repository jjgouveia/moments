import { Button, Card, Col, Collapse, Row, Text } from "@nextui-org/react";
import "boxicons";
import { useEffect, useState } from "react";
import { ProfileInfo } from "../../interfaces/IProfileInfo";
import { addLike, hasLiked, removeLike } from "../../services/like.service";
import { getProfile } from "../../services/profile.service";

export const Card5 = ({
  id,
  title,
  description,
  imgUrl,
  username,
  date,
}: {
  id: string;
  title: string;
  description: string;
  imgUrl: string;
  username: string;
  date: string;
}) => {
  const [profileInfo, setProfileInfo] = useState([] as unknown as ProfileInfo);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const data = new Date(date);

  const dia = data.getDate().toString().padStart(2, "0");
  const mes = (data.getMonth() + 1).toString().padStart(2, "0");
  const ano = data.getFullYear().toString().substr(-2);

  const dataFormatada = `${dia} - ${mes} - ${ano}`;
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
            h: "60px",
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
                <Col>
                  <Text color="#000000" size={15}>
                    {username}
                  </Text>
                  <Text color="#000000" size={15}>
                    {dataFormatada}
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
            bottom: 52,
            zIndex: 1,
            borderRadius: "0 0 10px 10px",
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
                <Button flat auto css={{ color: "#94f9f0", bg: "#94f9f026" }}>
                  <box-icon
                    id={likeId}
                    type="regular"
                    name="comment"
                    color="#dec129"
                    background="#dec129"
                    animation="tada-hover"
                  ></box-icon>
                </Button>
              </Row>
            </Col>

            <Col>
              <Row justify="flex-end">
                <Button
                  flat
                  auto
                  rounded
                  css={{ color: "#94f9f0", bg: "#94f9f026" }}
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
          subtitle={title}
          css={{ marginTop: "-65px", pl: "15px", zIndex: -2 }}
          divider={false}
          shadow
        >
          <Text css={{ p: "10px" }}>{description}</Text>
        </Collapse>
      </Card>
    </Card>
  );
};
