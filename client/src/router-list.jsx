import React from 'react';
import Front from "./template/front.jsx";
import Register from "./template/register.jsx"
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
//broken fix later
const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path ="/" element={<Front />}>
            
        </Route>
        
    )
);


