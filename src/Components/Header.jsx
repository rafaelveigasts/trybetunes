import React from 'react';
import Loading from './Loading';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      username: [],
      loading: true,
    };

    this.loadUser = this.loadUser.bind(this);
  }

  componentDidMount() {
    this.loadUser();
  }

  async loadUser() {
    this.setState({ loading: true });
    const userData = await getUser();
    this.setState({
      username: userData,
      loading: false,
    });
  }

  render() {
    const { username: { name }, loading } = this.state;
    console.log(this.state);
    return (
      <header data-testid="header-component">
        <span data-testid="header-user-name">{ loading ? <Loading /> : name }</span>
      </header>
    );
  }
}

export default Header;

/*
Requisito 3: criar o componente cabeçalho, renderizar nas rotas, recuperar o nome da
pessoa logada e exibir na tela. Enquanto aguarda aresposta exibir a mensagem carregando...

Diferente da area de login, aqui o estado será um array para que possamos armazenar n valores de username,
Diferente também da tela de login que começa com loading false pq ela já carrega lá,
aqui começamos com loading true pra ela ja abrir com a mensagem carregando....

loadUser é uma função assíncrona pois depende da resposta do getUser,
função essa que busca dentro da função readUser o valor que está lá no local storage.
Com essa resposta, ele define o username e com o valor do local storage e muda o loading de true pra false.
Ou seja, está carregando? sim, busca o nome, seta no username e termina o loading.

Como temos que esperar carregar o dado, colocamos essa requisição dentro do componenteDidMount.
fonte: https://pt-br.reactjs.org/docs/react-component.html#componentdidmount

Agora dentro to render() utilizamos o name que agora está dentro do username e o loading

Fazemos uma tag header que contém um span condicional: caso o loading seja true, renderiza o componente loading, caso seja false mostra o name.

Depois disso tudo vamos adicionar o header aos demais componentes necessários
*/
