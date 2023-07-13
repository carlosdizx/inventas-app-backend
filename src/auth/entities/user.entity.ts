import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Roles } from '../enums/role.enum';

@Entity('users')
export default class User {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column('varchar', { unique: true })
  email: string;

  @Column('varchar', { select: false })
  password: string;

  @Column('bool', { default: true })
  isActive: boolean;

  @Column('enum', {
    enum: Roles,
    array: true,
    default: [Roles.CASHIER],
  })
  roles: Roles[];
}
