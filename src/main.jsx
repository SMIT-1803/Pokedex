import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider  } from 'react-router-dom'
import PokemonDetails from './components/PokemonDetails.jsx'


const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path = '' element = {<App/>}/>
      <Route path="pokemon/:name" element={<PokemonDetails />} />
    </>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
