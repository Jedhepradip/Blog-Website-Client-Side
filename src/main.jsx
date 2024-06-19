import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './index.css'
import Layout from './components/Layout/Layout'
import Home from './components/Pages/Home'
import About from './components/Pages/About'
import Gallery from './components/Pages/Gallery'
import Contact from './components/Pages/Contact'
import Blog from './components/Pages/Blog'
import SignIn from './components/Pages/SignIn'
import Login from './components/Pages/Login'
import Profile from './components/Pages/Profile'
import PostBlog from './components/Pages/PostBlog'
import EditProfile from './components/Pages/EditProfile'
import EditPostBlog from './components/Pages/EditPostBlog'
import BlogComment from './components/Pages/BlogComment'
import Forgrtpassword from './components/Pages/Forgrtpassword'
import Password_to_forget from './components/Pages/Password_to_forget'
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/About",
        element: <About />
      },
      {
        path: "/Gallery",
        element: <Gallery />
      },
      {
        path: "/Contact",
        element: <Contact />,
      },
      {
        path: "/Blog",
        element: <Blog />
      },
      {
        path: "/SignIn",
        element: <SignIn />
      },
      {
        path: "/Login",
        element: <Login />
      },
      {
        path: "/Profile",
        element: <Profile />
      },
      {
        path: "/PostBlog",
        element: <PostBlog />
      },
      {
        path: "/EditProfile",
        element: <EditProfile />
      },
      {
        path: "/EditPostBlog/:id",
        element: <EditPostBlog />
      },
      {
        path: "/BlogComment/:id",
        element: <BlogComment />
      },
      {
        path:'/Forgrtpassword',
        element:<Forgrtpassword/>
      },
      {
        path:"/main",
        element:<main/>
      },
      {
        path:"/Password_to_forget/:id",
        element:<Password_to_forget/>
      }
    ]
  }
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
