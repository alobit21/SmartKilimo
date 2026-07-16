import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('farms')
export class Farm {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'farmerId' })
  farmer: User;

  @Column()
  farmerId: string;

  @Column()
  name: string;

  @Column({ type: 'decimal', precision: 10, scale: 7 })
  latitude: number;

  @Column({ type: 'decimal', precision: 10, scale: 7 })
  longitude: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  sizeHectares: number;

  @Column({ type: 'text', nullable: true })
  soilNotes: string;

  @Column({ default: 'Kitalu Kipya' })
  status: string;

  @Column({ default: 0 })
  growthProgress: number;
}
