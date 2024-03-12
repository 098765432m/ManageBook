<template>
    <div class="Log-Group" v-if="this.LogStatus != true">
        <div class="float-right">
            <button type="button" class="btn btn-outline-primary btn-sm " data-toggle="modal" data-target="#LogInModal"
                data-whatever="@getbootstrap">Đăng nhập</button>
        </div>
        <div class="float-right">
            <button type="button" class="btn btn-outline-primary btn-sm " data-toggle="modal" data-target="#SignInModal"
                data-whatever="@getbootstrap">Đăng ký</button>
        </div>
        <div class="modal fade" id="LogInModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <Form @submit="submitContact" :validation-schema="LogInSchema">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Đăng nhập</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">

                            <div class="form-group">
                                <label for="username" class="col-form-label">Mã số đăng nhập:</label>
                                <Field name="username" id="username" type="text" class="form-control"
                                    v-model="contactLogin.username" />
                                <ErrorMessage name="username" class="error-feedback" />
                            </div>
                            <div class="form-group">
                                <label for="password" class="col-form-label">Mật khẩu:</label>
                                <Field name="password" id="password" type="password" class="form-control"
                                    v-model="contactLogin.password" />
                                <ErrorMessage name="password" class="error-feedback" />
                            </div>

                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary btn_dismiss" data-dismiss="modal">Đóng</button>
                            <button type="button" class="btn btn-primary" @click="submitContact">Đăng nhập</button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
        <div class="modal fade" id="SignInModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <Form @submit="submitContact" :validation-schema="SignInSchema">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Đăng ký</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">

                            <div class="form-group">
                                <label for="username1" class="col-form-label">Tên người dùng:</label>
                                <Field name="username" id="username1" type="text" class="form-control"
                                    v-model="contactLogin.username" />
                                <ErrorMessage name="username" class="error-feedback" />
                            </div>
                            <div class="form-group">
                                <label for="password1" class="col-form-label">Mật khẩu:</label>
                                <Field name="password" id="password1" type="password" class="form-control"
                                    v-model="contactLogin.password" />
                                <ErrorMessage name="password" class="error-feedback" />
                            </div>
                            <div class="form-group">
                                <label for="confirm_password" class="col-form-label">Nhập lại mật khẩu:</label>
                                <Field name="confirm_password" id="confirm_password" type="password" class="form-control"
                                    />
                                <ErrorMessage name="confirm_password" class="error-feedback" />
                            </div>
                            <div class="form-group">
                                <label for="username1" class="col-form-label">Đia Chi:</label>
                                <Field name="username" id="username1" type="text" class="form-control"
                                    v-model="contactLogin.address" />
                                <ErrorMessage name="username" class="error-feedback" />
                            </div>
                            <div class="form-group">
                                <label for="username1" class="col-form-label">Sô điện thoại:</label>
                                <Field name="username" id="username1" type="text" class="form-control"
                                    v-model="contactLogin.phone" />
                                <ErrorMessage name="username" class="error-feedback" />
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary btn_dismiss" data-dismiss="modal">Đóng</button>
                            <button type="button" class="btn btn-primary" @click="submitContact">Đăng nhập</button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    </div>
    <div v-else>
        <p id="display-user"> {{ localContact.username }}</p>
        <button type="button" class="btn btn-outline-danger btn-sm" @click="logOut">Đăng xuất</button>
    </div>
</template>

<script>
import $ from 'jquery';
import ContactsService from "@/services/contact.service.js";
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import jquery from "jquery";
export default {
    components: {
        Form,
        Field,
        ErrorMessage,
        $
    },

    data() {
        // Validate cho thông tin đăng nhập
        const LogInSchema = yup.object().shape({
            username: yup.string().required("Username không được trống.")
                .max(50, "Username có nhiều nhất 50 ký tự"),

            password: yup.string().required("Mật khẩu không được trống.")
                .max(50, "Mật khẩu không được quá 50 ký tự"),
        });

        const SignInSchema = yup.object().shape({
            username: yup.string().required("Username không được trống.")
                .max(50, "Username có nhiều nhất 50 ký tự"),

            password: yup.string().required("Mật khẩu không được trống.")
                .max(50, "Mật khẩu không được quá 50 ký tự"),

            confirm_password: yup.string().required("Nhập lại mật khẩu không được trống.")
                .max(50, "Nhập lại mật khẩu không được quá 50 ký tự")
                .when("password", (password, field) => password ? field.required().oneOf([yup.ref('password')], "Không đúng mật khẩu") : field),

            address: yup.string().required("Nhập lại địa chỉ không được trống.")
                .max(200, "Nhập lại địa chỉ không được quá 200 ký tự"),

            phone: yup.string().required("Nhập lại địa chỉ không được trống."),
        });

        return {
            contact: [],
            contactLogin: [],
            contacts: [],
            localContact: [],
            LogStatus: false,
            LogInSchema,
            SignInSchema,
        }
    },

    methods: {
        // Tìm so sánh username và password với CSDL có thì trả về thông tin tài khoản đó
        async submitContact() {
            try {
                //Thiếu onSubmit là hiển thị Error message
                this.contact = await ContactsService.login(this.contactLogin.username, this.contactLogin.password);
                alert("Login complete");
                $('.btn_dismiss').click();
                this.LogStatus = true;
                localStorage.setItem("user", JSON.stringify(this.contact));
                // console.log(JSON.parse(localStorage.getItem("user", this.contact)));
                this.localContact = (JSON.parse(localStorage.getItem("user")));
                
            } catch (error) {
                console.error();
            }
        },

        // Đăng xuất
        logOut(){
            this.LogStatus = false;
            localStorage.removeItem("user");
            this.localContact = [];
        },

        // Lấy danh sách các tài khoản
        async retrieveContacts() {
            try {
                this.contacts = await ContactsService.getAll();
                // console.log(this.contacts);
            } catch (error) {
                console.error();
            }
        },
    },

    // Tự cập nhật danh sách tài khoản khi load trang
    mounted() {
        this.retrieveContacts();
    },
}
</script>

<style scoped>
#display-user {
    display: inline-block;
    position: relative;
    top: 8px;
    left: 8px;
    line-height: 20px;
    font-size: 20px;
    color: white;
}
</style>