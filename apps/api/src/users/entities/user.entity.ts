import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToOne } from 'typeorm';
import { Role } from '@kilimosmart/shared-types';
import { FarmerProfile } from './farmer-profile.entity';
import { BuyerProfile } from './buyer-profile.entity';
import { OfficerProfile } from './officer-profile.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, nullable: true })
  email: string;

  @Column({ unique: true, nullable: true })
  phone: string;

  @Column()
  passwordHash: string;

  @Column({ type: 'enum', enum: Role })
  role: Role;

  @Column({ default: 'en' })
  language: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToOne(() => FarmerProfile, (profile) => profile.user, { cascade: true })
  farmerProfile: FarmerProfile;

  @OneToOne(() => BuyerProfile, (profile) => profile.user, { cascade: true })
  buyerProfile: BuyerProfile;

  @OneToOne(() => OfficerProfile, (profile) => profile.user, { cascade: true })
  officerProfile: OfficerProfile;
}
