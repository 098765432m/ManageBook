import createApiClient from "./api.service";

class StaffService {
    constructor (baseUrl = "/api/staffs") {
        this.api = createApiClient(baseUrl);
    }

    async getAll(){
        return (await this.api.get("/")).data;
    }

    async getOneByMS(dataMS){
        return (await this.api.get("/?MS="+dataMS)).data;
    }


    async create(data){
        return (await this.api.post("/", data)).data;
    }
    async get(id){
        return (await this.api.get(`/${id}`)).data;
    }
}

export default new StaffService();