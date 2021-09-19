import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Album from './Album';
import Favorites from './Favorites';
import Login from './Login';
import NotFound from './NotFound';
import Profile from './Profile';
import ProfileEdit from './ProfileEdit';
import Search from './Search';

class Switcher extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <h3>App Trybetunes</h3>
        <Switch>
          <Route path="/album/:id" render={ (props) => <Album { ...props } /> } />
          <Route path="/album/:id" component={ Album } />
          <Route path="/profile/edit" component={ ProfileEdit } />
          <Route path="/search" component={ Search } />
          <Route path="/favorites" component={ Favorites } />
          <Route path="/profile" component={ Profile } />
          <Route exact path="/" component={ Login } />
          <Route component={ NotFound } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Switcher;

/**
1º Passo aqui, importar o BrowserRouter, Route, Switch
O BrowserRouter vai encapsular todas as rotas, é o componente que encapsula a sua aplicação
O componente Switch é usado para encapsular um conjunto de rotas que você definiu via Route
Route a rota, estabelece o mapeamento entre o caminho de URL declarado com o componente, nessa ordem

Como todos os outros componentes tem parte do path do login "/" usamos o exact
e como o notFound não tem caminho específico ele não tem path
*/
