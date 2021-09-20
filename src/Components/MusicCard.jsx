import React from 'react';
import PropTypes, { bool, func } from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { trackName, previewUrl, checked, trackId, checkboxHandler } = this.props;
    return (
      <div>
        <p>{ trackName }</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
        <label htmlFor={ trackId } data-testid={ `checkbox-music-${trackId}` }>
          <input
            type="checkbox"
            id={ trackId }
            value={ trackId }
            checked={ checked }
            onChange={ checkboxHandler }
          />
          Favorita
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  checkboxHandler: func.isRequired,
  checked: bool.isRequired,
};

export default MusicCard;

/**
Requisito 7 continuação 1:

Aqui vamos montar como o player vai ser exibido de acordo com o código fornecido no requisito.
O previewUrl é uma chave que contém a origem da musica lá na api do itunes,
pra ficar bonito também da pra tirar o nome da musica com o trackName e tudo o que quiser que estiver disponível nas propriedades fornecidas pela musica.

a partir daqui volte ao arquivo do album.

<<<<<***>>>>>

8.1 no musicCard criar um input checkbox.
Desenvolvimento: fazer o input normal tipo checkbox passando as props
abrir o input normal com a propriedade dada no enunciado, o html for vai abraçar o que tiver no id
então colocamos o valor do trackID que já vem fornecido pelo objeto.
checked é uma props que vem do elemento pai o album que verifica se é favorito ou não com um some.
<<<<<Atenção>>>>>
no onchange tem o checkbox handler que é uma prop do pai, lá é a função que quando clicado
busca o id da musica no estado songlist
*/
