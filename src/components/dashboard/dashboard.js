import React, { Component } from 'react'
import APIManager from '../../modules/APIManager'
import { Button, Row, Col, Card, CardHeader, CardBody } from 'reactstrap'
import ToDo from './todo'
import Chat from './chat'
class Dashboard extends Component {

    componentDidMount() {
    }

    render() {

        return (
            <>
                <div className="mt-5 mx-5">
                    <Row>
                        <Col md="7">
                            <Card>
                                <CardHeader>Headline News</CardHeader>
                                <CardBody>

                                </CardBody>
                            </Card>
                        </Col>
                        <Col md="5">
                            <Card>
                                <CardHeader>TO-DO</CardHeader>

                                <ToDo />

                            </Card>
                        </Col>
                    </Row>
                    <Row className="mt-5">
                        <Col md="7">
                            <Card>
                                <CardHeader>Upcoming Events</CardHeader>
                                <CardBody>

                                </CardBody>
                            </Card>

                        </Col>
                        <Col md="5">
                            <Card>
                                <CardHeader>Chat</CardHeader>
                                <Chat />
                            </Card>
                        </Col>
                    </Row>
                </div>
            </>
        )
    }
}

export default Dashboard