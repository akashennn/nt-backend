import PSQL from "./psql";

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
}