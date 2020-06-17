import PSQL from "./psql";
import {Favourites} from "../entity/favourite";

export default class UserRepository {
    public static async GetFavourites(userId): Promise<any> {
        return PSQL.query('SELECT * FROM user_favourite_mapping WHERE user_id = $1', [userId])
            .then(value => {
                return value
            }).catch(error => {
                return error
            });
    }

    public static async DeleteFavourites(userId, postId): Promise<any> {
        return PSQL.query('DELETE FROM user_favourite_mapping WHERE user_id = $1 AND post_id = $2;', [userId, postId])
            .then(value => {
                return value
            }).catch(error => {
                return error
            })
    }

    public static async InsertFavourites(Favourites): Promise<any> {
        return PSQL.query('INSERT INTO user_favourite_mapping (user_id, post_id, title, currency, price,' +
            'description, seller_username, seller_image) VALUES ($1,$2,$3,$4,$5,$6,$7,$8);',
            [Favourites.userId, Favourites.postId, Favourites.title, Favourites.currency, Favourites.price,
                Favourites.description, Favourites.seller_username, Favourites.seller_image])
            .then(value => {
                return value
            }).catch(error => {
                return error
            });
    }
}