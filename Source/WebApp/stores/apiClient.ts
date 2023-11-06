import { BaseAPIClient } from "~/api/BaseAPIClient";


export interface IUserClient {

  /**
   * Create Keycloak User
   * @return Returns true
   */
  createUserEndpoint(createUserRequest: CreateUserRequest): Promise<CreateUserResponse>;
}

export class UserClient extends BaseAPIClient implements IUserClient {
  private http: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> };
  private baseUrl: string;
  protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

  constructor(baseUrl?: string, http?: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> }) {
      super();
      this.http = http ? http : window as any;
      this.baseUrl = this.getBaseUrl("https://localhost:53084", baseUrl);
  }

  /**
   * Create Keycloak User
   * @return Returns true
   */
  createUserEndpoint(createUserRequest: CreateUserRequest): Promise<CreateUserResponse> {
      let url_ = this.baseUrl + "/api/user";
      url_ = url_.replace(/[?&]$/, "");

      const content_ = JSON.stringify(createUserRequest);

      let options_: RequestInit = {
          body: content_,
          method: "POST",
          headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
          }
      };

      return this.transformOptions(options_).then(transformedOptions_ => {
          return this.http.fetch(url_, transformedOptions_);
      }).then((_response: Response) => {
          return this.transformResult(url_, _response, (_response: Response) => this.processCreateUserEndpoint(_response));
      });
  }

  protected processCreateUserEndpoint(response: Response): Promise<CreateUserResponse> {
      const status = response.status;
      let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
      if (status === 200) {
          return response.text().then((_responseText) => {
          let result200: any = null;
          let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
          result200 = CreateUserResponse.fromJS(resultData200);
          return result200;
          });
      } else if (status !== 200 && status !== 204) {
          return response.text().then((_responseText) => {
          return throwException("An unexpected server error occurred.", status, _responseText, _headers);
          });
      }
      return Promise.resolve<CreateUserResponse>(null as any);
  }
}

export interface ILoginClient {

  /**
   * Login into Keycloak
   * @return Returns JWT token
   */
  loginUserEndpoint(loginRequest: LoginRequest): Promise<LoginResponse>;
}

export class LoginClient extends BaseAPIClient implements ILoginClient {
  private http: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> };
  private baseUrl: string;
  protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

  constructor(baseUrl?: string, http?: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> }) {
      super();
      this.http = http ? http : window as any;
      this.baseUrl = this.getBaseUrl("https://localhost:53084", baseUrl);
  }

  /**
   * Login into Keycloak
   * @return Returns JWT token
   */
  loginUserEndpoint(loginRequest: LoginRequest): Promise<LoginResponse> {
      let url_ = this.baseUrl + "/api/login";
      url_ = url_.replace(/[?&]$/, "");

      const content_ = JSON.stringify(loginRequest);

      let options_: RequestInit = {
          body: content_,
          method: "POST",
          headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
          }
      };

      return this.transformOptions(options_).then(transformedOptions_ => {
          return this.http.fetch(url_, transformedOptions_);
      }).then((_response: Response) => {
          return this.transformResult(url_, _response, (_response: Response) => this.processLoginUserEndpoint(_response));
      });
  }

  protected processLoginUserEndpoint(response: Response): Promise<LoginResponse> {
      const status = response.status;
      let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
      if (status === 200) {
          return response.text().then((_responseText) => {
          let result200: any = null;
          let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
          result200 = LoginResponse.fromJS(resultData200);
          return result200;
          });
      } else if (status === 400) {
          return response.text().then((_responseText) => {
          let result400: any = null;
          let resultData400 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
          result400 = ErrorResponse.fromJS(resultData400);
          return throwException("Bad Request", status, _responseText, _headers, result400);
          });
      } else if (status !== 200 && status !== 204) {
          return response.text().then((_responseText) => {
          return throwException("An unexpected server error occurred.", status, _responseText, _headers);
          });
      }
      return Promise.resolve<LoginResponse>(null as any);
  }
}

export interface IRefreshClient {

  /**
   * Refresh Auth Token with refreshToken
   * @return Returns JWT token
   */
  refreshAuthTokenEndpoint(refreshAuthTokenRequest: RefreshAuthTokenRequest): Promise<RefreshAuthTokenResponse>;
}

export class RefreshClient extends BaseAPIClient implements IRefreshClient {
  private http: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> };
  private baseUrl: string;
  protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

  constructor(baseUrl?: string, http?: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> }) {
      super();
      this.http = http ? http : window as any;
      this.baseUrl = this.getBaseUrl("https://localhost:53084", baseUrl);
  }

  /**
   * Refresh Auth Token with refreshToken
   * @return Returns JWT token
   */
  refreshAuthTokenEndpoint(refreshAuthTokenRequest: RefreshAuthTokenRequest): Promise<RefreshAuthTokenResponse> {
      let url_ = this.baseUrl + "/api/refresh";
      url_ = url_.replace(/[?&]$/, "");

      const content_ = JSON.stringify(refreshAuthTokenRequest);

      let options_: RequestInit = {
          body: content_,
          method: "POST",
          headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
          }
      };

      return this.transformOptions(options_).then(transformedOptions_ => {
          return this.http.fetch(url_, transformedOptions_);
      }).then((_response: Response) => {
          return this.transformResult(url_, _response, (_response: Response) => this.processRefreshAuthTokenEndpoint(_response));
      });
  }

  protected processRefreshAuthTokenEndpoint(response: Response): Promise<RefreshAuthTokenResponse> {
      const status = response.status;
      let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
      if (status === 200) {
          return response.text().then((_responseText) => {
          let result200: any = null;
          let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
          result200 = RefreshAuthTokenResponse.fromJS(resultData200);
          return result200;
          });
      } else if (status !== 200 && status !== 204) {
          return response.text().then((_responseText) => {
          return throwException("An unexpected server error occurred.", status, _responseText, _headers);
          });
      }
      return Promise.resolve<RefreshAuthTokenResponse>(null as any);
  }
}

export interface IRevenueClient {

  /**
   * @return Success
   */
  createRevenueEndpoint(createRevenueRequest: CreateRevenueRequest): Promise<CreateRevenueResponse>;

  /**
   * @return Success
   */
  getRevenuesEndpoint(): Promise<GetRevenuesResponse>;

  /**
   * @return Success
   */
  updateRevenueEndpoint(updateRevenueRequest: UpdateRevenueRequest): Promise<UpdateRevenueResponse>;
}

