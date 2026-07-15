import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('crops')
export class Crop {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  faoCropCode: string;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  temperatureRangeMin: number;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  temperatureRangeMax: number;

  @Column({ type: 'decimal', precision: 6, scale: 2 })
  rainfallRangeMin: number;

  @Column({ type: 'decimal', precision: 6, scale: 2 })
  rainfallRangeMax: number;

  @Column({ type: 'int', default: 0 })
  marketRank: number;
}
