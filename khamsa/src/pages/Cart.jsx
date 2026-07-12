import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Cart() {
  const { cart, updateQuantity, removeFromCart, totalPrice } = useCart();

  if (cart.length === 0) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>Cart is Empty</h2>
        <Link to="/">Go Back</Link>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>My Cart</h2>

      {cart.map((item) => (
        <div
          key={item.id}
          style={{
            border: "1px solid gray",
            padding: "15px",
            marginBottom: "15px",
          }}
        >
          <img
            src={item.image_url}
            alt={item.name}
            width="100"
            height="100"
          />

          <h3>{item.name}</h3>

          <p>Price : {item.price} TND</p>

          <p>Quantity : {item.cartQuantity}</p>

          <button onClick={() => updateQuantity(item.id, -1)}>
            -
          </button>

          <button onClick={() => updateQuantity(item.id, 1)}>
            +
          </button>

          <button onClick={() => removeFromCart(item.id)}>
            Delete
          </button>
        </div>
      ))}

      <h2>Total : {totalPrice.toFixed(2)} TND</h2>

      <button
        onClick={() => alert("Checkout coming soon")}
      >
        Checkout
      </button>
    </div>
  );
}

export default Cart;