// Handles services for minting tokens, checking token balance

// api/tokenService.ts
import axios from "axios";
import { ethers } from "ethers";
import * as yamatoJson from "../../assets/Yamato.json";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const YAMATO_TOKEN_CONTRACT_ADDRESS = process.env.NEXT_YAMATO_CONTRACT_ADDRESS;

export const tokenService = {
  // to mint tokens we need to pass the provider into this function
  // we need to call the smart contracft to mint tokens
  async mintTokens(amount: number) {
    try {
      const response = await axios.post(`${API_URL}/mint-tokens`, { amount });
      return response.data;
    } catch (error) {
      console.error("Error minting tokens:", error);
      throw error;
    }
  },
  async delegateVotes(amount: number) {
    try {
      const response = await axios.post(`${API_URL}/delegate-vote`, { amount });
      return response.data;
    } catch (error) {
      console.error("Error minting tokens:", error);
      throw error;
    }
  },

  async getUserTokenBalance(amount: number) {
    try {
      const response = await axios.post(`${API_URL}/request-tokens`, {
        amount,
      });
      return response.data;
    } catch (error) {
      console.error("Error minting tokens:", error);
      throw error;
    }
  },

  async getUserETHBalance(amount: number) {
    try {
      const response = await axios.post(`${API_URL}/request-tokens`, {
        amount,
      });
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
