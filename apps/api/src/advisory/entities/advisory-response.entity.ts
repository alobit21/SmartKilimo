import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { AdvisoryRequest } from './advisory-request.entity';
import { User } from '../../users/entities/user.entity';

@Entity('advisory_responses')
export class AdvisoryResponse {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => AdvisoryRequest)
  @JoinColumn({ name: 'advisoryRequestId' })
  advisoryRequest: AdvisoryRequest;

  @Column()
  advisoryRequestId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'officerId' })
  officer: User;

  @Column()
  officerId: string;

  @Column({ type: 'text' })
  message: string;

  @CreateDateColumn()
  createdAt: Date;
}
