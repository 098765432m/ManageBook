<template>
    <div class="page row">
        <div class="col-md-10">
            <InputSearch v-model="searchText" />
            <!-- searchText chứa dữ liêu nhập vào thanh tìm kiếm -->
        </div>

        <div class="mt-3 col-md-6">
            <h4>
                Danh bạ
                <i class="fas fa-address-book"></i>
            </h4>
            <ContactList
                v-if="filteredContactsCount > 0"
                :contacts="filteredContacts"
                v-model:activeIndex="activeIndex"
            />
            <!-- :contacts lưu danh sách các liên hệ để hiển thị-->
            <!-- activeIndex chỉ mục đối tượng contact được chọn bởi người dùng-->
            <p v-else>Không có liên hệ nào.</p>

            <div class="mt-3 row justify-content-around align-items-center">
                <button class="btn btn-sm btn-primary" @click="refreshList()">
                    <i class="fas fa-redo"></i> Làm mới
                </button>
                <button class="btn btn-sm btn-success" @click="goToAddContact()">
                    <i class="fas fa-plus"></i> Thêm mới
                </button>

                <button class="btn btn-sm btn-danger" @click="removeAllContacts()">
                    <i class="fas fa-trash"></i> Xóa tất cả
                </button>
            </div>
        </div>
        <div class="mt-3 col-md-6">
            <div v-if="activeContact">
                <h4>
                    Chi tiết liên hệ
                    <i class="fas fa-address-card"></i>
                </h4>    
                <ContactCard :contact="activeContact" />
            </div>
        </div>
    </div>
</template>

<script>
import ContactCard from "@/components/ContactCard.vue";
import InputSearch from "@/components/InputSearch.vue";
import ContactList from "@/components/ContactList.vue";
import ContactService from "@/services/contact.service";
import { RouterLink } from "vue-router"; //??

export default {
    components: {
    ContactCard,
    InputSearch,
    ContactList,
    RouterLink //ở đâu ra ?
    },

    //Đoạn mã xử lý trình bày bên dưới
    data(){
        return {
            contacts: [],
            activeIndex: -1,
            searchText: "",
        };
    },
    watch: {
        //Giám sát các thay đổi của biên searchText.
        // Bỏ chọn phần tử đang được chọn trong danh sách
        searchText(){
            this.activeIndex = -1;
        },
    },
    computed: {
        //Chuyển các đối tượng contact thành chuổi để tiện cho tìm kiếm.
        contactString() {
            return this.contacts.map((contact) => {
                const { name, email, address, phone } = contact;
                return [name, email, address, phone].join("");
            });
        },

        //Trả về các contact có chứa thông tin cần tìm kiếm.
        filteredContacts() {
            if (!this.searchText) return this.contacts;
            return this.contacts.filter((_contact, index) => //filter giúp lọc mảng contacts
                this.contactString[index].includes(this.searchText) //string.includes(str) giúp tìm chuỗi với case sensitive
            );
        },
        
        activeContact() {
            if (this.activeIndex < 0) return null;
            return this.filteredContacts[this.activeIndex];
        },
        //Check số contact hiển thị
        filteredContactsCount() {
            return this.filteredContacts.length;
        },
    },

    methods: {
        async retrieveContacts() {
            try {
                this.contacts = await ContactService.getAll();
            } catch (error) {
                console.error();
            }
        },

        refreshList() {
            this.retrieveContacts();
            this.activeIndex = -1;
            this.filteredContacts;
        },

        async removeAllContacts() {
            if (confirm("Bạn có muốn xóa tất cả Liên hệ?"))
            try {
                await ContactService.deleteAll();
                this.refreshList();
            } catch (error) {
                console.error();
            }
        },

        goToAddContact() {
            this.$router.push({ name: "contact.add" });
        },
    },
    
    mounted() {
        this.refreshList();
    },
}

</script>

<style scoped>
    .page {
        text-align: left;
        max-width: 750px;
    }
    i.fas {
        margin-right: 3px;        
    }
</style>