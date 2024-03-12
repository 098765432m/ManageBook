<template>
    <ProductList :products="product" @submit:product="addDetailProduct" />
</template>

<script>
import ProductList from "@/components/ProductList.vue";
import DetailOrderService from "@/services/detailOrder.service";
import OrderService from "@/services/order.service";
import ProductService from "@/services/product.service";

export default {
    data() {
        return {
            product: [],
            detailOrder: {},
            order: {},
        }
    },

    components: {
        ProductList,
    },

    methods: {
        async retrieveProducts() {
            try {
                this.product = await ProductService.getAll();
            } catch (error) {
                console.log();
            }
        },

        async addDetailProduct(data) {
            try {
                let GiaDH = data.product.Gia * data.counter;
                this.detailOrder = {
                    MSHH: data.product.MSHH,
                    SoLuong: data.counter,
                    GiaDatHang: GiaDH,
                }
                let detailOrder_ref = await DetailOrderService.add(this.detailOrder);
                await this.addOrder(detailOrder_ref.SoDonDH);
            } catch (error) {
                console.log();
            }
        },

        //thêm đặt hàng
        async addOrder(data) {
            let now = new Date();
            this.order = {
                SoDonDH: data,
                MSKH: 'akjsbdkaj',
                MSNV: 'kcosss',
                NgayDH: now,
            }
            await OrderService.add(this.order);
        },

        refreshList() {
            this.retrieveProducts();
        }
    },

    mounted() {
        this.refreshList();
    }
}
</script>