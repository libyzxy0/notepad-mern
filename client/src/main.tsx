import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  //Route,
  //Link,
} from "react-router-dom";
import Login from './pages/Login.tsx';
import Signup from './pages/Signup.tsx';
import Dashboard from './pages/Dashboard.tsx';
import NoteEditor from './pages/NoteEditor.tsx';
import { CookiesProvider } from 'react-cookie';

import './index.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/note/:id",
    element: <NoteEditor />,
  }
]);
createRoot((document.getElementById("root") as Element)).render(
  <CookiesProvider defaultSetOptions={{ path: '/' }}>
      <RouterProvider router={router} />
  </CookiesProvider>
);