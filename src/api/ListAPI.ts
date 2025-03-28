import { isAxiosError } from "axios";
import api from "../lib/axios";
import { List, ListFormData, listSchema, listsSchema } from "../types";

export async function createList(formData: ListFormData) {
  try {
    const { data } = await api.post("/lists", formData);
    return data;
  } catch (error) {
    console.error(error);
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function getList() {
  try {
    const { data } = await api("/lists");
    const response = listsSchema.safeParse(data);
    if (response.success) {
      return response.data;
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function getListById(listId: List["id"]) {
  try {
    const { data } = await api(`/lists/${listId}`);
    const response = listSchema.safeParse(data);
    if (response.success) {
      return response.data;
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

type ListAPIType = {
  formData: ListFormData;
  listId: List["id"];
};

export async function updateList({ formData, listId }: ListAPIType) {
  try {
    const { data } = await api.put(`/lists/${listId}`, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function deleteList(listId: List["id"]) {
  try {
    const { data } = await api.delete(`/lists/${listId}`);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}
