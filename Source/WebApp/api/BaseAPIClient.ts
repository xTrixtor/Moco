import { useUserStore } from "~/stores/userStore";

export class BaseAPIClient {
  getBaseUrl(defaultURL?: string, urlOverride?: string): string {
    return "https://finanzhorus-api.boehnern.de";
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
    castFunction: (resp: Response) => Promise<any>
  ): Promise<any> {
    if (resp.status === 401) {
      useUserStore().logout();
    }
    return await castFunction(resp);
  }
}
