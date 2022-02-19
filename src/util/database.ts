import { Dialect, Model, Sequelize } from 'sequelize'

const sequelize = new Sequelize(
    process.env.PGDATABASE || '' ,
    process.env.PGUSER || '',
    process.env.PGPASSWORD || '',
    {
        host: process.env.PGHOST ||  '',
        dialect: 'postgres'
    }
)

//  when using minikube to run
// const sequelize = new Sequelize(process.env.POSTGRES_HOST || '')

export default sequelize;
