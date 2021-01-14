import styled from "styled-components";

export const Container = styled.div`
  width: 50%;
  min-width: 300px;
  max-height: 500px;
  overflow-y: auto;
  background-color: #fff;
  margin: auto;
  margin-top: 100px;
`;
export const Card = styled.div`
  width: 100%;
  background-color: #fff;
  margin: auto;
  margin-top: 1px;
  display: flex;
  justify-content: space-between;
`;

export const CardText = styled.div`
  margin: auto;
  margin-top: auto;
`;
export const ImageContainer = styled.div`
  position: relative;
  top: 0;
  left: 0;
 
`;
export const Image = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0.7;
`;
export const Overlay = styled.div`
  position: relative;
  top: 0;
  left: 0;
`;
