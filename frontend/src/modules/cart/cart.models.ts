import { Product } from '../../shared/models';

export interface CartProduct extends Product {
  count: number;
}