export class RevenueClient extends BaseAPIClient implements IRevenueClient {
  private http: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> };
  private baseUrl: string;
  protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

  constructor(baseUrl?: string, http?: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> }) {
      super();
      this.http = http ? http : window as any;
      this.baseUrl = this.getBaseUrl("https://localhost:53084", baseUrl);
  }

  /**
   * @return Success
   */
  createRevenueEndpoint(createRevenueRequest: CreateRevenueRequest): Promise<CreateRevenueResponse> {
      let url_ = this.baseUrl + "/api/revenue";
      url_ = url_.replace(/[?&]$/, "");

      const content_ = JSON.stringify(createRevenueRequest);

      let options_: RequestInit = {
          body: content_,
          method: "POST",
          headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
          }
      };

      return this.transformOptions(options_).then(transformedOptions_ => {
          return this.http.fetch(url_, transformedOptions_);
      }).then((_response: Response) => {
          return this.transformResult(url_, _response, (_response: Response) => this.processCreateRevenueEndpoint(_response));
      });
  }

  protected processCreateRevenueEndpoint(response: Response): Promise<CreateRevenueResponse> {
      const status = response.status;
      let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
      if (status === 200) {
          return response.text().then((_responseText) => {
          let result200: any = null;
          let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
          result200 = CreateRevenueResponse.fromJS(resultData200);
          return result200;
          });
      } else if (status === 401) {
          return response.text().then((_responseText) => {
          return throwException("Unauthorized", status, _responseText, _headers);
          });
      } else if (status !== 200 && status !== 204) {
          return response.text().then((_responseText) => {
          return throwException("An unexpected server error occurred.", status, _responseText, _headers);
          });
      }
      return Promise.resolve<CreateRevenueResponse>(null as any);
  }

  /**
   * @return Success
   */
  getRevenuesEndpoint(): Promise<GetRevenuesResponse> {
      let url_ = this.baseUrl + "/api/revenue";
      url_ = url_.replace(/[?&]$/, "");

      let options_: RequestInit = {
          method: "GET",
          headers: {
              "Accept": "application/json"
          }
      };

      return this.transformOptions(options_).then(transformedOptions_ => {
          return this.http.fetch(url_, transformedOptions_);
      }).then((_response: Response) => {
          return this.transformResult(url_, _response, (_response: Response) => this.processGetRevenuesEndpoint(_response));
      });
  }

  protected processGetRevenuesEndpoint(response: Response): Promise<GetRevenuesResponse> {
      const status = response.status;
      let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
      if (status === 200) {
          return response.text().then((_responseText) => {
          let result200: any = null;
          let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
          result200 = GetRevenuesResponse.fromJS(resultData200);
          return result200;
          });
      } else if (status !== 200 && status !== 204) {
          return response.text().then((_responseText) => {
          return throwException("An unexpected server error occurred.", status, _responseText, _headers);
          });
      }
      return Promise.resolve<GetRevenuesResponse>(null as any);
  }

  /**
   * @return Success
   */
  updateRevenueEndpoint(updateRevenueRequest: UpdateRevenueRequest): Promise<UpdateRevenueResponse> {
      let url_ = this.baseUrl + "/api/revenue";
      url_ = url_.replace(/[?&]$/, "");

      const content_ = JSON.stringify(updateRevenueRequest);

      let options_: RequestInit = {
          body: content_,
          method: "PUT",
          headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
          }
      };

      return this.transformOptions(options_).then(transformedOptions_ => {
          return this.http.fetch(url_, transformedOptions_);
      }).then((_response: Response) => {
          return this.transformResult(url_, _response, (_response: Response) => this.processUpdateRevenueEndpoint(_response));
      });
  }

  protected processUpdateRevenueEndpoint(response: Response): Promise<UpdateRevenueResponse> {
      const status = response.status;
      let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
      if (status === 200) {
          return response.text().then((_responseText) => {
          let result200: any = null;
          let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
          result200 = UpdateRevenueResponse.fromJS(resultData200);
          return result200;
          });
      } else if (status === 401) {
          return response.text().then((_responseText) => {
          return throwException("Unauthorized", status, _responseText, _headers);
          });
      } else if (status !== 200 && status !== 204) {
          return response.text().then((_responseText) => {
          return throwException("An unexpected server error occurred.", status, _responseText, _headers);
          });
      }
      return Promise.resolve<UpdateRevenueResponse>(null as any);
  }
}

export interface IChargeClient {

  /**
   * Create Charge for User
   * @return Returns true
   */
  createChargeEndpoint(createChargeRequest: CreateChargeRequest): Promise<CreateChargeRespone>;

  /**
   * @return Success
   */
  getChargesEndpoint(): Promise<GetChargesResponse>;

  /**
   * Updates Charge Data
   * @return Returns true
   */
  updateChargeEndpoint(updateChargeRequest: UpdateChargeRequest): Promise<UpdateChargeResponse>;
}

export class ChargeClient extends BaseAPIClient implements IChargeClient {
  private http: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> };
  private baseUrl: string;
  protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

  constructor(baseUrl?: string, http?: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> }) {
      super();
      this.http = http ? http : window as any;
      this.baseUrl = this.getBaseUrl("https://localhost:53084", baseUrl);
  }

  /**
   * Create Charge for User
   * @return Returns true
   */
  createChargeEndpoint(createChargeRequest: CreateChargeRequest): Promise<CreateChargeRespone> {
      let url_ = this.baseUrl + "/api/charge";
      url_ = url_.replace(/[?&]$/, "");

      const content_ = JSON.stringify(createChargeRequest);

      let options_: RequestInit = {
          body: content_,
          method: "POST",
          headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
          }
      };

      return this.transformOptions(options_).then(transformedOptions_ => {
          return this.http.fetch(url_, transformedOptions_);
      }).then((_response: Response) => {
          return this.transformResult(url_, _response, (_response: Response) => this.processCreateChargeEndpoint(_response));
      });
  }

  protected processCreateChargeEndpoint(response: Response): Promise<CreateChargeRespone> {
      const status = response.status;
      let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
      if (status === 200) {
          return response.text().then((_responseText) => {
          let result200: any = null;
          let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
          result200 = CreateChargeRespone.fromJS(resultData200);
          return result200;
          });
      } else if (status === 401) {
          return response.text().then((_responseText) => {
          return throwException("Unauthorized", status, _responseText, _headers);
          });
      } else if (status !== 200 && status !== 204) {
          return response.text().then((_responseText) => {
          return throwException("An unexpected server error occurred.", status, _responseText, _headers);
          });
      }
      return Promise.resolve<CreateChargeRespone>(null as any);
  }

  /**
   * @return Success
   */
  getChargesEndpoint(): Promise<GetChargesResponse> {
      let url_ = this.baseUrl + "/api/charge";
      url_ = url_.replace(/[?&]$/, "");

      let options_: RequestInit = {
          method: "GET",
          headers: {
              "Accept": "application/json"
          }
      };

      return this.transformOptions(options_).then(transformedOptions_ => {
          return this.http.fetch(url_, transformedOptions_);
      }).then((_response: Response) => {
          return this.transformResult(url_, _response, (_response: Response) => this.processGetChargesEndpoint(_response));
      });
  }

  protected processGetChargesEndpoint(response: Response): Promise<GetChargesResponse> {
      const status = response.status;
      let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
      if (status === 200) {
          return response.text().then((_responseText) => {
          let result200: any = null;
          let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
          result200 = GetChargesResponse.fromJS(resultData200);
          return result200;
          });
      } else if (status === 401) {
          return response.text().then((_responseText) => {
          return throwException("Unauthorized", status, _responseText, _headers);
          });
      } else if (status === 403) {
          return response.text().then((_responseText) => {
          return throwException("Forbidden", status, _responseText, _headers);
          });
      } else if (status !== 200 && status !== 204) {
          return response.text().then((_responseText) => {
          return throwException("An unexpected server error occurred.", status, _responseText, _headers);
          });
      }
      return Promise.resolve<GetChargesResponse>(null as any);
  }

  /**
   * Updates Charge Data
   * @return Returns true
   */
  updateChargeEndpoint(updateChargeRequest: UpdateChargeRequest): Promise<UpdateChargeResponse> {
      let url_ = this.baseUrl + "/api/charge";
      url_ = url_.replace(/[?&]$/, "");

      const content_ = JSON.stringify(updateChargeRequest);

      let options_: RequestInit = {
          body: content_,
          method: "PUT",
          headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
          }
      };

      return this.transformOptions(options_).then(transformedOptions_ => {
          return this.http.fetch(url_, transformedOptions_);
      }).then((_response: Response) => {
          return this.transformResult(url_, _response, (_response: Response) => this.processUpdateChargeEndpoint(_response));
      });
  }

  protected processUpdateChargeEndpoint(response: Response): Promise<UpdateChargeResponse> {
      const status = response.status;
      let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
      if (status === 200) {
          return response.text().then((_responseText) => {
          let result200: any = null;
          let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
          result200 = UpdateChargeResponse.fromJS(resultData200);
          return result200;
          });
      } else if (status === 401) {
          return response.text().then((_responseText) => {
          return throwException("Unauthorized", status, _responseText, _headers);
          });
      } else if (status !== 200 && status !== 204) {
          return response.text().then((_responseText) => {
          return throwException("An unexpected server error occurred.", status, _responseText, _headers);
          });
      }
      return Promise.resolve<UpdateChargeResponse>(null as any);
  }
}

