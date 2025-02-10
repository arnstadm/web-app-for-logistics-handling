import React from 'react';
import { Container, Form, FormGroup, Input, Label, Button } from 'reactstrap';

const Detections = (props) => {
  const { handleChange, items, onSubmit, transactions, projects } = props;

  return (
    <Form onSubmit={onSubmit}>
      {transactions.map((item, i) => (
        <Container key={'detection ' + i}>
          <FormGroup>
            <Label>Varetype</Label>
            <Input
              type='select'
              name='item_id'
              required
              defaultValue={transactions[i].item_id || ''}
              onChange={handleChange(i)}
            >
              {items &&
                items.map((items) => (
                  <option key={'item' + items.item_id} value={items.item_id}>
                    {items.name}
                  </option>
                ))}
            </Input>
          </FormGroup>
          <FormGroup>
            <Label>Score: {item.score}</Label>
          </FormGroup>
          <FormGroup>
            <Label>Antall: </Label>
            <Input
              type='number'
              name='amount'
              defaultValue={transactions[i].amount}
              onChange={handleChange(i)}
            />
          </FormGroup>
          <FormGroup>
            <Label>Prosjekt: </Label>
            <Input
              type='select'
              name='project'
              required
              defaultValue={transactions[i].project || ''}
              onChange={handleChange(i)}
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
          <hr />
        </Container>
      ))}
    </Form>
  );
};
export default Detections;
