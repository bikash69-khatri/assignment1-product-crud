import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"

const formInitialValue = {
  title: "",
  category: "",
  price: "",
}

const ProductEdit = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [product, setProduct] = useState(formInitialValue)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await axios.get(`https://dummyjson.com/products/${id}`)

        setProduct({
          title: response.data.title,
          category: response.data.category,
          price: response.data.price,
        })
      } catch (error) {
        console.error(error)
        alert("Failed to load product")
      } finally {
        setLoading(false)
      }
    }

    getProduct()
  }, [id])

  const handleChange = (e) => {
    setProduct((previousProduct) => ({
      ...previousProduct,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)

    try {
      await axios.put(`https://dummyjson.com/products/${id}`, product)
      navigate('/productList')
    } catch (error) {
      console.error(error)
      alert("Failed to update product")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <p className="message">Loading product...</p>
  }

  return (
    <main className="page form-page">
      <button onClick={() => navigate('/productList')}>
        Back to product list
      </button>

      <form className="product-form" onSubmit={handleSubmit}>
        <h1>Edit Product</h1>

        <label>Product Name:</label>
        <input
          type="text"
          name="title"
          value={product.title}
          onChange={handleChange}
          required
        />

        <label>Category:</label>
        <input
          type="text"
          name="category"
          value={product.category}
          onChange={handleChange}
          required
        />

        <label>Price:</label>
        <input
          type="number"
          name="price"
          value={product.price}
          onChange={handleChange}
          required
        />

        <button className="warning" type="submit" disabled={saving}>
          {saving ? "Updating..." : "Update"}
        </button>
      </form>
    </main>
  )
}

export default ProductEdit