export interface IBudgetClient {

  /**
   * @return Success
   */
  createBudgetEndpoint(cBudgetRequest: CBudgetRequest): Promise<CBudgetResponse>;

  /**
   * @return Success
   */
  getBudgetsEndpoint(userId: string | null): Promise<GetBudgetsResponse>;

  /**
   * Updates Charge Data
   * @return Returns true
   */
  updateButgetEndpoint(updateBudgetRequest: UpdateBudgetRequest): Promise<UpdateBudgetResponse>;
}

export class BudgetClient extends BaseAPIClient implements IBudgetClient {
  private http: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> };
  private baseUrl: string;
  protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

  constructor(baseUrl?: string, http?: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> }) {
      super();
      this.http = http ? http : window as any;
      this.baseUrl = this.getBaseUrl("https://localhost:53084", baseUrl);
  }

  /**
   * @return Success
   */
  createBudgetEndpoint(cBudgetRequest: CBudgetRequest): Promise<CBudgetResponse> {
      let url_ = this.baseUrl + "/api/budget";
      url_ = url_.replace(/[?&]$/, "");

      const content_ = JSON.stringify(cBudgetRequest);

      let options_: RequestInit = {
          body: content_,
          method: "POST",
          headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
          }
      };

      return this.transformOptions(options_).then(transformedOptions_ => {
          return this.http.fetch(url_, transformedOptions_);
      }).then((_response: Response) => {
          return this.transformResult(url_, _response, (_response: Response) => this.processCreateBudgetEndpoint(_response));
      });
  }

  protected processCreateBudgetEndpoint(response: Response): Promise<CBudgetResponse> {
      const status = response.status;
      let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
      if (status === 200) {
          return response.text().then((_responseText) => {
          let result200: any = null;
          let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
          result200 = CBudgetResponse.fromJS(resultData200);
          return result200;
          });
      } else if (status === 401) {
          return response.text().then((_responseText) => {
          return throwException("Unauthorized", status, _responseText, _headers);
          });
      } else if (status !== 200 && status !== 204) {
          return response.text().then((_responseText) => {
          return throwException("An unexpected server error occurred.", status, _responseText, _headers);
          });
      }
      return Promise.resolve<CBudgetResponse>(null as any);
  }

  /**
   * @return Success
   */
  getBudgetsEndpoint(userId: string | null): Promise<GetBudgetsResponse> {
      let url_ = this.baseUrl + "/api/budget";
      url_ = url_.replace(/[?&]$/, "");

      let options_: RequestInit = {
          method: "GET",
          headers: {
              "UserId": userId !== undefined && userId !== null ? "" + userId : "",
              "Accept": "application/json"
          }
      };

      return this.transformOptions(options_).then(transformedOptions_ => {
          return this.http.fetch(url_, transformedOptions_);
      }).then((_response: Response) => {
          return this.transformResult(url_, _response, (_response: Response) => this.processGetBudgetsEndpoint(_response));
      });
  }

  protected processGetBudgetsEndpoint(response: Response): Promise<GetBudgetsResponse> {
      const status = response.status;
      let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
      if (status === 200) {
          return response.text().then((_responseText) => {
          let result200: any = null;
          let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
          result200 = GetBudgetsResponse.fromJS(resultData200);
          return result200;
          });
      } else if (status !== 200 && status !== 204) {
          return response.text().then((_responseText) => {
          return throwException("An unexpected server error occurred.", status, _responseText, _headers);
          });
      }
      return Promise.resolve<GetBudgetsResponse>(null as any);
  }

  /**
   * Updates Charge Data
   * @return Returns true
   */
  updateButgetEndpoint(updateBudgetRequest: UpdateBudgetRequest): Promise<UpdateBudgetResponse> {
      let url_ = this.baseUrl + "/api/budget";
      url_ = url_.replace(/[?&]$/, "");

      const content_ = JSON.stringify(updateBudgetRequest);

      let options_: RequestInit = {
          body: content_,
          method: "PUT",
          headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
          }
      };

      return this.transformOptions(options_).then(transformedOptions_ => {
          return this.http.fetch(url_, transformedOptions_);
      }).then((_response: Response) => {
          return this.transformResult(url_, _response, (_response: Response) => this.processUpdateButgetEndpoint(_response));
      });
  }

  protected processUpdateButgetEndpoint(response: Response): Promise<UpdateBudgetResponse> {
      const status = response.status;
      let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
      if (status === 200) {
          return response.text().then((_responseText) => {
          let result200: any = null;
          let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
          result200 = UpdateBudgetResponse.fromJS(resultData200);
          return result200;
          });
      } else if (status === 401) {
          return response.text().then((_responseText) => {
          return throwException("Unauthorized", status, _responseText, _headers);
          });
      } else if (status !== 200 && status !== 204) {
          return response.text().then((_responseText) => {
          return throwException("An unexpected server error occurred.", status, _responseText, _headers);
          });
      }
      return Promise.resolve<UpdateBudgetResponse>(null as any);
  }
}

export class CreateUserResponse implements ICreateUserResponse {
  keycloakResponse?: KeyCloakSuccessfullLoginResponse;
  personInfo?: PersonDto;

  constructor(data?: ICreateUserResponse) {
      if (data) {
          for (var property in data) {
              if (data.hasOwnProperty(property))
                  (<any>this)[property] = (<any>data)[property];
          }
      }
  }

  init(_data?: any) {
      if (_data) {
          this.keycloakResponse = _data["keycloakResponse"] ? KeyCloakSuccessfullLoginResponse.fromJS(_data["keycloakResponse"]) : <any>undefined;
          this.personInfo = _data["personInfo"] ? PersonDto.fromJS(_data["personInfo"]) : <any>undefined;
      }
  }

  static fromJS(data: any): CreateUserResponse {
      data = typeof data === 'object' ? data : {};
      let result = new CreateUserResponse();
      result.init(data);
      return result;
  }

  toJSON(data?: any) {
      data = typeof data === 'object' ? data : {};
      data["keycloakResponse"] = this.keycloakResponse ? this.keycloakResponse.toJSON() : <any>undefined;
      data["personInfo"] = this.personInfo ? this.personInfo.toJSON() : <any>undefined;
      return data;
  }

  clone(): CreateUserResponse {
      const json = this.toJSON();
      let result = new CreateUserResponse();
      result.init(json);
      return result;
  }
}

export interface ICreateUserResponse {
  keycloakResponse?: KeyCloakSuccessfullLoginResponse;
  personInfo?: PersonDto;
}

