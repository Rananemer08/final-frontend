// import styled from "styled-components";
// import { mobile } from "../../responsive";

// const Container = styled.div`
//   width: 100vw;
//   height: 100vh;
//   background: linear-gradient(
//     rgba(255, 255, 255, 0.5),
//     rgba(255, 255, 255, 0.5)
//   ),
//   url("https://firebasestorage.googleapis.com/v0/b/mern-ecommerce-5b054.appspot.com/o/login.jpeg?alt=media&token=dd456f8a-e737-4e1f-8a0b-bb658d9242b9")
//   center;
//   background-size: cover;
//   display: flex;
//   align-items: center;
//   justify-content: center;
// `;

// const Wrapper = styled.div`
//   width: 25%;
//   padding: 20px;
//   background-color: white;
//   ${mobile({ width: "75%" })}
// `;

// const Title = styled.h1`
//   font-size: 24px;
//   font-weight: 300;
// `;

// const Form = styled.form`
//   display: flex;
//   flex-direction: column;
// `;

// const Input = styled.input`
//   flex: 1;
//   min-width: 40%;
//   margin: 10px 0;
//   padding: 10px;
// `;

// const Button = styled.button`
//   width: 40%;
//   border: none;
//   padding: 15px 20px;
//   background-color: teal;
//   color: white;
//   cursor: pointer;
//   margin-bottom: 10px;
//   &:disabled {
//     color: green;
//     cursor: not-allowed;
//   }
// `;

// const Link = styled.a`
//   margin: 5px 0px;
//   font-size: 12px;
//   text-decoration: underline;
//   cursor: pointer;
// `;

// const Error = styled.span`
//   color: red;
// `;

// const Login = () => {
//   return (
//     <Container>
//       <Wrapper>
//         <Title style={{margin:'auto'}}>SIGN IN</Title>
//         <Form>
//           <Input placeholder="username" />
//           <Input placeholder="password" type="password" />
//           <Button style={{margin:'auto'}} >LOGIN</Button>
         
//         </Form>
//       </Wrapper>
//     </Container>
//   );
// };

// export default Login;

// Login.jsx (Frontend)

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { mobile } from '../../responsive';
import "./Login.css"

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
    rgba(255, 255, 255, 0.5),
    rgba(255, 255, 255, 0.5)
  ),
  url("https://firebasestorage.googleapis.com/v0/b/mern-ecommerce-5b054.appspot.com/o/login.jpeg?alt=media&token=dd456f8a-e737-4e1f-8a0b-bb658d9242b9")
  center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: '70%', height:'50%' })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  ${mobile({ width: '100%', marginTop: '5px' })}
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  &:disabled {
    color: green;
    cursor: not-allowed;
    ${mobile({ width:'70%',justifyContent:'center' })}
  }
`;

const Link = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

const Error = styled.span`
  color: red;
`;

const Login = () => {
  const [login, setLogin] = useState({
    username: '',
    password: '',
  });
  const navigate = useNavigate();

  const goToRegister = () => {
    navigate('/register');
  };

  const handleInputChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/api/users/login', login);
  
      // Store token securely (e.g., in local storage)
      localStorage.setItem('authToken', response.data.token);
      
      // Check the structure of response.data to access userType correctly
      const userType = response.data.userType || response.data.user.userType;
  
      localStorage.setItem('userType', userType);
  
      // Navigate to checkout or home page based on authorization
      if (userType === 'admin') {
        navigate('/sidebar'); // Navigate to sidebar for admin users
      } else {
        navigate('/checkout'); // Navigate to checkout page for non-admin users
      }
    } catch (error) {
      console.error('Login failed:', error.response.data); // Log detailed error response
      // Handle login errors here (e.g., display error message)
    }
  };
  
  return (
    <Container className='container-login'>
      <Wrapper>
        <Title style={{ margin: 'auto' }}>SIGN IN</Title>
        <Form onSubmit={handleLogin}>
          <Input
            type="text"
            name="username"
            placeholder="Username"
            value={login.username}
            onChange={handleInputChange}
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={login.password}
            onChange={handleInputChange}
          />
          <Button style={{ margin: 'auto', marginTop: '20px' }} type="submit">
            LOGIN
          </Button>
        </Form>
        <div style={{ display: 'flex', marginTop: '20px', justifyContent: 'center', textDecoration: 'Bold', gap: '6px' }} className='combain-two-for'>
          <p className="login-p">Don't Have Account?</p>
          <Link className="login-link" onClick={goToRegister}>
            {' '}
            Register
          </Link>
        </div>
      </Wrapper>
    </Container>
  );
};

export default Login;
