<script>
import jquery from 'jquery';

export default {

    data() {
        return {
            counter: 0,
            activeIndex: -1,
        }
    },

    props: {
        products: { type: Array, default: [] },
    },

    emits: ["submit:product"],
    methods: {
        plusCounter() {
            this.counter++;
        },

        minusCounter() {
            if (!(this.counter <= 0))
                this.counter--;
        },

        toggleActive(i_index) {
            this.counter = 0;
            this.activeIndex = i_index;
        },

        // Muốn emits truyền dữ liệu lên cha thì phải emits dạng object {}
        submitProduct(pdct) {
            this.$emit("submit:product", {
                product: pdct,
                counter: this.counter
            });
        }

        // submitInfo() {

        // }
    }
};
</script>

<template>
    <div class="" v-for="(product, index) in products">
        <div>
            <div class="info-left">
                <div class="img-container"><img :src="product.HinhHH.linkHinh" alt=""></div>
            </div>
            <div class="info-right">
                <dl>
                    <dd></dd>

                    <dd class="detailField">Mã mặt hàng:</dd>
                    <dd class="detailValue">{{ product.MSHH }}</dd>
                    <dd></dd>
                    <dd class="detailField">Tên sách:</dd>
                    <dd class="detailValue">{{ product.TenHH }}</dd>
                    <dd></dd>
                    <dd class="detailField">Mô tả:</dd>
                    <dd class="detailValue">{{ product.MoTaHH }}</dd>
                    <dd></dd>
                    <dd class="detailField">Giá: </dd>
                    <dd class="detailValue">{{ product.Gia }}</dd>
                    <dd></dd>
                    <dd class="detailField">Ghi chú</dd>
                    <dd class="detailValue">{{ product.GhiChu }}</dd>


                    <div v-if="activeIndex == index">
                        <dd></dd>
                        <dd><input id="counter" type="text" :value="counter"><button id="plus"
                                @click="plusCounter">+</button>
                            <button id="minus" @click="minusCounter">-</button>
                        </dd>

                        <button class="btn btn-primary" @click="submitProduct(product)">Gửi đi</button>
                        <dd></dd>
                    </div>
                    <div v-else>
                        <dd></dd>
                        <button @click="toggleActive(index)">Thanh toán</button>
                    </div>
                </dl>
            </div>
        </div>
        <hr />
    </div>
</template>

<style scoped>
.info-left {
    padding-right: 40px;
}

.info-left .img-container {
    overflow: hidden;
    height: 180px;
    width: 120px;
}

.info-left img {
    width: 100px;
    display: block;
    top: 25%;
    left: 25%;
}

.info-left,
.info-right {
    display: table-cell;
    vertical-align: top;
}

.info-right {
    font-size: 14px;
    width: 1000px;
}

.info-right {
    zoom: 1;
    overflow: hidden;
}

.info-right .dd {
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

/* counter */

#counter {
    width: 30px;
    text-align: center;
    margin-right: 3px;
}

#plus,
#minus {
    height: 25px;
    font-size: 12px;
    text-align: center;
    vertical-align: px;
}

#plus {}

#minus {}
</style>