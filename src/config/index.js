import Sequelize from "sequelize";
import 'dotenv/config';
const user=process.env.DB_USER || 'postgres';
const newSequelize = new Sequelize(`postgres://${user}:${process.env.DB_PASSWORD}@${process.env.HOST}:5432/${process.env.DB_NAME}`,
{logging:false}
);
export {newSequelize};