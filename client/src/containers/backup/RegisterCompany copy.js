import React, { Component } from 'react';
import { registerCompany } from '../components/UserFunctions';
import { Button } from 'reactstrap';
import SimpleReactValidator from 'simple-react-validator';
import BackButton from '../components/BackButton';

class RegisterCompany extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      erp_system: '',
      first_name: '',
      last_name: '',
      email: '',
      //company_id: '',
      password: '',
      errors: false,
      value: 'Admin'
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

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleClick = () => {
    console.log('this is:', this);
    this.props.history.push(`/login`);
  };

  handleReset = () => {
    this.setState({
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      name: '',
      erp_system: ''
    });
  };

  onSubmit(e) {
    e.preventDefault();

    const newCompany = {
      name: this.state.name,
      erp_system: this.state.erp_system,
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      user_level: this.state.value,
      password: this.state.password
    };

    if (this.validator.allValid()) {
      registerCompany(newCompany).then(res => {
        if (res) {
          this.props.history.push(`/login`);
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

  render() {
    const styles = {
      color: '#FF0000'
    };
    const showErrors = this.state.errors;
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-md-6 mt-5 mx-auto'>
            <form onSubmit={this.onSubmit}>
              <h1 className='h3 mb-3 font-weight-normal'>Register</h1>
              <div className='form-group'>
                <label htmlFor='first_name'>Fornavn</label>
                <input
                  type='text'
                  className='form-control'
                  name='first_name'
                  placeholder='Skriv ditt fornavn'
                  value={this.state.first_name}
                  onChange={this.onChange}
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
                <label htmlFor='last_name'>Etternavn</label>
                <input
                  type='text'
                  className='form-control'
                  name='last_name'
                  placeholder='Skriv ditt etternavn'
                  value={this.state.last_name}
                  onChange={this.onChange}
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
                <label htmlFor='email'>E-post adresse</label>
                <input
                  type='email'
                  className='form-control'
                  name='email'
                  placeholder='Skriv e-post her'
                  value={this.state.email}
                  onChange={this.onChange}
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
                  Denne e-post adressen er allerede registrert
                </div>
              ) : (
                  <div> </div>
                )}
              <div className='form-group'>
                <label htmlFor='name'>Bedrift navn</label>
                <input
                  type='text'
                  className='form-control'
                  name='name'
                  placeholder='Bedrift navn'
                  value={this.state.name}
                  onChange={this.onChange}
                  onBlur={() => this.validator.showMessageFor('name')}
                />
              </div>
              <div style={styles}>
                {this.validator.message('name', this.state.name, 'required')}
              </div>
              <div className='form-group'>
                <label htmlFor='erp_system'>ERP system</label>
                <input
                  type='text'
                  className='form-control'
                  name='erp_system'
                  placeholder='ERP system'
                  value={this.state.erp_system}
                  onChange={this.onChange}
                  onBlur={() => this.validator.showMessageFor('erp_system')}
                />
              </div>
              <div style={styles}>
                {this.validator.message(
                  'erp_system',
                  this.state.erp_system,
                  'required'
                )}
              </div>
              <div className='form-group'>
                <p>Tilgangsnivå</p>{' '}
                <input
                  disabled
                  className='form-control'
                  type='text'
                  value={this.state.value}
                />
                <div className='form-group'>
                  <label htmlFor='password'>Password</label>
                  <input
                    type='password'
                    className='form-control'
                    name='password'
                    placeholder='Passord'
                    value={this.state.password}
                    onChange={this.onChange}
                  // onBlur={() => this.validator.showMessageFor('password')}
                  />
                </div>
              </div>
              <div style={styles}>
                {this.validator.message(
                  'password',
                  this.state.password,
                  'required|alpha_num|min:5'
                )}
              </div>
              <div className='form-group'>
                <Button type='submit' color='primary'>
                  Register
                </Button>{' '}
                <Button outline onClick={this.handleReset} value='Clear'>
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
    );
  }
}

export default RegisterCompany;
