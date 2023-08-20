import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { Outlet } from 'react-router-dom';

import Navbar from './components/Navbar';
import client from './client';

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Navbar />
        <Outlet />
      </div>
    </ApolloProvider>
  );
}

export default App;
