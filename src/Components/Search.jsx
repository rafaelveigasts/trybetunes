import React from 'react';
import Header from './Header';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      artist: '',
    };

    this.handleEvents = this.handleEvents.bind(this);
  }

  handleEvents(event) {
    const { value, name } = event.target;

    this.setState({
      [name]: value,
    });
  }

  render() {
    const { artist } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <h1>Search</h1>
        <form>
          <input
            data-testid="search-artist-input"
            type="text"
            name="artist"
            value={ artist }
            onChange={ this.handleEvents }
          />
          <input
            data-testid="search-artist-button"
            type="button"
            value="Pesquisar"
            disabled={ artist.length <= 1 }
          />
        </form>
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

*/
