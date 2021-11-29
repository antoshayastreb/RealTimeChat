import { useContext, useRef, useState } from "react";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import { Spinner, Button, Form, Alert } from "react-bootstrap";

export default function Login() {
    const [validated, setValidated] = useState(false);
    const username = useRef();
    const password = useRef();
    const { isFetching, dispatch } = useContext(AuthContext);
    const [showDangerAlert, setshowDangerAlert] = useState(false);
    const [response,setResponse]=useState("");
  
    const handleClick = (e) => {
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        }
        setValidated(true);
        e.preventDefault();
        loginCall(
            { username: username.current.value, password: password.current.value },
            dispatch
        ).then((err) => {
            if (err.status !== 200){
                setValidated(false);
                setshowDangerAlert(true);
                setResponse(err.data);
            }
        })
    };
  
    return (
        <Form className='mt-5 w-50'
        noValidate validated={validated}
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
            <Button type="submit" disabled={isFetching}>
                {isFetching 
                ? (<Spinner animation="grow"/> )
                : ("Авторизация")
                }
            </Button>
        </Form>    
    );

    function MyAlert({response,showDangerAlert}) {
    
      return (
        <>
          <Alert show={showDangerAlert} variant="danger" onClose={() => setshowDangerAlert(false)} dismissible>
            <Alert.Heading>Ошибка</Alert.Heading>
            <p>
              {response}
            </p>
          </Alert>
    
          
        </>
      );
    }
}