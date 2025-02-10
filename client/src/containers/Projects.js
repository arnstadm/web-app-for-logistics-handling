import React, { useState, useEffect } from 'react';
import ProjectList from '../components/Lists/ProjectList';
import { Button, Container, UncontrolledAlert } from 'reactstrap';
import { Link } from 'react-router-dom';
import ApiCall from '../components/ApiCall';
import Loading from '../components/Loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
const Projects = () => {
  const [projectList, setProjectList] = useState({
    projects: [],
    isFetching: false,
  });
  const [projectToDelete, setProjectToDelete] = useState('');
  const [modal, setModal] = useState(false);
  const [id, setId] = useState('');
  const handleClose = () => setModal(false);
  const handleShow = () => setModal(true);
  const [result, setResult] = useState();
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setProjectList({ projects: [], isFetching: true });
        const response = await ApiCall('projects', 'GET');
        setProjectList({ projects: response.result, isFetching: false });
      } catch (error) {
        console.log(error);
        setProjectList({ projects: [], isFetching: false });
      }
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    const deleteProject = async () => {
      try {
        const response = await ApiCall('projects/' + projectToDelete, 'DELETE');
        if (response.result) {
          const newProjectList = projectList.projects.filter(
            (project) => project.project_id !== projectToDelete
          );
          setProjectList({ projects: newProjectList, isFetching: false });
        }
        setResult(response.message);
      } catch (error) {
        console.log(error);
      }
    };
    deleteProject();
  }, [projectToDelete]);

  return (
    <Container>
      <br />
      <Link to='/register/project'>
        <Button color='primary' size='sm'>
          <FontAwesomeIcon icon={faPlus} /> Nytt prosjekt
        </Button>
      </Link>
      <br />
      <h2>Oversikt over prosjekter</h2>
      {result && result ? (<UncontrolledAlert color='success'>{result}</UncontrolledAlert>
      ) : undefined
      }
      {result && result.error ? (<UncontrolledAlert color='danger'>{result.error}</UncontrolledAlert>) : undefined}
      {projectList.isFetching ? (
        <Loading />
      ) : (
          <ProjectList
            setProjectToDelete={setProjectToDelete}
            projectList={projectList}
            setId={setId}
            id={id}
            handleClose={handleClose}
            handleShow={handleShow}
            modal={modal}
            setModal={setModal}
          />
        )}
    </Container>
  );
};
export default Projects;
