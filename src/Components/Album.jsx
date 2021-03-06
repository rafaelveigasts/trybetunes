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
7. Crie a lista de m??sicas do ??lbum selecionado

1?? fazer a fn que vai buscar o album e musica
2?? renderizar as musicas na tela
3?? fazer o componente do card da musica

Fazemos uma fun????o para fazer a requisi????o de acordo com o id da p??gina que foi buscada la pelo match, params, id...,
para isso setamos uma props com o id que vem la do react router que fica dentro do
match => params => id. Essa id ?? o caminho que setamos l?? no switcher no path:'/album/:id'.
armazenamos numa const list que ser?? a lista de todos os cds daquele id.
dentro desse objeto temos v??rias chaves que vamos desestruturar para usar mais facilmente.
Quando fazemos a requisi????o o objeto vem primeiro com os dados do album e depois as musicas.
Portanto para pegarmos s?? as musicas fazemos um slice do array inteiro independente do tamanho
e pegamos a partir da posi????o 1 em diante.
como agora s?? resta as musicas armazenamos isso numa const musiclist.
Isso ?? para puxar os dados.

Agora para renderizar:
Temos que fazer outra fn que vai 'exibir' a informa????o na tela, no momento n??o vai exibir nada mas no futuro ir??.
pegamos a songList l?? do estado pois nela agora est??o as nossas musicas
<<<<<aten????o>>>>>
para aparecer algo na tela quando formos chamar a fun????o retornamos uma div
nessa div fazemos o map com o elemento e o index para que quando chamarmos o musicCard
passamos as propriedades: keys o index, trackName o nome da musica e previewURl o link de origem que s??o usadas l?? no movieCard.

Continua????o 2:

Agora dentro do render do componente pegamos os estados do artista, album e o loading.
fazemos uma div, chamamos o header para aparecer o nome do usu??rio(n??o h?? necessidade)
fazemos um h1 para o nome do artista,
um h2 com o nome do album
e um ternario para que se a requisi????o tiver em curso, renderizar o loading, se n??o as musicas

<<<<<***>>>>>

Requisito 8: criar o mecanismo para adicionar aos favoritos

Desenvolvimento:
1?? setar o estado do favorito, fazemos uma fn que vai setar o estado de favorito que receber?? uma lista, ent??o um array pra isso.
2?? depois de fazer o input la no moviecard voltamos pra ca para fazer a funcinalidade.
Aqui n??o d?? pra fazer a fn gern??rica do checkbox pois ela n??o muda s?? o estado como tamb??m faz uma busca.
Ent??o para isso acontecer temos que desconstruir o target do evento do click,
como vamos trabalhar com a songList pegamos ela do estado
definimos o loading para true
pegamos o songID atrav??s do clique com o valor do target passando ele para numero
com isso fazemos uma busca para ver se o value bate com o trackID do obj da requisi????o que fizemos,
como isso vai ser um true ou false armazenamos isso numa const
como temos um bool fazemos uma verifica????o com o if
se o alvo tiver a propriedade checked ele adiciona atravez da fn addsong a musica que foi encontrada pelo songData.
caso ele n??o tenha a propriedade checked ele remove.

criamos uma const para armazenar a lista de favoritos que pegamos atravez da fn getfavoritesong
setamos a lista de favoritos com os dados armazenados na lista que criamos acima
terminamos o loading mudando o estado para falso

Passamos a props dentro do rendersonglist checked que ao clicar vai fazer a busca que mencionamos acima
fazemos uma props favlist que ?? o nosso estado atualizado

Agradecimentos a Leandro Xavier, Matheus Laurindo, Michael Caxias e a monitoria que ajudaram a completar o projeto
*/
