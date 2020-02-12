import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    Index
} from 'typeorm';


@Entity('users')
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @Index({ unique: true })
    @Column('text')
    email: string;

    @Index({ unique: true })
    @Column('text')
    handle: string;

    @Column('text')
    password: string;

    @Column('text', {
        nullable: true,
    })
    bio: string;

    @Column('boolean', {
        default: "true",
    })
    active: boolean;

    @Column('boolean', {
        default: "false",
    })
    admin: boolean;

}
