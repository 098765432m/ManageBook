import { createWebHistory, createRouter } from "vue-router";

import ContactBook from "@/views/ContactBook.vue"
import Staff from "@/views/Staff.vue"
import Product from "@/views/Product.vue"
import AddContact from "@/views/ContactAdd.vue"
import Order from "@/views/Order.vue"

const routes = [
    //Trang thư viện
    {
        path: "/",
        name: "contact",
        component: ContactBook,
    },

    //Trang thêm khách hàng
    {
        path: "/addContact",
        name: "contact.add",
        component: AddContact,
    },

    //Trang xem thông tin nhân viên
    {
        path: "/staff",
        name: "staff",
        component: Staff,
    },

    //Trang xem thông tin hàng hóa
    {
        path: "/product",
        name: "product",
        component: Product,
    },

    //Trang xem thông tin đặt hàng
    {
        path: "/order",
        name: "order",
        component: Order,
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;