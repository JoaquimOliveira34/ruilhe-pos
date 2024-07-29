import React, { useState } from "react";
import "./styles.css";


const avaibaleItems = [
  {
    id: 100,
    name: "Sande Intel i3",
    price: 1.1
  },
  {
    id: 123,
    name: "Macbook Pro 13 inch",
    price: 2.0
  },
  {
    id: 125,
    name: "Design Parretn OOP book",
    price: 1.20
  },
  {
    id: 126,
    name: "Flutter Android book",
    price: 4
  }
];

export default function App() {
  const [carts, setCart] = useState([]);

  function onAddToCart(item) {
    const hasIncrement = incrementCart(item);
    if (!hasIncrement) {
      setCart([
        ...carts,
        {
          ...item,
          qty: 1
        }
      ]);
    }
  }

  function incrementCart(item) {
    const _carts = [...carts];
    let _hasIncrement = false;

    for (let i = 0; i < _carts.length; i++) {
      if (_carts[i].id === item.id) {
        _carts[i].qty = _carts[i].qty + 1;

        setCart(_carts); // set carts
        _hasIncrement = true;
        break;
      }
    }

    return _hasIncrement;
  }

  function decrementCart(item) {
    const [_cart] = carts.filter((cart) => cart.id === item.id);

    if (_cart.qty <= 1) {
      return true;
    }

    const _carts = [...carts];
    for (let i = 0; i < carts.length; i++) {
      if (carts[i].id === item.id) {
        carts[i].qty = carts[i].qty - 1;

        setCart(_carts);
        break;
      }
    }

    return false;
  }

  function onDestroyToCart(item) {
    const hasEmpty = decrementCart(item);
    if (hasEmpty) {
      const _carts = carts.filter((cart) => cart.id !== item.id);
      setCart(_carts);
    }
  }

  const total = carts.reduce((acc, curr) => {
    return acc + curr.price * curr.qty;
  }, 0);

  return (
    <div className="App">
      <div className="board">
        <div>
          <h2>Avaibale items</h2>
          <ul>
            {avaibaleItems.map((item) => (
              <li key={item.id}>
                  <button onClick={() => onAddToCart(item)}>Add</button>

                  {item.name} - {item.price.toFixed(2)}€ -{" "}
                {carts.map(
                  ({ id: cartId }) =>
                    item.id === cartId && (
                      <button onClick={() => onDestroyToCart(item)}>
                        Decrement
                      </button>
                    )
                )}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2>Carrinho</h2>
          <ul>
            {carts.map(({ id, name, price, qty }) => (
              <li key={id}>
                <span className="qty">{qty}</span> {name} - {price}€
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="buttonBar">
        <h2>Total: {total.toFixed(2)}€</h2>
        <button>Limpar</button>
        <button>Imprmir</button>
      </div>
    </div>
  );
}
