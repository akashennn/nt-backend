import UserRepository from "../repositories/user";
import {NewDomainError} from "../domain/errors";

export default class UserService {
    public static GetUserFavourite(req, res) {
        const userId = req.params.user_id
        UserRepository.GetFavourites(userId).then(value => {
            res.json({data: value['rows']})
        }).catch(error => {
            new NewDomainError(error).send(res);
        });
    }
}