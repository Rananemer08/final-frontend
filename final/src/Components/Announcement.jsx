import styled from "styled-components";
import {mobile} from "../responsive"

const Container = styled.div`
  height: 30px;
  background-color: teal;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 500;
  ${mobile({ fontSize:'12px' })}
`;

const Announcement = () => {
  return <Container>Super Deal! Free shipping on Orders Over €50</Container>;
};

export default Announcement;