export class KeyCloakSuccessfullLoginResponse implements IKeyCloakSuccessfullLoginResponse {
  access_token?: string;
  expires_in?: number;
  refresh_expires_in?: number;
  refresh_token?: string;
  token_type?: string;

  constructor(data?: IKeyCloakSuccessfullLoginResponse) {
      if (data) {
          for (var property in data) {
              if (data.hasOwnProperty(property))
                  (<any>this)[property] = (<any>data)[property];
          }
      }
  }

  init(_data?: any) {
      if (_data) {
          this.access_token = _data["access_token"];
          this.expires_in = _data["expires_in"];
          this.refresh_expires_in = _data["refresh_expires_in"];
          this.refresh_token = _data["refresh_token"];
          this.token_type = _data["token_type"];
      }
  }

  static fromJS(data: any): KeyCloakSuccessfullLoginResponse {
      data = typeof data === 'object' ? data : {};
      let result = new KeyCloakSuccessfullLoginResponse();
      result.init(data);
      return result;
  }

  toJSON(data?: any) {
      data = typeof data === 'object' ? data : {};
      data["access_token"] = this.access_token;
      data["expires_in"] = this.expires_in;
      data["refresh_expires_in"] = this.refresh_expires_in;
      data["refresh_token"] = this.refresh_token;
      data["token_type"] = this.token_type;
      return data;
  }

  clone(): KeyCloakSuccessfullLoginResponse {
      const json = this.toJSON();
      let result = new KeyCloakSuccessfullLoginResponse();
      result.init(json);
      return result;
  }
}

export interface IKeyCloakSuccessfullLoginResponse {
  access_token?: string;
  expires_in?: number;
  refresh_expires_in?: number;
  refresh_token?: string;
  token_type?: string;
}

export class PersonDto implements IPersonDto {
  id?: number;
  keycloakUserId?: string;
  username?: string;
  firstname?: string;
  lastName?: string;
  email?: string;
  createdAt?: Date;

  constructor(data?: IPersonDto) {
      if (data) {
          for (var property in data) {
              if (data.hasOwnProperty(property))
                  (<any>this)[property] = (<any>data)[property];
          }
      }
  }

  init(_data?: any) {
      if (_data) {
          this.id = _data["id"];
          this.keycloakUserId = _data["keycloakUserId"];
          this.username = _data["username"];
          this.firstname = _data["firstname"];
          this.lastName = _data["lastName"];
          this.email = _data["email"];
          this.createdAt = _data["createdAt"] ? new Date(_data["createdAt"].toString()) : <any>undefined;
      }
  }

  static fromJS(data: any): PersonDto {
      data = typeof data === 'object' ? data : {};
      let result = new PersonDto();
      result.init(data);
      return result;
  }

  toJSON(data?: any) {
      data = typeof data === 'object' ? data : {};
      data["id"] = this.id;
      data["keycloakUserId"] = this.keycloakUserId;
      data["username"] = this.username;
      data["firstname"] = this.firstname;
      data["lastName"] = this.lastName;
      data["email"] = this.email;
      data["createdAt"] = this.createdAt ? this.createdAt.toISOString() : <any>undefined;
      return data;
  }

  clone(): PersonDto {
      const json = this.toJSON();
      let result = new PersonDto();
      result.init(json);
      return result;
  }
}

export interface IPersonDto {
  id?: number;
  keycloakUserId?: string;
  username?: string;
  firstname?: string;
  lastName?: string;
  email?: string;
  createdAt?: Date;
}

export class CreateUserRequest implements ICreateUserRequest {
  user?: KeycloakUser;

  constructor(data?: ICreateUserRequest) {
      if (data) {
          for (var property in data) {
              if (data.hasOwnProperty(property))
                  (<any>this)[property] = (<any>data)[property];
          }
      }
  }

  init(_data?: any) {
      if (_data) {
          this.user = _data["user"] ? KeycloakUser.fromJS(_data["user"]) : <any>undefined;
      }
  }

  static fromJS(data: any): CreateUserRequest {
      data = typeof data === 'object' ? data : {};
      let result = new CreateUserRequest();
      result.init(data);
      return result;
  }

  toJSON(data?: any) {
      data = typeof data === 'object' ? data : {};
      data["user"] = this.user ? this.user.toJSON() : <any>undefined;
      return data;
  }

  clone(): CreateUserRequest {
      const json = this.toJSON();
      let result = new CreateUserRequest();
      result.init(json);
      return result;
  }
}

export interface ICreateUserRequest {
  user?: KeycloakUser;
}

export class KeycloakUser implements IKeycloakUser {
  username?: string;
  enabled?: boolean;
  credentials?: Credential[];
  firstName?: string;
  lastName?: string;
  email?: string;

  constructor(data?: IKeycloakUser) {
      if (data) {
          for (var property in data) {
              if (data.hasOwnProperty(property))
                  (<any>this)[property] = (<any>data)[property];
          }
      }
  }

  init(_data?: any) {
      if (_data) {
          this.username = _data["username"];
          this.enabled = _data["enabled"];
          if (Array.isArray(_data["credentials"])) {
              this.credentials = [] as any;
              for (let item of _data["credentials"])
                  this.credentials!.push(Credential.fromJS(item));
          }
          this.firstName = _data["firstName"];
          this.lastName = _data["lastName"];
          this.email = _data["email"];
      }
  }

  static fromJS(data: any): KeycloakUser {
      data = typeof data === 'object' ? data : {};
      let result = new KeycloakUser();
      result.init(data);
      return result;
  }

  toJSON(data?: any) {
      data = typeof data === 'object' ? data : {};
      data["username"] = this.username;
      data["enabled"] = this.enabled;
      if (Array.isArray(this.credentials)) {
          data["credentials"] = [];
          for (let item of this.credentials)
              data["credentials"].push(item.toJSON());
      }
      data["firstName"] = this.firstName;
      data["lastName"] = this.lastName;
      data["email"] = this.email;
      return data;
  }

  clone(): KeycloakUser {
      const json = this.toJSON();
      let result = new KeycloakUser();
      result.init(json);
      return result;
  }
}

export interface IKeycloakUser {
  username?: string;
  enabled?: boolean;
  credentials?: Credential[];
  firstName?: string;
  lastName?: string;
  email?: string;
}

export class Credential implements ICredential {
  type?: string;
  value?: string;
  temporary?: boolean;

  constructor(data?: ICredential) {
      if (data) {
          for (var property in data) {
              if (data.hasOwnProperty(property))
                  (<any>this)[property] = (<any>data)[property];
          }
      }
  }

  init(_data?: any) {
      if (_data) {
          this.type = _data["type"];
          this.value = _data["value"];
          this.temporary = _data["temporary"];
      }
  }

  static fromJS(data: any): Credential {
      data = typeof data === 'object' ? data : {};
      let result = new Credential();
      result.init(data);
      return result;
  }

  toJSON(data?: any) {
      data = typeof data === 'object' ? data : {};
      data["type"] = this.type;
      data["value"] = this.value;
      data["temporary"] = this.temporary;
      return data;
  }

  clone(): Credential {
      const json = this.toJSON();
      let result = new Credential();
      result.init(json);
      return result;
  }
}

export interface ICredential {
  type?: string;
  value?: string;
  temporary?: boolean;
}

export class LoginResponse implements ILoginResponse {
  userId?: string;
  success?: boolean;
  jwtToken?: string;
  refreshToken?: string;
  expireTime?: Date;

  constructor(data?: ILoginResponse) {
      if (data) {
          for (var property in data) {
              if (data.hasOwnProperty(property))
                  (<any>this)[property] = (<any>data)[property];
          }
      }
  }

