import { getToken } from "../Helper/getToken";
import { AddEditBlogDataInterface } from "../Utils/blogInterface";
import {
  ADD_BLOG_API,
  DELETE_BLOG_API,
  EDIT_BLOG_API,
  LIST_OF_BLOG_API,
  VIEW_BLOG_API,
} from "./APIs";
import { baseURL } from "./baseUrl";

export async function addBlogAPI(data: AddEditBlogDataInterface) {
  return await baseURL.post(ADD_BLOG_API, data, {
    headers: {
      Authorization: `Bearer ${getToken("loginToken")}`,
    },
  });
}

export async function listOfBlogAPI() {
  return await baseURL.get(LIST_OF_BLOG_API, {
    headers: {
      Authorization: `Bearer ${getToken("loginToken")}`,
    },
  });
}

export async function viewBlogAPI(id: string | null) {
  return await baseURL.get(`${VIEW_BLOG_API}/${id}`, {
    headers: {
      Authorization: `Bearer ${getToken("loginToken")}`,
    },
  });
}

export async function editBlogAPI(
  id: string | null,
  data: AddEditBlogDataInterface
) {
  return await baseURL.put(`${EDIT_BLOG_API}/${id}`, data, {
    headers: {
      Authorization: `Bearer ${getToken("loginToken")}`,
    },
  });
}

export async function deleteBlogAPI(id: number) {
  return await baseURL.delete(`${DELETE_BLOG_API}/${id}`, {
    headers: {
      Authorization: `Bearer ${getToken("loginToken")}`,
    },
  });
}
