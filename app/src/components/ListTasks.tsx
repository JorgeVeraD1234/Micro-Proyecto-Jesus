import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Container, Dropdown, Form, Row } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface IUser{
    name:string,
    rol:string
}

export const ListTasks = (rol: string) => {
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
            alert("Hubo un error al obtener las tareas")
        }
    }



    const onSubmit = async (taskId: string) => {
        try {
            const res = await axios.delete(
                `http://localhost:4000/task/deleteTasks/${taskId}`);
                alert("Tarea eliminada con éxito!");
                window.location.reload();
            navigate("/Show-Tasks");
        } catch (error) {
            alert("Hubo un error");
        }
    };
    
    return (
        <Container className='mt-3 mb-3'>
            <Row>
                {
                    tasks.map(({ _id, title, dateFinish, status }, i) => (
                        <Col>
                            <Card className='mb-3'>
                                <Card.Body>

                                    <Row className='m-1'>
                                        <Col xs={4}>
                                            <Card.Title>
                                                {title}
                                            </Card.Title>
                                        </Col>
                                        {
                                            user?.rol == "client" && (
                                                <Col className='text-end'>
                                                    <Dropdown>
                                                        <Dropdown.Toggle></Dropdown.Toggle>
                                                        <Dropdown.Menu>
                                                            <Dropdown.Item onClick={() => onSubmit(_id)} style={{ width: "15rem" }} >Eliminar</Dropdown.Item>
                                                            <Dropdown.Item>Editar</Dropdown.Item>
                                                            <Dropdown.Item onClick={() => navigate("/ShowDescription")}>Ver</Dropdown.Item>
                                                        </Dropdown.Menu>
                                                    </Dropdown>
                                                </Col>
                                            )
                                        }
                                    </Row>

                                    <Row>
                                        <Card.Text>
                                            Fecha Límite: {dateFinish}
                                        </Card.Text>
                                    </Row>
                                    <Row>
                                        <Card.Text>
                                            Estado: {status}
                                        </Card.Text>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                }
            </Row>
            {
                user?.rol == "client" &&(
                    <div className='text-end'>
                        <Button onClick={() => navigate("/create-task")}>Crear Tarea </Button>
                    </div>
                )
            }
        </Container>
    )
}
