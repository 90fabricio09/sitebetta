import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx';
import Home from './pages/Home.jsx';
import Sobre from './pages/Sobre.jsx';
import Chat from './pages/Chat.jsx';
import NotFound from './pages/NotFound.jsx'

import './css/footer.css';
import './css/navbar.css';
import './css/styles.css';
import './css/chat.css';
import './css/window.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: '/sobre', element: <Sobre /> },
      { path: '/chat', element: <Chat /> },
      {path:"*",
        element: <NotFound />
      }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);