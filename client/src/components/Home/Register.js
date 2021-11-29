import axios from "axios";
import { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Form, Alert} from "react-bootstrap";

export default function Register() {
    const username = useRef();
    const password = useRef();
    const passwordAgain = useRef();
    const history = useHistory();

    const [showDangerAlert, setshowDangerAlert] = useState(false);
    const [response,setResponse]=useState("");
    
  
    const handleClick = async (e) => {
      e.preventDefault();
      if (passwordAgain.current.value !== password.current.value) {
        passwordAgain.current.setCustomValidity("Пароли не совпадают!");
      } else {
        const user = {
          username: username.current.value,
          password: password.current.value,
        };
        try {
            await axios.post("/auth/register", user);
            history.push("/login");
        } catch (err) {
            setshowDangerAlert(true);
            setResponse(err.response.data ?? err.message);
        }
      }
    };
  
    return (
        <Form className='mt-5 w-50'
        style={{ margin: '0 auto' }}
        onSubmit={handleClick}
        >
            {showDangerAlert && < MyAlert response={response} showAlert={showDangerAlert} />}
            <Form.Group className="mb-3">
                <Form.Label>Логин:</Form.Label>
                <Form.Control
                required
                type="text"
                ref={username}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Пароль:</Form.Label>
                <Form.Control
                required
                type="password"
                minLength="6"
                ref={password}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Повторите пароль:</Form.Label>
                <Form.Control
                required
                type="password"
                ref={passwordAgain}
                />
            </Form.Group>
            <Button type="submit">
                Зарегистрироваться
            </Button>
        </Form>    
    );
}

function MyAlert({response,showAlert}) {
    const [show, setShow] = useState(showAlert);
  
    return (
      <>
        <Alert show={show} variant="danger" onClose={() => setShow(false)} dismissible>
          <Alert.Heading>Ошибка</Alert.Heading>
          <p>
            {response}
          </p>
        </Alert>
  
        
      </>
    );
  }