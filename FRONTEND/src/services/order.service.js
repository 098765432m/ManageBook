import createApiClient from "./api.service";

class DetailOrderService {
    constructor (baseUrl = "/api/orders") {
        this.api = createApiClient(baseUrl);
    }

    async add(data){
        return (await this.api.post("/", data)).data;
    }

    async getAll(){
        return (await this.api.get("/")).data;
    }

    async get(id){
        return (await this.api.get(`/${id}`)).data;
    }

    async commit(id){
        return (await this.api.put(`/${id}`)).data;
    }
}

export default new DetailOrderService ();