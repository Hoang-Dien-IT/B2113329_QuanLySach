import createApiClient from "./api.reader"

class ReaderService {
    constructor(baseUrl = "/api/reader") {
        this.apiClient = createApiClient(baseUrl)
    }

    async create(userData) {
        try {
            const response = await this.apiClient.post('/register', userData);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async retrieveReader(formData) {
        try {
            const { reader } = (await this.apiClient.get(`/user`, { headers: { Authorization: `Bearer ${formData.get("tokenUser")}` } })).data;
            return reader;
        } catch (error) {
            throw error;
        }
    }

    async addBook(data) {
        try {
            const response = await this.apiClient.post(`/addbook`, data);
            return response;
        } catch (error) {
            throw error;
        }
    }

    async getNumberBookBorrowed(id_book){
        try {
            const response = await this.apiClient.get(`/numberbookborrowed/${id_book}`);
            console.log(response.data.borrowedBookQuantity)
            return response.data.borrowedBookQuantity;
        } catch (error) {
            throw error;
        }
    }

    async deleteBook(id) {
        try {
            const response = await this.apiClient.delete(`/deletebook/${id}`);
            return response;
        } catch (error) {
            throw error;
        }
    }

    async getInfor() {
        return (await this.apiClient.get("/infor")).data;
    }
}

export default new ReaderService();
