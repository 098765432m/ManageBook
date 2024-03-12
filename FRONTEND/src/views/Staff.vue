<template>
    <StaffList 
        :staffs="staff"
    />
</template>

<script>
import StaffList from "@/components/StaffList.vue";
import StaffService from "@/services/staff.service";

export default {
    data() {
        return {
            staff: [],
        }
    },

    components: {
        StaffList,
    },

    methods: {
        async retrieveStaffs() {
            try {
                this.staff = await StaffService.getAll();
            } catch (error) {
                console.log();
            }
        },

        refreshList() {
            this.retrieveStaffs();
        }
    },

    mounted() {
        this.refreshList();
    }
}
</script>