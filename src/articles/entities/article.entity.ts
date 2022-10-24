import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Article {
   @PrimaryGeneratedColumn()
   id: number;
   @Column()
   title: string;
   @Column({ type: "int", default: 0 })
   is_active: number;
   @Column({ type: "int", default: 0 })
   is_deleted: number;
}
