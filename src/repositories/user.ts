import PSQL from "./psql";
import {Favourites} from "../entity/favourite";
import Logger from "./../domain/logger";

export default class UserRepository {
    public static async GetFavourites(userId): Promise<Favourites> {
        return PSQL.query('SELECT * FROM user_favourite_mapping WHERE user_id = $1', [userId]);
    }
}