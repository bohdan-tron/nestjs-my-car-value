import { AfterInsert, AfterRemove, AfterUpdate, Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @AfterInsert()
  logInsert() {
    console.log('Insert User, id: ', this.id);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('Updated User, id: ', this.id);
  }

  @AfterRemove()
  logRemove() {
    console.log('Removed User, id: ', this.id);
  }
}