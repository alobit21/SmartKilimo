import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Farm } from '../../farms/entities/farm.entity';
import { Crop } from '../../crops/entities/crop.entity';
import { RequestStatus } from '@kilimosmart/shared-types';

@Entity('advisory_requests')
export class AdvisoryRequest {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'farmerId' })
  farmer: User;

  @Column()
  farmerId: string;

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

  @Column({ type: 'text' })
  description: string;

  @Column({ nullable: true })
  photoUrl: string;

  @Column({ type: 'enum', enum: RequestStatus, default: RequestStatus.PENDING })
  status: RequestStatus;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'assignedOfficerId' })
  assignedOfficer: User;

  @Column({ nullable: true })
  assignedOfficerId: string;

  @Column('simple-array', { nullable: true })
  previousOfficerIds: string[];

  @Column({ type: 'text', nullable: true })
  responseNotes: string;

  @CreateDateColumn()
  createdAt: Date;
}
