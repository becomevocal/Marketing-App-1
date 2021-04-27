import styled from "styled-components";

const PanelHeader = styled.header`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 1rem;

  h2 {
    margin-bottom: 0;
  }

  img {
    margin-right: 1rem;
  }
`;

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  margin-bottom: 1rem;
  li svg {
    margin-right: 0.5rem;
  }
`;

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

export { Footer, List, Step, StepDivider, PanelHeader };
