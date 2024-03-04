
import styled from 'styled-components';
import { Search, ShoppingCartOutlined } from '@material-ui/icons';
import { Badge } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import "./Navbar.css"
import React, { useState } from 'react';




import { mobile } from '../responsive';

const Container = styled.div`
  height: 60px;
  margin-top: 0px;
  // width: 1890px;

  ${mobile({ height: '50px', width:'100%',isplay:'flex', marginRight:'2px', padding:'0px', gap:'9px'})}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap:10px;

  ${mobile({ padding: '10px 0px' })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  ${mobile({ flex: 2 , justifyContent: 'center'})}
`;

const Language = styled.span`
  font-size: 18px;
  cursor: pointer;
  ${mobile({ display: 'none' })}
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
  ${mobile({ width: '50px' })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  color: black;
  ${mobile({ fontSize: '17px' })}
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: 'center' })}
`;



const MenuItem = styled.div`
  font-size: 18px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: '10px', marginLeft: '5px' })}
`;

const Navbar = () => {
  //   const quantity = useSelector((state) => state.cart.quantity);
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('authToken') !== null);

  const handleLogout = () => {
    // Clear the authentication token from local storage
    localStorage.removeItem('authToken');
    // Update the isLoggedIn state
    setIsLoggedIn(false);
    // Optionally, redirect the user to the login page
    window.location.href = "/login";
   };
  return (
    <Container>
      <Wrapper>
        <Left>
          {/* <Language>EN</Language> */}
          {/* <SearchContainer>
            <Input placeholder="Search" />
           
          </SearchContainer> */}
           
          <Link to="/blogs" style={{ color: 'black', textDecoration: 'none' ,display:'flex'}}>
            <MenuItem>BLOGS</MenuItem>
          </Link>
          <Link to="/contactus" style={{ color: 'black', textDecoration: 'none' }}>
            <MenuItem>CONTACT US</MenuItem>
          </Link>
          <Link to="/" style={{ color: 'black', textDecoration: 'none', }}>
            <MenuItem className='menunav'> HOME</MenuItem>
          </Link>
        </Left>
        <Center>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Logo>Peeksbymn.</Logo>
          </Link>
        </Center>
        <Right>
 {isLoggedIn ? (
    <>
      <Link to="/logout" onClick={handleLogout} style={{ color: 'black', textDecoration: 'none' }}>
        <MenuItem>LOGOUT</MenuItem>
      </Link>
    </>
 ) : (
    <>
      <Link to="/register" style={{ color: 'black', textDecoration: 'none' }}>
        <MenuItem>REGISTER</MenuItem>
      </Link>
      <Link to="/login" style={{ color: 'black', textDecoration: 'none' }}>
        <MenuItem>SIGN IN</MenuItem>
      </Link>
    </>
 )}
 <Link to="/addToCart">
    <MenuItem >
      <Badge color="primary"className='decr-size-icon'> 
        <ShoppingCartOutlined /> 
      </Badge>
    </MenuItem>
 </Link>
</Right>

      </Wrapper>
    </Container>
  );
};

export default Navbar;
