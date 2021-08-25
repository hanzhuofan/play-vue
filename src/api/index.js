import {get, post} from "@/api/http";

export const getUrl = (url) => get(url);
export const postUrl = (url) => post(url);