  init(_data?: any) {
      if (_data) {
          this.userId = _data["userId"];
          this.success = _data["success"];
          this.jwtToken = _data["jwtToken"];
          this.refreshToken = _data["refreshToken"];
          this.expireTime = _data["expireTime"] ? new Date(_data["expireTime"].toString()) : <any>undefined;
      }
  }

  static fromJS(data: any): LoginResponse {
      data = typeof data === 'object' ? data : {};
      let result = new LoginResponse();
      result.init(data);
      return result;
  }

  toJSON(data?: any) {
      data = typeof data === 'object' ? data : {};
      data["userId"] = this.userId;
      data["success"] = this.success;
      data["jwtToken"] = this.jwtToken;
      data["refreshToken"] = this.refreshToken;
      data["expireTime"] = this.expireTime ? this.expireTime.toISOString() : <any>undefined;
      return data;
  }

  clone(): LoginResponse {
      const json = this.toJSON();
      let result = new LoginResponse();
      result.init(json);
      return result;
  }
}

export interface ILoginResponse {
  userId?: string;
  success?: boolean;
  jwtToken?: string;
  refreshToken?: string;
  expireTime?: Date;
}

/** the dto used to send an error response to the client */
export class ErrorResponse implements IErrorResponse {
  /** the http status code sent to the client. default is 400. */
  statusCode?: number;
  /** the message for the error response */
  message?: string;
  /** the collection of errors for the current context */
  errors?: { [key: string]: string[]; };

  constructor(data?: IErrorResponse) {
      if (data) {
          for (var property in data) {
              if (data.hasOwnProperty(property))
                  (<any>this)[property] = (<any>data)[property];
          }
      }
  }

  init(_data?: any) {
      if (_data) {
          this.statusCode = _data["statusCode"];
          this.message = _data["message"];
          if (_data["errors"]) {
              this.errors = {} as any;
              for (let key in _data["errors"]) {
                  if (_data["errors"].hasOwnProperty(key))
                      (<any>this.errors)![key] = _data["errors"][key] !== undefined ? _data["errors"][key] : [];
              }
          }
      }
  }

  static fromJS(data: any): ErrorResponse {
      data = typeof data === 'object' ? data : {};
      let result = new ErrorResponse();
      result.init(data);
      return result;
  }

  toJSON(data?: any) {
      data = typeof data === 'object' ? data : {};
      data["statusCode"] = this.statusCode;
      data["message"] = this.message;
      if (this.errors) {
          data["errors"] = {};
          for (let key in this.errors) {
              if (this.errors.hasOwnProperty(key))
                  (<any>data["errors"])[key] = (<any>this.errors)[key];
          }
      }
      return data;
  }

  clone(): ErrorResponse {
      const json = this.toJSON();
      let result = new ErrorResponse();
      result.init(json);
      return result;
  }
}

/** the dto used to send an error response to the client */
export interface IErrorResponse {
  /** the http status code sent to the client. default is 400. */
  statusCode?: number;
  /** the message for the error response */
  message?: string;
  /** the collection of errors for the current context */
  errors?: { [key: string]: string[]; };
}

export class LoginRequest implements ILoginRequest {
  username!: string;
  password!: string;

  constructor(data?: ILoginRequest) {
      if (data) {
          for (var property in data) {
              if (data.hasOwnProperty(property))
                  (<any>this)[property] = (<any>data)[property];
          }
      }
  }

  init(_data?: any) {
      if (_data) {
          this.username = _data["username"];
          this.password = _data["password"];
      }
  }

  static fromJS(data: any): LoginRequest {
      data = typeof data === 'object' ? data : {};
      let result = new LoginRequest();
      result.init(data);
      return result;
  }

  toJSON(data?: any) {
      data = typeof data === 'object' ? data : {};
      data["username"] = this.username;
      data["password"] = this.password;
      return data;
  }

  clone(): LoginRequest {
      const json = this.toJSON();
      let result = new LoginRequest();
      result.init(json);
      return result;
  }
}

export interface ILoginRequest {
  username: string;
  password: string;
}

export class RefreshAuthTokenResponse implements IRefreshAuthTokenResponse {
  success?: boolean;
  jwtToken?: string;
  refreshToken?: string;

  constructor(data?: IRefreshAuthTokenResponse) {
      if (data) {
          for (var property in data) {
              if (data.hasOwnProperty(property))
                  (<any>this)[property] = (<any>data)[property];
          }
      }
  }

  init(_data?: any) {
      if (_data) {
          this.success = _data["success"];
          this.jwtToken = _data["jwtToken"];
          this.refreshToken = _data["refreshToken"];
      }
  }

  static fromJS(data: any): RefreshAuthTokenResponse {
      data = typeof data === 'object' ? data : {};
      let result = new RefreshAuthTokenResponse();
      result.init(data);
      return result;
  }

  toJSON(data?: any) {
      data = typeof data === 'object' ? data : {};
      data["success"] = this.success;
      data["jwtToken"] = this.jwtToken;
      data["refreshToken"] = this.refreshToken;
      return data;
  }

  clone(): RefreshAuthTokenResponse {
      const json = this.toJSON();
      let result = new RefreshAuthTokenResponse();
      result.init(json);
      return result;
  }
}

export interface IRefreshAuthTokenResponse {
  success?: boolean;
  jwtToken?: string;
  refreshToken?: string;
}

export class RefreshAuthTokenRequest implements IRefreshAuthTokenRequest {
  refreshToken?: string;

  constructor(data?: IRefreshAuthTokenRequest) {
      if (data) {
          for (var property in data) {
              if (data.hasOwnProperty(property))
                  (<any>this)[property] = (<any>data)[property];
          }
      }
  }

  init(_data?: any) {
      if (_data) {
          this.refreshToken = _data["refreshToken"];
      }
  }

  static fromJS(data: any): RefreshAuthTokenRequest {
      data = typeof data === 'object' ? data : {};
      let result = new RefreshAuthTokenRequest();
      result.init(data);
      return result;
  }

  toJSON(data?: any) {
      data = typeof data === 'object' ? data : {};
      data["refreshToken"] = this.refreshToken;
      return data;
  }

  clone(): RefreshAuthTokenRequest {
      const json = this.toJSON();
      let result = new RefreshAuthTokenRequest();
      result.init(json);
      return result;
  }
}

export interface IRefreshAuthTokenRequest {
  refreshToken?: string;
}

export class CreateRevenueResponse implements ICreateRevenueResponse {
  success?: boolean;
  myProperty?: number;

  constructor(data?: ICreateRevenueResponse) {
      if (data) {
          for (var property in data) {
              if (data.hasOwnProperty(property))
                  (<any>this)[property] = (<any>data)[property];
          }
      }
  }

  init(_data?: any) {
      if (_data) {
          this.success = _data["success"];
          this.myProperty = _data["myProperty"];
      }
  }

  static fromJS(data: any): CreateRevenueResponse {
      data = typeof data === 'object' ? data : {};
      let result = new CreateRevenueResponse();
      result.init(data);
      return result;
  }

  toJSON(data?: any) {
      data = typeof data === 'object' ? data : {};
      data["success"] = this.success;
      data["myProperty"] = this.myProperty;
      return data;
  }

  clone(): CreateRevenueResponse {
      const json = this.toJSON();
      let result = new CreateRevenueResponse();
      result.init(json);
      return result;
  }
}

