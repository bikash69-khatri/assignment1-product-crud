import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router"

const formInitialValue = {
  title: "",
  category: "",
  price: "",
  isAvailable: false,
}

function ProductForm() {
  const navigate = useNavigate()
  const [product, setProduct] = useState(formInitialValue)
  const [saving, setSaving] = useState(false)

  const goToProductList = () => {
    navigate('/productList')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)

    try {
      await axios.post(`https://dummyjson.com/products/add`, product)
      setProduct(formInitialValue)
      goToProductList()
    } catch (error) {
      console.error(error)
      alert("Failed to create product")
    } finally {
      setSaving(false)
    }
  }

  const handleChange = (e) => {
    setProduct((previousProduct) => {
      return {
        ...previousProduct,
        [e.target.name]:
          e.target.type === "checkbox"
            ? e.target.checked
            : e.target.value,
      }
    })
  }

  return (
    <main className="page form-page">
      <button onClick={goToProductList}>Back to product list</button>

      <form className="product-form" onSubmit={handleSubmit}>
        <h1>Create Product</h1>

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

        <label className="checkbox-label">
          <input
            type="checkbox"
            name="isAvailable"
            checked={product.isAvailable}
            onChange={handleChange}
          />
          Available
        </label>

        <div className="button-row">
          <button className="success" type="submit" disabled={saving}>
            {saving ? "Saving..." : "Submit"}
          </button>
          <button type="button" onClick={goToProductList}>Cancel</button>
        </div>
      </form>
    </main>
  )
}

export default ProductForm
