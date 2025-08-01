import Form from './components/Form/Form';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import Users from './components/Users/Users';
import { useState } from 'react';
import './styles/base.scss';

function App() {
  const [refreshUsers, setRefreshUsers] = useState(false);

  const handleUserRegistered = () => {
    setRefreshUsers((prev) => !prev);
  };

  return (
    <>
      <Header />
      <div className="container">
        <Hero />
        <Users refreshTrigger={refreshUsers} />
        <Form onSuccess={handleUserRegistered} />
      </div>
    </>
  );
}

export default App;
