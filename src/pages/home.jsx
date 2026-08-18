import { useNavigate } from 'react-router'

export const Home = () => {
  const navigate = useNavigate()

  return (
    <main className="page">
      <h1>Home</h1>
      <button onClick={() => navigate('/productList')}>Go to Products</button>
    </main>
  )
}
