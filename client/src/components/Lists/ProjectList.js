import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Col, Row, UncontrolledTooltip } from 'reactstrap';
import ModalComponent from '../Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faPencilAlt } from '@fortawesome/free-solid-svg-icons'

const ProjectList = (props) => {
    const {
        setProjectToDelete,
        projectList,
        handleClose,
        handleShow,
        modal,
        setModal,
        id,
        setId,
    } = props;
    return (
        <>
            <div>
                <hr />
                {projectList.projects && projectList.projects.map(
                    ({ project_id, project_name, project_number, project_description }) => (
                        <div key={project_id} className='userCard'>
                            <Row>
                                <Col>
                                    <h3>{project_name}</h3>
                                </Col>
                            </Row>
                            <Row xs='1' sm='2' md='4'>
                                <Col>Prosjekt nummer: {project_number} </Col>
                                <Col>Beskrivelse: {project_description} </Col>
                                <Col>
                                    <Link
                                        to={{
                                            pathname: '/Edit/project/' + project_id,
                                        }}
                                    >
                                        <UncontrolledTooltip placement="left" target="Endre">Endre</UncontrolledTooltip>
                                        <Button id="Endre" color='info' size='sm'>
                                            <FontAwesomeIcon icon={faPencilAlt} />  Endre
                  </Button>
                                    </Link>{' '}
                                    <UncontrolledTooltip placement="right" target="Slette">Slette</UncontrolledTooltip>
                                    <Button id='Slette' onClick={() => (setId(project_id), handleShow())} outline color='info' size='sm' >
                                        <FontAwesomeIcon icon={faTrashAlt} /> Slette
                  </Button>
                                </Col>
                            </Row>
                            <ModalComponent
                                modal={modal}
                                handleClose={handleClose}
                                deleteFunction={setProjectToDelete}
                                setModal={setModal}
                                id={id}
                            />
                            <hr />
                        </div>
                    )
                )}
            </div>
        </>
    );
};
export default ProjectList;
