import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.module.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <h1>Первая страница</h1>
    )
  },
  {
    path: "result",
    element: (
      <h1>Вторая страница</h1>
    )
  }
])

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
