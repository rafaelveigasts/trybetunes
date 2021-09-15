import React from 'react';
import { Redirect } from 'react-router';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      redirect: false,
      loading: false,
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleEvents = this.handleEvents.bind(this);
  }

  async handleClick() {
    const { name } = this.state;
    this.setState({ loading: true });
    await createUser({ name });
    this.setState({ redirect: true });
  }

  handleEvents(event) {
    const { value, name } = event.target;
    this.setState({
      [name]: value,
    });
  }

  loginScreen() {
    const { name } = this.state;
    return (
      <div>
        <h1>Login</h1>
        <form>
          <input
            data-testid="login-name-input"
            type="text"
            name="name"
            value={ name }
            onChange={ this.handleEvents }
            required
          />
          <input
            data-testid="login-submit-button"
            type="button"
            value="Entrar"
            disabled={ name.length <= 2 }
            onClick={ this.handleClick }
          />
        </form>
      </div>
    );
  }

  render() {
    const { redirect, loading } = this.state;
    return (
      <div data-testid="page-login">
        { loading ? <Loading /> : this.loginScreen() }
        { redirect ? <Redirect to="/search" /> : '' }
      </div>
    );
  }
}
export default Login;

/*
Requisito 2: Tratando de formulário devemos fazer a definição de estado e a atualização do mesmo
1º passo: definir nosso estado inicial, para o formulário será usado o campo nome,
para redirecionar a pagina o redirect inicalmente false,
e para enquanto a pagina carrega o loading inicialmente é false.

A função handleClick é assíncrona, ela setá o estado name a partir
da requisição do CreateUser. A fn CreateUser receberá um nome que será enviado para o estado name E mudará o estado do redirect para true.

A função HandleEvents é uma função genérica que
de acordo com o name do evento em questão seta o value de acordo com o que é digitado, assim criando
uma atualização dinâmica do componente.

A função loginScreen funciona como quase nosso componente(poderia ser um componetne e só chamar ele aqui),
só não é o componente pois ele está dentro do componente em si,
entretanto a maioria dos dados a ser renderizados provém dele.

Nele que é criado o formulário em si, com um elemento pai que é a div,
o input do tipo texto tem como value={name}, pois foi desconstruído para
que quando digitado esse name seja o valor do estado,
substutuindo assim o valor de string vazia, para isso acontecer fazemos o OnChange.

No Onchange, ou seja, quando há alteração no campo, ele executa o handleEvent, que vai pegar o valor que foi digitado e jogar no estado name.

O input do botão é basico, a diferença é que o proprio button tem a propriedade disabled,
para validar abrimos uma chave para codigo javascript e definimos caso o nome seja <=2 ele não aparece.

<<<Atenção aqui>>>
O Onclick vai mudar o estado do loading pra true e executar a função handleClick, que dentro tem a fn createUser.

A handle click precisa do valor do name do estado atual para a fn CreateUser., então
quando clicarmos ele muda o estado do loading para true, já com o name atual guardado.
Executa a fn CreateUser passando o valor do name como parametro.
A função createUser vai retornar uma promessa, por isso usamos async e await.
Além do mais, ela cria um objeto empytUser e o name do estado é passado para ela.
<<<>>>

Dentro do render usamos o estado do redirect e do loading.
fazemos a div pai normal até aqui
abrimos uma chave para codigo js com a verificação
o estado do loading é true? então renderiza o componente loading, se é false executa a loginScreen(caso fosse componente poderia renderizar)
Mesma coisa pro redirect, o estado do redirect é true? então redirecione para search, caso false string vazia.

Redirect é um componente do react router, ele vai navegar para uma nova localização.
fonte: https://reactrouter.com/web/api/Redirect
*/
