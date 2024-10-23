import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './components/app/App'
import "./styles/bulma.css"
import Nav from './components/nav'
import Footer from './components/footer'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Nav></Nav>
    <App></App>
  </StrictMode>,
)
