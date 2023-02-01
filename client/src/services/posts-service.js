import axios from 'axios';

const url = "http://localhost:5000";

class postsService {
    async getPosts(){
        return await axios.get(url + "/posts/getPosts").then(response => {
            return response.data;
        })
    }

    async createPost(post){
        return await axios.post(url + "/posts/createPost", post, {
            headers: {
                "Content-Type": "application/json",
            }
        }).then(response => {
            return response.data;
        })
    }

    async updatePost(id, post){
        return await axios.patch(url + `/posts/updatePost/${id}`, post, {
            headers: {
                "Content-Type": "application/json",
            }
        }).then(response => {
            return response.data;
        })
    }

    async deletePost(id){
        return await axios.delete(url + `/posts/deletePost/${id}`).then(response => {
            return response.data;
        })
    }

    async likePost(id){
        return await axios.patch(url + `/posts/likePost/${id}`).then(response => {
            return response.data;
        })
    }
}

export default new postsService();