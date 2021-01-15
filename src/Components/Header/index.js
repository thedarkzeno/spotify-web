import React, { useState } from "react";
import { Container, Icon } from "./styles";
import MenuIcon from "../../Assets/menu.png";

const Header = ({ children }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };
  return (
    <>
      <Icon onClick={handleOpen}>
        <img  src={MenuIcon} width={32} alt="" />
      </Icon>
      <Container style={{ display: !open ? "none" : "flex" }}>
        {children}
      </Container>
    </>
  );
};

export default Header;
