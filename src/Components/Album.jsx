import React from 'react';
// import PropTypes from 'prop-types';
import { shape, objectOf, string } from 'prop-types';
import Header from './Header';
import getMusics from '../services/musicsAPI';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import MusicCard from './MusicCard';
import Loading from './Loading';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      songList: [],
      favList: [],
      artistName: '',
      collectionName: '',
      loading: true,
    };

    this.fetchSongList = this.fetchSongList.bind(this);
    this.checkboxHandler = this.checkboxHandler.bind(this);
    this.setFavList = this.setFavList.bind(this);
  }

  async componentDidMount() {
    const list = await getFavoriteSongs();
    this.setFavList(list);
    this.fetchSongList();
  }

  async setFavList(favoriteList) {
    // const list = await getFavoriteSongs();
    this.setState({ favList: favoriteList });
    console.log(favoriteList);
  }

  async checkboxHandler({ target }) {
    const { songList } = this.state;
    this.setState({ loading: true });
    const songId = Number(target.value);
    const songData = songList.find((song) => songId === song.trackId);
    if (target.checked) {
      await addSong(songData);
      console.log('Adicionado', songData);
    } else {
      await removeSong(songData);
      console.log('Removido', songData);
    }
    const list = await getFavoriteSongs();
    this.setFavList(list);
    this.setState({ loading: false });
  }

  async fetchSongList() {
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
  }

  renderSongList() {
    const { songList, artistName, collectionName, favList } = this.state;
    return (
      <div>
        <h1 data-testid="artist-name">{ artistName }</h1>
        <h2 data-testid="album-name">{ collectionName }</h2>
        { songList.map((song, i) => (
          <MusicCard
            key={ i }
            trackName={ song.trackName }
            previewUrl={ song.previewUrl }
            trackId={ song.trackId }
            song={ song }
            checked={
              favList.some((fav) => JSON.stringify(fav) === JSON.stringify(song))
            }
            favList={ favList }
            checkboxHandler={ this.checkboxHandler }
          />

        ))}
      </div>
    );
  }

  render() {
    const { loading } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        { loading ? <Loading /> : this.renderSongList() }
        {/* { this.renderSongList() } */}
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

<<<<<***>>>>>

Requisito 8: criar o mecanismo para adicionar aos favoritos

Desenvolvimento:
1º setar o estado do favorito, fazemos uma fn que vai setar o estado de favorito que receberá uma lista, então um array pra isso.
2º depois de fazer o input la no moviecard voltamos pra ca para fazer a funcinalidade.
Aqui não dá pra fazer a fn gernérica do checkbox pois ela não muda só o estado como também faz uma busca.
Então para isso acontecer temos que desconstruir o target do evento do click,
como vamos trabalhar com a songList pegamos ela do estado
definimos o loading para true
pegamos o songID através do clique com o valor do target passando ele para numero
com isso fazemos uma busca para ver se o value bate com o trackID do obj da requisição que fizemos,
como isso vai ser um true ou false armazenamos isso numa const
como temos um bool fazemos uma verificação com o if
se o alvo tiver a propriedade checked ele adiciona atravez da fn addsong a musica que foi encontrada pelo songData.
caso ele não tenha a propriedade checked ele remove.

criamos uma const para armazenar a lista de favoritos que pegamos atravez da fn getfavoritesong
setamos a lista de favoritos com os dados armazenados na lista que criamos acima
terminamos o loading mudando o estado para falso

Passamos a props dentro do rendersonglist checked que ao clicar vai fazer a busca que mencionamos acima
fazemos uma props favlist que é o nosso estado atualizado

Agradecimentos a Leandro Xavier, Matheus Laurindo, Michael Caxias e a monitoria que ajudaram a completar o projeto
*/
