import React from 'react';
// import PropTypes from 'prop-types';
import { shape, objectOf, string } from 'prop-types';
import Header from './Header';
import getMusics from '../services/musicsAPI';
import MusicCard from './MusicCard';
import Loading from './Loading';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      songList: [],
      artistName: '',
      collectionName: '',
      loading: true,
    };

    this.fetchSong = this.fetchSong.bind(this);
  }

  componentDidMount() {
    this.fetchSong();
  }

  async fetchSong() {
    const { match: { params: { id } } } = this.props;
    const list = await getMusics(id);
    const { artistName } = list[0];
    const { collectionName } = list[0];
    const musicList = list.slice(1, list.length);
    this.setState({
      songList: musicList,
      artistName,
      collectionName,
      loading: false,
    });
    console.log(list);
  }

  renderSong() {
    const { songList } = this.state;
    console.log(songList);
    return (
      <div>
        { songList.map((song, i) => (
          <MusicCard
            key={ i }
            trackName={ song.trackName }
            previewUrl={ song.previewUrl }
          />
        ))}
      </div>
    );
  }

  render() {
    const { artistName, collectionName, loading } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <h1 data-testid="artist-name">{ artistName }</h1>
        <h2 data-testid="album-name">{ collectionName }</h2>
        { loading ? <Loading /> : this.renderSong() }
      </div>
    );
  }
}

Album.propTypes = {
  match: shape(objectOf(string)).isRequired,
};

export default Album;

/*
7. Crie a lista de músicas do álbum selecionado

1º fazer a fn que vai buscar o album e musica
2º renderizar as musicas na tela
3º fazer o componente do card da musica

Fazemos uma função para fazer a requisição de acordo com o id da página que foi buscada la pelo match, params, id...,
para isso setamos uma props com o id que vem la do react router que fica dentro do
match => params => id. Essa id é o caminho que setamos lá no switcher no path:'/album/:id'.
armazenamos numa const list que será a lista de todos os cds daquele id.
dentro desse objeto temos várias chaves que vamos desestruturar para usar mais facilmente.
Quando fazemos a requisição o objeto vem primeiro com os dados do album e depois as musicas.
Portanto para pegarmos só as musicas fazemos um slice do array inteiro independente do tamanho
e pegamos a partir da posição 1 em diante.
como agora só resta as musicas armazenamos isso numa const musiclist.
Isso é para puxar os dados.

Agora para renderizar:
Temos que fazer outra fn que vai 'exibir' a informação na tela, no momento não vai exibir nada mas no futuro irá.
pegamos a songList lá do estado pois nela agora estão as nossas musicas
<<<<<atenção>>>>>
para aparecer algo na tela quando formos chamar a função retornamos uma div
nessa div fazemos o map com o elemento e o index para que quando chamarmos o musicCard
passamos as propriedades: keys o index, trackName o nome da musica e previewURl o link de origem que são usadas lá no movieCard.

Continuação 2:

Agora dentro do render do componente pegamos os estados do artista, album e o loading.
fazemos uma div, chamamos o header para aparecer o nome do usuário(não há necessidade)
fazemos um h1 para o nome do artista,
um h2 com o nome do album
e um ternario para que se a requisição tiver em curso, renderizar o loading, se não as musicas

*/
