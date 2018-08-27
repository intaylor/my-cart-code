import {createElement} from 'react';
import Product from './product';
import * as products from '../data/items';
import Heading from './heading';

import styles from './styles.css';

export default () => (
  <div className={styles.container}>
    <Heading>
      <img className={styles.productsLogo} src={'products.png'} />
      Products
    </Heading>
    <Product {...products.cake}/>
    <Product {...products.waffle}/>
    <Product {...products.chocolate}/>
  </div>
);
