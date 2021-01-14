import React, { createRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Search from "../Search";
import Header from "../Header";

import {
  Container,
  Card,
  CardText,
  Image,
  Overlay,
  ImageContainer,
} from "./styles";
import PlayIcon from "../../Assets/play.svg";


const Home = () => {
  const reduxState = useSelector((state) => state);
  const [elRefs, setElRefs] = useState([]);
  useEffect(() => {
    // add or remove refs
    setElRefs((elRefs) =>
      Array(10)
        .fill()
        .map((_, i) => elRefs[i] || createRef(null))
    );
  }, []);
  //   console.log(reduxState);
  //   console.log(elRefs);
  return (
    <>
      <Header>
        <Search />
      </Header>
      <Container>
        {/* <center><h2><b>Tracks</b></h2></center> */}
        {reduxState.results.tracks &&
          reduxState.results.tracks.items.map((item, index) => (
            <Card key={`${item.name} - ${item.artists[0].name} - ${index}`}>
              <ImageContainer>
                <Image
                  src={item.album.images[0].url}
                  width={128}
                  style={{ cursor: "pointer" }}
                  alt=""
                />
                {item.preview_url !== null ? (
                  <Overlay>
                    <img
                      onClick={() => {
                        elRefs.map((ref, i) => {
                          if (i !== index) {
                            ref.current.pause();
                          }
                          return ref;
                        });
                        elRefs[index].current.paused
                          ? elRefs[index].current.play()
                          : elRefs[index].current.pause();
                      }}
                      src={PlayIcon}
                      width={64}
                      style={{ margin: 32, cursor: "pointer" }}
                      alt=""
                    />
                  </Overlay>
                ) : (
                  <Overlay>
                    <img
                      src={item.album.images[0].url}
                      width={128}
                      alt=""
                      style={{opacity: 0.7}}
                    />
                  </Overlay>
                )}
              </ImageContainer>

              <CardText>
                {item.name} - {item.artists[0].name}
                <audio ref={elRefs[index]}>
                  <source src={item.preview_url} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </CardText>
            </Card>
          ))}
      </Container>
      
    </>
  );
};

export default Home;
