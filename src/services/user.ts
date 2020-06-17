import UserRepository from "../repositories/user";
import {NewDomainError} from "../domain/errors";

export default class UserService {
    public static GetUserFavourite(req, res) {
        const userId = parseInt(req.params.user_id)

        UserRepository.GetFavourites(userId).then(value => {
            res.send({data: value['rows']})
        }).catch(error => {
            new NewDomainError(error).send(res);
        });
    }

    public static DeleteUserFavourite(req, res) {
        const userId = parseInt(req.params.user_id)
        const postId = parseInt(req.params.post_id)

        let deleteUserFavouriteSuccessResponse = {
            'data': {
                'code': 200,
                'message': `PostId: ${postId} Deleted Successfully.`
            }
        }

        let deleteUserFavouriteErrorResponse = {
            'code': 404,
            'message': `PostId: ${postId} Not Found.`
        }

        UserRepository.DeleteFavourites(userId, postId).then(value => {
            if (value.rowCount == 0) {
                new NewDomainError([deleteUserFavouriteErrorResponse]).send(res);
            } else {
                res.send(deleteUserFavouriteSuccessResponse)
            }
        }).catch(error => {
            new NewDomainError(error).send(res);
        })
    }
}