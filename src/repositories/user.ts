import PSQL from "./psql";
import {Favourites} from "../entity/favourite";

export default class UserRepository {
    public static async GetFavourites(): Promise<Favourites> {
        return PSQL.query('SELECT * FROM users ORDER BY id ASC');
    }
}