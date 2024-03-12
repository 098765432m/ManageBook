import createApiClient from "./api.service";

class DetailOrderService {
    constructor (baseUrl = "/api/detailOrders") {
        this.api = createApiClient(baseUrl);
    }

    async add(data){
        return (await this.api.post("/", data)).data;
    }
}

export default new DetailOrderService ();