import { createStore } from "easy-peasy";
import Api from "@/services/api/index";
import models from "./models";

export const ApiService = Api.createApiClient();

export default function initStore () {
  return createStore(models, {
    name: "realgroundstore",
    injections: { api: ApiService },
    devTools: true,
    enhancers: [],
  });
}