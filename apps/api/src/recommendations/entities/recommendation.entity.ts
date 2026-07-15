import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Farm } from '../../farms/entities/farm.entity';
import { Crop } from '../../crops/entities/crop.entity';

@Entity('recommendations')
export class Recommendation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Farm)
  @JoinColumn({ name: 'farmId' })
  farm: Farm;

  @Column()
  farmId: string;

  @ManyToOne(() => Crop)
  @JoinColumn({ name: 'cropId' })
  crop: Crop;

  @Column()
  cropId: string;

  @Column()
  suitable: boolean;

  @CreateDateColumn()
  generatedAt: Date;

  @Column({ type: 'jsonb', nullable: true })
  weatherSnapshotJson: any;
}
