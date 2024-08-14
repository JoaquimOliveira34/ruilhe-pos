import React, { useState } from "react";
import "./styles.css";
import { Br, Cut, Line, Printer, Text, Row, render } from 'react-thermal-printer';


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

  function onClearCart(){
    setCart([])
  }


  function onPrint(){
    const receipt = (
      <Printer type="epson" width={42} characterSet="korea">
        <Text size={{ width: 2, height: 2 }}>9,500원</Text>
        <Text bold={true}>결제 완료</Text>
        <Br />
        <Line />
        <Row left="결제방법" right="체크카드" />
        <Row left="카드번호" right="123456**********" />
        <Row left="할부기간" right="일시불" />
        <Row left="결제금액" right="9,500" />
        <Row left="부가세액" right="863" />
        <Row left="공급가액" right="8,637" />
        <Line />
        <Row left="맛있는 옥수수수염차 X 2" right="11,000" />
        <Text>옵션1(500)/옵션2/메모</Text>
        <Row left="(-) 할인" right="- 500" />
        <Br />
        <Line />
        <Row left="합계" right="9,500" />
        <Row left="(-) 할인 2%" right="- 1,000" />
        <Line />
        <Row left="대표" right="김대표" />
        <Row left="사업자등록번호" right="000-00-00000" />
        <Row left="대표번호" right="0000-0000" />
        <Row left="주소" right="어디시 어디구 어디동 몇동몇호" />
        <Line />
        <Br />
        <Text align="center">Wifi: some-wifi / PW: 123123</Text>
        <Cut />
      </Printer>
    );
    render(receipt);  
  }

  return (
    <div className="App">
      <div className="board">
        <div>
          <h2>Avaibale items</h2>
          <ul>
            {avaibaleItems.map((item) => (
                <li key={item.id}>
                  <div>
                    <span className="qty">{ carts.find(e => e.id === item.id) ?  carts.find(e => e.id === item.id).qty : 0 }</span>
                  </div>                  <button onClick={() => onAddToCart(item)}>Add</button>
                  <button disabled={!carts.some(i => i.id === item.id)} onClick={() => onDestroyToCart(item)}>
                    Decrement
                  </button>
                  {item.name} - {item.price.toFixed(2)}€ -{" "}
                </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="footerBar">
        <h2>Total: {total.toFixed(2)}€</h2>
        <button onClick={() => onClearCart()} >Limpar</button>
        <button onClick={() => onPrint()}> Imprimir</button>
      </div>
    </div>
  );
}
