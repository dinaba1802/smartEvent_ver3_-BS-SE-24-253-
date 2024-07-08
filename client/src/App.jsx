import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {Landing, Register, Login, Error, HomeLayout} from './pages';

const router = createBrowserRouter([
  {
    path:'/',
    element:<HomeLayout/>,
    errorElement:<Error/>,
    children:[
      {
        index:true,
        element: <Landing/>

      },
      {
        path:'register',
        element:<Register/>,
    
      },
      {
        path:'login',
        element:<Login/>,
    
      },
      {
        path:'',
        element:<Landing/>,
    
      },
    ]

  },
  
  
  {
    path:'/error',
    element:<Error/>,

  },
]);

const App = () => {
  return <RouterProvider router={router}/>;
};

export default App;
