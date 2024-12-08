import React, { useState } from 'react'
import { Button, Card, Container, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import axios from "axios";

export const RegisterUser = () => {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [lastname, setLastname] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [rol, setRol] = useState<string>("client");

    const navigate = useNavigate();


    const onSubmit = async() => {

        try {
            await axios.post("http://localhost:4000/users/create", {name, lastname, email, password, rol})
        } catch (error) {
            alert("Ocurrio un error")
        }
        console.log(name, lastname, email, password, rol)
        navigate("/")
    }
    return (
        <Container>
            <Card>
                <Card.Body>
                    <Card.Title>Formulario para registro de usuarios</Card.Title>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Nombre:</Form.Label>
                            <Form.Control onChange={(e) => setName(e.target.value)} name="name" placeholder="Ingresa tu nombre" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Apellidos:</Form.Label>
                            <Form.Control onChange={(e) => setLastname(e.target.value)} name="lastname" placeholder="Ingresa tu apellido" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Correo:</Form.Label>
                            <Form.Control onChange={(e) => setEmail(e.target.value)} name="email" type="email" placeholder="Ingresa tu correo" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Contraseña:</Form.Label>
                            <Form.Control onChange={(e) => setPassword(e.target.value)} name="password" type="password" placeholder="Ingresa tu contraseña" />
                        </Form.Group>
                        <Button onClick={() => onSubmit()}>Registrate!</Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    )
}
