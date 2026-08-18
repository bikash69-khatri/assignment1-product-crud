import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'

const ProductDetails = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [productDetail, setProductDetail] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getDetail = async () => {
      try {
        const response = await axios.get(`https://dummyjson.com/products/${id}`)
        setProductDetail(response.data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    getDetail()
  }, [id])

  if (loading) {
    return <p className="message">Loading product details...</p>
  }

  return (
    <main className="page form-page">
      <button onClick={() => navigate('/productList')}>
        Back to product list
      </button>

      <div className="detail-card">
        <h1>{productDetail?.title}</h1>
        <p><strong>Category:</strong> {productDetail?.category}</p>
        <p><strong>Price:</strong> ${productDetail?.price}</p>
        <p><strong>Description:</strong> {productDetail?.description}</p>

        <button
          className="warning"
          onClick={() => navigate(`/productEdit/${id}`)}
        >
          Edit Product
        </button>
      </div>
    </main>
  )
}

export default ProductDetails
