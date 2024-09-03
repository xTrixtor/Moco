import { useUserStore } from "~/stores/userStore";

export class BaseAPIClient {
  getBaseUrl(defaultURL?: string, urlOverride?: string): string {
    return "https://localhost:53084";
  }
  transformOptions(opt: any): Promise<any> {
    const userStore = useUserStore();

    if (userStore.isAuthenticated) {
      opt.headers.Authorization = "Bearer " + userStore.getAuthToken;
    }
    return Promise.resolve(opt);
  }

  async transformResult(
    url: string,
    resp: Response,
    castFunction: (resp: Response) => Promise<any>,
  ): Promise<any> {
    if (resp.status === 401) {
      //logout
    }
    return await castFunction(resp);
  }
}
