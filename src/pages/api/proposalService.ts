
// api/tokenService.ts
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const proposalService = {
  async mintTokens(amount: number) {
    try {
      const response = await axios.post(`${API_URL}/contract-address`, { amount });
      return response.data;
    } catch (error) {
      console.error("Error minting tokens:", error);
      throw error;
    }

  },
  async getTokens(amount: number) {
    try {
      const response = await axios.post(`${API_URL}/request-tokens`, { amount });
      return response.data;
    } catch (error) {
      console.error("Error minting tokens:", error);
      throw error;
    }

  },

  async getTotalSupply() {
    try {
      const response = await axios.get(`${API_URL}/total-supply`);
      return response.data;
    } catch (error) {
      console.error("Error fetching token supply:", error);
      throw error;
    }
  },

  // Add more methods as needed for other token-related operations
};
