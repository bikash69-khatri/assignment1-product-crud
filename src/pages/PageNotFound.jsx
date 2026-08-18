import { useNavigate } from 'react-router'

export const PageNotFound = () => {
  const navigate = useNavigate()

  return (
    <main className="page">
      <h1>404 - Page Not Found</h1>
      <button onClick={() => navigate('/')}>Go Home</button>
    </main>
  )
}
