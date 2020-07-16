import knex from "knex";
import Knex from "knex";

export abstract class BaseDatabase{

    protected static TABLE_USER: string = "Spotenu_Users";
    protected static TABLE_GENRE: string = "Spotenu_Genres";
    protected static TABLE_ALBUM: string = "Spotenu_Albums";
    protected static TABLE_ALBUMS_GENRES: string = "Spotenu_Albums_Genres";
    protected static TABLE_SONGS: string = "Spotenu_Songs";

    private static connection: Knex | null = null;

    protected getConnection(): knex{
        if(!BaseDatabase.connection){
            BaseDatabase.connection = knex({
                client: "mysql",
                connection:{
                    host: process.env.DB_HOST,
                    port: Number(process.env.DB_PORT),
                    user: process.env.DB_USER,
                    password: process.env.DB_PASSWORD,
                    database: process.env.DB_DATABASE_NAME
                }
            });
        };
        return BaseDatabase.connection;
    };

    protected async destroyConnection():Promise<void>{
        if(BaseDatabase.connection){
            await BaseDatabase.connection.destroy();
            BaseDatabase.connection = null;
        };
    };
};