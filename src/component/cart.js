import {createElement} from 'react';
import map from 'lodash/fp/map';
import reduce from 'lodash/fp/reduce';
import {connect} from 'react-redux';

import {clear, setQuantity} from '../action/cart';
import * as products from '../data/items';
import Heading from './heading';

import styles from './styles.css';

const ttStyle = {
  textAlign: 'right',
  fontWeight: 'bold',
};

const Item = connect(
  () => ({}),
  {setQuantity}
)(({id, quantity, setQuantity}) => {
  const {title, price} = products[id];
  const inc = () => setQuantity({id, quantity: quantity + 1});
  const dec = () => setQuantity({id, quantity: quantity - 1});
  const del = () => setQuantity({id, quantity: 0});
  return (
    <tr>
      <td>
        {title}<a onClick={del}>
          <img className={styles.delete} src={'delete.png'} />
        </a>
      </td>
      <td>
        {price}
      </td>
      <td>
        {quantity}
        <a onClick={inc}>
          <img className={styles.plusSign} src={'plus.jpg'} />
        </a>
        <a onClick={dec}>
          <img className={styles.minusSign} src={'minus.png'} />
        </a>
      </td>
      <td>
        {(price * quantity).toFixed(2)}
      </td>
    </tr>
  );
});

const Cart = ({total, items, clear}) => {
  if (total === '0.00') {
    return (<div className={styles.container}>
            <Heading>
              <img className={styles.cartLogo} src={'cart.png'} />
              Cart
            </Heading>
            <div className={styles.label}>Your cart is empty</div>
            </div>);
  }

  return (<div className={styles.container}>
      <Heading>
        <img className={styles.cartLogo} src={'cart.png'} />
        Cart
      </Heading>
      <button onClick={() => clear()}>Clear all items</button>
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {map((item) => <Item {...item}/>, items)}
          <tr><td colSpan={3}/><td style={ttStyle}>{total}</td></tr>
        </tbody>
      </table>
    </div>);
};

export default connect((state) => {
  return {
    items: state.cart.items,
    total: reduce(
      (sum, {id, quantity}) => sum + products[id].price * quantity,
      0,
      state.cart.items
    ).toFixed(2),
  };
}, {clear})(Cart);
