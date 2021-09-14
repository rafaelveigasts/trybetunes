import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Album from './Album';

class Switcher extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <h3>App Trybetunes</h3>
        <Switch>
          <Route path="/album/:id" component={ Album } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Switcher;

/**
1º Passo aqui, importar o BrowserRouter, Route, Switch
O BrowserRouter vai encapsular todas as rotas,
o Switch vai ser as opções e o
Route a rota, nessa ordem
*/
