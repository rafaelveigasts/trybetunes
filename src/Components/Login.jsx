import React from 'react';

class Login extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      nome: '',
    };
  }

  handleChange([target]) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { value, nome, handleChange } = this.props;
    let error;
    const tres = 3;
    if (value.length > tres) error = 'Nome errado';

    return (
      <div data-testid="page-login">
        <input
          name="username"
          type="text"
          data-testid="page-login"
          value={ this.state.nome }
          onChange={ this.handleChange }
        />
        <span>
          {' '}
          {error || ''}
          {' '}
        </span>
        <button type="submit">Entrar</button>
      </div>
    );
  }
}

export default Login;
