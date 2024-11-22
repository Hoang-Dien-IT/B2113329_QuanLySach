<template>
  <div>
    <AppHeader />
    <div class="infor-page">
      <div class="infor-container">
        <div class="infor-title">Thông tin cá nhân</div>

        <div class="infor-item">
          <label for="fullName" class="infor-label">Họ tên:</label>
          <input v-model="formData.fullName" type="text" id="fullName" class="infor-input" />
        </div>

        <div class="infor-item">
          <label for="email" class="infor-label">Email:</label>
          <input v-model="formData.email" type="text" id="email" class="infor-input" />
        </div>

        <div class="infor-item">
          <label for="address" class="infor-label">Địa chỉ:</label>
          <input v-model="formData.address" type="text" id="address" class="infor-input" />
        </div>

        <div class="infor-item">
          <label for="phone" class="infor-label">Số điện thoại:</label>
          <input v-model="formData.phone" type="text" id="phone" class="infor-input" />
        </div>
      </div>
    </div>
    <AppFooter />
  </div>
</template>

<script>
import "vue3-toastify/dist/index.css";
import AppHeader from "@/components/admin/AppHeader.vue";
import EmployeeService from "@/services/admin/employee.service";
import AppFooter from "@/components/admin/AppFooter.vue";

export default {
  components: {
    AppHeader,
    AppFooter,
  },
  data() {
    return {
      formData: {
        fullName: "",
        email: "",
        address: "",
        phone: "",
      },
    };
  },
  methods: {
    async getInfor() {
      try {
        const employeeResponse = await EmployeeService.getInfor();
        const employee = employeeResponse.employee;
        if (employee) {
          this.formData.fullName = employee.fullName;
          this.formData.email = employee.email;
          this.formData.address = employee.address;
          this.formData.phone = employee.phone;
        } else {
          console.log("Employee not found");
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    this.getInfor();
  },
};
</script>

<style scoped>
.infor-page {
  margin-top: 30px;
}

.infor-container {
  width: 100%;
  max-width: 600px;
  text-align: center;
  padding: 30px;
  background-color: #f9f9f9;
  border: 1px solid #e1e1e1;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  margin-left: auto;
  margin-right: auto;
}

.infor-title {
  font-size: 32px;
  margin-bottom: 25px;
  font-weight: bold;
  color: #333;
}

.infor-item {
  margin: 15px 0;
  text-align: left;
}

.infor-label {
  font-weight: bold;
  color: #333;
  margin-bottom: 8px;
  display: block;
}

.infor-input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  background-color: #f7f7f7;
  box-sizing: border-box;
  font-size: 16px;
  color: #333;
  margin-top: 5px;
  transition: border-color 0.3s ease-in-out;
}

.infor-input:focus {
  border-color: #007bff;
  outline: none;
  background-color: #fff;
}

.infor-item:nth-child(even) {
  margin-bottom: 20px;
}

@media (max-width: 768px) {
  .infor-container {
    width: 90%;
    padding: 20px;
  }

  .infor-title {
    font-size: 28px;
  }
}
</style>
