import { Home } from './pages/Home';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { NewRoom } from './pages/NewRoom';
import { AuthContextProvider } from './contexts/AuthContext'
import { Room } from './pages/Rooms';
import { AdminRoom } from './pages/AdminRoom';
import { ThemeContextProvider } from './contexts/ThemeContext';

function App() {
  return (

    <BrowserRouter>
      <ThemeContextProvider>
        <AuthContextProvider>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/rooms/new' component={NewRoom} />
            <Route path='/rooms/:id' component={Room} />

            <Route path='/admin/rooms/:id' component={AdminRoom} />
          </Switch>
        </AuthContextProvider>
      </ThemeContextProvider>
    </BrowserRouter>
  );
}

export default App;
