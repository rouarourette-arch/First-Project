import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const API_PRODUCTS = "https://6a50f1e6c576c846dcba0844.mockapi.io/Products";

const inputStyle = {
  padding: "10px",
  borderRadius: "4px",
  border: "1px solid #ccc",
  flex: 1,
};

const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [myProducts, setMyProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);
  const [productForm, setProductForm] = useState({
    name: "",
    image_url: "",
    price: "",
    quantity: "",
    category: "Clothing",
    description: "",
  });

  const resetProductForm = () => {
    setProductForm({
      name: "",
      image_url: "",
      price: "",
      quantity: "",
      category: "Clothing",
      description: "",
    });
  };

  const fetchMyProducts = async () => {
    if (!user) return;

    try {
      const response = await axios.get(API_PRODUCTS);
      const productsOfThisUser = response.data.filter(
        (product) => product.userId === user.id
      );
      setMyProducts(productsOfThisUser);
    } catch (error) {
      console.error("Failed to get products:", error);
    }
  };

  // useEffect is after the async function.
  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }

    fetchMyProducts();
  }, [user, navigate]);

  const handleProductChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    if (name === "name") {
      setProductForm({
        name: value,
        image_url: productForm.image_url,
        price: productForm.price,
        quantity: productForm.quantity,
        category: productForm.category,
        description: productForm.description,
      });
    }

    if (name === "image_url") {
      setProductForm({
        name: productForm.name,
        image_url: value,
        price: productForm.price,
        quantity: productForm.quantity,
        category: productForm.category,
        description: productForm.description,
      });
    }

    if (name === "price") {
      setProductForm({
        name: productForm.name,
        image_url: productForm.image_url,
        price: value,
        quantity: productForm.quantity,
        category: productForm.category,
        description: productForm.description,
      });
    }

    if (name === "quantity") {
      setProductForm({
        name: productForm.name,
        image_url: productForm.image_url,
        price: productForm.price,
        quantity: value,
        category: productForm.category,
        description: productForm.description,
      });
    }

    if (name === "category") {
      setProductForm({
        name: productForm.name,
        image_url: productForm.image_url,
        price: productForm.price,
        quantity: productForm.quantity,
        category: value,
        description: productForm.description,
      });
    }

    if (name === "description") {
      setProductForm({
        name: productForm.name,
        image_url: productForm.image_url,
        price: productForm.price,
        quantity: productForm.quantity,
        category: productForm.category,
        description: value,
      });
    }
  };

  const handleSaveProduct = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const productData = {
      name: productForm.name,
      image_url: productForm.image_url,
      price: Number(productForm.price),
      quantity: Number(productForm.quantity),
      category: productForm.category,
      description: productForm.description,
      userId: user.id,
    };

    try {
      if (editingProductId) {
        await axios.put(`${API_PRODUCTS}/${editingProductId}`, productData);
      } else {
        await axios.post(API_PRODUCTS, productData);
      }

      setShowProductForm(false);
      setEditingProductId(null);
      resetProductForm();
      await fetchMyProducts();
      setIsLoading(false);
    } catch (error) {
      alert("Error saving product: " + error.message);
      setIsLoading(false);
    }
  };

  const triggerEdit = (product) => {
    setProductForm({
      name: product.name || "",
      image_url: product.image_url || "",
      price: product.price || "",
      quantity: product.quantity || "",
      category: product.category || "Clothing",
      description: product.description || "",
    });
    setEditingProductId(product.id);
    setShowProductForm(true);
  };

  const handleDelete = async (id) => {
    const answer = window.confirm("Are you sure you want to delete this product?");

    if (!answer) return;

    try {
      await axios.delete(`${API_PRODUCTS}/${id}`);
      await fetchMyProducts();
    } catch (error) {
      alert("Failed to delete product: " + error.message);
    }
  };

  const openOrCloseProductForm = () => {
    if (showProductForm) {
      setShowProductForm(false);
    } else {
      setShowProductForm(true);
    }

    setEditingProductId(null);
    resetProductForm();
  };

  if (!user) return null;

  return (
    <div style={{ padding: "30px", maxWidth: "1000px", margin: "0 auto" }}>
      <h2>My Dashboard</h2>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "30px" }}>
        <h3>My Listed Products</h3>
        <button onClick={openOrCloseProductForm} style={{ padding: "10px 15px", background: "#8B4513", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>
          {showProductForm ? "Cancel" : "+ Add New Product"}
        </button>
      </div>

      {showProductForm && (
        <form onSubmit={handleSaveProduct} style={{ background: "#f5f5f5", padding: "20px", borderRadius: "8px", marginTop: "20px", display: "flex", flexDirection: "column", gap: "15px" }}>
          <h4>{editingProductId ? "Edit Product" : "Add New Product"}</h4>

          <div style={{ display: "flex", gap: "15px" }}>
            <input type="text" name="name" placeholder="Product Name" required value={productForm.name} onChange={handleProductChange} style={inputStyle} />
            <input type="text" name="image_url" placeholder="Image URL" required value={productForm.image_url} onChange={handleProductChange} style={inputStyle} />
          </div>

          <div style={{ display: "flex", gap: "15px" }}>
            <input type="number" name="price" placeholder="Price (TND)" required value={productForm.price} onChange={handleProductChange} style={inputStyle} />
            <input type="number" name="quantity" placeholder="Quantity Available" required value={productForm.quantity} onChange={handleProductChange} style={inputStyle} />
            <select name="category" value={productForm.category} onChange={handleProductChange} style={inputStyle}>
              <option value="Clothing">Clothing</option>
              <option value="Decor">Decor</option>
              <option value="Pottery">Pottery</option>
            </select>
          </div>

          <textarea name="description" placeholder="Product Description" required value={productForm.description} onChange={handleProductChange} style={{ padding: "10px", borderRadius: "4px", border: "1px solid #ccc", minHeight: "80px" }} />

          <button type="submit" disabled={isLoading} style={{ padding: "10px", background: "#4CAF50", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>
            {isLoading ? "Saving" : "Save Product"}
          </button>
        </form>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "20px", marginTop: "20px" }}>
        {myProducts.length === 0 && !showProductForm ? (
          <p>You have not posted any products yet.</p>
        ) : (
          myProducts.map((product) => (
            <div key={product.id} style={{ border: "1px solid #ccc", padding: "15px", borderRadius: "8px", background: "#fff", textAlign: "center" }}>
              <img src={product.image_url} alt={product.name} style={{ width: "100%", height: "150px", objectFit: "cover", borderRadius: "4px" }} />
              <h4>{product.name}</h4>
              <p style={{ color: "#8B4513", fontWeight: "bold" }}>{product.price} TND</p>

              <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
                <button onClick={() => triggerEdit(product)} style={{ flex: 1, padding: "8px", background: "#007BFF", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>Edit</button>
                <button onClick={() => handleDelete(product.id)} style={{ flex: 1, padding: "8px", background: "red", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Profile;
