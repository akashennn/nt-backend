import PostRepository from "../repositories/post";
import {NewDomainError} from "../domain/errors";

export default class PostService {
    public static GetAllPost(req, res) {
        PostRepository.GetPosts().then(value => {
            res.send({data: value['rows']})
        }).catch(error => {
            new NewDomainError(error).send(res);
        });
    }
}