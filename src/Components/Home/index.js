import React from "react";
import { useSelector } from "react-redux";
import Search from "../Search";
import Header from "../Header";

import { Container, Card, CardText, Image, ImageContainer } from "./styles";

const Home = () => {
  const reduxState = useSelector((state) => state);

  //   console.log(reduxState);
  //   console.log(elRefs);
  return (
    <>
      <Header>
        <Search />
      </Header>
      <Container>
        {reduxState.results.message && (
          <center>
            <h2>
              <b>{reduxState.results.message}</b>
            </h2>
          </center>
        )}

        {reduxState.results.playlists &&
          reduxState.results.playlists.items.map((item, index) =>
            reduxState.query === "" ? (
              <Card key={`${item.name} - ${index}`}>
                <ImageContainer>
                  <Image src={item.images[0].url} width={128} alt="" />
                </ImageContainer>

                <CardText>
                  <p>{item.name}</p>
                  <p style={{ fontSize: 11, color: "#a6a6a6" }}>
                    {item.description}
                  </p>
                </CardText>
              </Card>
            ) : (
              item.name
                .toLowerCase()
                .includes(reduxState.query.toLowerCase()) && (
                <Card key={`${item.name} - ${index}`}>
                  <ImageContainer>
                    <Image src={item.images[0].url} width={128} alt="" />
                  </ImageContainer>

                  <CardText>
                    <p>{item.name}</p>
                    <p style={{ fontSize: 11, color: "#a6a6a6" }}>
                      {item.description}
                    </p>
                  </CardText>
                </Card>
              )
            )
          )}
      </Container>
    </>
  );
};

export default Home;
