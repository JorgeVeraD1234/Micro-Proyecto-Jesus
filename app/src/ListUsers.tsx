import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Container, Nav, Row, Table } from 'react-bootstrap'

interface IUser {
    name: string,
    lastName: string,
    email: string,
}

export const ListUsers = () => {

    const [users, setUsers] = useState<IUser[]>([]);

    useEffect(() => {
        getUser();
    }, []);

    const getUser = () => {
        
        const users = [
            {
                name: "Jorge",
                lastName: "Vera",
                email: "jorge@utma.edu.mx"
            },
            {
                name: "Manuel",
                lastName: "Dominguez",
                email: "manuel@utma.edu.mx"
            },
            {
                name: "Jesus",
                lastName: "Salazar",
                email: "jesus@utma.edu.mx"
            }
        ];
        setUsers(users);
    }


    return (
        <>
            <Container>
                <Card>
                    <Card.Body>
                        <Card.Title>Lista de usuarios</Card.Title>
                        <Card.Body>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Nombre</th>
                                        <th>Apellidos</th>
                                        <th>Correo</th>
                                        <th>Opciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        users?.map((user, i) => (
                                            <tr>
                                                <td>{i + 1}</td>
                                                <td>{user.name}</td>
                                                <td>{user.lastName}</td>
                                                <td>{user.email}</td>
                                                <td>
                                                    <Row className='text-center'>
                                                        <Col>
                                                            <Button>
                                                                Editar
                                                            </Button>
                                                        </Col>
                                                        <Col>
                                                            <Button variant='danger'>
                                                                Eliminar
                                                            </Button>
                                                        </Col>
                                                    </Row>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card.Body>
                </Card>
            </Container>
        </>


    )
}