export interface ICreateRevenueResponse {
  success?: boolean;
  myProperty?: number;
}

export class CreateRevenueRequest implements ICreateRevenueRequest {
  cRevenueDto?: RevenueDto;

  constructor(data?: ICreateRevenueRequest) {
      if (data) {
          for (var property in data) {
              if (data.hasOwnProperty(property))
                  (<any>this)[property] = (<any>data)[property];
          }
      }
  }

  init(_data?: any) {
      if (_data) {
          this.cRevenueDto = _data["cRevenueDto"] ? RevenueDto.fromJS(_data["cRevenueDto"]) : <any>undefined;
      }
  }

  static fromJS(data: any): CreateRevenueRequest {
      data = typeof data === 'object' ? data : {};
      let result = new CreateRevenueRequest();
      result.init(data);
      return result;
  }

  toJSON(data?: any) {
      data = typeof data === 'object' ? data : {};
      data["cRevenueDto"] = this.cRevenueDto ? this.cRevenueDto.toJSON() : <any>undefined;
      return data;
  }

  clone(): CreateRevenueRequest {
      const json = this.toJSON();
      let result = new CreateRevenueRequest();
      result.init(json);
      return result;
  }
}

export interface ICreateRevenueRequest {
  cRevenueDto?: RevenueDto;
}

export class RevenueDto implements IRevenueDto {
  id?: number;
  companyName?: string;
  value?: number;
  userId?: string;

  constructor(data?: IRevenueDto) {
      if (data) {
          for (var property in data) {
              if (data.hasOwnProperty(property))
                  (<any>this)[property] = (<any>data)[property];
          }
      }
  }

  init(_data?: any) {
      if (_data) {
          this.id = _data["id"];
          this.companyName = _data["companyName"];
          this.value = _data["value"];
          this.userId = _data["userId"];
      }
  }

  static fromJS(data: any): RevenueDto {
      data = typeof data === 'object' ? data : {};
      let result = new RevenueDto();
      result.init(data);
      return result;
  }

  toJSON(data?: any) {
      data = typeof data === 'object' ? data : {};
      data["id"] = this.id;
      data["companyName"] = this.companyName;
      data["value"] = this.value;
      data["userId"] = this.userId;
      return data;
  }

  clone(): RevenueDto {
      const json = this.toJSON();
      let result = new RevenueDto();
      result.init(json);
      return result;
  }
}

export interface IRevenueDto {
  id?: number;
  companyName?: string;
  value?: number;
  userId?: string;
}

export class GetRevenuesResponse implements IGetRevenuesResponse {
  revenues?: RevenueDto[];

  constructor(data?: IGetRevenuesResponse) {
      if (data) {
          for (var property in data) {
              if (data.hasOwnProperty(property))
                  (<any>this)[property] = (<any>data)[property];
          }
      }
  }

  init(_data?: any) {
      if (_data) {
          if (Array.isArray(_data["revenues"])) {
              this.revenues = [] as any;
              for (let item of _data["revenues"])
                  this.revenues!.push(RevenueDto.fromJS(item));
          }
      }
  }

  static fromJS(data: any): GetRevenuesResponse {
      data = typeof data === 'object' ? data : {};
      let result = new GetRevenuesResponse();
      result.init(data);
      return result;
  }

  toJSON(data?: any) {
      data = typeof data === 'object' ? data : {};
      if (Array.isArray(this.revenues)) {
          data["revenues"] = [];
          for (let item of this.revenues)
              data["revenues"].push(item.toJSON());
      }
      return data;
  }

  clone(): GetRevenuesResponse {
      const json = this.toJSON();
      let result = new GetRevenuesResponse();
      result.init(json);
      return result;
  }
}

export interface IGetRevenuesResponse {
  revenues?: RevenueDto[];
}

export class UpdateRevenueResponse implements IUpdateRevenueResponse {
  success?: boolean;

  constructor(data?: IUpdateRevenueResponse) {
      if (data) {
          for (var property in data) {
              if (data.hasOwnProperty(property))
                  (<any>this)[property] = (<any>data)[property];
          }
      }
  }

  init(_data?: any) {
      if (_data) {
          this.success = _data["success"];
      }
  }

  static fromJS(data: any): UpdateRevenueResponse {
      data = typeof data === 'object' ? data : {};
      let result = new UpdateRevenueResponse();
      result.init(data);
      return result;
  }

  toJSON(data?: any) {
      data = typeof data === 'object' ? data : {};
      data["success"] = this.success;
      return data;
  }

  clone(): UpdateRevenueResponse {
      const json = this.toJSON();
      let result = new UpdateRevenueResponse();
      result.init(json);
      return result;
  }
}

export interface IUpdateRevenueResponse {
  success?: boolean;
}

export class UpdateRevenueRequest implements IUpdateRevenueRequest {
  uRevenueDto?: RevenueDto;

  constructor(data?: IUpdateRevenueRequest) {
      if (data) {
          for (var property in data) {
              if (data.hasOwnProperty(property))
                  (<any>this)[property] = (<any>data)[property];
          }
      }
  }

  init(_data?: any) {
      if (_data) {
          this.uRevenueDto = _data["uRevenueDto"] ? RevenueDto.fromJS(_data["uRevenueDto"]) : <any>undefined;
      }
  }

  static fromJS(data: any): UpdateRevenueRequest {
      data = typeof data === 'object' ? data : {};
      let result = new UpdateRevenueRequest();
      result.init(data);
      return result;
  }

  toJSON(data?: any) {
      data = typeof data === 'object' ? data : {};
      data["uRevenueDto"] = this.uRevenueDto ? this.uRevenueDto.toJSON() : <any>undefined;
      return data;
  }

  clone(): UpdateRevenueRequest {
      const json = this.toJSON();
      let result = new UpdateRevenueRequest();
      result.init(json);
      return result;
  }
}

export interface IUpdateRevenueRequest {
  uRevenueDto?: RevenueDto;
}

export class CreateChargeRespone implements ICreateChargeRespone {
  success?: boolean;

  constructor(data?: ICreateChargeRespone) {
      if (data) {
          for (var property in data) {
              if (data.hasOwnProperty(property))
                  (<any>this)[property] = (<any>data)[property];
          }
      }
  }

  init(_data?: any) {
      if (_data) {
          this.success = _data["success"];
      }
  }

  static fromJS(data: any): CreateChargeRespone {
      data = typeof data === 'object' ? data : {};
      let result = new CreateChargeRespone();
      result.init(data);
      return result;
  }

  toJSON(data?: any) {
      data = typeof data === 'object' ? data : {};
      data["success"] = this.success;
      return data;
  }

  clone(): CreateChargeRespone {
      const json = this.toJSON();
      let result = new CreateChargeRespone();
      result.init(json);
      return result;
  }
}

export interface ICreateChargeRespone {
  success?: boolean;
}

export class CreateChargeRequest implements ICreateChargeRequest {
  cChargeDto?: ChargeDto;

  constructor(data?: ICreateChargeRequest) {
      if (data) {
          for (var property in data) {
              if (data.hasOwnProperty(property))
                  (<any>this)[property] = (<any>data)[property];
          }
      }
  }

  init(_data?: any) {
      if (_data) {
          this.cChargeDto = _data["cChargeDto"] ? ChargeDto.fromJS(_data["cChargeDto"]) : <any>undefined;
      }
  }

  static fromJS(data: any): CreateChargeRequest {
      data = typeof data === 'object' ? data : {};
      let result = new CreateChargeRequest();
      result.init(data);
      return result;
  }

