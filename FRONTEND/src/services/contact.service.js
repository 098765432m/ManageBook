import createApiClient from "./api.service";

class ContactService {
    constructor (baseUrl = "/api/contacts") {
        this.api = createApiClient(baseUrl);
    }

    async getAll(){
        return (await this.api.get("/")).data;
    }

    // async getOneUsername(username){
    //     return (await this.api.get("/?username="+username)).data;
    // }

    async create(data){
        return (await this.api.post("/", data)).data;
    }
    // async deleteAll(){
    //     return (await this.api.delete("/")).data;
    // }
    async get(id){
        return (await this.api.get(`/${id}`)).data;
    }
    // async update(id, data){
    //     return (await this.api.put(`/${id}`, data)).data;
    // }
    // async delete(id){
    //     return (await this.api.delete(`/${id}`)).data;
    // }

    // async login(username, password){
    //     // fetch(`/login`,{
    //     //     Method: 'POST',
    //     //     Headers: {
    //     //       Accept: 'application.json',
    //     //       'Content-Type': 'application/json'
    //     //     },
    //     //     Body: {
    //     //         username: username,
    //     //         password: password
    //     //     },
    //     //     Cache: 'default'
    //     //   })
    //     return (await this.api.post(`/login`, {
    //         username: username,
    //         password: password,
    //     })).data
    // }
}

export default new ContactService();