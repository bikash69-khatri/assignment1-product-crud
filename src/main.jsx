import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, NavLink, Route, Routes } from 'react-router'
import ProductList from './components/productList.jsx'
import ProductForm from './components/productForm.jsx'
import ProductDetails from './components/productDetails.jsx'
import ProductEdit from './components/productEdit.jsx'
import { Home } from './pages/home.jsx'
import { About } from './pages/about.jsx'
import Contact from './pages/contact.jsx'
import { PageNotFound } from './pages/PageNotFound.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <nav className="navbar">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/about">About</NavLink>
      <NavLink to="/contact">Contact</NavLink>
      <NavLink to="/productList">Product List</NavLink>
    </nav>

    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/home" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />

      <Route path="/productList" element={<ProductList />} />
      <Route path="/productForm" element={<ProductForm />} />
      <Route path="/productDetails/:id" element={<ProductDetails />} />
      <Route path="/productEdit/:id" element={<ProductEdit />} />

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  </BrowserRouter>,
)
