import React from 'react';
import { Container, FormGroup, Input, Label, Button } from 'reactstrap';

const InputDetections = (props) => {
  const {
    handleChange,
    items,
    projects,
    index,
    handleRemove,
    defaultItem,
    score,
    name,
  } = props;

  return (
    <Container key={'detection ' + index}>
      <FormGroup>
        <Label>Vare</Label>
        <Input
          type='select'
          name='item_id'
          required
          defaultValue={defaultItem}
          onChange={handleChange(index)}
        >
          {items &&
            items.map((items) => (
              <option key={'item' + items.item_id} value={items.item_id}>
                {items.name}
              </option>
            ))}
        </Input>
        {score ? (
          <p>
            Modellen fant vare med navn: {name}. med sannsynlighet: {score}
          </p>
        ) : undefined}
      </FormGroup>
      <FormGroup>
        <Label>Antall: </Label>
        <Input
          type='number'
          name='amount'
          defaultValue='1'
          onChange={handleChange(index)}
        />
      </FormGroup>
      <FormGroup>
        <Label>Prosjekt: </Label>
        <Input
          type='select'
          name='project'
          required
          placeholder='Velg prosjekt'
          onChange={handleChange(index)}
        >
          {projects &&
            projects.map((project) => (
              <option
                key={'project' + projects.project_id}
                value={project.project_id}
              >
                {project.project_number}
              </option>
            ))}
        </Input>
      </FormGroup>
      <Button color='warning' onClick={() => handleRemove(index)} size='sm'>
        Fjern felt
      </Button>
      <hr />
    </Container>
  );
};
export default InputDetections;
