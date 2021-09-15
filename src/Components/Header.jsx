import React from 'react';
import { Link } from 'react-router-dom';
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
    return (
      <header data-testid="header-component">
        <span data-testid="header-user-name">{ loading ? <Loading /> : name }</span>
        <ul>
          <li><Link data-testid="link-to-search" to="/search"> Search </Link></li>
          <li>
            <Link data-testid="link-to-favorites" to="/favorites"> Favorites</Link>
          </li>
          <li>
            <Link data-testid="link-to-profile" to="/profile"> Profile </Link>
          </li>
        </ul>
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

<<<<***>>>>

Requisito 4: crie links de navegação no cabeçalho.
1. Criar o link para pagina de pesquisa.
2. Criar o Link para pagina de favoritos.
3. Criar o link para pagina de exibição de perfil.

1º coisa, importar o componente link do react router.
fonte: https://reactrouter.com/web/api/Link

2º abrimos o link com a propriedade necessária no requisito, data-test...
3º a propriedade to="" é para onde vamos direcionar, fazemos 3 links no total, para search, fav e profile.

Se colocar tudo isso dentro de uma div ele fica mais no centro da tela, eu deixei só uma lista para ficar melhor alinhado.

<<<<<***>>>>>
*/
