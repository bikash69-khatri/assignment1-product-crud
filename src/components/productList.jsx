import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router"

const ProductList = () => {
  const navigate = useNavigate()
  const [productList, setProductList] = useState({ products: [] })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    )

    if (!confirmDelete) {
      return
    }

    try {
      await axios.delete(`https://dummyjson.com/products/${id}`)

      setProductList((previousData) => {
        return {
          ...previousData,
          products: previousData.products.filter(
            (product) => product.id !== id
          ),
        }
      })
    } catch (err) {
      console.error(err)
      alert("Failed to delete product")
    }
  }

  useEffect(() => {
    const callApi = async () => {
      try {
        const response = await axios.get(`https://dummyjson.com/products`)
        setProductList(response.data)
      } catch (err) {
        console.error(err)
        setError("Failed to load products")
      } finally {
        setLoading(false)
      }
    }

    callApi()
  }, [])

  if (loading) {
    return <p className="message">Loading products...</p>
  }

  if (error) {
    return <p className="message error">{error}</p>
  }

  return (
    <main className="page">
      <div className="page-header">
        <h1>Product List</h1>
        <button
          className="success"
          onClick={() => navigate('/productForm')}
        >
          Create New Product
        </button>
      </div>

      <div className="product-grid">
        {productList?.products?.map((product) => {
          return (
            <div className="product-card" key={product.id}>
              <h3>{product.title}</h3>
              <p><strong>Category:</strong> {product.category}</p>
              <p><strong>Price:</strong> ${product.price}</p>

              <div className="button-row">
                <button
                  onClick={() => navigate(`/productDetails/${product.id}`)}
                >
                  View Details
                </button>

                <button
                  className="warning"
                  onClick={() => navigate(`/productEdit/${product.id}`)}
                >
                  Edit
                </button>

                <button
                  className="danger"
                  onClick={() => handleDelete(product.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </main>
  )
}

export default ProductList
