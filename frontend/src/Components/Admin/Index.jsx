import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SideMenu from './SideMenu';
import { Outlet } from 'react-router-dom';
export default function Index() {
    return (
        <Container fluid className='p-0'>
            <Row className='w-100 m-0'>
                <SideMenu />
                <Col className='p-0'>
                    <div className='shadow p-2'>
                        Header of Admin Panel
                    </div>
                    <Outlet />
                </Col>
            </Row>
        </Container>
    )
}
