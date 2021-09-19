import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { trackName, previewUrl } = this.props;
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
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
};

export default MusicCard;

/**
Requisito 7 continuação 1:

Aqui vamos montar como o player vai ser exibido de acordo com o código fornecido no requisito.
O previewUrl é uma chave que contém a origem da musica lá na api do itunes,
pra ficar bonito também da pra tirar o nome da musica com o trackName e tudo o que quiser que estiver disponível nas propriedades fornecidas pela musica.

a partir daqui volte ao arquivo do album.
*/