  toJSON(data?: any) {
      data = typeof data === 'object' ? data : {};
      data["cChargeDto"] = this.cChargeDto ? this.cChargeDto.toJSON() : <any>undefined;
      return data;
  }

  clone(): CreateChargeRequest {
      const json = this.toJSON();
      let result = new CreateChargeRequest();
      result.init(json);
      return result;
  }
}

export interface ICreateChargeRequest {
  cChargeDto?: ChargeDto;
}

export class ChargeDto implements IChargeDto {
  id?: number;
  chargeName?: string;
  value?: number;
  userId?: string;
  catecory?: Catecory;
  timeInterval?: TimeInterval;

  constructor(data?: IChargeDto) {
      if (data) {
          for (var property in data) {
              if (data.hasOwnProperty(property))
                  (<any>this)[property] = (<any>data)[property];
          }
      }
  }

  init(_data?: any) {
      if (_data) {
          this.id = _data["id"];
          this.chargeName = _data["chargeName"];
          this.value = _data["value"];
          this.userId = _data["userId"];
          this.catecory = _data["catecory"];
          this.timeInterval = _data["timeInterval"];
      }
  }

  static fromJS(data: any): ChargeDto {
      data = typeof data === 'object' ? data : {};
      let result = new ChargeDto();
      result.init(data);
      return result;
  }

  toJSON(data?: any) {
      data = typeof data === 'object' ? data : {};
      data["id"] = this.id;
      data["chargeName"] = this.chargeName;
      data["value"] = this.value;
      data["userId"] = this.userId;
      data["catecory"] = this.catecory;
      data["timeInterval"] = this.timeInterval;
      return data;
  }

  clone(): ChargeDto {
      const json = this.toJSON();
      let result = new ChargeDto();
      result.init(json);
      return result;
  }
}

export interface IChargeDto {
  id?: number;
  chargeName?: string;
  value?: number;
  userId?: string;
  catecory?: Catecory;
  timeInterval?: TimeInterval;
}

export enum Catecory {
  Sonstiges = 0,
  Vertraglich = 1,
  Versicherung = 2,
  Essen = 3,
  Haushalt = 4,
  Aktivität = 5,
  Ausgehen = 6,
  Investieren = 7,
  Tanken = 8,
  Kredit = 9,
  Wohnen = 10,
  Entertainment = 11,
  Luxus = 12,
}

export enum TimeInterval {
  Wöchentlich = 0,
  Zweiwöchtentlich = 1,
  Monatlich = 2,
  Vierteljährlich = 3,
  Halbjährlich = 4,
  Jährlich = 5,
}

export class GetChargesResponse implements IGetChargesResponse {
  charges?: ChargeDto[];

  constructor(data?: IGetChargesResponse) {
      if (data) {
          for (var property in data) {
              if (data.hasOwnProperty(property))
                  (<any>this)[property] = (<any>data)[property];
          }
      }
  }

  init(_data?: any) {
      if (_data) {
          if (Array.isArray(_data["charges"])) {
              this.charges = [] as any;
              for (let item of _data["charges"])
                  this.charges!.push(ChargeDto.fromJS(item));
          }
      }
  }

  static fromJS(data: any): GetChargesResponse {
      data = typeof data === 'object' ? data : {};
      let result = new GetChargesResponse();
      result.init(data);
      return result;
  }

  toJSON(data?: any) {
      data = typeof data === 'object' ? data : {};
      if (Array.isArray(this.charges)) {
          data["charges"] = [];
          for (let item of this.charges)
              data["charges"].push(item.toJSON());
      }
      return data;
  }

  clone(): GetChargesResponse {
      const json = this.toJSON();
      let result = new GetChargesResponse();
      result.init(json);
      return result;
  }
}

export interface IGetChargesResponse {
  charges?: ChargeDto[];
}

export class GetChargesRequest implements IGetChargesRequest {

  constructor(data?: IGetChargesRequest) {
      if (data) {
          for (var property in data) {
              if (data.hasOwnProperty(property))
                  (<any>this)[property] = (<any>data)[property];
          }
      }
  }

  init(_data?: any) {
  }

  static fromJS(data: any): GetChargesRequest {
      data = typeof data === 'object' ? data : {};
      let result = new GetChargesRequest();
      result.init(data);
      return result;
  }

  toJSON(data?: any) {
      data = typeof data === 'object' ? data : {};
      return data;
  }

  clone(): GetChargesRequest {
      const json = this.toJSON();
      let result = new GetChargesRequest();
      result.init(json);
      return result;
  }
}

export interface IGetChargesRequest {
}

export class UpdateChargeResponse implements IUpdateChargeResponse {
  success?: boolean;

  constructor(data?: IUpdateChargeResponse) {
      if (data) {
          for (var property in data) {
              if (data.hasOwnProperty(property))
                  (<any>this)[property] = (<any>data)[property];
          }
      }
  }

  init(_data?: any) {
      if (_data) {
          this.success = _data["success"];
      }
  }

  static fromJS(data: any): UpdateChargeResponse {
      data = typeof data === 'object' ? data : {};
      let result = new UpdateChargeResponse();
      result.init(data);
      return result;
  }

  toJSON(data?: any) {
      data = typeof data === 'object' ? data : {};
      data["success"] = this.success;
      return data;
  }

  clone(): UpdateChargeResponse {
      const json = this.toJSON();
      let result = new UpdateChargeResponse();
      result.init(json);
      return result;
  }
}

export interface IUpdateChargeResponse {
  success?: boolean;
}

export class UpdateChargeRequest implements IUpdateChargeRequest {
  uChargeDto?: ChargeDto;

  constructor(data?: IUpdateChargeRequest) {
      if (data) {
          for (var property in data) {
              if (data.hasOwnProperty(property))
                  (<any>this)[property] = (<any>data)[property];
          }
      }
  }

  init(_data?: any) {
      if (_data) {
          this.uChargeDto = _data["uChargeDto"] ? ChargeDto.fromJS(_data["uChargeDto"]) : <any>undefined;
      }
  }

  static fromJS(data: any): UpdateChargeRequest {
      data = typeof data === 'object' ? data : {};
      let result = new UpdateChargeRequest();
      result.init(data);
      return result;
  }

  toJSON(data?: any) {
      data = typeof data === 'object' ? data : {};
      data["uChargeDto"] = this.uChargeDto ? this.uChargeDto.toJSON() : <any>undefined;
      return data;
  }

  clone(): UpdateChargeRequest {
      const json = this.toJSON();
      let result = new UpdateChargeRequest();
      result.init(json);
      return result;
  }
}

export interface IUpdateChargeRequest {
  uChargeDto?: ChargeDto;
}

export class CBudgetResponse implements ICBudgetResponse {
  budget?: BudgetDto;
  success?: boolean;

  constructor(data?: ICBudgetResponse) {
      if (data) {
          for (var property in data) {
              if (data.hasOwnProperty(property))
                  (<any>this)[property] = (<any>data)[property];
          }
      }
  }

  init(_data?: any) {
      if (_data) {
          this.budget = _data["budget"] ? BudgetDto.fromJS(_data["budget"]) : <any>undefined;
          this.success = _data["success"];
      }
  }

  static fromJS(data: any): CBudgetResponse {
      data = typeof data === 'object' ? data : {};
      let result = new CBudgetResponse();
      result.init(data);
      return result;
  }

  toJSON(data?: any) {
      data = typeof data === 'object' ? data : {};
      data["budget"] = this.budget ? this.budget.toJSON() : <any>undefined;
      data["success"] = this.success;
      return data;
  }

