import { useState, useRef } from 'react'
import { Routes, Link } from 'react-router-dom'
import { Form, Tab, Tabs, Button } from 'react-bootstrap'
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
    from: {
        opacity: 0
    },
    to: {
        opacity: 1
    }
`;

const FadeIn = styled.div`
    display: inline-block;
`


export function Home(){
    return (
        <div className="App">
           <h1>Добро пожаловать!</h1>
            <ControlledTabs/>
        </div>
      );
}


function ControlledTabs() {
    const [key, setKey] = useState('login');
  
    return (
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
        variant="pills"
      >
        <Tab eventKey="login" title="Авторизация">
            <Login></Login>
        </Tab>
        <Tab eventKey="register" title="Регистрация">
               
        </Tab>
      </Tabs>
    );
  }


function Login(){

    const linkRef = useRef(null)

    const handleSubmit = (e) => {
        e.preventDefault();

    }


    return(
        <div>
            <h1>Авторизация</h1>
            <Form
            className='mt-5 w-50'
            style={{ margin: '0 auto' }}
            onSubmit={handleSubmit}
            >
                <Form.Group className="mb-3">
                    <Form.Label>Логин:</Form.Label>
                    <Form.Control/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Пароль:</Form.Label>
                    <Form.Control type="password"/>
                </Form.Group>     
            </Form>
        </div>
        
    );
}