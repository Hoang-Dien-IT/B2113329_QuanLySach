<template>
  <div>
    <ClientAppHeader />

    <div class="infor-page">
      <div class="infor-container">
        <div class="infor-title">Thông tin cá nhân</div>

        <div class="infor-item">
          <label for="fullName" class="infor-label">Họ tên:</label><br />
          <input
            v-model="formData.fullName"
            type="text"
            id="fullName"
            class="infor-input"
          />
        </div>

        <div class="infor-item">
          <label for="email" class="infor-label">Email:</label><br />
          <input
            v-model="formData.email"
            type="text"
            id="email"
            class="infor-input"
          />
        </div>

        <div class="infor-item">
          <label for="address" class="infor-label">Địa chỉ:</label><br />
          <input
            v-model="formData.address"
            type="text"
            id="address"
            class="infor-input"
          />
        </div>

        <div class="infor-item">
          <label for="phone" class="infor-label">Số điện thoại:</label><br />
          <input
            v-model="formData.phone"
            type="text"
            id="phone"
            class="infor-input"
          />
        </div>
      </div>
    </div>
    <ClientAppFooter/>
  </div>
</template>
    
    <script>
import "vue3-toastify/dist/index.css";
import ClientAppHeader from "@/components/client/ClientAppHeader.vue";
import ClientAppFooter from "@/components/client/ClientAppFooter.vue";
import ReaderService from "@/services/client/reader.service";

export default {
  components: {
    ClientAppHeader,
    ClientAppFooter,
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
      // Xử lý đăng xuất ở đây
      try {
        const readerResponse = await ReaderService.getInfor();
        const reader = readerResponse.reader;
        if (reader) {
          this.formData.fullName = reader.fullName;
          this.formData.email = reader.email;
          this.formData.address = reader.address;
          this.formData.phone = reader.phone;
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
  margin-top: 50px;
  /* Tăng khoảng cách từ trên */
  display: flex;
  justify-content: center;
  padding: 0 20px;
  /* Thêm khoảng cách bên trái và phải */
}

.infor-container {
  width: 100%;
  max-width: 550px;
  text-align: left;
  /* Căn chỉnh văn bản bên trái */
  padding: 35px;
  /* Tăng thêm không gian xung quanh */
  background-color: #ffffff;
  /* Nền trắng sạch sẽ */
  border: 1px solid #e0e0e0;
  /* Viền nhẹ nhàng */
  border-radius: 10px;
  /* Góc bo tròn mượt mà */
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  /* Tạo hiệu ứng bóng đổ đẹp mắt */
  margin: 0 auto;
  /* Căn giữa */
  transition: all 0.3s ease;
  /* Thêm hiệu ứng chuyển đổi khi hover */
}

.infor-container:hover {
  transform: translateY(-5px);
  /* Di chuyển nhẹ khi hover */
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  /* Bóng mạnh hơn khi hover */
}

.infor-title {
  font-size: 36px;
  /* Lớn hơn để dễ đọc */
  font-weight: bold;
  color: #333;
  /* Màu tối dễ đọc */
  margin-bottom: 25px;
  text-align: center;
  /* Căn giữa tiêu đề */
  letter-spacing: 1px;
  /* Tăng khoảng cách giữa các ký tự */
}

.infor-item {
  margin: 15px 0;
  /* Thêm khoảng cách giữa các phần tử */
  display: flex;
  flex-direction: column;
  /* Căn chỉnh nhãn và ô input theo chiều dọc */
}

.infor-label {
  font-weight: 600;
  font-size: 16px;
  /* Cỡ chữ vừa phải */
  margin-bottom: 10px;
  color: #666;
  /* Màu nhãn dịu nhẹ */
}

.infor-input {
  width: 100%;
  padding: 14px;
  /* Padding rộng hơn để dễ sử dụng */
  border: 1px solid #ccc;
  /* Viền nhạt, nhẹ nhàng */
  border-radius: 8px;
  /* Góc bo tròn mượt mà */
  background-color: #f9f9f9;
  /* Màu nền sáng nhẹ cho ô input */
  font-size: 16px;
  /* Cỡ chữ vừa phải */
  color: #333;
  box-sizing: border-box;
  /* Đảm bảo tính toán đúng kích thước của input */
  transition: all 0.3s ease;
  /* Thêm hiệu ứng khi focus vào input */
}

.infor-input:focus {
  border-color: #4e8cff;
  /* Màu viền khi focus */
  outline: none;
  /* Bỏ outline mặc định */
  box-shadow: 0 0 8px rgba(0, 122, 255, 0.2);
  /* Thêm bóng mờ khi focus */
  background-color: #fff;
  /* Màu nền sáng khi focus */
}

.infor-input::placeholder {
  color: #aaa;
  /* Màu nhạt cho placeholder */
}

.infor-item:last-child {
  margin-bottom: 0;
  /* Loại bỏ khoảng cách dưới cho phần cuối */
}

@media (max-width: 600px) {
  .infor-container {
    padding: 20px;
    /* Giảm padding cho màn hình nhỏ */
  }

  .infor-title {
    font-size: 30px;
    /* Giảm cỡ chữ cho tiêu đề */
  }
}
</style>
