import React, { Component } from 'react';
import { updateUser } from '../components/UserFunctions';
import PasswordChange from '../components/ChangePassword';
import { Button } from 'reactstrap';
import {
  ButtonDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle
} from 'reactstrap';
import SimpleReactValidator from 'simple-react-validator';
import BackButton from '../components/BackButton';

export default class EditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: props.location.state.user_id,
      first_name: props.location.state.first_name,
      last_name: props.location.state.last_name,
      email: props.location.state.email,
      user_level: props.location.state.user_level,
      name: props.location.state.name,
      dropdownOpen: false,
      errors: false
    };

    this.validator = new SimpleReactValidator({
      messages: {
        email: 'Vennligst skriv korrekt e-post adresse',
        required: 'Dette feltet er obligatorisk',
        alpha_space: 'Kun bokstaver og mellomrom er tillatt',
        alpha_num: 'Kun bokstaver og tall er tillatt',
        min: 'Passord skal bestå av minst 5 tegn'
        // OR
        //default: 'Validation has failed!'  // will override all messages
      }
    });
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.toggle = this.toggle.bind(this);
    this.select = this.select.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleReset = () => {
    this.setState({
      first_name: '',
      last_name: '',
      email: '',
      password: ''
    });
  };

  onSubmit(e) {
    e.preventDefault();

    const user = {
      user_id: this.state.user_id,
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      user_level: this.state.user_level
    };

    if (this.validator.allValid()) {
      updateUser(user).then(res => {
        if (res) {
          this.props.history.push(`/users`);
        } else {
          this.setState({ errors: true });
          this.forceUpdate();
        }
      });
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  select(event) {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
      value: event.target.innerText
    });
  }

  render() {
    const styles = {
      color: '#FF0000'
    };
    const showErrors = this.state.errors;
    return (
      <div>
        <div className='container'>
          <div className='row'>
            <div className='col-md-6 mt-5 mx-auto'>
              <h3>Oppdater bruker</h3>
              <form onSubmit={this.onSubmit}>
                <div className='form-group'>
                  <label>Fornavn: </label>
                  <input
                    type='text'
                    //ref='userInput'
                    className='form-control'
                    value={this.state.first_name}
                    onChange={this.onChange}
                    name='first_name'
                    onBlur={() => this.validator.showMessageFor('first_name')}
                  />
                </div>
                <div style={styles}>
                  {this.validator.message(
                    'first_name',
                    this.state.first_name,
                    'required|alpha_space'
                  )}
                </div>
                <div className='form-group'>
                  <label>Etternavn: </label>
                  <input
                    type='text'
                    className='form-control'
                    value={this.state.last_name}
                    onChange={this.onChange}
                    name='last_name'
                    onBlur={() => this.validator.showMessageFor('last_name')}
                  />
                </div>
                <div style={styles}>
                  {this.validator.message(
                    'last_name',
                    this.state.last_name,
                    'required|alpha_space'
                  )}
                </div>
                <div className='form-group'>
                  <label>E-post: </label>
                  <input
                    type='email'
                    className='form-control'
                    value={this.state.email}
                    onChange={this.onChange}
                    name='email'
                    onBlur={() => this.validator.showMessageFor('email')}
                  />
                  <div style={styles}>
                    {this.validator.message(
                      'email',
                      this.state.email,
                      'required|email'
                    )}
                  </div>
                </div>
                {showErrors ? (
                  <div style={styles}>
                    {' '}
                    Denne e-postadressen tilhører en annen bruker
                  </div>
                ) : (
                  <div> </div>
                )}
                <div className='form-group'>
                  <label>Nytt passord: </label>
                  <PasswordChange user_id={this.state.user_id} />
                </div>
                <div className='form-group'>
                  <p>Tilgangsnivå (velg fra liste)</p>{' '}
                  <ButtonDropdown
                    isOpen={this.state.dropdownOpen}
                    toggle={this.toggle}
                  >
                    <DropdownToggle>{this.state.user_level}</DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem onClick={this.select}>Bruker</DropdownItem>
                      <DropdownItem onClick={this.select}>Admin</DropdownItem>
                    </DropdownMenu>
                  </ButtonDropdown>
                </div>
                <div className='form-group'>
                  <label>Bedrift: </label>
                  <input
                    disabled
                    type='text'
                    className='form-control'
                    value={this.state.name}
                    name='name'
                  />
                </div>
                <div className='form-group'>
                  <Button type='submit' color='primary' size='sm'>
                    Lagre
                  </Button>{' '}
                  <Button
                    outline
                    onClick={this.handleReset}
                    value='Clear'
                    size='sm'
                  >
                    Tøm
                  </Button>
                </div>
                <div className='form-group'>
                  <BackButton history={this.props.history} />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
