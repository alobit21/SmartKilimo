import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Farm } from '../../farms/entities/farm.entity';

@Entity('weather_records')
export class WeatherRecord {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Farm)
  @JoinColumn({ name: 'farmId' })
  farm: Farm;

  @Column()
  farmId: string;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  temperature: number;

  @Column({ type: 'decimal', precision: 6, scale: 2 })
  rainfall: number;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  humidity: number;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  windSpeed: number;

  @CreateDateColumn()
  fetchedAt: Date;
}
