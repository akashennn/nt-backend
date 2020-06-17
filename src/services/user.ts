import UserRepository from "../repositories/user";
import {NewDomainError} from "../domain/errors";
import {Favourites} from "../entity/favourite";

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

    public static UpdateUserFavourite(req, res) {
        const favourites = new Favourites();
        favourites.isFavourite = req.body.is_favourite
        favourites.userId = parseInt(req.params.user_id)
        favourites.postId = parseInt(req.body.post_id)
        favourites.title = req.body.title
        favourites.currency = req.body.currency
        favourites.price = parseFloat(req.body.price)
        favourites.description = req.body.description
        favourites.seller_username = req.body.seller_username
        favourites.seller_image = req.body.seller_image

        let insertFavouritesSuccessResponse = {
            'data': {
                'code': 200,
                'message': `PostId: ${favourites.postId} Added to Favourites Successfully.`
            }
        }

        if (favourites.isFavourite == true) {
            UserRepository.InsertFavourites(favourites).then(value => {
                if (value.rowCount == 0) {
                    new NewDomainError(value).send(res);
                } else {
                    res.send(insertFavouritesSuccessResponse)
                }
            }).catch(error => {
                new NewDomainError(error).send(res);
            });
        } else {
            let deleteUserFavouriteSuccessResponse = {
                'data': {
                    'code': 200,
                    'message': `PostId: ${favourites.postId} Deleted Successfully.`
                }
            }

            let deleteUserFavouriteErrorResponse = {
                'code': 404,
                'message': `PostId: ${favourites.postId} Not Found.`
            }

            UserRepository.DeleteFavourites(favourites.userId, favourites.postId).then(value => {
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
}