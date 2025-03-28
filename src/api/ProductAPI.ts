import { isAxiosError } from "axios";
import api from "../lib/axios";
import { List, Product, ProductFormData, productSchema } from "../types";

type ProductAPI = {
  formData: ProductFormData;
  listId: List["id"];
  productId: Product["id"];
};

export async function createProduct({
  formData,
  listId,
}: Pick<ProductAPI, "formData" | "listId">) {
  try {
    const url = `/lists/${listId}/products`;
    const { data } = await api.post(url, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function getProductById({
  listId,
  productId,
}: Pick<ProductAPI, "listId" | "productId">) {
  try {
    const url = `/lists/${listId}/products/${productId}`;
    const { data } = await api(url);

    const response = productSchema.safeParse(data);
    if (response.success) {
      return response.data;
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function updateProduct({
  listId,
  productId,
  formData,
}: Pick<ProductAPI, "listId" | "productId" | "formData">) {
  try {
    const url = `/lists/${listId}/products/${productId}`;
    const { data } = await api.put(url, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function deleteProduct({
  listId,
  productId,
}: Pick<ProductAPI, "listId" | "productId">) {
  try {
    const url = `/lists/${listId}/products/${productId}`;
    const { data } = await api.delete(url);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function updateIsBuyProduct({
  listId,
  productId,
}: Pick<ProductAPI, "listId" | "productId">) {
  try {
    const url = `/lists/${listId}/products/${productId}/isbuy`;
    const { data } = await api.patch(url);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}
