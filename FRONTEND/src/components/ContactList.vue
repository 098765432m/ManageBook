<script>
export default {
    props: {
        contacts: { type: Array, default: []},
        ActiveIndex: { type: Number, default: -1},
    },
    emits: ["update:activeIndex"],
    methods: {
        updateActiveIndex(index) {
            this.$emit("update:activeIndex", index);
        }
    }
};
</script>

<template>
    <ul class="list-group">
        <li 
            class="list-group-item"
            v-for="(contact, index) in contacts"
            :key="contact._id"
            :class="{active: index === activeIndex }"
            @click="updateActiveIndex(index)"
        >
        <!-- Click để highlight sản phẩm đang chọn -->
            {{ contact.HoTenKH }}
        </li>
    </ul>
</template>