  clone(): CBudgetResponse {
      const json = this.toJSON();
      let result = new CBudgetResponse();
      result.init(json);
      return result;
  }
}

export interface ICBudgetResponse {
  budget?: BudgetDto;
  success?: boolean;
}

export class BudgetDto implements IBudgetDto {
  id?: number;
  name?: string;
  value?: number;
  userId?: string;

  constructor(data?: IBudgetDto) {
      if (data) {
          for (var property in data) {
              if (data.hasOwnProperty(property))
                  (<any>this)[property] = (<any>data)[property];
          }
      }
  }

  init(_data?: any) {
      if (_data) {
          this.id = _data["id"];
          this.name = _data["name"];
          this.value = _data["value"];
          this.userId = _data["userId"];
      }
  }

  static fromJS(data: any): BudgetDto {
      data = typeof data === 'object' ? data : {};
      let result = new BudgetDto();
      result.init(data);
      return result;
  }

  toJSON(data?: any) {
      data = typeof data === 'object' ? data : {};
      data["id"] = this.id;
      data["name"] = this.name;
      data["value"] = this.value;
      data["userId"] = this.userId;
      return data;
  }

  clone(): BudgetDto {
      const json = this.toJSON();
      let result = new BudgetDto();
      result.init(json);
      return result;
  }
}

export interface IBudgetDto {
  id?: number;
  name?: string;
  value?: number;
  userId?: string;
}

export class CBudgetRequest implements ICBudgetRequest {
  budget?: BudgetDto;

  constructor(data?: ICBudgetRequest) {
      if (data) {
          for (var property in data) {
              if (data.hasOwnProperty(property))
                  (<any>this)[property] = (<any>data)[property];
          }
      }
  }

  init(_data?: any) {
      if (_data) {
          this.budget = _data["budget"] ? BudgetDto.fromJS(_data["budget"]) : <any>undefined;
      }
  }

  static fromJS(data: any): CBudgetRequest {
      data = typeof data === 'object' ? data : {};
      let result = new CBudgetRequest();
      result.init(data);
      return result;
  }

  toJSON(data?: any) {
      data = typeof data === 'object' ? data : {};
      data["budget"] = this.budget ? this.budget.toJSON() : <any>undefined;
      return data;
  }

  clone(): CBudgetRequest {
      const json = this.toJSON();
      let result = new CBudgetRequest();
      result.init(json);
      return result;
  }
}

export interface ICBudgetRequest {
  budget?: BudgetDto;
}

export class GetBudgetsResponse implements IGetBudgetsResponse {
  budgets?: BudgetDto[];

  constructor(data?: IGetBudgetsResponse) {
      if (data) {
          for (var property in data) {
              if (data.hasOwnProperty(property))
                  (<any>this)[property] = (<any>data)[property];
          }
      }
  }

  init(_data?: any) {
      if (_data) {
          if (Array.isArray(_data["budgets"])) {
              this.budgets = [] as any;
              for (let item of _data["budgets"])
                  this.budgets!.push(BudgetDto.fromJS(item));
          }
      }
  }

  static fromJS(data: any): GetBudgetsResponse {
      data = typeof data === 'object' ? data : {};
      let result = new GetBudgetsResponse();
      result.init(data);
      return result;
  }

  toJSON(data?: any) {
      data = typeof data === 'object' ? data : {};
      if (Array.isArray(this.budgets)) {
          data["budgets"] = [];
          for (let item of this.budgets)
              data["budgets"].push(item.toJSON());
      }
      return data;
  }

  clone(): GetBudgetsResponse {
      const json = this.toJSON();
      let result = new GetBudgetsResponse();
      result.init(json);
      return result;
  }
}

export interface IGetBudgetsResponse {
  budgets?: BudgetDto[];
}

export class GetBudgetsRequest implements IGetBudgetsRequest {

  constructor(data?: IGetBudgetsRequest) {
      if (data) {
          for (var property in data) {
              if (data.hasOwnProperty(property))
                  (<any>this)[property] = (<any>data)[property];
          }
      }
  }

  init(_data?: any) {
  }

  static fromJS(data: any): GetBudgetsRequest {
      data = typeof data === 'object' ? data : {};
      let result = new GetBudgetsRequest();
      result.init(data);
      return result;
  }

  toJSON(data?: any) {
      data = typeof data === 'object' ? data : {};
      return data;
  }

  clone(): GetBudgetsRequest {
      const json = this.toJSON();
      let result = new GetBudgetsRequest();
      result.init(json);
      return result;
  }
}

export interface IGetBudgetsRequest {
}

export class UpdateBudgetResponse implements IUpdateBudgetResponse {
  success?: boolean;

  constructor(data?: IUpdateBudgetResponse) {
      if (data) {
          for (var property in data) {
              if (data.hasOwnProperty(property))
                  (<any>this)[property] = (<any>data)[property];
          }
      }
  }

  init(_data?: any) {
      if (_data) {
          this.success = _data["success"];
      }
  }

  static fromJS(data: any): UpdateBudgetResponse {
      data = typeof data === 'object' ? data : {};
      let result = new UpdateBudgetResponse();
      result.init(data);
      return result;
  }

  toJSON(data?: any) {
      data = typeof data === 'object' ? data : {};
      data["success"] = this.success;
      return data;
  }

  clone(): UpdateBudgetResponse {
      const json = this.toJSON();
      let result = new UpdateBudgetResponse();
      result.init(json);
      return result;
  }
}

export interface IUpdateBudgetResponse {
  success?: boolean;
}

export class UpdateBudgetRequest implements IUpdateBudgetRequest {
  uBudgetDto?: BudgetDto;

  constructor(data?: IUpdateBudgetRequest) {
      if (data) {
          for (var property in data) {
              if (data.hasOwnProperty(property))
                  (<any>this)[property] = (<any>data)[property];
          }
      }
  }

  init(_data?: any) {
      if (_data) {
          this.uBudgetDto = _data["uBudgetDto"] ? BudgetDto.fromJS(_data["uBudgetDto"]) : <any>undefined;
      }
  }

  static fromJS(data: any): UpdateBudgetRequest {
      data = typeof data === 'object' ? data : {};
      let result = new UpdateBudgetRequest();
      result.init(data);
      return result;
  }

  toJSON(data?: any) {
      data = typeof data === 'object' ? data : {};
      data["uBudgetDto"] = this.uBudgetDto ? this.uBudgetDto.toJSON() : <any>undefined;
      return data;
  }

  clone(): UpdateBudgetRequest {
      const json = this.toJSON();
      let result = new UpdateBudgetRequest();
      result.init(json);
      return result;
  }
}

export interface IUpdateBudgetRequest {
  uBudgetDto?: BudgetDto;
}

export class ClientApiException extends Error {
  override message: string;
  status: number;
  response: string;
  headers: { [key: string]: any; };
  result: any;

  constructor(message: string, status: number, response: string, headers: { [key: string]: any; }, result: any) {
      super();

      this.message = message;
      this.status = status;
      this.response = response;
      this.headers = headers;
      this.result = result;
  }

  protected isClientApiException = true;

  static isClientApiException(obj: any): obj is ClientApiException {
      return obj.isClientApiException === true;
  }
}

function throwException(message: string, status: number, response: string, headers: { [key: string]: any; }, result?: any): any {
  if (result !== null && result !== undefined)
      throw result;
  else
      throw new ClientApiException(message, status, response, headers, null);
}