import { useState, useRef } from 'react';
import { Routes, Link } from 'react-router-dom';
import { Form, Tab, Tabs, Button } from 'react-bootstrap';
import Login from './Login';
import Register from './Register';

export default function Home(){
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
            <Register></Register>  
        </Tab>
      </Tabs>
    );
}
