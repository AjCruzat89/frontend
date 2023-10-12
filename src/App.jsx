import { Routes, Route } from 'react-router-dom';
import { Home, Login, Register, Dashboard, Users, Books} from './pages';

function App() {
  return (
    <Routes>
      <Route path='/' Component={Home}></Route>
      <Route path='home' Component={Home}></Route>
      <Route path='login' Component={Login}></Route>
      <Route path='register' Component={Register}></Route>
      <Route path='dashboard' Component={Dashboard}></Route>
      <Route path='users' Component={Users}></Route>
      <Route path='books' Component={Books}></Route>
    </Routes>
  )
}

export default App
