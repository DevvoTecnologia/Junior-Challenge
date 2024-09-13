import { action } from 'mobx';
import { axiosInstance } from '../../provider';
import { authHeader } from '../../helpers/service';

export class General {
  @action
  authUser = async (body: any) => {
    try {
      const requestOptions = {
        headers: {
          "Access-Control-Allow-Origin": "*",
          'Content-Type': 'application/json'
        }
      };

      const response = await axiosInstance.post("/login", body, requestOptions);

      localStorage.setItem("userChallenge", JSON.stringify(response.data));

      return { data: response.data, status: response.status };
    } catch (error: any) {
      return { status: error.response.status, message: error.response.data.message };
    };
  };

  @action
  registerAccount = async (body: any) => {
    const requestOptions = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        'Content-Type': 'application/json'
      }
    };

    try {
      const response = await axiosInstance.post("/register", body, requestOptions);

      return { data: response.data, status: response.status };
    } catch (error: any) {
      return { status: error.response.status, message: error.response.data.message };
    };
  };

  @action
  getAllRings = async () => {
    const token = authHeader();
    const requestOptions = {
      headers: {
        'Content-Type': 'application/json',
        ...token
      }
    };

    try {
      const response = await axiosInstance.get("/ring", requestOptions);

      return { data: response.data, status: response.status };
    } catch (error: any) {
      return { status: error.response.status, message: error.response.data.message };
    };
  };

  @action
  getRingById = async (id: any) => {
    const token = authHeader();
    const requestOptions = {
      headers: {
        'Content-Type': 'application/json',
        ...token
      }
    };

    try {
      const response = await axiosInstance.get(`/ring/${id}`, requestOptions);

      return { data: response.data, status: response.status };
    } catch (error: any) {
      return { status: error.response.status, message: error.response.data.message };
    };
  };

  @action
  createRing = async (body: any) => {
    const token = authHeader();
    const requestOptions = {
      headers: {
        'Content-Type': 'application/json',
        ...token
      }
    };

    try {
      const response = await axiosInstance.post("/ring", body, requestOptions);

      return { data: response.data, status: response.status };
    } catch (error: any) {
      return { status: error.response.status, message: error.response.data.message };
    };
  };

  @action
  updateRing = async (id: any, body: any) => {
    const token = authHeader();
    const requestOptions = {
      headers: {
        'Content-Type': 'application/json',
        ...token
      }
    };

    try {
      const response = await axiosInstance.put(`/ring/${id}`, body, requestOptions);

      return { data: response.data, status: response.status };
    } catch (error: any) {
      return { status: error.response.status, message: error.response.data.message };
    };
  };

  @action
  deleteRing = async (id: any) => {
    const token = authHeader();
    const requestOptions = {
      headers: {
        'Content-Type': 'application/json',
        ...token
      }
    };
    try {
      const response = await axiosInstance.delete(`/ring/${id}`, requestOptions);

      return { data: response.data, status: response.status };
    } catch (error: any) {
      return { status: error.response.status, message: error.response.data.message };
    };
  };

  @action
  logout = () => {
    localStorage.clear();
    window.location.reload();
  };
};