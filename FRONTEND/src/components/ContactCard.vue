<script>
export default {
    props: {
        contact: {type: Object, required: true},
    },
};
</script>

<template>
    <div>
        <div class="p-1">
            <strong>Mã số khách hàng:</strong>
            {{ contact.DiaChi }}
        </div>
        <div class="p-1">
            <strong>Tên:</strong>
            {{ contact.HoTenKH }}
        </div>
        <div class="p-1">
            <strong>Địa chỉ:</strong>
            {{ contact.DiaChi }}
        </div>
        <div class="p-1">
            <strong>Điện thoại:</strong>
            {{ contact.SoDienThoai }}
        </div>
    </div>
</template>