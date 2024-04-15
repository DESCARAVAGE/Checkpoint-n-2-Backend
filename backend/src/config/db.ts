import { DataSource } from "typeorm";


export const dataSource = new DataSource({
  type: "postgres",
  host: "db",
  port: 5432,
  username: "Checkpoint2",
  password: "Checkpoint2",
  database: "Checkpoint2Db",
  entities: ["src/entities/*.ts"],
  logging: true,
  synchronize: true
});