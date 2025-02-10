import React from 'react';
import {
    Container,
    FormGroup,
    Button,
    Form,
    Label,
    Input,
    Alert,
} from 'reactstrap';
import BackButton from '../BackButton';

const RegisterProject = (props) => {
    const { project_number, project_name, project_description } = props.inputs || {};
    const { onSubmit, handleChange, result } = props;

    return (
        <Container>
            <Form onSubmit={onSubmit}>
                <FormGroup>
                    <Label>Prosjektnummer</Label>
                    <Input
                        placeholder='Prosjektnummer'
                        required
                        name='project_number'
                        type='number'
                        defaultValue={project_number}
                        onChange={handleChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Prosjektnavn</Label>
                    <Input
                        placeholder='Prosjektnavn'
                        required
                        name='project_name'
                        type='text'
                        defaultValue={project_name}
                        onChange={handleChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Beskrivelse</Label>
                    <Input
                        placeholder='Beskrivelse'
                        name='project_description'
                        type='textarea'
                        defaultValue={project_description}
                        onChange={handleChange}
                    />
                </FormGroup>

                <Button size='sm' type='submit' color='primary'>
                    Registrer
        </Button>{' '}
                <BackButton />
            </Form><br />
            {result.message ? (
                <Alert color='success'>{result.message}</Alert>
            ) : undefined}
        </Container>
    );
};

export default RegisterProject;
