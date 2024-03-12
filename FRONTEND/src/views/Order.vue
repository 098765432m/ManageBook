<template>
    <div class="page row">
        <div class="col-md-10">
            <InputSearch v-model="searchText" />
        </div>

        <div class="mt-3 col-md-6">
            <h4>
                Danh sách đặt hàng
                <i class="fas fa-address-order"></i>
            </h4>
            <OrderList
            v-if="filteredOrdersCount > 0"
            :orders="filteredOrders"
            @submit:commit="commitOrder"
            />
            <p v-else>Không có sách nào.</p>
            <div class="mt-3 row justify-content-around align-items-center">
                <button class="btn btn-sm btn-primary" @click="refreshList()">
                    <i class="fas fa-redo"></i> Làm mới
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import OrderService from "@/services/order.service";

import InputSearch from "@/components/InputSearch.vue";
import OrderList from "@/components/OrderList.vue";

export default {
    components: {
        InputSearch,
        OrderList,
    },

    data(){
        return {
            orders: [],
            searchText: "",
            // staff: {},
        }
    },

    methods: {
        async retrieveOrders() {
            try {
                this.orders = await OrderService.getAll();
            } catch (error) {
                console.error();
            }
        },

        async commitOrder(id){
            console.log(id);
            await OrderService.commit(id);
        },

        async refreshList() {
            await this.retrieveOrders();
        },
    },

    computed: {
        orderString() {
            return this.orders.map((order) => {
                const { MSKH, MSNV } = order;
                return [MSKH, MSNV].join("");
            });
        },


        filteredOrders() {
            if (!this.searchText) return this.orders;
            return this.orders.filter((_order, index) => //filter giúp lọc mảng orders
                this.orderString[index].includes(this.searchText) //string.includes(str) giúp tìm chuỗi với case sensitive
            );
        },

        //Check số order hiển thị
        filteredOrdersCount() {
            return this.filteredOrders.length;
        },
    },

    mounted() {
        this.refreshList();
    },
}
</script>