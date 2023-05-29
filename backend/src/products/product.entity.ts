import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

const DEFAULT_PRODUCT_IMAGE =
  'https://atlas-content-cdn.pixelsquid.com/stock-images/cardboard-box-mr1GaB0-600.jpg';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public title: string;

  @Column({
    default: DEFAULT_PRODUCT_IMAGE,
  })
  public imageUrl: string;

  @Column()
  public price: string;
}
