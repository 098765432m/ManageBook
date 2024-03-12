<script>
import StaffService from "@/services/staff.service";
import 'boxicons';
export default {
    data() {
        return {
            staff: {},
            staffName: "",
        }
    },

    props: {
        orders: { type: Array, default: [] },
    },

    created() {

    },

    emits:["submit:commit"],

    methods: {
        // async getStaffByMS(MS) {
        //     this.staff =  await StaffService.getOneByMS(MS);
        //     return this.staff;
        // },

        commitOrder(order){
            this.$emit("submit:commit", order._id);
        }
    },
};
</script>

<template>
    <ul class="list-group info">
        <li class="list-group-item mb-4 orderbox" v-for="(order, index) in orders" :key="order._id">
            <dl>
                <dd></dd>
                <dd class="detailField">Mã đơn hàng:</dd>
                <dd class="detailValue">{{ order.SoDonDH }} <box-icon name='mail-send' size="sm" color="green" v-if="!order.TrangThaiDH" @click="commitOrder(order)"></box-icon></dd>
                <dd></dd>
                <dd class="detailField">Mã số khách hàng:</dd>
                <dd class="detailValue">{{ order.MSKH }}</dd>
                <dd></dd>
                <dd class="detailField">Mã số nhân viên:</dd>
                <dd class="detailValue">{{ order.MSNV }}</dd>
                <dd></dd>
                <dd class="detailField">Ngày đặt hàng:</dd>
                <dd class="detailValue">{{ order.NgayDH }}</dd>
                <dd></dd>
                <div v-if="order.TrangThaiDH">
                <dd class="detailField">Ngày giao hàng:</dd>
                <dd class="detailValue" >{{ order.NgayGH }}</dd>
            </div>
                <dd></dd>
                <dd class="detailField">Trang thái:</dd>
                <dd class="detailValue" v-if="!order.TrangThaiDH">{{' Chưa hoàn thành' }}</dd>
                <dd class="detailValue" v-else>{{ 'Hoàn thành' }}</dd>
            </dl>
        </li>
    </ul>
</template>

<style scoped>

.orderbox{
    box-shadow: 10px 11px 12px -7px rgba(0,0,0,0.59);
}
.info {
    display: table-cell;
    vertical-align: top;
    font-size: 14px;
    width: 1000px;
}

.info .dd {
    float: left;
    white-space: pre-line;
}

.detailField {
    width: 30%;
    display: inline-flex;
}

.detailValue {
    width: 70%;
    display: inline;
}

box-icon{
    float: right;
}
</style>