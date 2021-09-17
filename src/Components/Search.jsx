import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      artist: '',
      searchInput: '',
      loading: '',
      artistData: '',
      success: '',
    };

    this.handleEvents = this.handleEvents.bind(this);
    this.searchClick = this.searchClick.bind(this);
  }

  handleEvents(event) {
    const { value, name } = event.target;

    this.setState({
      [name]: value,
    });
  }

  async searchClick() {
    const { searchInput } = this.state;
    const ARTIST_NAME = searchInput;
    this.setState({
      searchInput: '',
      artist: ARTIST_NAME,
      loading: true,
    });
    const albumsData = await searchAlbumsAPI(ARTIST_NAME);
    if (albumsData.length > 0) {
      this.setState({
        // artist: '',
        loading: false,
        artistData: albumsData,
        success: true,
      });
    } else {
      this.setState({
        loading: false,
        success: false,
      });
    }
  }

  renderAlbumList() {
    const { artistData, artist } = this.state;
    return (
      <div>
        <h2>{`Resultado de álbuns de: ${artist}`}</h2>
        <ul>
          { artistData.map((album, i) => (
            <li key={ i }>
              <Link
                data-testid={ `link-to-album-${album.collectionId}` }
                to={ `/album/${album.collectionId}` }
              >
                {album.collectionName}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  renderSearchScreen() {
    const { searchInput } = this.state;
    return (
      <div>
        <h1>Search</h1>
        <form>
          <input
            data-testid="search-artist-input"
            type="text"
            name="searchInput"
            placeholder="Banda / Artista"
            value={ searchInput }
            onChange={ this.handleEvents }
          />
          <input
            data-testid="search-artist-button"
            type="button"
            value="Pesquisar"
            disabled={ searchInput.length <= 1 }
            onClick={ this.searchClick }
          />
        </form>
      </div>
    );
  }

  render() {
    const { loading, success } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        { loading ? <Loading /> : this.renderSearchScreen() }
        { success ? this.renderAlbumList() : <h2>Nenhum álbum foi encontrado</h2> }
      </div>
    );
  }
}

export default Search;
/*
Requisito 5: Crie um formulario para pesquisa de artistas.

1. Crie um campo(input) para pessoa digitar o nome da banda.
2. Crie um botão com o texto pesquisar.
3. O botão só deve estar habilitado caso o nome tenha 2 ou mais >= caracteres.

1º Se tratando de formulário devemos SEMPRE trabalhar com o estado inicial,
principalmente pois estaremos trabalhando com pesquisa.
Definimos o estado inicial do artista como ''

2º Lembra daquele handleEvent lá da página de login? Vamos usar ele aqui tbm,
pois assim todo o valor digitado sera inputado no valor do estado artista.

3º Nao esquecer de fazer o bind do handleEvent se não não conseguimos usar ele dentro do render.

4º Dentro do render vamos fazer o componente.
Desconstruimos o artist que está la dentro do state para usarmos aqui.
Abrimos com a tag form e input.
o value do input será {artist} pois com o handleEvent esse valor vai lá pro estado,
tanto que o onChange, chamamos o handleEvent pra cuidar disso.
O input segue a mesma lógica lá da página de login, alteramos a propriedade disable para que seja true se for <= 1.

Export default componente e terminou por enquanto

<<<<<***>>>>>

Requisito 6: fazer requisição para pesquisar artistas,
quando clicar no pesquisar limpar o valor do input e fazer a requisição,
Enquanto aguarda a resposta da API, esconda o input e o botão de pesquisa e exiba a mensagem Carregando... na tela.
Após receber a resposta da requisição exibir na tela o texto Resultado de álbuns de: <artista>, onde <artista> é o nome que foi digitado no input.
Liste os álbuns retornados. A API irá retorna um array de objetos.
Ao listar os álbuns, crie um link em cada card para redirecionar para a página do álbum.
ste link deve redirecionar para a rota /album/:id, onde :id é o valor da propriedade collectionId de cada Álbum da lista recebida pela API.
Se nenhum álbum for encontrado para o nome pesquisado, a API irá retornar um array vazio. Nesse caso, a mensagem Nenhum álbum foi encontrado deverá ser exibida.

Desenvolvimento:
como vamos fazer links e usar funções externas e o loading vamos importar eles primeiro.

1º requisição ao clicar: fazemos uma fn searchClick que vai pegar o que foi digitado no searchInput e definir o estado atual do searchInput,
Então se definimos um estado o adicionamos como estado inicial no this.state,
definimos uma constante artist_name que vai ser o dado do searchinput para usarmos mais adiante,
setamos o estado do searchInput novamente para branco pois aqui fazemos uma troca,
o valor de antes agora é o valor de um novo estado, o artist.
Se tem novo estado definimos no this.state
Fazemos isso para que o input fique vazio.
definimos o estado do loading como true pois a cada mudança ele meio que faz uma requisição por causa da alteração do estado.

Criamos uma const que vai guardar a requisição e será o estado inicial do album do artista,
se tem estado inicial tem que setar ele no state.
lembra da const artist_name? vamos usar ela como parâmetro aqui na fn searchAlbumsAPI.
Na verificação quando o valor for maior que zero ele muda o loading pra false e
vai atualizando o estado conforme o valor vai sendo digitado,
mudamos o estado do success para true, caso o valor seja menor ou igual a 0
o loading é false e o success é false tbm.

Renderizar a lista:
Vamos precisar dos estados atuais do artistData e artist
o artist que foi pesquisado vai estar no titulo da pagina,
com a requisição feita acima pelo valor que foi digitado, fazemos um map
usando como parâmetro o album e o index
o index servirá para cadastrar as keys
e o album que é cada elemento do objeto da requisição vai acessar a propriedade collectionID pois o cd tem id unico, o id do artista repete para cada cd.
fazemos o link dentro do colection id
e mostramos o nome do album com o collectionName já contendo o link.

<<<<<***>>>>>
*/
