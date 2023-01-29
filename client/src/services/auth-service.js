import axios from 'axios';

const url = "http://localhost:5000"

class authService{
    async login(data){
        return await axios.post(url + "/user/signin", data, {
            headers: {
                "Content-Type": "application/json",
            }
        }).then(response => {
            if(response.data.success === true){
                localStorage.setItem("user", JSON.stringify(response.data));
            }
            console.log(response.data);
            return response.data;
        })
    }

    async register(data){
        return await axios.post(url + "/user/signup", data, {
            headers: {
                "Content-Type": "application/json",
            }
        }).then(response => {
            console.log(response.data);
            return response.data
        })
    }
}

export default new authService();