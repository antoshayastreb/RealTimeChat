import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Navbar, Container, Form, Button } from "react-bootstrap";
import { loginOut } from "../../apiCalls";

export default function Topbar() {
    const { user } = useContext(AuthContext);
    const { isFetching, dispatch } = useContext(AuthContext);

    const handleClick = (e) => {
        e.preventDefault();
        loginOut(dispatch)
    };


    return (
        <Navbar bg="dark" variant="dark">
        <Container fluid>
            <Navbar.Brand>Чат</Navbar.Brand>
            <Navbar.Collapse className="justify-content-end">
                <Navbar.Text className="px-2">
                    {user.username ?? "Пользователь"}
                </Navbar.Text>
                <Form className="d-flex">
                    <Button variant="outline-danger" onClick={handleClick}>Выйти</Button>
                </Form>
            </Navbar.Collapse>
        </Container>
        </Navbar>
    );
  }