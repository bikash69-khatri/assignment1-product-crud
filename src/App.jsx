import { useNavigate } from 'react-router'

const App = () => {
  const navigate = useNavigate()

  return (
    <main className="page home-page">
      <h1>Product CRUD</h1>
      <p>React Routing, Axios and CRUD Assignment 1</p>
      <button onClick={() => navigate('/productList')}>Open Product List</button>
    </main>
  )
}

export default App
