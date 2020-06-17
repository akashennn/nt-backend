import PSQL from "./psql";

export default class PostRepository {
    public static async GetPosts(): Promise<any> {
        return PSQL.query('SELECT * FROM post;')
            .then(value => {
                return value
            }).catch(error => {
                return error
            });
    }
}
