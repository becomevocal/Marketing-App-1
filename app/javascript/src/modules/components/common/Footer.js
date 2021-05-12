import styled from "styled-components";

const Footer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50px;
  display: flex;
  align-items: center;
  border-top: 1px solid #d9dce9;
  justify-content: flex-end;
  padding: 0 4rem;
  background-color: #fff;

  @media (max-width: 768px) {
    justify-content: center;
    padding: 0;
  }
`;

export default Footer;
