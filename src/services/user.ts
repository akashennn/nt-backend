import UserRepository from "../repositories/user";
import {NewDomainError} from "../domain/errors";

export default class UserService {
    public static GetUserFavourite(req, res) {
        UserRepository.GetFavourites().then(value => {
            res.json({data: value['rows']})
        }).catch(error => {
            new NewDomainError(error).send(res);
        });
    }
}