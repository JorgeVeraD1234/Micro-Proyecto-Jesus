
import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Container, Dropdown, Form, Row } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './App.css'

interface IUser {
    name: string,
    rol: string
}

export const ShowDescription = () => {

    const navigate = useNavigate();
    const [tasks, settasks] = useState([]);
    const [user, setUser] = useState<IUser>();

    useEffect(() => {
        getUser()
        getData()
    }, [])

    const getUser = () => {
        const user = JSON.parse(localStorage.user);
        setUser(user);
    }

    const getData = async () => {
        try {
            const { data } = await axios.get("http://localhost:4000/tasks/get-all");
            settasks(data.tasks);
        } catch (error) {
            console.log(error)
            alert("Ocurrio un error al obtener las tareas")
        }
    }

    const onClick = async (taskId: string) => {
        try {
            const res = await axios.delete(
                `http://localhost:4000/task/deleteTasks/${taskId}`);
            alert("Tarea eliminada con éxito!");

            navigate("/Show-Tasks");
        } catch (error) {
            alert("Ocurrio un error");
        }
    };

    return (
        <Container className='mt-3 mb-3'>
            {
                tasks.map(({ _id, title, description }) => (
                    <Col>
                        <Card>
                            <Card.Body>
                                <Card.Title>
                                    Titulo: {title}
                                </Card.Title>
                                <Row>
                                    <Col>
                                        <Card.Text>
                                            Descripción: {description}
                                        </Card.Text>
                                    </Col>
                                    <Col xs={1}>
                                        <Button>Editar</Button>
                                    </Col>
                                    <Col xs={1}>
                                        <Button onClick={() => onClick(_id)}>Eliminar</Button>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                ))
            }
        </Container>
    )
}