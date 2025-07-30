import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import Users from './components/Users/Users';
import './styles/base.scss';

function App() {
  return (
    <>
      <Header />
      <div className="container">
        <Hero />
        <Users />
      </div>
    </>
  );
}

export default App;
