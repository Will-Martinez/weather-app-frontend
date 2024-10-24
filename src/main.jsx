import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './components/app/App'
import "./styles/bulma.css"
import Nav from './components/nav'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Nav></Nav>
    <App></App>
    <Toaster></Toaster>
  </StrictMode>,
)
