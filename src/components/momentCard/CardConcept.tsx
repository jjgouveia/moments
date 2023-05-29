import { Button, Card, Col, Collapse, Row, Text } from "@nextui-org/react";
import "boxicons";

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
  const data = new Date(date);

  const dia = data.getDate().toString().padStart(2, "0");
  const mes = (data.getMonth() + 1).toString().padStart(2, "0");
  const ano = data.getFullYear().toString().substr(-2);

  const dataFormatada = `${dia}/${mes}/${ano}`;
  const likeId = `like-${id}`;
  const iconLike = document.getElementById(likeId);


  const like = () => {
    if(iconLike?.getAttribute("type") == "solid") {
      iconLike.setAttribute("type", "regular")
    }

    else {
      iconLike?.setAttribute("type", "solid")
    }

  };


  return (
    <Card className="moment-wrapper">
      <Card css={{ w: "400px", h: "fit-content", backgroundColor: "#f5f5d3" }} key={id}>
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
              <Row css={{alignItems: "center"}}>
                <Col span={2}>
                  <Card.Image
                    src="https://nextui.org/images/breathing-app-icon.jpeg"
                    css={{ bg: "black", br: "50%" }}
                    height={40}
                    width={40}
                    alt="Breathing app icon"
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
            {/* <Col>
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
            </Col> */}
          </Row>
        </Card.Header>
        {/* <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
          <Col>
            <Text size={12} weight="bold" transform="uppercase" color="#9E9E9E">
              {title}
            </Text>
            <Text h3 color="white">
              {description}
            </Text>
          </Col>
        </Card.Header> */}
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
            bottom: 56,
            zIndex: 1,
          }}
        >
          <Row>
            {/* <Col>
              <Row>
                <Col span={5}>
                  <Card.Image
                    src="https://nextui.org/images/breathing-app-icon.jpeg"
                    css={{ bg: "black", br: "50%" }}
                    height={40}
                    width={40}
                    alt="Breathing app icon"
                  />
                </Col>
                <Col>
                  <Text color="#d1d1d1" size={12}>
                    {username}
                  </Text>
                  <Text color="#d1d1d1" size={12}>
                    {dataFormatada}
                  </Text>
                </Col>
              </Row>
            </Col> */}

            <Col>
              <Row justify="center">
                <Button flat auto css={{ color: "#94f9f0", bg: "#94f9f026" }} onPress={like}>
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
                <Button flat auto css={{ color: "#94f9f0", bg: "#94f9f026" }} onPress={like}>
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
        <Collapse title="Mais" css={{ marginTop: "-52px", pl: "15px" }}>
          <Text css={{ p: "10px" }}>{description}</Text>
        </Collapse>
      </Card>
    </Card>
  );
};
