<script>
export default {
    props: {
        staffs: { type: Array, default: []},
    },
};
</script>

<template>
    <div class="" v-for="(staff, index) in staffs">
        <div>
            <p>Mã số nhân viên: {{ staff.MSNV }}</p>
            <p>Tên nhân viên: {{ staff.HoTenNV }}</p>
            <p>Chức vụ: {{ staff.ChucVu }}</p>
            <p>Địa chỉ: {{ staff.DiaChi }}</p>
            <p>Số điện thoại: {{ staff.SoDienThoai }}</p>
            <button @click="ActiveIndex = index">Chi tiết</button>
        </div>
    </div>
</template>