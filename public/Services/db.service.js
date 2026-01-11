const { sequelize } = require('../Db/conection');

async function openConnection() {
    try {
        await sequelize.authenticate();
        const shouldSync = process.env.DB_SYNC === 'true';
        if (shouldSync) {
            await sequelize.sync({ alter: true });
            console.log("DB iniciado com sucesso");
        }
    } catch (err) {
        console.log("Deu pal no db ai");
        process.exit(1);
    }
}

async function closeDb() {
    try {
        await sequelize.close();
    } catch (err) {
    }
}

module.exports = { openConnection, closeDb };
