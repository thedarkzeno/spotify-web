import styled, { keyframes } from "styled-components";

const display = keyframes`
  from {
    display: none;
    opacity: 0;
    }
  to {
    display: block;
    opacity: 1;
  }
`;

export const Container = styled.div`
  position: fixed;
  top: 0;
  width: 20%;
  min-width: 200px;
  height: 100%;
  padding: 100px 16px;
  background: #fff;
  box-shadow: 0 1px #000;
  color: #f1f1f1;
  z-index: 2;
  animation: ${display} 0.5s ease-out;
`;
export const Icon = styled.div`
  position: fixed;
  top: 10px;
  margin-left: 25px;
  padding: 5px;
  padding-bottom: 0;
  border-radius: 5px;
  cursor: pointer;
  z-index: 3;
  background-color: #fff;
`;
