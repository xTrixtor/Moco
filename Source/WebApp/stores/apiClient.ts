import { BaseAPIClient } from "~/api/BaseAPIClient";

export interface IUserClient {
  /**
   * Create Keycloak User
   * @return Returns true
   */
  createUserEndpoint(
    createUserRequest: CreateUserRequest
  ): Promise<CreateUserResponse>;
}

export class UserClient extends BaseAPIClient implements IUserClient {
  private http: {
    fetch(url: RequestInfo, init?: RequestInit): Promise<Response>;
  };
  private baseUrl: string;
  protected jsonParseReviver: ((key: string, value: any) => any) | undefined =
    undefined;

  constructor(
    baseUrl?: string,
    http?: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> }
  ) {
    super();
    this.http = http ? http : (window as any);
    this.baseUrl = this.getBaseUrl("https://localhost:53084", baseUrl);
  }

  /**
   * Create Keycloak User
   * @return Returns true
   */
  createUserEndpoint(
    createUserRequest: CreateUserRequest
  ): Promise<CreateUserResponse> {
    let url_ = this.baseUrl + "/api/user";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(createUserRequest);

    let options_: RequestInit = {
      body: content_,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };

    return this.transformOptions(options_)
      .then((transformedOptions_) => {
        return this.http.fetch(url_, transformedOptions_);
      })
      .then((_response: Response) => {
        return this.transformResult(url_, _response, (_response: Response) =>
          this.processCreateUserEndpoint(_response)
        );
      });
  }

  protected processCreateUserEndpoint(
    response: Response
  ): Promise<CreateUserResponse> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && response.headers.forEach) {
      response.headers.forEach((v: any, k: any) => (_headers[k] = v));
    }
    if (status === 200) {
      return response.text().then((_responseText) => {
        let result200: any = null;
        let resultData200 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = CreateUserResponse.fromJS(resultData200);
        return result200;
      });
    } else if (status !== 200 && status !== 204) {
      return response.text().then((_responseText) => {
        return throwException(
          "An unexpected server error occurred.",
          status,
          _responseText,
          _headers
        );
      });
    }
    return Promise.resolve<CreateUserResponse>(null as any);
  }
}

export interface ISavinggoalsClient {
  /**
   * @return Success
   */
  addDepositEndpoint(
    depositsUDto: DepositsUDto
  ): Promise<UpdateDepositsResponse>;

  /**
   * @return Success
   */
  createSavingGoalEndpoint(
    savingGoalCDto: SavingGoalCDto
  ): Promise<SavingGoalDto>;

  /**
   * @return Success
   */
  getAllSavingGoalsEndpoint(): Promise<GetAllSavingGoalsResponse>;

  /**
   * @return Success
   */
  deleteSavingGoalEndpoint(savingGoalId: number): Promise<any>;

  /**
   * @return Success
   */
  getSavingGoalEnpoint(savingGoalId: number): Promise<GetSavingGoalResponse>;

  /**
   * @return Success
   */
  updateDepositRatesEndpoint(
    updateDepositRatesRequest: UpdateDepositRatesRequest
  ): Promise<UpdateDepositRatesResponse>;

  /**
   * @return Success
   */
  createDepositRateEndpoint(
    depositRateCDto: DepositRateCDto
  ): Promise<DepositRatelCResponse>;

  /**
   * @return Success
   */
  updateDepositRateEndpoint(
    depositRateUDto: DepositRateUDto
  ): Promise<DepositRatelUResponse>;

  /**
   * @return Success
   */
  lazyLoadDepositRateEndpoint(
    savingGoalId: number,
    firstOfNexPage: number,
    hidePaidDeposits: boolean
  ): Promise<LazyLoadDepositRateResponse>;

  /**
   * @return Success
   */
  payDepositRateEndpoint(
    payDepositRateDto: PayDepositRateDto
  ): Promise<DepositRateDto>;
}

export class SavinggoalsClient
  extends BaseAPIClient
  implements ISavinggoalsClient
{
  private http: {
    fetch(url: RequestInfo, init?: RequestInit): Promise<Response>;
  };
  private baseUrl: string;
  protected jsonParseReviver: ((key: string, value: any) => any) | undefined =
    undefined;

  constructor(
    baseUrl?: string,
    http?: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> }
  ) {
    super();
    this.http = http ? http : (window as any);
    this.baseUrl = this.getBaseUrl("https://localhost:53084", baseUrl);
  }

  /**
   * @return Success
   */
  addDepositEndpoint(
    depositsUDto: DepositsUDto
  ): Promise<UpdateDepositsResponse> {
    let url_ = this.baseUrl + "/api/savingGoals/deposits";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(depositsUDto);

    let options_: RequestInit = {
      body: content_,
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };

    return this.transformOptions(options_)
      .then((transformedOptions_) => {
        return this.http.fetch(url_, transformedOptions_);
      })
      .then((_response: Response) => {
        return this.transformResult(url_, _response, (_response: Response) =>
          this.processAddDepositEndpoint(_response)
        );
      });
  }

  protected processAddDepositEndpoint(
    response: Response
  ): Promise<UpdateDepositsResponse> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && response.headers.forEach) {
      response.headers.forEach((v: any, k: any) => (_headers[k] = v));
    }
    if (status === 200) {
      return response.text().then((_responseText) => {
        let result200: any = null;
        let resultData200 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = UpdateDepositsResponse.fromJS(resultData200);
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
        return throwException(
          "An unexpected server error occurred.",
          status,
          _responseText,
          _headers
        );
      });
    }
    return Promise.resolve<UpdateDepositsResponse>(null as any);
  }

  /**
   * @return Success
   */
  createSavingGoalEndpoint(
    savingGoalCDto: SavingGoalCDto
  ): Promise<SavingGoalDto> {
    let url_ = this.baseUrl + "/api/savingGoals";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(savingGoalCDto);

    let options_: RequestInit = {
      body: content_,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };

    return this.transformOptions(options_)
      .then((transformedOptions_) => {
        return this.http.fetch(url_, transformedOptions_);
      })
      .then((_response: Response) => {
        return this.transformResult(url_, _response, (_response: Response) =>
          this.processCreateSavingGoalEndpoint(_response)
        );
      });
  }

  protected processCreateSavingGoalEndpoint(
    response: Response
  ): Promise<SavingGoalDto> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && response.headers.forEach) {
      response.headers.forEach((v: any, k: any) => (_headers[k] = v));
    }
    if (status === 200) {
      return response.text().then((_responseText) => {
        let result200: any = null;
        let resultData200 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = SavingGoalDto.fromJS(resultData200);
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
        return throwException(
          "An unexpected server error occurred.",
          status,
          _responseText,
          _headers
        );
      });
    }
    return Promise.resolve<SavingGoalDto>(null as any);
  }

  /**
   * @return Success
   */
  getAllSavingGoalsEndpoint(): Promise<GetAllSavingGoalsResponse> {
    let url_ = this.baseUrl + "/api/savingGoals";
    url_ = url_.replace(/[?&]$/, "");

    let options_: RequestInit = {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    };

    return this.transformOptions(options_)
      .then((transformedOptions_) => {
        return this.http.fetch(url_, transformedOptions_);
      })
      .then((_response: Response) => {
        return this.transformResult(url_, _response, (_response: Response) =>
          this.processGetAllSavingGoalsEndpoint(_response)
        );
      });
  }

  protected processGetAllSavingGoalsEndpoint(
    response: Response
  ): Promise<GetAllSavingGoalsResponse> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && response.headers.forEach) {
      response.headers.forEach((v: any, k: any) => (_headers[k] = v));
    }
    if (status === 200) {
      return response.text().then((_responseText) => {
        let result200: any = null;
        let resultData200 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = GetAllSavingGoalsResponse.fromJS(resultData200);
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
        return throwException(
          "An unexpected server error occurred.",
          status,
          _responseText,
          _headers
        );
      });
    }
    return Promise.resolve<GetAllSavingGoalsResponse>(null as any);
  }

  /**
   * @return Success
   */
  deleteSavingGoalEndpoint(savingGoalId: number): Promise<any> {
    let url_ = this.baseUrl + "/api/savingGoals/{SavingGoalId}";
    if (savingGoalId === undefined || savingGoalId === null)
      throw new Error("The parameter 'savingGoalId' must be defined.");
    url_ = url_.replace(
      "{SavingGoalId}",
      encodeURIComponent("" + savingGoalId)
    );
    url_ = url_.replace(/[?&]$/, "");

    let options_: RequestInit = {
      method: "DELETE",
      headers: {
        Accept: "text/plain",
      },
    };

    return this.transformOptions(options_)
      .then((transformedOptions_) => {
        return this.http.fetch(url_, transformedOptions_);
      })
      .then((_response: Response) => {
        return this.transformResult(url_, _response, (_response: Response) =>
          this.processDeleteSavingGoalEndpoint(_response)
        );
      });
  }

  protected processDeleteSavingGoalEndpoint(response: Response): Promise<any> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && response.headers.forEach) {
      response.headers.forEach((v: any, k: any) => (_headers[k] = v));
    }
    if (status === 200) {
      return response.text().then((_responseText) => {
        let result200: any = null;
        let resultData200 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = resultData200 !== undefined ? resultData200 : <any>null;

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
        return throwException(
          "An unexpected server error occurred.",
          status,
          _responseText,
          _headers
        );
      });
    }
    return Promise.resolve<any>(null as any);
  }

  /**
   * @return Success
   */
  getSavingGoalEnpoint(savingGoalId: number): Promise<GetSavingGoalResponse> {
    let url_ = this.baseUrl + "/api/savingGoals/{SavingGoalId}";
    if (savingGoalId === undefined || savingGoalId === null)
      throw new Error("The parameter 'savingGoalId' must be defined.");
    url_ = url_.replace(
      "{SavingGoalId}",
      encodeURIComponent("" + savingGoalId)
    );
    url_ = url_.replace(/[?&]$/, "");

    let options_: RequestInit = {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    };

    return this.transformOptions(options_)
      .then((transformedOptions_) => {
        return this.http.fetch(url_, transformedOptions_);
      })
      .then((_response: Response) => {
        return this.transformResult(url_, _response, (_response: Response) =>
          this.processGetSavingGoalEnpoint(_response)
        );
      });
  }

  protected processGetSavingGoalEnpoint(
    response: Response
  ): Promise<GetSavingGoalResponse> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && response.headers.forEach) {
      response.headers.forEach((v: any, k: any) => (_headers[k] = v));
    }
    if (status === 200) {
      return response.text().then((_responseText) => {
        let result200: any = null;
        let resultData200 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = GetSavingGoalResponse.fromJS(resultData200);
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
        return throwException(
          "An unexpected server error occurred.",
          status,
          _responseText,
          _headers
        );
      });
    }
    return Promise.resolve<GetSavingGoalResponse>(null as any);
  }

  /**
   * @return Success
   */
  updateDepositRatesEndpoint(
    updateDepositRatesRequest: UpdateDepositRatesRequest
  ): Promise<UpdateDepositRatesResponse> {
    let url_ = this.baseUrl + "/api/savingGoals/updateRates";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(updateDepositRatesRequest);

    let options_: RequestInit = {
      body: content_,
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };

    return this.transformOptions(options_)
      .then((transformedOptions_) => {
        return this.http.fetch(url_, transformedOptions_);
      })
      .then((_response: Response) => {
        return this.transformResult(url_, _response, (_response: Response) =>
          this.processUpdateDepositRatesEndpoint(_response)
        );
      });
  }

  protected processUpdateDepositRatesEndpoint(
    response: Response
  ): Promise<UpdateDepositRatesResponse> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && response.headers.forEach) {
      response.headers.forEach((v: any, k: any) => (_headers[k] = v));
    }
    if (status === 200) {
      return response.text().then((_responseText) => {
        let result200: any = null;
        let resultData200 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = UpdateDepositRatesResponse.fromJS(resultData200);
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
        return throwException(
          "An unexpected server error occurred.",
          status,
          _responseText,
          _headers
        );
      });
    }
    return Promise.resolve<UpdateDepositRatesResponse>(null as any);
  }

  /**
   * @return Success
   */
  createDepositRateEndpoint(
    depositRateCDto: DepositRateCDto
  ): Promise<DepositRatelCResponse> {
    let url_ = this.baseUrl + "/api/savingGoals/depositRate";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(depositRateCDto);

    let options_: RequestInit = {
      body: content_,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };

    return this.transformOptions(options_)
      .then((transformedOptions_) => {
        return this.http.fetch(url_, transformedOptions_);
      })
      .then((_response: Response) => {
        return this.transformResult(url_, _response, (_response: Response) =>
          this.processCreateDepositRateEndpoint(_response)
        );
      });
  }

  protected processCreateDepositRateEndpoint(
    response: Response
  ): Promise<DepositRatelCResponse> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && response.headers.forEach) {
      response.headers.forEach((v: any, k: any) => (_headers[k] = v));
    }
    if (status === 200) {
      return response.text().then((_responseText) => {
        let result200: any = null;
        let resultData200 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = DepositRatelCResponse.fromJS(resultData200);
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
        return throwException(
          "An unexpected server error occurred.",
          status,
          _responseText,
          _headers
        );
      });
    }
    return Promise.resolve<DepositRatelCResponse>(null as any);
  }

  /**
   * @return Success
   */
  updateDepositRateEndpoint(
    depositRateUDto: DepositRateUDto
  ): Promise<DepositRatelUResponse> {
    let url_ = this.baseUrl + "/api/savingGoals/depositRate";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(depositRateUDto);

    let options_: RequestInit = {
      body: content_,
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };

    return this.transformOptions(options_)
      .then((transformedOptions_) => {
        return this.http.fetch(url_, transformedOptions_);
      })
      .then((_response: Response) => {
        return this.transformResult(url_, _response, (_response: Response) =>
          this.processUpdateDepositRateEndpoint(_response)
        );
      });
  }

  protected processUpdateDepositRateEndpoint(
    response: Response
  ): Promise<DepositRatelUResponse> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && response.headers.forEach) {
      response.headers.forEach((v: any, k: any) => (_headers[k] = v));
    }
    if (status === 200) {
      return response.text().then((_responseText) => {
        let result200: any = null;
        let resultData200 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = DepositRatelUResponse.fromJS(resultData200);
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
        return throwException(
          "An unexpected server error occurred.",
          status,
          _responseText,
          _headers
        );
      });
    }
    return Promise.resolve<DepositRatelUResponse>(null as any);
  }

  /**
   * @return Success
   */
  lazyLoadDepositRateEndpoint(
    savingGoalId: number,
    firstOfNexPage: number,
    hidePaidDeposits: boolean
  ): Promise<LazyLoadDepositRateResponse> {
    let url_ = this.baseUrl + "/api/savingGoals/lazyload?";
    if (savingGoalId === undefined || savingGoalId === null)
      throw new Error(
        "The parameter 'savingGoalId' must be defined and cannot be null."
      );
    else url_ += "SavingGoalId=" + encodeURIComponent("" + savingGoalId) + "&";
    if (firstOfNexPage === undefined || firstOfNexPage === null)
      throw new Error(
        "The parameter 'firstOfNexPage' must be defined and cannot be null."
      );
    else
      url_ += "FirstOfNexPage=" + encodeURIComponent("" + firstOfNexPage) + "&";
    if (hidePaidDeposits === undefined || hidePaidDeposits === null)
      throw new Error(
        "The parameter 'hidePaidDeposits' must be defined and cannot be null."
      );
    else
      url_ +=
        "hidePaidDeposits=" + encodeURIComponent("" + hidePaidDeposits) + "&";
    url_ = url_.replace(/[?&]$/, "");

    let options_: RequestInit = {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    };

    return this.transformOptions(options_)
      .then((transformedOptions_) => {
        return this.http.fetch(url_, transformedOptions_);
      })
      .then((_response: Response) => {
        return this.transformResult(url_, _response, (_response: Response) =>
          this.processLazyLoadDepositRateEndpoint(_response)
        );
      });
  }

  protected processLazyLoadDepositRateEndpoint(
    response: Response
  ): Promise<LazyLoadDepositRateResponse> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && response.headers.forEach) {
      response.headers.forEach((v: any, k: any) => (_headers[k] = v));
    }
    if (status === 200) {
      return response.text().then((_responseText) => {
        let result200: any = null;
        let resultData200 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = LazyLoadDepositRateResponse.fromJS(resultData200);
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
        return throwException(
          "An unexpected server error occurred.",
          status,
          _responseText,
          _headers
        );
      });
    }
    return Promise.resolve<LazyLoadDepositRateResponse>(null as any);
  }

  /**
   * @return Success
   */
  payDepositRateEndpoint(
    payDepositRateDto: PayDepositRateDto
  ): Promise<DepositRateDto> {
    let url_ = this.baseUrl + "/api/savingGoals/depositRate/pay";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(payDepositRateDto);

    let options_: RequestInit = {
      body: content_,
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };

    return this.transformOptions(options_)
      .then((transformedOptions_) => {
        return this.http.fetch(url_, transformedOptions_);
      })
      .then((_response: Response) => {
        return this.transformResult(url_, _response, (_response: Response) =>
          this.processPayDepositRateEndpoint(_response)
        );
      });
  }

  protected processPayDepositRateEndpoint(
    response: Response
  ): Promise<DepositRateDto> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && response.headers.forEach) {
      response.headers.forEach((v: any, k: any) => (_headers[k] = v));
    }
    if (status === 200) {
      return response.text().then((_responseText) => {
        let result200: any = null;
        let resultData200 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = DepositRateDto.fromJS(resultData200);
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
        return throwException(
          "An unexpected server error occurred.",
          status,
          _responseText,
          _headers
        );
      });
    }
    return Promise.resolve<DepositRateDto>(null as any);
  }
}

export interface IRevenueClient {
  /**
   * @return Success
   */
  deleteRevenueEndpoint(revenueId: number): Promise<any>;

  /**
   * @return Success
   */
  createRevenueEndpoint(
    createRevenueRequest: CreateRevenueRequest
  ): Promise<CreateRevenueResponse>;

  /**
   * @return Success
   */
  updateRevenueEndpoint(
    updateRevenueRequest: UpdateRevenueRequest
  ): Promise<UpdateRevenueResponse>;

  /**
   * @return Success
   */
  getRevenuesOfUserEndpoint(
    userId: string | null
  ): Promise<GetRevenuesResponse>;
}

export class RevenueClient extends BaseAPIClient implements IRevenueClient {
  private http: {
    fetch(url: RequestInfo, init?: RequestInit): Promise<Response>;
  };
  private baseUrl: string;
  protected jsonParseReviver: ((key: string, value: any) => any) | undefined =
    undefined;

  constructor(
    baseUrl?: string,
    http?: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> }
  ) {
    super();
    this.http = http ? http : (window as any);
    this.baseUrl = this.getBaseUrl("https://localhost:53084", baseUrl);
  }

  /**
   * @return Success
   */
  deleteRevenueEndpoint(revenueId: number): Promise<any> {
    let url_ = this.baseUrl + "/api/revenue/{RevenueId}";
    if (revenueId === undefined || revenueId === null)
      throw new Error("The parameter 'revenueId' must be defined.");
    url_ = url_.replace("{RevenueId}", encodeURIComponent("" + revenueId));
    url_ = url_.replace(/[?&]$/, "");

    let options_: RequestInit = {
      method: "DELETE",
      headers: {
        Accept: "text/plain",
      },
    };

    return this.transformOptions(options_)
      .then((transformedOptions_) => {
        return this.http.fetch(url_, transformedOptions_);
      })
      .then((_response: Response) => {
        return this.transformResult(url_, _response, (_response: Response) =>
          this.processDeleteRevenueEndpoint(_response)
        );
      });
  }

  protected processDeleteRevenueEndpoint(response: Response): Promise<any> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && response.headers.forEach) {
      response.headers.forEach((v: any, k: any) => (_headers[k] = v));
    }
    if (status === 200) {
      return response.text().then((_responseText) => {
        let result200: any = null;
        let resultData200 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = resultData200 !== undefined ? resultData200 : <any>null;

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
        return throwException(
          "An unexpected server error occurred.",
          status,
          _responseText,
          _headers
        );
      });
    }
    return Promise.resolve<any>(null as any);
  }

  /**
   * @return Success
   */
  createRevenueEndpoint(
    createRevenueRequest: CreateRevenueRequest
  ): Promise<CreateRevenueResponse> {
    let url_ = this.baseUrl + "/api/revenue";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(createRevenueRequest);

    let options_: RequestInit = {
      body: content_,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };

    return this.transformOptions(options_)
      .then((transformedOptions_) => {
        return this.http.fetch(url_, transformedOptions_);
      })
      .then((_response: Response) => {
        return this.transformResult(url_, _response, (_response: Response) =>
          this.processCreateRevenueEndpoint(_response)
        );
      });
  }

  protected processCreateRevenueEndpoint(
    response: Response
  ): Promise<CreateRevenueResponse> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && response.headers.forEach) {
      response.headers.forEach((v: any, k: any) => (_headers[k] = v));
    }
    if (status === 200) {
      return response.text().then((_responseText) => {
        let result200: any = null;
        let resultData200 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = CreateRevenueResponse.fromJS(resultData200);
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
        return throwException(
          "An unexpected server error occurred.",
          status,
          _responseText,
          _headers
        );
      });
    }
    return Promise.resolve<CreateRevenueResponse>(null as any);
  }

  /**
   * @return Success
   */
  updateRevenueEndpoint(
    updateRevenueRequest: UpdateRevenueRequest
  ): Promise<UpdateRevenueResponse> {
    let url_ = this.baseUrl + "/api/revenue";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(updateRevenueRequest);

    let options_: RequestInit = {
      body: content_,
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };

    return this.transformOptions(options_)
      .then((transformedOptions_) => {
        return this.http.fetch(url_, transformedOptions_);
      })
      .then((_response: Response) => {
        return this.transformResult(url_, _response, (_response: Response) =>
          this.processUpdateRevenueEndpoint(_response)
        );
      });
  }

  protected processUpdateRevenueEndpoint(
    response: Response
  ): Promise<UpdateRevenueResponse> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && response.headers.forEach) {
      response.headers.forEach((v: any, k: any) => (_headers[k] = v));
    }
    if (status === 200) {
      return response.text().then((_responseText) => {
        let result200: any = null;
        let resultData200 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = UpdateRevenueResponse.fromJS(resultData200);
        return result200;
      });
    } else if (status === 401) {
      return response.text().then((_responseText) => {
        return throwException("Unauthorized", status, _responseText, _headers);
      });
    } else if (status !== 200 && status !== 204) {
      return response.text().then((_responseText) => {
        return throwException(
          "An unexpected server error occurred.",
          status,
          _responseText,
          _headers
        );
      });
    }
    return Promise.resolve<UpdateRevenueResponse>(null as any);
  }

  /**
   * @return Success
   */
  getRevenuesOfUserEndpoint(
    userId: string | null
  ): Promise<GetRevenuesResponse> {
    let url_ = this.baseUrl + "/api/revenue/{UserId}";
    if (userId === undefined || userId === null)
      throw new Error("The parameter 'userId' must be defined.");
    url_ = url_.replace("{UserId}", encodeURIComponent("" + userId));
    url_ = url_.replace(/[?&]$/, "");

    let options_: RequestInit = {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    };

    return this.transformOptions(options_)
      .then((transformedOptions_) => {
        return this.http.fetch(url_, transformedOptions_);
      })
      .then((_response: Response) => {
        return this.transformResult(url_, _response, (_response: Response) =>
          this.processGetRevenuesOfUserEndpoint(_response)
        );
      });
  }

  protected processGetRevenuesOfUserEndpoint(
    response: Response
  ): Promise<GetRevenuesResponse> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && response.headers.forEach) {
      response.headers.forEach((v: any, k: any) => (_headers[k] = v));
    }
    if (status === 200) {
      return response.text().then((_responseText) => {
        let result200: any = null;
        let resultData200 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = GetRevenuesResponse.fromJS(resultData200);
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
        return throwException(
          "An unexpected server error occurred.",
          status,
          _responseText,
          _headers
        );
      });
    }
    return Promise.resolve<GetRevenuesResponse>(null as any);
  }
}

export interface IGroupcostClient {
  /**
   * @return Success
   */
  createGroupCostEndpoint(groupCostCDto: GroupCostCDto): Promise<any>;

  /**
   * @return Success
   */
  getGroupCostEndpoint(): Promise<GetGroupCostResponse>;

  /**
   * @return Success
   */
  updateGroupCostEndpoint(groupCostUDto: GroupCostUDto): Promise<any>;

  /**
   * @return Success
   */
  deleteGroupCostEndpoint(groupCostId: number): Promise<any>;
}

export class GroupcostClient extends BaseAPIClient implements IGroupcostClient {
  private http: {
    fetch(url: RequestInfo, init?: RequestInit): Promise<Response>;
  };
  private baseUrl: string;
  protected jsonParseReviver: ((key: string, value: any) => any) | undefined =
    undefined;

  constructor(
    baseUrl?: string,
    http?: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> }
  ) {
    super();
    this.http = http ? http : (window as any);
    this.baseUrl = this.getBaseUrl("https://localhost:53084", baseUrl);
  }

  /**
   * @return Success
   */
  createGroupCostEndpoint(groupCostCDto: GroupCostCDto): Promise<any> {
    let url_ = this.baseUrl + "/api/groupCost";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(groupCostCDto);

    let options_: RequestInit = {
      body: content_,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "text/plain",
      },
    };

    return this.transformOptions(options_)
      .then((transformedOptions_) => {
        return this.http.fetch(url_, transformedOptions_);
      })
      .then((_response: Response) => {
        return this.transformResult(url_, _response, (_response: Response) =>
          this.processCreateGroupCostEndpoint(_response)
        );
      });
  }

  protected processCreateGroupCostEndpoint(response: Response): Promise<any> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && response.headers.forEach) {
      response.headers.forEach((v: any, k: any) => (_headers[k] = v));
    }
    if (status === 200) {
      return response.text().then((_responseText) => {
        let result200: any = null;
        let resultData200 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = resultData200 !== undefined ? resultData200 : <any>null;

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
        return throwException(
          "An unexpected server error occurred.",
          status,
          _responseText,
          _headers
        );
      });
    }
    return Promise.resolve<any>(null as any);
  }

  /**
   * @return Success
   */
  getGroupCostEndpoint(): Promise<GetGroupCostResponse> {
    let url_ = this.baseUrl + "/api/groupCost";
    url_ = url_.replace(/[?&]$/, "");

    let options_: RequestInit = {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    };

    return this.transformOptions(options_)
      .then((transformedOptions_) => {
        return this.http.fetch(url_, transformedOptions_);
      })
      .then((_response: Response) => {
        return this.transformResult(url_, _response, (_response: Response) =>
          this.processGetGroupCostEndpoint(_response)
        );
      });
  }

  protected processGetGroupCostEndpoint(
    response: Response
  ): Promise<GetGroupCostResponse> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && response.headers.forEach) {
      response.headers.forEach((v: any, k: any) => (_headers[k] = v));
    }
    if (status === 200) {
      return response.text().then((_responseText) => {
        let result200: any = null;
        let resultData200 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = GetGroupCostResponse.fromJS(resultData200);
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
        return throwException(
          "An unexpected server error occurred.",
          status,
          _responseText,
          _headers
        );
      });
    }
    return Promise.resolve<GetGroupCostResponse>(null as any);
  }

  /**
   * @return Success
   */
  updateGroupCostEndpoint(groupCostUDto: GroupCostUDto): Promise<any> {
    let url_ = this.baseUrl + "/api/groupCost";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(groupCostUDto);

    let options_: RequestInit = {
      body: content_,
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "text/plain",
      },
    };

    return this.transformOptions(options_)
      .then((transformedOptions_) => {
        return this.http.fetch(url_, transformedOptions_);
      })
      .then((_response: Response) => {
        return this.transformResult(url_, _response, (_response: Response) =>
          this.processUpdateGroupCostEndpoint(_response)
        );
      });
  }

  protected processUpdateGroupCostEndpoint(response: Response): Promise<any> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && response.headers.forEach) {
      response.headers.forEach((v: any, k: any) => (_headers[k] = v));
    }
    if (status === 200) {
      return response.text().then((_responseText) => {
        let result200: any = null;
        let resultData200 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = resultData200 !== undefined ? resultData200 : <any>null;

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
        return throwException(
          "An unexpected server error occurred.",
          status,
          _responseText,
          _headers
        );
      });
    }
    return Promise.resolve<any>(null as any);
  }

  /**
   * @return Success
   */
  deleteGroupCostEndpoint(groupCostId: number): Promise<any> {
    let url_ = this.baseUrl + "/api/groupCost/{GroupCostId}";
    if (groupCostId === undefined || groupCostId === null)
      throw new Error("The parameter 'groupCostId' must be defined.");
    url_ = url_.replace("{GroupCostId}", encodeURIComponent("" + groupCostId));
    url_ = url_.replace(/[?&]$/, "");

    let options_: RequestInit = {
      method: "DELETE",
      headers: {
        Accept: "text/plain",
      },
    };

    return this.transformOptions(options_)
      .then((transformedOptions_) => {
        return this.http.fetch(url_, transformedOptions_);
      })
      .then((_response: Response) => {
        return this.transformResult(url_, _response, (_response: Response) =>
          this.processDeleteGroupCostEndpoint(_response)
        );
      });
  }

  protected processDeleteGroupCostEndpoint(response: Response): Promise<any> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && response.headers.forEach) {
      response.headers.forEach((v: any, k: any) => (_headers[k] = v));
    }
    if (status === 200) {
      return response.text().then((_responseText) => {
        let result200: any = null;
        let resultData200 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = resultData200 !== undefined ? resultData200 : <any>null;

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
        return throwException(
          "An unexpected server error occurred.",
          status,
          _responseText,
          _headers
        );
      });
    }
    return Promise.resolve<any>(null as any);
  }
}

export interface IFixedcostClient {
  /**
   * @return Success
   */
  createFixedCostEndpoint(createFixedCDto: CreateFixedCDto): Promise<any>;

  /**
   * @return Success
   */
  getAllFixedCostsEndpoint(): Promise<GetAllFixedCostsEndpointResponse>;

  /**
   * @return Success
   */
  updateFixedCostEndpoint(fixedCostUDto: FixedCostUDto): Promise<any>;

  /**
   * @return Success
   */
  deleteFixedCostEndpoint(fixedCostId: number): Promise<any>;

  /**
   * @return Success
   */
  getFixedCostsByTimeIntervalEndpoint(): Promise<GetFixedCostsByTimeIntervalResponse>;
}

export class FixedcostClient extends BaseAPIClient implements IFixedcostClient {
  private http: {
    fetch(url: RequestInfo, init?: RequestInit): Promise<Response>;
  };
  private baseUrl: string;
  protected jsonParseReviver: ((key: string, value: any) => any) | undefined =
    undefined;

  constructor(
    baseUrl?: string,
    http?: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> }
  ) {
    super();
    this.http = http ? http : (window as any);
    this.baseUrl = this.getBaseUrl("https://localhost:53084", baseUrl);
  }

  /**
   * @return Success
   */
  createFixedCostEndpoint(createFixedCDto: CreateFixedCDto): Promise<any> {
    let url_ = this.baseUrl + "/api/fixedCost";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(createFixedCDto);

    let options_: RequestInit = {
      body: content_,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "text/plain",
      },
    };

    return this.transformOptions(options_)
      .then((transformedOptions_) => {
        return this.http.fetch(url_, transformedOptions_);
      })
      .then((_response: Response) => {
        return this.transformResult(url_, _response, (_response: Response) =>
          this.processCreateFixedCostEndpoint(_response)
        );
      });
  }

  protected processCreateFixedCostEndpoint(response: Response): Promise<any> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && response.headers.forEach) {
      response.headers.forEach((v: any, k: any) => (_headers[k] = v));
    }
    if (status === 200) {
      return response.text().then((_responseText) => {
        let result200: any = null;
        let resultData200 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = resultData200 !== undefined ? resultData200 : <any>null;

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
        return throwException(
          "An unexpected server error occurred.",
          status,
          _responseText,
          _headers
        );
      });
    }
    return Promise.resolve<any>(null as any);
  }

  /**
   * @return Success
   */
  getAllFixedCostsEndpoint(): Promise<GetAllFixedCostsEndpointResponse> {
    let url_ = this.baseUrl + "/api/fixedCost";
    url_ = url_.replace(/[?&]$/, "");

    let options_: RequestInit = {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    };

    return this.transformOptions(options_)
      .then((transformedOptions_) => {
        return this.http.fetch(url_, transformedOptions_);
      })
      .then((_response: Response) => {
        return this.transformResult(url_, _response, (_response: Response) =>
          this.processGetAllFixedCostsEndpoint(_response)
        );
      });
  }

  protected processGetAllFixedCostsEndpoint(
    response: Response
  ): Promise<GetAllFixedCostsEndpointResponse> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && response.headers.forEach) {
      response.headers.forEach((v: any, k: any) => (_headers[k] = v));
    }
    if (status === 200) {
      return response.text().then((_responseText) => {
        let result200: any = null;
        let resultData200 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = GetAllFixedCostsEndpointResponse.fromJS(resultData200);
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
        return throwException(
          "An unexpected server error occurred.",
          status,
          _responseText,
          _headers
        );
      });
    }
    return Promise.resolve<GetAllFixedCostsEndpointResponse>(null as any);
  }

  /**
   * @return Success
   */
  updateFixedCostEndpoint(fixedCostUDto: FixedCostUDto): Promise<any> {
    let url_ = this.baseUrl + "/api/fixedCost";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(fixedCostUDto);

    let options_: RequestInit = {
      body: content_,
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "text/plain",
      },
    };

    return this.transformOptions(options_)
      .then((transformedOptions_) => {
        return this.http.fetch(url_, transformedOptions_);
      })
      .then((_response: Response) => {
        return this.transformResult(url_, _response, (_response: Response) =>
          this.processUpdateFixedCostEndpoint(_response)
        );
      });
  }

  protected processUpdateFixedCostEndpoint(response: Response): Promise<any> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && response.headers.forEach) {
      response.headers.forEach((v: any, k: any) => (_headers[k] = v));
    }
    if (status === 200) {
      return response.text().then((_responseText) => {
        let result200: any = null;
        let resultData200 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = resultData200 !== undefined ? resultData200 : <any>null;

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
        return throwException(
          "An unexpected server error occurred.",
          status,
          _responseText,
          _headers
        );
      });
    }
    return Promise.resolve<any>(null as any);
  }

  /**
   * @return Success
   */
  deleteFixedCostEndpoint(fixedCostId: number): Promise<any> {
    let url_ = this.baseUrl + "/api/fixedCost/{FixedCostId}";
    if (fixedCostId === undefined || fixedCostId === null)
      throw new Error("The parameter 'fixedCostId' must be defined.");
    url_ = url_.replace("{FixedCostId}", encodeURIComponent("" + fixedCostId));
    url_ = url_.replace(/[?&]$/, "");

    let options_: RequestInit = {
      method: "DELETE",
      headers: {
        Accept: "text/plain",
      },
    };

    return this.transformOptions(options_)
      .then((transformedOptions_) => {
        return this.http.fetch(url_, transformedOptions_);
      })
      .then((_response: Response) => {
        return this.transformResult(url_, _response, (_response: Response) =>
          this.processDeleteFixedCostEndpoint(_response)
        );
      });
  }

  protected processDeleteFixedCostEndpoint(response: Response): Promise<any> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && response.headers.forEach) {
      response.headers.forEach((v: any, k: any) => (_headers[k] = v));
    }
    if (status === 200) {
      return response.text().then((_responseText) => {
        let result200: any = null;
        let resultData200 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = resultData200 !== undefined ? resultData200 : <any>null;

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
        return throwException(
          "An unexpected server error occurred.",
          status,
          _responseText,
          _headers
        );
      });
    }
    return Promise.resolve<any>(null as any);
  }

  /**
   * @return Success
   */
  getFixedCostsByTimeIntervalEndpoint(): Promise<GetFixedCostsByTimeIntervalResponse> {
    let url_ = this.baseUrl + "/api/fixedCost/byTimeInterval";
    url_ = url_.replace(/[?&]$/, "");

    let options_: RequestInit = {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    };

    return this.transformOptions(options_)
      .then((transformedOptions_) => {
        return this.http.fetch(url_, transformedOptions_);
      })
      .then((_response: Response) => {
        return this.transformResult(url_, _response, (_response: Response) =>
          this.processGetFixedCostsByTimeIntervalEndpoint(_response)
        );
      });
  }

  protected processGetFixedCostsByTimeIntervalEndpoint(
    response: Response
  ): Promise<GetFixedCostsByTimeIntervalResponse> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && response.headers.forEach) {
      response.headers.forEach((v: any, k: any) => (_headers[k] = v));
    }
    if (status === 200) {
      return response.text().then((_responseText) => {
        let result200: any = null;
        let resultData200 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = GetFixedCostsByTimeIntervalResponse.fromJS(resultData200);
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
        return throwException(
          "An unexpected server error occurred.",
          status,
          _responseText,
          _headers
        );
      });
    }
    return Promise.resolve<GetFixedCostsByTimeIntervalResponse>(null as any);
  }
}

export interface ICreditClient {
  /**
   * @return Success
   */
  createCreditEndpoint(
    createCreditRequest: CreateCreditRequest
  ): Promise<CreateCreditResponse>;

  /**
   * @return Success
   */
  updateCreditEndpoint(
    updateCreditRequest: UpdateCreditRequest
  ): Promise<UpdateBudgetResponse>;

  /**
   * @return Success
   */
  deleteCreditEndpoint(creditId: number): Promise<any>;
}

export class CreditClient extends BaseAPIClient implements ICreditClient {
  private http: {
    fetch(url: RequestInfo, init?: RequestInit): Promise<Response>;
  };
  private baseUrl: string;
  protected jsonParseReviver: ((key: string, value: any) => any) | undefined =
    undefined;

  constructor(
    baseUrl?: string,
    http?: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> }
  ) {
    super();
    this.http = http ? http : (window as any);
    this.baseUrl = this.getBaseUrl("https://localhost:53084", baseUrl);
  }

  /**
   * @return Success
   */
  createCreditEndpoint(
    createCreditRequest: CreateCreditRequest
  ): Promise<CreateCreditResponse> {
    let url_ = this.baseUrl + "/api/credit";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(createCreditRequest);

    let options_: RequestInit = {
      body: content_,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };

    return this.transformOptions(options_)
      .then((transformedOptions_) => {
        return this.http.fetch(url_, transformedOptions_);
      })
      .then((_response: Response) => {
        return this.transformResult(url_, _response, (_response: Response) =>
          this.processCreateCreditEndpoint(_response)
        );
      });
  }

  protected processCreateCreditEndpoint(
    response: Response
  ): Promise<CreateCreditResponse> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && response.headers.forEach) {
      response.headers.forEach((v: any, k: any) => (_headers[k] = v));
    }
    if (status === 200) {
      return response.text().then((_responseText) => {
        let result200: any = null;
        let resultData200 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = CreateCreditResponse.fromJS(resultData200);
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
        return throwException(
          "An unexpected server error occurred.",
          status,
          _responseText,
          _headers
        );
      });
    }
    return Promise.resolve<CreateCreditResponse>(null as any);
  }

  /**
   * @return Success
   */
  updateCreditEndpoint(
    updateCreditRequest: UpdateCreditRequest
  ): Promise<UpdateBudgetResponse> {
    let url_ = this.baseUrl + "/api/credit";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(updateCreditRequest);

    let options_: RequestInit = {
      body: content_,
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };

    return this.transformOptions(options_)
      .then((transformedOptions_) => {
        return this.http.fetch(url_, transformedOptions_);
      })
      .then((_response: Response) => {
        return this.transformResult(url_, _response, (_response: Response) =>
          this.processUpdateCreditEndpoint(_response)
        );
      });
  }

  protected processUpdateCreditEndpoint(
    response: Response
  ): Promise<UpdateBudgetResponse> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && response.headers.forEach) {
      response.headers.forEach((v: any, k: any) => (_headers[k] = v));
    }
    if (status === 200) {
      return response.text().then((_responseText) => {
        let result200: any = null;
        let resultData200 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = UpdateBudgetResponse.fromJS(resultData200);
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
        return throwException(
          "An unexpected server error occurred.",
          status,
          _responseText,
          _headers
        );
      });
    }
    return Promise.resolve<UpdateBudgetResponse>(null as any);
  }

  /**
   * @return Success
   */
  deleteCreditEndpoint(creditId: number): Promise<any> {
    let url_ = this.baseUrl + "/api/credit/{CreditId}";
    if (creditId === undefined || creditId === null)
      throw new Error("The parameter 'creditId' must be defined.");
    url_ = url_.replace("{CreditId}", encodeURIComponent("" + creditId));
    url_ = url_.replace(/[?&]$/, "");

    let options_: RequestInit = {
      method: "DELETE",
      headers: {
        Accept: "text/plain",
      },
    };

    return this.transformOptions(options_)
      .then((transformedOptions_) => {
        return this.http.fetch(url_, transformedOptions_);
      })
      .then((_response: Response) => {
        return this.transformResult(url_, _response, (_response: Response) =>
          this.processDeleteCreditEndpoint(_response)
        );
      });
  }

  protected processDeleteCreditEndpoint(response: Response): Promise<any> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && response.headers.forEach) {
      response.headers.forEach((v: any, k: any) => (_headers[k] = v));
    }
    if (status === 200) {
      return response.text().then((_responseText) => {
        let result200: any = null;
        let resultData200 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = resultData200 !== undefined ? resultData200 : <any>null;

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
        return throwException(
          "An unexpected server error occurred.",
          status,
          _responseText,
          _headers
        );
      });
    }
    return Promise.resolve<any>(null as any);
  }
}

export interface IInspectionClient {
  /**
   * @return Success
   */
  checkableFixedCostUptoDate(
    checkableFixedCostUptoDateRequest: CheckableFixedCostUptoDateRequest
  ): Promise<boolean>;

  /**
   * @return Success
   */
  createCostInspectionEndpoint(
    costInspectionCRequest: CostInspectionCRequest
  ): Promise<CostInspectionCResponse>;

  /**
   * @return Success
   */
  getCostInspectionEndpoint(
    year: number,
    monthNumber: number
  ): Promise<CostInspectionGResponse>;

  /**
   * @return Success
   */
  deleteCostInspectionEndpoint(costInspectionID: number): Promise<any>;

  /**
   * @return Success
   */
  checkFixedCost(
    updateCheckableFixedCostRequest: UpdateCheckableFixedCostRequest
  ): Promise<boolean>;

  /**
   * @return Success
   */
  updateMonthlyBudgetEnpoint(
    monthlyBudgetUDto: MonthlyBudgetUDto
  ): Promise<MonthlyBudgetUResponse>;
}

export class InspectionClient
  extends BaseAPIClient
  implements IInspectionClient
{
  private http: {
    fetch(url: RequestInfo, init?: RequestInit): Promise<Response>;
  };
  private baseUrl: string;
  protected jsonParseReviver: ((key: string, value: any) => any) | undefined =
    undefined;

  constructor(
    baseUrl?: string,
    http?: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> }
  ) {
    super();
    this.http = http ? http : (window as any);
    this.baseUrl = this.getBaseUrl("https://localhost:53084", baseUrl);
  }

  /**
   * @return Success
   */
  checkableFixedCostUptoDate(
    checkableFixedCostUptoDateRequest: CheckableFixedCostUptoDateRequest
  ): Promise<boolean> {
    let url_ = this.baseUrl + "/api/inspection/checkableFixedCost/upToDate";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(checkableFixedCostUptoDateRequest);

    let options_: RequestInit = {
      body: content_,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };

    return this.transformOptions(options_)
      .then((transformedOptions_) => {
        return this.http.fetch(url_, transformedOptions_);
      })
      .then((_response: Response) => {
        return this.transformResult(url_, _response, (_response: Response) =>
          this.processCheckableFixedCostUptoDate(_response)
        );
      });
  }

  protected processCheckableFixedCostUptoDate(
    response: Response
  ): Promise<boolean> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && response.headers.forEach) {
      response.headers.forEach((v: any, k: any) => (_headers[k] = v));
    }
    if (status === 200) {
      return response.text().then((_responseText) => {
        let result200: any = null;
        let resultData200 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = resultData200 !== undefined ? resultData200 : <any>null;

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
        return throwException(
          "An unexpected server error occurred.",
          status,
          _responseText,
          _headers
        );
      });
    }
    return Promise.resolve<boolean>(null as any);
  }

  /**
   * @return Success
   */
  createCostInspectionEndpoint(
    costInspectionCRequest: CostInspectionCRequest
  ): Promise<CostInspectionCResponse> {
    let url_ = this.baseUrl + "/api/inspection";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(costInspectionCRequest);

    let options_: RequestInit = {
      body: content_,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };

    return this.transformOptions(options_)
      .then((transformedOptions_) => {
        return this.http.fetch(url_, transformedOptions_);
      })
      .then((_response: Response) => {
        return this.transformResult(url_, _response, (_response: Response) =>
          this.processCreateCostInspectionEndpoint(_response)
        );
      });
  }

  protected processCreateCostInspectionEndpoint(
    response: Response
  ): Promise<CostInspectionCResponse> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && response.headers.forEach) {
      response.headers.forEach((v: any, k: any) => (_headers[k] = v));
    }
    if (status === 200) {
      return response.text().then((_responseText) => {
        let result200: any = null;
        let resultData200 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = CostInspectionCResponse.fromJS(resultData200);
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
        return throwException(
          "An unexpected server error occurred.",
          status,
          _responseText,
          _headers
        );
      });
    }
    return Promise.resolve<CostInspectionCResponse>(null as any);
  }

  /**
   * @return Success
   */
  getCostInspectionEndpoint(
    year: number,
    monthNumber: number
  ): Promise<CostInspectionGResponse> {
    let url_ = this.baseUrl + "/api/inspection?";
    if (year === undefined || year === null)
      throw new Error(
        "The parameter 'year' must be defined and cannot be null."
      );
    else url_ += "Year=" + encodeURIComponent("" + year) + "&";
    if (monthNumber === undefined || monthNumber === null)
      throw new Error(
        "The parameter 'monthNumber' must be defined and cannot be null."
      );
    else url_ += "MonthNumber=" + encodeURIComponent("" + monthNumber) + "&";
    url_ = url_.replace(/[?&]$/, "");

    let options_: RequestInit = {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    };

    return this.transformOptions(options_)
      .then((transformedOptions_) => {
        return this.http.fetch(url_, transformedOptions_);
      })
      .then((_response: Response) => {
        return this.transformResult(url_, _response, (_response: Response) =>
          this.processGetCostInspectionEndpoint(_response)
        );
      });
  }

  protected processGetCostInspectionEndpoint(
    response: Response
  ): Promise<CostInspectionGResponse> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && response.headers.forEach) {
      response.headers.forEach((v: any, k: any) => (_headers[k] = v));
    }
    if (status === 200) {
      return response.text().then((_responseText) => {
        let result200: any = null;
        let resultData200 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = CostInspectionGResponse.fromJS(resultData200);
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
        return throwException(
          "An unexpected server error occurred.",
          status,
          _responseText,
          _headers
        );
      });
    }
    return Promise.resolve<CostInspectionGResponse>(null as any);
  }

  /**
   * @return Success
   */
  deleteCostInspectionEndpoint(costInspectionID: number): Promise<any> {
    let url_ = this.baseUrl + "/api/inspection/{CostInspectionID}";
    if (costInspectionID === undefined || costInspectionID === null)
      throw new Error("The parameter 'costInspectionID' must be defined.");
    url_ = url_.replace(
      "{CostInspectionID}",
      encodeURIComponent("" + costInspectionID)
    );
    url_ = url_.replace(/[?&]$/, "");

    let options_: RequestInit = {
      method: "DELETE",
      headers: {
        Accept: "text/plain",
      },
    };

    return this.transformOptions(options_)
      .then((transformedOptions_) => {
        return this.http.fetch(url_, transformedOptions_);
      })
      .then((_response: Response) => {
        return this.transformResult(url_, _response, (_response: Response) =>
          this.processDeleteCostInspectionEndpoint(_response)
        );
      });
  }

  protected processDeleteCostInspectionEndpoint(
    response: Response
  ): Promise<any> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && response.headers.forEach) {
      response.headers.forEach((v: any, k: any) => (_headers[k] = v));
    }
    if (status === 200) {
      return response.text().then((_responseText) => {
        let result200: any = null;
        let resultData200 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = resultData200 !== undefined ? resultData200 : <any>null;

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
        return throwException(
          "An unexpected server error occurred.",
          status,
          _responseText,
          _headers
        );
      });
    }
    return Promise.resolve<any>(null as any);
  }

  /**
   * @return Success
   */
  checkFixedCost(
    updateCheckableFixedCostRequest: UpdateCheckableFixedCostRequest
  ): Promise<boolean> {
    let url_ = this.baseUrl + "/api/inspection/checkableFixedCost";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(updateCheckableFixedCostRequest);

    let options_: RequestInit = {
      body: content_,
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };

    return this.transformOptions(options_)
      .then((transformedOptions_) => {
        return this.http.fetch(url_, transformedOptions_);
      })
      .then((_response: Response) => {
        return this.transformResult(url_, _response, (_response: Response) =>
          this.processCheckFixedCost(_response)
        );
      });
  }

  protected processCheckFixedCost(response: Response): Promise<boolean> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && response.headers.forEach) {
      response.headers.forEach((v: any, k: any) => (_headers[k] = v));
    }
    if (status === 200) {
      return response.text().then((_responseText) => {
        let result200: any = null;
        let resultData200 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = resultData200 !== undefined ? resultData200 : <any>null;

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
        return throwException(
          "An unexpected server error occurred.",
          status,
          _responseText,
          _headers
        );
      });
    }
    return Promise.resolve<boolean>(null as any);
  }

  /**
   * @return Success
   */
  updateMonthlyBudgetEnpoint(
    monthlyBudgetUDto: MonthlyBudgetUDto
  ): Promise<MonthlyBudgetUResponse> {
    let url_ = this.baseUrl + "/api/inspection/monthlyBudget";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(monthlyBudgetUDto);

    let options_: RequestInit = {
      body: content_,
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };

    return this.transformOptions(options_)
      .then((transformedOptions_) => {
        return this.http.fetch(url_, transformedOptions_);
      })
      .then((_response: Response) => {
        return this.transformResult(url_, _response, (_response: Response) =>
          this.processUpdateMonthlyBudgetEnpoint(_response)
        );
      });
  }

  protected processUpdateMonthlyBudgetEnpoint(
    response: Response
  ): Promise<MonthlyBudgetUResponse> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && response.headers.forEach) {
      response.headers.forEach((v: any, k: any) => (_headers[k] = v));
    }
    if (status === 200) {
      return response.text().then((_responseText) => {
        let result200: any = null;
        let resultData200 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = MonthlyBudgetUResponse.fromJS(resultData200);
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
        return throwException(
          "An unexpected server error occurred.",
          status,
          _responseText,
          _headers
        );
      });
    }
    return Promise.resolve<MonthlyBudgetUResponse>(null as any);
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
  private http: {
    fetch(url: RequestInfo, init?: RequestInit): Promise<Response>;
  };
  private baseUrl: string;
  protected jsonParseReviver: ((key: string, value: any) => any) | undefined =
    undefined;

  constructor(
    baseUrl?: string,
    http?: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> }
  ) {
    super();
    this.http = http ? http : (window as any);
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
        Accept: "application/json",
      },
    };

    return this.transformOptions(options_)
      .then((transformedOptions_) => {
        return this.http.fetch(url_, transformedOptions_);
      })
      .then((_response: Response) => {
        return this.transformResult(url_, _response, (_response: Response) =>
          this.processLoginUserEndpoint(_response)
        );
      });
  }

  protected processLoginUserEndpoint(
    response: Response
  ): Promise<LoginResponse> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && response.headers.forEach) {
      response.headers.forEach((v: any, k: any) => (_headers[k] = v));
    }
    if (status === 200) {
      return response.text().then((_responseText) => {
        let result200: any = null;
        let resultData200 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = LoginResponse.fromJS(resultData200);
        return result200;
      });
    } else if (status === 400) {
      return response.text().then((_responseText) => {
        let result400: any = null;
        let resultData400 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result400 = ErrorResponse.fromJS(resultData400);
        return throwException(
          "Bad Request",
          status,
          _responseText,
          _headers,
          result400
        );
      });
    } else if (status !== 200 && status !== 204) {
      return response.text().then((_responseText) => {
        return throwException(
          "An unexpected server error occurred.",
          status,
          _responseText,
          _headers
        );
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
  refreshAuthTokenEndpoint(
    refreshAuthTokenRequest: RefreshAuthTokenRequest
  ): Promise<RefreshAuthTokenResponse>;
}

export class RefreshClient extends BaseAPIClient implements IRefreshClient {
  private http: {
    fetch(url: RequestInfo, init?: RequestInit): Promise<Response>;
  };
  private baseUrl: string;
  protected jsonParseReviver: ((key: string, value: any) => any) | undefined =
    undefined;

  constructor(
    baseUrl?: string,
    http?: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> }
  ) {
    super();
    this.http = http ? http : (window as any);
    this.baseUrl = this.getBaseUrl("https://localhost:53084", baseUrl);
  }

  /**
   * Refresh Auth Token with refreshToken
   * @return Returns JWT token
   */
  refreshAuthTokenEndpoint(
    refreshAuthTokenRequest: RefreshAuthTokenRequest
  ): Promise<RefreshAuthTokenResponse> {
    let url_ = this.baseUrl + "/api/refresh";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(refreshAuthTokenRequest);

    let options_: RequestInit = {
      body: content_,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };

    return this.transformOptions(options_)
      .then((transformedOptions_) => {
        return this.http.fetch(url_, transformedOptions_);
      })
      .then((_response: Response) => {
        return this.transformResult(url_, _response, (_response: Response) =>
          this.processRefreshAuthTokenEndpoint(_response)
        );
      });
  }

  protected processRefreshAuthTokenEndpoint(
    response: Response
  ): Promise<RefreshAuthTokenResponse> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && response.headers.forEach) {
      response.headers.forEach((v: any, k: any) => (_headers[k] = v));
    }
    if (status === 200) {
      return response.text().then((_responseText) => {
        let result200: any = null;
        let resultData200 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = RefreshAuthTokenResponse.fromJS(resultData200);
        return result200;
      });
    } else if (status !== 200 && status !== 204) {
      return response.text().then((_responseText) => {
        return throwException(
          "An unexpected server error occurred.",
          status,
          _responseText,
          _headers
        );
      });
    }
    return Promise.resolve<RefreshAuthTokenResponse>(null as any);
  }
}

export interface IChargeClient {
  /**
   * Create Charge for User
   * @return Returns true
   */
  createChargeEndpoint(
    createChargeRequest: CreateChargeRequest
  ): Promise<CreateChargeRespone>;

  /**
   * @return Success
   */
  getChargesEndpoint(): Promise<GetChargesResponse>;

  /**
   * Updates Charge Data
   * @return Returns true
   */
  updateChargeEndpoint(
    updateChargeRequest: UpdateChargeRequest
  ): Promise<UpdateChargeResponse>;

  /**
   * @return Success
   */
  deleteChargeEndpoint(chargeId: number): Promise<any>;

  /**
   * @return Success
   */
  getChargesByInterval(timeIntervalKey: number): Promise<ChargeDto[]>;
}

export class ChargeClient extends BaseAPIClient implements IChargeClient {
  private http: {
    fetch(url: RequestInfo, init?: RequestInit): Promise<Response>;
  };
  private baseUrl: string;
  protected jsonParseReviver: ((key: string, value: any) => any) | undefined =
    undefined;

  constructor(
    baseUrl?: string,
    http?: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> }
  ) {
    super();
    this.http = http ? http : (window as any);
    this.baseUrl = this.getBaseUrl("https://localhost:53084", baseUrl);
  }

  /**
   * Create Charge for User
   * @return Returns true
   */
  createChargeEndpoint(
    createChargeRequest: CreateChargeRequest
  ): Promise<CreateChargeRespone> {
    let url_ = this.baseUrl + "/api/charge";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(createChargeRequest);

    let options_: RequestInit = {
      body: content_,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };

    return this.transformOptions(options_)
      .then((transformedOptions_) => {
        return this.http.fetch(url_, transformedOptions_);
      })
      .then((_response: Response) => {
        return this.transformResult(url_, _response, (_response: Response) =>
          this.processCreateChargeEndpoint(_response)
        );
      });
  }

  protected processCreateChargeEndpoint(
    response: Response
  ): Promise<CreateChargeRespone> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && response.headers.forEach) {
      response.headers.forEach((v: any, k: any) => (_headers[k] = v));
    }
    if (status === 200) {
      return response.text().then((_responseText) => {
        let result200: any = null;
        let resultData200 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = CreateChargeRespone.fromJS(resultData200);
        return result200;
      });
    } else if (status === 401) {
      return response.text().then((_responseText) => {
        return throwException("Unauthorized", status, _responseText, _headers);
      });
    } else if (status === 403) {
      return response.text().then((_responseText) => {
        return throwException("Return false", status, _responseText, _headers);
      });
    } else if (status !== 200 && status !== 204) {
      return response.text().then((_responseText) => {
        return throwException(
          "An unexpected server error occurred.",
          status,
          _responseText,
          _headers
        );
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
        Accept: "application/json",
      },
    };

    return this.transformOptions(options_)
      .then((transformedOptions_) => {
        return this.http.fetch(url_, transformedOptions_);
      })
      .then((_response: Response) => {
        return this.transformResult(url_, _response, (_response: Response) =>
          this.processGetChargesEndpoint(_response)
        );
      });
  }

  protected processGetChargesEndpoint(
    response: Response
  ): Promise<GetChargesResponse> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && response.headers.forEach) {
      response.headers.forEach((v: any, k: any) => (_headers[k] = v));
    }
    if (status === 200) {
      return response.text().then((_responseText) => {
        let result200: any = null;
        let resultData200 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
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
        return throwException(
          "An unexpected server error occurred.",
          status,
          _responseText,
          _headers
        );
      });
    }
    return Promise.resolve<GetChargesResponse>(null as any);
  }

  /**
   * Updates Charge Data
   * @return Returns true
   */
  updateChargeEndpoint(
    updateChargeRequest: UpdateChargeRequest
  ): Promise<UpdateChargeResponse> {
    let url_ = this.baseUrl + "/api/charge";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(updateChargeRequest);

    let options_: RequestInit = {
      body: content_,
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };

    return this.transformOptions(options_)
      .then((transformedOptions_) => {
        return this.http.fetch(url_, transformedOptions_);
      })
      .then((_response: Response) => {
        return this.transformResult(url_, _response, (_response: Response) =>
          this.processUpdateChargeEndpoint(_response)
        );
      });
  }

  protected processUpdateChargeEndpoint(
    response: Response
  ): Promise<UpdateChargeResponse> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && response.headers.forEach) {
      response.headers.forEach((v: any, k: any) => (_headers[k] = v));
    }
    if (status === 200) {
      return response.text().then((_responseText) => {
        let result200: any = null;
        let resultData200 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = UpdateChargeResponse.fromJS(resultData200);
        return result200;
      });
    } else if (status === 401) {
      return response.text().then((_responseText) => {
        return throwException("Unauthorized", status, _responseText, _headers);
      });
    } else if (status === 403) {
      return response.text().then((_responseText) => {
        return throwException("Return false", status, _responseText, _headers);
      });
    } else if (status !== 200 && status !== 204) {
      return response.text().then((_responseText) => {
        return throwException(
          "An unexpected server error occurred.",
          status,
          _responseText,
          _headers
        );
      });
    }
    return Promise.resolve<UpdateChargeResponse>(null as any);
  }

  /**
   * @return Success
   */
  deleteChargeEndpoint(chargeId: number): Promise<any> {
    let url_ = this.baseUrl + "/api/charge/{ChargeId}";
    if (chargeId === undefined || chargeId === null)
      throw new Error("The parameter 'chargeId' must be defined.");
    url_ = url_.replace("{ChargeId}", encodeURIComponent("" + chargeId));
    url_ = url_.replace(/[?&]$/, "");

    let options_: RequestInit = {
      method: "DELETE",
      headers: {
        Accept: "text/plain",
      },
    };

    return this.transformOptions(options_)
      .then((transformedOptions_) => {
        return this.http.fetch(url_, transformedOptions_);
      })
      .then((_response: Response) => {
        return this.transformResult(url_, _response, (_response: Response) =>
          this.processDeleteChargeEndpoint(_response)
        );
      });
  }

  protected processDeleteChargeEndpoint(response: Response): Promise<any> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && response.headers.forEach) {
      response.headers.forEach((v: any, k: any) => (_headers[k] = v));
    }
    if (status === 200) {
      return response.text().then((_responseText) => {
        let result200: any = null;
        let resultData200 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = resultData200 !== undefined ? resultData200 : <any>null;

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
        return throwException(
          "An unexpected server error occurred.",
          status,
          _responseText,
          _headers
        );
      });
    }
    return Promise.resolve<any>(null as any);
  }

  /**
   * @return Success
   */
  getChargesByInterval(timeIntervalKey: number): Promise<ChargeDto[]> {
    let url_ = this.baseUrl + "/api/charge/byTimeInterval?";
    if (timeIntervalKey === undefined || timeIntervalKey === null)
      throw new Error(
        "The parameter 'timeIntervalKey' must be defined and cannot be null."
      );
    else
      url_ +=
        "TimeIntervalKey=" + encodeURIComponent("" + timeIntervalKey) + "&";
    url_ = url_.replace(/[?&]$/, "");

    let options_: RequestInit = {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    };

    return this.transformOptions(options_)
      .then((transformedOptions_) => {
        return this.http.fetch(url_, transformedOptions_);
      })
      .then((_response: Response) => {
        return this.transformResult(url_, _response, (_response: Response) =>
          this.processGetChargesByInterval(_response)
        );
      });
  }

  protected processGetChargesByInterval(
    response: Response
  ): Promise<ChargeDto[]> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && response.headers.forEach) {
      response.headers.forEach((v: any, k: any) => (_headers[k] = v));
    }
    if (status === 200) {
      return response.text().then((_responseText) => {
        let result200: any = null;
        let resultData200 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        if (Array.isArray(resultData200)) {
          result200 = [] as any;
          for (let item of resultData200)
            result200!.push(ChargeDto.fromJS(item));
        } else {
          result200 = <any>null;
        }
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
        return throwException(
          "An unexpected server error occurred.",
          status,
          _responseText,
          _headers
        );
      });
    }
    return Promise.resolve<ChargeDto[]>(null as any);
  }
}

export interface IBudgetClient {
  /**
   * @return Success
   */
  createBudgetEndpoint(
    cBudgetRequest: CBudgetRequest
  ): Promise<CBudgetResponse>;

  /**
   * @return Success
   */
  getBudgetsEndpoint(): Promise<GetBudgetsResponse>;

  /**
   * Updates Charge Data
   * @return Returns true
   */
  updateButgetEndpoint(
    updateBudgetRequest: UpdateBudgetRequest
  ): Promise<UpdateBudgetResponse2>;

  /**
   * @return Success
   */
  deleteBudgetEndpoint(budgetId: number): Promise<any>;

  /**
   * Gets Budget with Charges
   * @return Returns Budget
   */
  getBudgetByIdEndpoint(
    budgetId: string | null
  ): Promise<GetBudgetWithChargesResponse>;
}

export class BudgetClient extends BaseAPIClient implements IBudgetClient {
  private http: {
    fetch(url: RequestInfo, init?: RequestInit): Promise<Response>;
  };
  private baseUrl: string;
  protected jsonParseReviver: ((key: string, value: any) => any) | undefined =
    undefined;

  constructor(
    baseUrl?: string,
    http?: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> }
  ) {
    super();
    this.http = http ? http : (window as any);
    this.baseUrl = this.getBaseUrl("https://localhost:53084", baseUrl);
  }

  /**
   * @return Success
   */
  createBudgetEndpoint(
    cBudgetRequest: CBudgetRequest
  ): Promise<CBudgetResponse> {
    let url_ = this.baseUrl + "/api/budget";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(cBudgetRequest);

    let options_: RequestInit = {
      body: content_,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };

    return this.transformOptions(options_)
      .then((transformedOptions_) => {
        return this.http.fetch(url_, transformedOptions_);
      })
      .then((_response: Response) => {
        return this.transformResult(url_, _response, (_response: Response) =>
          this.processCreateBudgetEndpoint(_response)
        );
      });
  }

  protected processCreateBudgetEndpoint(
    response: Response
  ): Promise<CBudgetResponse> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && response.headers.forEach) {
      response.headers.forEach((v: any, k: any) => (_headers[k] = v));
    }
    if (status === 200) {
      return response.text().then((_responseText) => {
        let result200: any = null;
        let resultData200 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = CBudgetResponse.fromJS(resultData200);
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
        return throwException(
          "An unexpected server error occurred.",
          status,
          _responseText,
          _headers
        );
      });
    }
    return Promise.resolve<CBudgetResponse>(null as any);
  }

  /**
   * @return Success
   */
  getBudgetsEndpoint(): Promise<GetBudgetsResponse> {
    let url_ = this.baseUrl + "/api/budget";
    url_ = url_.replace(/[?&]$/, "");

    let options_: RequestInit = {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    };

    return this.transformOptions(options_)
      .then((transformedOptions_) => {
        return this.http.fetch(url_, transformedOptions_);
      })
      .then((_response: Response) => {
        return this.transformResult(url_, _response, (_response: Response) =>
          this.processGetBudgetsEndpoint(_response)
        );
      });
  }

  protected processGetBudgetsEndpoint(
    response: Response
  ): Promise<GetBudgetsResponse> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && response.headers.forEach) {
      response.headers.forEach((v: any, k: any) => (_headers[k] = v));
    }
    if (status === 200) {
      return response.text().then((_responseText) => {
        let result200: any = null;
        let resultData200 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = GetBudgetsResponse.fromJS(resultData200);
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
        return throwException(
          "An unexpected server error occurred.",
          status,
          _responseText,
          _headers
        );
      });
    }
    return Promise.resolve<GetBudgetsResponse>(null as any);
  }

  /**
   * Updates Charge Data
   * @return Returns true
   */
  updateButgetEndpoint(
    updateBudgetRequest: UpdateBudgetRequest
  ): Promise<UpdateBudgetResponse2> {
    let url_ = this.baseUrl + "/api/budget";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(updateBudgetRequest);

    let options_: RequestInit = {
      body: content_,
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };

    return this.transformOptions(options_)
      .then((transformedOptions_) => {
        return this.http.fetch(url_, transformedOptions_);
      })
      .then((_response: Response) => {
        return this.transformResult(url_, _response, (_response: Response) =>
          this.processUpdateButgetEndpoint(_response)
        );
      });
  }

  protected processUpdateButgetEndpoint(
    response: Response
  ): Promise<UpdateBudgetResponse2> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && response.headers.forEach) {
      response.headers.forEach((v: any, k: any) => (_headers[k] = v));
    }
    if (status === 200) {
      return response.text().then((_responseText) => {
        let result200: any = null;
        let resultData200 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = UpdateBudgetResponse2.fromJS(resultData200);
        return result200;
      });
    } else if (status === 401) {
      return response.text().then((_responseText) => {
        return throwException("Unauthorized", status, _responseText, _headers);
      });
    } else if (status === 403) {
      return response.text().then((_responseText) => {
        return throwException("Return false", status, _responseText, _headers);
      });
    } else if (status !== 200 && status !== 204) {
      return response.text().then((_responseText) => {
        return throwException(
          "An unexpected server error occurred.",
          status,
          _responseText,
          _headers
        );
      });
    }
    return Promise.resolve<UpdateBudgetResponse2>(null as any);
  }

  /**
   * @return Success
   */
  deleteBudgetEndpoint(budgetId: number): Promise<any> {
    let url_ = this.baseUrl + "/api/budget/{BudgetId}";
    if (budgetId === undefined || budgetId === null)
      throw new Error("The parameter 'budgetId' must be defined.");
    url_ = url_.replace("{BudgetId}", encodeURIComponent("" + budgetId));
    url_ = url_.replace(/[?&]$/, "");

    let options_: RequestInit = {
      method: "DELETE",
      headers: {
        Accept: "text/plain",
      },
    };

    return this.transformOptions(options_)
      .then((transformedOptions_) => {
        return this.http.fetch(url_, transformedOptions_);
      })
      .then((_response: Response) => {
        return this.transformResult(url_, _response, (_response: Response) =>
          this.processDeleteBudgetEndpoint(_response)
        );
      });
  }

  protected processDeleteBudgetEndpoint(response: Response): Promise<any> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && response.headers.forEach) {
      response.headers.forEach((v: any, k: any) => (_headers[k] = v));
    }
    if (status === 200) {
      return response.text().then((_responseText) => {
        let result200: any = null;
        let resultData200 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = resultData200 !== undefined ? resultData200 : <any>null;

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
        return throwException(
          "An unexpected server error occurred.",
          status,
          _responseText,
          _headers
        );
      });
    }
    return Promise.resolve<any>(null as any);
  }

  /**
   * Gets Budget with Charges
   * @return Returns Budget
   */
  getBudgetByIdEndpoint(
    budgetId: string | null
  ): Promise<GetBudgetWithChargesResponse> {
    let url_ = this.baseUrl + "/api/budget/{BudgetId}";
    if (budgetId === undefined || budgetId === null)
      throw new Error("The parameter 'budgetId' must be defined.");
    url_ = url_.replace("{BudgetId}", encodeURIComponent("" + budgetId));
    url_ = url_.replace(/[?&]$/, "");

    let options_: RequestInit = {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    };

    return this.transformOptions(options_)
      .then((transformedOptions_) => {
        return this.http.fetch(url_, transformedOptions_);
      })
      .then((_response: Response) => {
        return this.transformResult(url_, _response, (_response: Response) =>
          this.processGetBudgetByIdEndpoint(_response)
        );
      });
  }

  protected processGetBudgetByIdEndpoint(
    response: Response
  ): Promise<GetBudgetWithChargesResponse> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && response.headers.forEach) {
      response.headers.forEach((v: any, k: any) => (_headers[k] = v));
    }
    if (status === 200) {
      return response.text().then((_responseText) => {
        let result200: any = null;
        let resultData200 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = GetBudgetWithChargesResponse.fromJS(resultData200);
        return result200;
      });
    } else if (status === 401) {
      return response.text().then((_responseText) => {
        return throwException("Unauthorized", status, _responseText, _headers);
      });
    } else if (status === 403) {
      return response.text().then((_responseText) => {
        return throwException("Return false", status, _responseText, _headers);
      });
    } else if (status !== 200 && status !== 204) {
      return response.text().then((_responseText) => {
        return throwException(
          "An unexpected server error occurred.",
          status,
          _responseText,
          _headers
        );
      });
    }
    return Promise.resolve<GetBudgetWithChargesResponse>(null as any);
  }
}

export class CreateUserResponse implements ICreateUserResponse {
  keycloakResponse?: KeyCloakSuccessfullLoginResponse;
  personInfo?: UserDto;

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
      this.keycloakResponse = _data["keycloakResponse"]
        ? KeyCloakSuccessfullLoginResponse.fromJS(_data["keycloakResponse"])
        : <any>undefined;
      this.personInfo = _data["personInfo"]
        ? UserDto.fromJS(_data["personInfo"])
        : <any>undefined;
    }
  }

  static fromJS(data: any): CreateUserResponse {
    data = typeof data === "object" ? data : {};
    let result = new CreateUserResponse();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["keycloakResponse"] = this.keycloakResponse
      ? this.keycloakResponse.toJSON()
      : <any>undefined;
    data["personInfo"] = this.personInfo
      ? this.personInfo.toJSON()
      : <any>undefined;
    return data;
  }
}

export interface ICreateUserResponse {
  keycloakResponse?: KeyCloakSuccessfullLoginResponse;
  personInfo?: UserDto;
}

export class KeyCloakSuccessfullLoginResponse
  implements IKeyCloakSuccessfullLoginResponse
{
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
    data = typeof data === "object" ? data : {};
    let result = new KeyCloakSuccessfullLoginResponse();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["access_token"] = this.access_token;
    data["expires_in"] = this.expires_in;
    data["refresh_expires_in"] = this.refresh_expires_in;
    data["refresh_token"] = this.refresh_token;
    data["token_type"] = this.token_type;
    return data;
  }
}

export interface IKeyCloakSuccessfullLoginResponse {
  access_token?: string;
  expires_in?: number;
  refresh_expires_in?: number;
  refresh_token?: string;
  token_type?: string;
}

export class UserDto implements IUserDto {
  id?: number;
  keycloakUserId?: string;
  username?: string;
  firstname?: string;
  lastName?: string;
  email?: string;
  createdAt?: Date;

  constructor(data?: IUserDto) {
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
      this.createdAt = _data["createdAt"]
        ? new Date(_data["createdAt"].toString())
        : <any>undefined;
    }
  }

  static fromJS(data: any): UserDto {
    data = typeof data === "object" ? data : {};
    let result = new UserDto();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["id"] = this.id;
    data["keycloakUserId"] = this.keycloakUserId;
    data["username"] = this.username;
    data["firstname"] = this.firstname;
    data["lastName"] = this.lastName;
    data["email"] = this.email;
    data["createdAt"] = this.createdAt
      ? this.createdAt.toISOString()
      : <any>undefined;
    return data;
  }
}

export interface IUserDto {
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
      this.user = _data["user"]
        ? KeycloakUser.fromJS(_data["user"])
        : <any>undefined;
    }
  }

  static fromJS(data: any): CreateUserRequest {
    data = typeof data === "object" ? data : {};
    let result = new CreateUserRequest();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["user"] = this.user ? this.user.toJSON() : <any>undefined;
    return data;
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
    data = typeof data === "object" ? data : {};
    let result = new KeycloakUser();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
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
    data = typeof data === "object" ? data : {};
    let result = new Credential();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["type"] = this.type;
    data["value"] = this.value;
    data["temporary"] = this.temporary;
    return data;
  }
}

export interface ICredential {
  type?: string;
  value?: string;
  temporary?: boolean;
}

export class UpdateDepositsResponse implements IUpdateDepositsResponse {
  deposits?: DepositRateDto[];

  constructor(data?: IUpdateDepositsResponse) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      if (Array.isArray(_data["deposits"])) {
        this.deposits = [] as any;
        for (let item of _data["deposits"])
          this.deposits!.push(DepositRateDto.fromJS(item));
      }
    }
  }

  static fromJS(data: any): UpdateDepositsResponse {
    data = typeof data === "object" ? data : {};
    let result = new UpdateDepositsResponse();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    if (Array.isArray(this.deposits)) {
      data["deposits"] = [];
      for (let item of this.deposits) data["deposits"].push(item.toJSON());
    }
    return data;
  }
}

export interface IUpdateDepositsResponse {
  deposits?: DepositRateDto[];
}

export class DepositRateDto implements IDepositRateDto {
  id?: number;
  key?: string;
  value?: number;
  isPaid?: boolean;
  savingMonth?: Date;

  constructor(data?: IDepositRateDto) {
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
      this.key = _data["key"];
      this.value = _data["value"];
      this.isPaid = _data["isPaid"];
      this.savingMonth = _data["savingMonth"]
        ? new Date(_data["savingMonth"].toString())
        : <any>undefined;
    }
  }

  static fromJS(data: any): DepositRateDto {
    data = typeof data === "object" ? data : {};
    let result = new DepositRateDto();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["id"] = this.id;
    data["key"] = this.key;
    data["value"] = this.value;
    data["isPaid"] = this.isPaid;
    data["savingMonth"] = this.savingMonth
      ? this.savingMonth.toISOString()
      : <any>undefined;
    return data;
  }
}

export interface IDepositRateDto {
  id?: number;
  key?: string;
  value?: number;
  isPaid?: boolean;
  savingMonth?: Date;
}

export class DepositsUDto implements IDepositsUDto {
  savingGoalId?: number;
  depositUDto?: DepositRateDto;

  constructor(data?: IDepositsUDto) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.savingGoalId = _data["savingGoalId"];
      this.depositUDto = _data["depositUDto"]
        ? DepositRateDto.fromJS(_data["depositUDto"])
        : <any>undefined;
    }
  }

  static fromJS(data: any): DepositsUDto {
    data = typeof data === "object" ? data : {};
    let result = new DepositsUDto();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["savingGoalId"] = this.savingGoalId;
    data["depositUDto"] = this.depositUDto
      ? this.depositUDto.toJSON()
      : <any>undefined;
    return data;
  }
}

export interface IDepositsUDto {
  savingGoalId?: number;
  depositUDto?: DepositRateDto;
}

export class SavingGoalDto implements ISavingGoalDto {
  id?: number;
  name?: string;
  goalValue?: number;
  initialCapital?: number;
  depositRate?: number;
  methodKey?: number;
  startDate?: Date;
  endDate?: Date;
  depositRates?: DepositRateDto[] | undefined;
  currentSaving?: number;
  totalRates?: number;
  userId?: string;

  constructor(data?: ISavingGoalDto) {
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
      this.goalValue = _data["goalValue"];
      this.initialCapital = _data["initialCapital"];
      this.depositRate = _data["depositRate"];
      this.methodKey = _data["methodKey"];
      this.startDate = _data["startDate"]
        ? new Date(_data["startDate"].toString())
        : <any>undefined;
      this.endDate = _data["endDate"]
        ? new Date(_data["endDate"].toString())
        : <any>undefined;
      if (Array.isArray(_data["depositRates"])) {
        this.depositRates = [] as any;
        for (let item of _data["depositRates"])
          this.depositRates!.push(DepositRateDto.fromJS(item));
      }
      this.currentSaving = _data["currentSaving"];
      this.totalRates = _data["totalRates"];
      this.userId = _data["userId"];
    }
  }

  static fromJS(data: any): SavingGoalDto {
    data = typeof data === "object" ? data : {};
    let result = new SavingGoalDto();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["id"] = this.id;
    data["name"] = this.name;
    data["goalValue"] = this.goalValue;
    data["initialCapital"] = this.initialCapital;
    data["depositRate"] = this.depositRate;
    data["methodKey"] = this.methodKey;
    data["startDate"] = this.startDate
      ? this.startDate.toISOString()
      : <any>undefined;
    data["endDate"] = this.endDate
      ? this.endDate.toISOString()
      : <any>undefined;
    if (Array.isArray(this.depositRates)) {
      data["depositRates"] = [];
      for (let item of this.depositRates)
        data["depositRates"].push(item.toJSON());
    }
    data["currentSaving"] = this.currentSaving;
    data["totalRates"] = this.totalRates;
    data["userId"] = this.userId;
    return data;
  }
}

export interface ISavingGoalDto {
  id?: number;
  name?: string;
  goalValue?: number;
  initialCapital?: number;
  depositRate?: number;
  methodKey?: number;
  startDate?: Date;
  endDate?: Date;
  depositRates?: DepositRateDto[] | undefined;
  currentSaving?: number;
  totalRates?: number;
  userId?: string;
}

export class SavingGoalCDto implements ISavingGoalCDto {
  name?: string;
  goalValue?: number;
  initialCapital?: number;
  depositRate?: number;
  methodKey?: number;
  depositRates?: DepositRateDto[];
  startDate?: Date;
  endDate?: Date;

  constructor(data?: ISavingGoalCDto) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.name = _data["name"];
      this.goalValue = _data["goalValue"];
      this.initialCapital = _data["initialCapital"];
      this.depositRate = _data["depositRate"];
      this.methodKey = _data["methodKey"];
      if (Array.isArray(_data["depositRates"])) {
        this.depositRates = [] as any;
        for (let item of _data["depositRates"])
          this.depositRates!.push(DepositRateDto.fromJS(item));
      }
      this.startDate = _data["startDate"]
        ? new Date(_data["startDate"].toString())
        : <any>undefined;
      this.endDate = _data["endDate"]
        ? new Date(_data["endDate"].toString())
        : <any>undefined;
    }
  }

  static fromJS(data: any): SavingGoalCDto {
    data = typeof data === "object" ? data : {};
    let result = new SavingGoalCDto();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["name"] = this.name;
    data["goalValue"] = this.goalValue;
    data["initialCapital"] = this.initialCapital;
    data["depositRate"] = this.depositRate;
    data["methodKey"] = this.methodKey;
    if (Array.isArray(this.depositRates)) {
      data["depositRates"] = [];
      for (let item of this.depositRates)
        data["depositRates"].push(item.toJSON());
    }
    data["startDate"] = this.startDate
      ? this.startDate.toISOString()
      : <any>undefined;
    data["endDate"] = this.endDate
      ? this.endDate.toISOString()
      : <any>undefined;
    return data;
  }
}

export interface ISavingGoalCDto {
  name?: string;
  goalValue?: number;
  initialCapital?: number;
  depositRate?: number;
  methodKey?: number;
  depositRates?: DepositRateDto[];
  startDate?: Date;
  endDate?: Date;
}

export class DeleteCreditRequest implements IDeleteCreditRequest {
  constructor(data?: IDeleteCreditRequest) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {}

  static fromJS(data: any): DeleteCreditRequest {
    data = typeof data === "object" ? data : {};
    let result = new DeleteCreditRequest();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    return data;
  }
}

export interface IDeleteCreditRequest {}

export class GetAllSavingGoalsResponse implements IGetAllSavingGoalsResponse {
  savingGoalOptions?: SavingGoalOption[];

  constructor(data?: IGetAllSavingGoalsResponse) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      if (Array.isArray(_data["savingGoalOptions"])) {
        this.savingGoalOptions = [] as any;
        for (let item of _data["savingGoalOptions"])
          this.savingGoalOptions!.push(SavingGoalOption.fromJS(item));
      }
    }
  }

  static fromJS(data: any): GetAllSavingGoalsResponse {
    data = typeof data === "object" ? data : {};
    let result = new GetAllSavingGoalsResponse();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    if (Array.isArray(this.savingGoalOptions)) {
      data["savingGoalOptions"] = [];
      for (let item of this.savingGoalOptions)
        data["savingGoalOptions"].push(item.toJSON());
    }
    return data;
  }
}

export interface IGetAllSavingGoalsResponse {
  savingGoalOptions?: SavingGoalOption[];
}

export class SavingGoalOption implements ISavingGoalOption {
  id?: number;
  name?: string;

  constructor(data?: ISavingGoalOption) {
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
    }
  }

  static fromJS(data: any): SavingGoalOption {
    data = typeof data === "object" ? data : {};
    let result = new SavingGoalOption();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["id"] = this.id;
    data["name"] = this.name;
    return data;
  }
}

export interface ISavingGoalOption {
  id?: number;
  name?: string;
}

export class GetAllSavingGoalsRequest implements IGetAllSavingGoalsRequest {
  constructor(data?: IGetAllSavingGoalsRequest) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {}

  static fromJS(data: any): GetAllSavingGoalsRequest {
    data = typeof data === "object" ? data : {};
    let result = new GetAllSavingGoalsRequest();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    return data;
  }
}

export interface IGetAllSavingGoalsRequest {}

export class GetSavingGoalResponse implements IGetSavingGoalResponse {
  savingGoalDto?: SavingGoalDto;

  constructor(data?: IGetSavingGoalResponse) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.savingGoalDto = _data["savingGoalDto"]
        ? SavingGoalDto.fromJS(_data["savingGoalDto"])
        : <any>undefined;
    }
  }

  static fromJS(data: any): GetSavingGoalResponse {
    data = typeof data === "object" ? data : {};
    let result = new GetSavingGoalResponse();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["savingGoalDto"] = this.savingGoalDto
      ? this.savingGoalDto.toJSON()
      : <any>undefined;
    return data;
  }
}

export interface IGetSavingGoalResponse {
  savingGoalDto?: SavingGoalDto;
}

export class GetSavingGoalRequest implements IGetSavingGoalRequest {
  constructor(data?: IGetSavingGoalRequest) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {}

  static fromJS(data: any): GetSavingGoalRequest {
    data = typeof data === "object" ? data : {};
    let result = new GetSavingGoalRequest();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    return data;
  }
}

export interface IGetSavingGoalRequest {}

export class UpdateDepositRatesResponse implements IUpdateDepositRatesResponse {
  savingGoal?: SavingGoalDto;

  constructor(data?: IUpdateDepositRatesResponse) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.savingGoal = _data["savingGoal"]
        ? SavingGoalDto.fromJS(_data["savingGoal"])
        : <any>undefined;
    }
  }

  static fromJS(data: any): UpdateDepositRatesResponse {
    data = typeof data === "object" ? data : {};
    let result = new UpdateDepositRatesResponse();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["savingGoal"] = this.savingGoal
      ? this.savingGoal.toJSON()
      : <any>undefined;
    return data;
  }
}

export interface IUpdateDepositRatesResponse {
  savingGoal?: SavingGoalDto;
}

export class UpdateDepositRatesRequest implements IUpdateDepositRatesRequest {
  savingGoalId?: number;
  updatedDepositRates?: DepositRateDto[];
  newDateRate?: number;

  constructor(data?: IUpdateDepositRatesRequest) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.savingGoalId = _data["savingGoalId"];
      if (Array.isArray(_data["updatedDepositRates"])) {
        this.updatedDepositRates = [] as any;
        for (let item of _data["updatedDepositRates"])
          this.updatedDepositRates!.push(DepositRateDto.fromJS(item));
      }
      this.newDateRate = _data["newDateRate"];
    }
  }

  static fromJS(data: any): UpdateDepositRatesRequest {
    data = typeof data === "object" ? data : {};
    let result = new UpdateDepositRatesRequest();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["savingGoalId"] = this.savingGoalId;
    if (Array.isArray(this.updatedDepositRates)) {
      data["updatedDepositRates"] = [];
      for (let item of this.updatedDepositRates)
        data["updatedDepositRates"].push(item.toJSON());
    }
    data["newDateRate"] = this.newDateRate;
    return data;
  }
}

export interface IUpdateDepositRatesRequest {
  savingGoalId?: number;
  updatedDepositRates?: DepositRateDto[];
  newDateRate?: number;
}

export class DepositRatelCResponse implements IDepositRatelCResponse {
  depositRateDto?: DepositRateDto;

  constructor(data?: IDepositRatelCResponse) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.depositRateDto = _data["depositRateDto"]
        ? DepositRateDto.fromJS(_data["depositRateDto"])
        : <any>undefined;
    }
  }

  static fromJS(data: any): DepositRatelCResponse {
    data = typeof data === "object" ? data : {};
    let result = new DepositRatelCResponse();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["depositRateDto"] = this.depositRateDto
      ? this.depositRateDto.toJSON()
      : <any>undefined;
    return data;
  }
}

export interface IDepositRatelCResponse {
  depositRateDto?: DepositRateDto;
}

export class DepositRateCDto implements IDepositRateCDto {
  savingGoalId?: number;
  key?: string;
  value?: number;
  savingMonth?: Date;
  isPaid?: boolean;

  constructor(data?: IDepositRateCDto) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.savingGoalId = _data["savingGoalId"];
      this.key = _data["key"];
      this.value = _data["value"];
      this.savingMonth = _data["savingMonth"]
        ? new Date(_data["savingMonth"].toString())
        : <any>undefined;
      this.isPaid = _data["isPaid"];
    }
  }

  static fromJS(data: any): DepositRateCDto {
    data = typeof data === "object" ? data : {};
    let result = new DepositRateCDto();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["savingGoalId"] = this.savingGoalId;
    data["key"] = this.key;
    data["value"] = this.value;
    data["savingMonth"] = this.savingMonth
      ? this.savingMonth.toISOString()
      : <any>undefined;
    data["isPaid"] = this.isPaid;
    return data;
  }
}

export interface IDepositRateCDto {
  savingGoalId?: number;
  key?: string;
  value?: number;
  savingMonth?: Date;
  isPaid?: boolean;
}

export class LazyLoadDepositRateResponse
  implements ILazyLoadDepositRateResponse
{
  depositRates?: DepositRateDto[];
  totalRates?: number;

  constructor(data?: ILazyLoadDepositRateResponse) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      if (Array.isArray(_data["depositRates"])) {
        this.depositRates = [] as any;
        for (let item of _data["depositRates"])
          this.depositRates!.push(DepositRateDto.fromJS(item));
      }
      this.totalRates = _data["totalRates"];
    }
  }

  static fromJS(data: any): LazyLoadDepositRateResponse {
    data = typeof data === "object" ? data : {};
    let result = new LazyLoadDepositRateResponse();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    if (Array.isArray(this.depositRates)) {
      data["depositRates"] = [];
      for (let item of this.depositRates)
        data["depositRates"].push(item.toJSON());
    }
    data["totalRates"] = this.totalRates;
    return data;
  }
}

export interface ILazyLoadDepositRateResponse {
  depositRates?: DepositRateDto[];
  totalRates?: number;
}

export class LazyLoadDepositRateRequest implements ILazyLoadDepositRateRequest {
  constructor(data?: ILazyLoadDepositRateRequest) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {}

  static fromJS(data: any): LazyLoadDepositRateRequest {
    data = typeof data === "object" ? data : {};
    let result = new LazyLoadDepositRateRequest();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    return data;
  }
}

export interface ILazyLoadDepositRateRequest {}

export class PayDepositRateDto implements IPayDepositRateDto {
  savingGoalId?: number;
  id?: number;

  constructor(data?: IPayDepositRateDto) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.savingGoalId = _data["savingGoalId"];
      this.id = _data["id"];
    }
  }

  static fromJS(data: any): PayDepositRateDto {
    data = typeof data === "object" ? data : {};
    let result = new PayDepositRateDto();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["savingGoalId"] = this.savingGoalId;
    data["id"] = this.id;
    return data;
  }
}

export interface IPayDepositRateDto {
  savingGoalId?: number;
  id?: number;
}

export class DepositRatelUResponse implements IDepositRatelUResponse {
  depositRateDto?: DepositRateDto;

  constructor(data?: IDepositRatelUResponse) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.depositRateDto = _data["depositRateDto"]
        ? DepositRateDto.fromJS(_data["depositRateDto"])
        : <any>undefined;
    }
  }

  static fromJS(data: any): DepositRatelUResponse {
    data = typeof data === "object" ? data : {};
    let result = new DepositRatelUResponse();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["depositRateDto"] = this.depositRateDto
      ? this.depositRateDto.toJSON()
      : <any>undefined;
    return data;
  }
}

export interface IDepositRatelUResponse {
  depositRateDto?: DepositRateDto;
}

export class DepositRateUDto implements IDepositRateUDto {
  savingGoalId?: number;
  id?: number;
  key?: string;
  value?: number;
  savingMonth?: Date;

  constructor(data?: IDepositRateUDto) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.savingGoalId = _data["savingGoalId"];
      this.id = _data["id"];
      this.key = _data["key"];
      this.value = _data["value"];
      this.savingMonth = _data["savingMonth"]
        ? new Date(_data["savingMonth"].toString())
        : <any>undefined;
    }
  }

  static fromJS(data: any): DepositRateUDto {
    data = typeof data === "object" ? data : {};
    let result = new DepositRateUDto();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["savingGoalId"] = this.savingGoalId;
    data["id"] = this.id;
    data["key"] = this.key;
    data["value"] = this.value;
    data["savingMonth"] = this.savingMonth
      ? this.savingMonth.toISOString()
      : <any>undefined;
    return data;
  }
}

export interface IDepositRateUDto {
  savingGoalId?: number;
  id?: number;
  key?: string;
  value?: number;
  savingMonth?: Date;
}

export class DeleteChargesRequest implements IDeleteChargesRequest {
  constructor(data?: IDeleteChargesRequest) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {}

  static fromJS(data: any): DeleteChargesRequest {
    data = typeof data === "object" ? data : {};
    let result = new DeleteChargesRequest();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    return data;
  }
}

export interface IDeleteChargesRequest {}

export class GroupCostCDto implements IGroupCostCDto {
  name?: string;

  constructor(data?: IGroupCostCDto) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.name = _data["name"];
    }
  }

  static fromJS(data: any): GroupCostCDto {
    data = typeof data === "object" ? data : {};
    let result = new GroupCostCDto();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["name"] = this.name;
    return data;
  }
}

export interface IGroupCostCDto {
  name?: string;
}

export class DeleteGroupCostRequest implements IDeleteGroupCostRequest {
  constructor(data?: IDeleteGroupCostRequest) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {}

  static fromJS(data: any): DeleteGroupCostRequest {
    data = typeof data === "object" ? data : {};
    let result = new DeleteGroupCostRequest();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    return data;
  }
}

export interface IDeleteGroupCostRequest {}

export class GetGroupCostResponse implements IGetGroupCostResponse {
  groupedCosts?: GroupCostDto[];

  constructor(data?: IGetGroupCostResponse) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      if (Array.isArray(_data["groupedCosts"])) {
        this.groupedCosts = [] as any;
        for (let item of _data["groupedCosts"])
          this.groupedCosts!.push(GroupCostDto.fromJS(item));
      }
    }
  }

  static fromJS(data: any): GetGroupCostResponse {
    data = typeof data === "object" ? data : {};
    let result = new GetGroupCostResponse();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    if (Array.isArray(this.groupedCosts)) {
      data["groupedCosts"] = [];
      for (let item of this.groupedCosts)
        data["groupedCosts"].push(item.toJSON());
    }
    return data;
  }
}

export interface IGetGroupCostResponse {
  groupedCosts?: GroupCostDto[];
}

export class GroupCostDto implements IGroupCostDto {
  id?: number;
  name?: string;
  userId?: string;
  fixedCosts?: FixedCostDto[] | undefined;

  constructor(data?: IGroupCostDto) {
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
      this.userId = _data["userId"];
      if (Array.isArray(_data["fixedCosts"])) {
        this.fixedCosts = [] as any;
        for (let item of _data["fixedCosts"])
          this.fixedCosts!.push(FixedCostDto.fromJS(item));
      }
    }
  }

  static fromJS(data: any): GroupCostDto {
    data = typeof data === "object" ? data : {};
    let result = new GroupCostDto();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["id"] = this.id;
    data["name"] = this.name;
    data["userId"] = this.userId;
    if (Array.isArray(this.fixedCosts)) {
      data["fixedCosts"] = [];
      for (let item of this.fixedCosts) data["fixedCosts"].push(item.toJSON());
    }
    return data;
  }
}

export interface IGroupCostDto {
  id?: number;
  name?: string;
  userId?: string;
  fixedCosts?: FixedCostDto[] | undefined;
}

export class FixedCostDto implements IFixedCostDto {
  id?: number;
  name?: string;
  value?: number;
  groupCostId?: number;
  costGroup?: GroupCost;
  timeInterval?: TimeInterval;

  constructor(data?: IFixedCostDto) {
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
      this.groupCostId = _data["groupCostId"];
      this.costGroup = _data["costGroup"]
        ? GroupCost.fromJS(_data["costGroup"])
        : <any>undefined;
      this.timeInterval = _data["timeInterval"];
    }
  }

  static fromJS(data: any): FixedCostDto {
    data = typeof data === "object" ? data : {};
    let result = new FixedCostDto();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["id"] = this.id;
    data["name"] = this.name;
    data["value"] = this.value;
    data["groupCostId"] = this.groupCostId;
    data["costGroup"] = this.costGroup
      ? this.costGroup.toJSON()
      : <any>undefined;
    data["timeInterval"] = this.timeInterval;
    return data;
  }
}

export interface IFixedCostDto {
  id?: number;
  name?: string;
  value?: number;
  groupCostId?: number;
  costGroup?: GroupCost;
  timeInterval?: TimeInterval;
}

export class GroupCost implements IGroupCost {
  id?: number;
  name?: string;
  fixedCosts?: FixedCost[] | undefined;
  userId?: string;

  constructor(data?: IGroupCost) {
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
      if (Array.isArray(_data["fixedCosts"])) {
        this.fixedCosts = [] as any;
        for (let item of _data["fixedCosts"])
          this.fixedCosts!.push(FixedCost.fromJS(item));
      }
      this.userId = _data["userId"];
    }
  }

  static fromJS(data: any): GroupCost {
    data = typeof data === "object" ? data : {};
    let result = new GroupCost();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["id"] = this.id;
    data["name"] = this.name;
    if (Array.isArray(this.fixedCosts)) {
      data["fixedCosts"] = [];
      for (let item of this.fixedCosts) data["fixedCosts"].push(item.toJSON());
    }
    data["userId"] = this.userId;
    return data;
  }
}

export interface IGroupCost {
  id?: number;
  name?: string;
  fixedCosts?: FixedCost[] | undefined;
  userId?: string;
}

export class FixedCost implements IFixedCost {
  id?: number;
  name?: string;
  value?: number;
  groupCostId?: number;
  groupCost?: GroupCost | undefined;
  timeInterval?: TimeInterval;

  constructor(data?: IFixedCost) {
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
      this.groupCostId = _data["groupCostId"];
      this.groupCost = _data["groupCost"]
        ? GroupCost.fromJS(_data["groupCost"])
        : <any>undefined;
      this.timeInterval = _data["timeInterval"];
    }
  }

  static fromJS(data: any): FixedCost {
    data = typeof data === "object" ? data : {};
    let result = new FixedCost();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["id"] = this.id;
    data["name"] = this.name;
    data["value"] = this.value;
    data["groupCostId"] = this.groupCostId;
    data["groupCost"] = this.groupCost
      ? this.groupCost.toJSON()
      : <any>undefined;
    data["timeInterval"] = this.timeInterval;
    return data;
  }
}

export interface IFixedCost {
  id?: number;
  name?: string;
  value?: number;
  groupCostId?: number;
  groupCost?: GroupCost | undefined;
  timeInterval?: TimeInterval;
}

export enum TimeInterval {
  Einmalig = 0,
  Wöchentlich = 1,
  Zweiwöchtentlich = 2,
  Monatlich = 3,
  Vierteljährlich = 4,
  Halbjährlich = 5,
  Jährlich = 6,
}

export class GetGroupCostRequest implements IGetGroupCostRequest {
  constructor(data?: IGetGroupCostRequest) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {}

  static fromJS(data: any): GetGroupCostRequest {
    data = typeof data === "object" ? data : {};
    let result = new GetGroupCostRequest();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    return data;
  }
}

export interface IGetGroupCostRequest {}

export class GroupCostUDto implements IGroupCostUDto {
  id?: number;
  name?: string;

  constructor(data?: IGroupCostUDto) {
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
    }
  }

  static fromJS(data: any): GroupCostUDto {
    data = typeof data === "object" ? data : {};
    let result = new GroupCostUDto();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["id"] = this.id;
    data["name"] = this.name;
    return data;
  }
}

export interface IGroupCostUDto {
  id?: number;
  name?: string;
}

export class CreateFixedCDto implements ICreateFixedCDto {
  name?: string;
  value?: number;
  groupCostId?: number;
  timeInterval?: TimeInterval;

  constructor(data?: ICreateFixedCDto) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.name = _data["name"];
      this.value = _data["value"];
      this.groupCostId = _data["groupCostId"];
      this.timeInterval = _data["timeInterval"];
    }
  }

  static fromJS(data: any): CreateFixedCDto {
    data = typeof data === "object" ? data : {};
    let result = new CreateFixedCDto();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["name"] = this.name;
    data["value"] = this.value;
    data["groupCostId"] = this.groupCostId;
    data["timeInterval"] = this.timeInterval;
    return data;
  }
}

export interface ICreateFixedCDto {
  name?: string;
  value?: number;
  groupCostId?: number;
  timeInterval?: TimeInterval;
}

export class DeleteFixedCostRequest implements IDeleteFixedCostRequest {
  constructor(data?: IDeleteFixedCostRequest) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {}

  static fromJS(data: any): DeleteFixedCostRequest {
    data = typeof data === "object" ? data : {};
    let result = new DeleteFixedCostRequest();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    return data;
  }
}

export interface IDeleteFixedCostRequest {}

export class GetAllFixedCostsEndpointResponse
  implements IGetAllFixedCostsEndpointResponse
{
  fixedCostGroups?: GroupCostDto[];

  constructor(data?: IGetAllFixedCostsEndpointResponse) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      if (Array.isArray(_data["fixedCostGroups"])) {
        this.fixedCostGroups = [] as any;
        for (let item of _data["fixedCostGroups"])
          this.fixedCostGroups!.push(GroupCostDto.fromJS(item));
      }
    }
  }

  static fromJS(data: any): GetAllFixedCostsEndpointResponse {
    data = typeof data === "object" ? data : {};
    let result = new GetAllFixedCostsEndpointResponse();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    if (Array.isArray(this.fixedCostGroups)) {
      data["fixedCostGroups"] = [];
      for (let item of this.fixedCostGroups)
        data["fixedCostGroups"].push(item.toJSON());
    }
    return data;
  }
}

export interface IGetAllFixedCostsEndpointResponse {
  fixedCostGroups?: GroupCostDto[];
}

export class GetAllFixedCostsRequest implements IGetAllFixedCostsRequest {
  constructor(data?: IGetAllFixedCostsRequest) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {}

  static fromJS(data: any): GetAllFixedCostsRequest {
    data = typeof data === "object" ? data : {};
    let result = new GetAllFixedCostsRequest();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    return data;
  }
}

export interface IGetAllFixedCostsRequest {}

export class GetFixedCostsByTimeIntervalResponse
  implements IGetFixedCostsByTimeIntervalResponse
{
  fixedCostsByTimeInterval?: {
    [key in keyof typeof TimeInterval]?: FixedCostDto[];
  };

  constructor(data?: IGetFixedCostsByTimeIntervalResponse) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      if (_data["fixedCostsByTimeInterval"]) {
        this.fixedCostsByTimeInterval = {} as any;
        for (let key in _data["fixedCostsByTimeInterval"]) {
          if (_data["fixedCostsByTimeInterval"].hasOwnProperty(key))
            (<any>this.fixedCostsByTimeInterval)![key] = _data[
              "fixedCostsByTimeInterval"
            ][key]
              ? _data["fixedCostsByTimeInterval"][key].map((i: any) =>
                  FixedCostDto.fromJS(i)
                )
              : [];
        }
      }
    }
  }

  static fromJS(data: any): GetFixedCostsByTimeIntervalResponse {
    data = typeof data === "object" ? data : {};
    let result = new GetFixedCostsByTimeIntervalResponse();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    if (this.fixedCostsByTimeInterval) {
      data["fixedCostsByTimeInterval"] = {};
      for (let key in this.fixedCostsByTimeInterval) {
        if (this.fixedCostsByTimeInterval.hasOwnProperty(key))
          (<any>data["fixedCostsByTimeInterval"])[key] = (<any>(
            this.fixedCostsByTimeInterval
          ))[key];
      }
    }
    return data;
  }
}

export interface IGetFixedCostsByTimeIntervalResponse {
  fixedCostsByTimeInterval?: {
    [key in keyof typeof TimeInterval]?: FixedCostDto[];
  };
}

export class GetFixedCostsByTimeIntervalRequest
  implements IGetFixedCostsByTimeIntervalRequest
{
  constructor(data?: IGetFixedCostsByTimeIntervalRequest) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {}

  static fromJS(data: any): GetFixedCostsByTimeIntervalRequest {
    data = typeof data === "object" ? data : {};
    let result = new GetFixedCostsByTimeIntervalRequest();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    return data;
  }
}

export interface IGetFixedCostsByTimeIntervalRequest {}

export class FixedCostUDto implements IFixedCostUDto {
  id?: number;
  name?: string;
  value?: number;
  groupCostId?: number;
  timeInterval?: TimeInterval;

  constructor(data?: IFixedCostUDto) {
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
      this.groupCostId = _data["groupCostId"];
      this.timeInterval = _data["timeInterval"];
    }
  }

  static fromJS(data: any): FixedCostUDto {
    data = typeof data === "object" ? data : {};
    let result = new FixedCostUDto();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["id"] = this.id;
    data["name"] = this.name;
    data["value"] = this.value;
    data["groupCostId"] = this.groupCostId;
    data["timeInterval"] = this.timeInterval;
    return data;
  }
}

export interface IFixedCostUDto {
  id?: number;
  name?: string;
  value?: number;
  groupCostId?: number;
  timeInterval?: TimeInterval;
}

export class CreateCreditResponse implements ICreateCreditResponse {
  creditDto?: CreditDto;

  constructor(data?: ICreateCreditResponse) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.creditDto = _data["creditDto"]
        ? CreditDto.fromJS(_data["creditDto"])
        : <any>undefined;
    }
  }

  static fromJS(data: any): CreateCreditResponse {
    data = typeof data === "object" ? data : {};
    let result = new CreateCreditResponse();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["creditDto"] = this.creditDto
      ? this.creditDto.toJSON()
      : <any>undefined;
    return data;
  }
}

export interface ICreateCreditResponse {
  creditDto?: CreditDto;
}

export class CreditDto implements ICreditDto {
  id?: number;
  name?: string;
  value?: number;

  constructor(data?: ICreditDto) {
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
    }
  }

  static fromJS(data: any): CreditDto {
    data = typeof data === "object" ? data : {};
    let result = new CreditDto();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["id"] = this.id;
    data["name"] = this.name;
    data["value"] = this.value;
    return data;
  }
}

export interface ICreditDto {
  id?: number;
  name?: string;
  value?: number;
}

export class CreateCreditRequest implements ICreateCreditRequest {
  creditCDto?: CreditCDto;

  constructor(data?: ICreateCreditRequest) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.creditCDto = _data["creditCDto"]
        ? CreditCDto.fromJS(_data["creditCDto"])
        : <any>undefined;
    }
  }

  static fromJS(data: any): CreateCreditRequest {
    data = typeof data === "object" ? data : {};
    let result = new CreateCreditRequest();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["creditCDto"] = this.creditCDto
      ? this.creditCDto.toJSON()
      : <any>undefined;
    return data;
  }
}

export interface ICreateCreditRequest {
  creditCDto?: CreditCDto;
}

export class CreditCDto implements ICreditCDto {
  name?: string;
  value?: number;
  costInspectionId?: number;

  constructor(data?: ICreditCDto) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.name = _data["name"];
      this.value = _data["value"];
      this.costInspectionId = _data["costInspectionId"];
    }
  }

  static fromJS(data: any): CreditCDto {
    data = typeof data === "object" ? data : {};
    let result = new CreditCDto();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["name"] = this.name;
    data["value"] = this.value;
    data["costInspectionId"] = this.costInspectionId;
    return data;
  }
}

export interface ICreditCDto {
  name?: string;
  value?: number;
  costInspectionId?: number;
}

export class DeleteCreditRequest2 implements IDeleteCreditRequest2 {
  constructor(data?: IDeleteCreditRequest2) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {}

  static fromJS(data: any): DeleteCreditRequest2 {
    data = typeof data === "object" ? data : {};
    let result = new DeleteCreditRequest2();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    return data;
  }
}

export interface IDeleteCreditRequest2 {}

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
    data = typeof data === "object" ? data : {};
    let result = new UpdateBudgetResponse();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["success"] = this.success;
    return data;
  }
}

export interface IUpdateBudgetResponse {
  success?: boolean;
}

export class UpdateCreditRequest implements IUpdateCreditRequest {
  creditUDto?: CreditUDto;

  constructor(data?: IUpdateCreditRequest) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.creditUDto = _data["creditUDto"]
        ? CreditUDto.fromJS(_data["creditUDto"])
        : <any>undefined;
    }
  }

  static fromJS(data: any): UpdateCreditRequest {
    data = typeof data === "object" ? data : {};
    let result = new UpdateCreditRequest();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["creditUDto"] = this.creditUDto
      ? this.creditUDto.toJSON()
      : <any>undefined;
    return data;
  }
}

export interface IUpdateCreditRequest {
  creditUDto?: CreditUDto;
}

export class CreditUDto implements ICreditUDto {
  id?: number;
  name?: string;
  value?: number;

  constructor(data?: ICreditUDto) {
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
    }
  }

  static fromJS(data: any): CreditUDto {
    data = typeof data === "object" ? data : {};
    let result = new CreditUDto();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["id"] = this.id;
    data["name"] = this.name;
    data["value"] = this.value;
    return data;
  }
}

export interface ICreditUDto {
  id?: number;
  name?: string;
  value?: number;
}

export class CheckableFixedCostUptoDateRequest
  implements ICheckableFixedCostUptoDateRequest
{
  costInspectionId?: number;

  constructor(data?: ICheckableFixedCostUptoDateRequest) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.costInspectionId = _data["costInspectionId"];
    }
  }

  static fromJS(data: any): CheckableFixedCostUptoDateRequest {
    data = typeof data === "object" ? data : {};
    let result = new CheckableFixedCostUptoDateRequest();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["costInspectionId"] = this.costInspectionId;
    return data;
  }
}

export interface ICheckableFixedCostUptoDateRequest {
  costInspectionId?: number;
}

export class CostInspectionCResponse implements ICostInspectionCResponse {
  success?: boolean;

  constructor(data?: ICostInspectionCResponse) {
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

  static fromJS(data: any): CostInspectionCResponse {
    data = typeof data === "object" ? data : {};
    let result = new CostInspectionCResponse();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["success"] = this.success;
    return data;
  }
}

export interface ICostInspectionCResponse {
  success?: boolean;
}

export class CostInspectionCRequest implements ICostInspectionCRequest {
  monthNumber?: number;
  year?: number;

  constructor(data?: ICostInspectionCRequest) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.monthNumber = _data["monthNumber"];
      this.year = _data["year"];
    }
  }

  static fromJS(data: any): CostInspectionCRequest {
    data = typeof data === "object" ? data : {};
    let result = new CostInspectionCRequest();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["monthNumber"] = this.monthNumber;
    data["year"] = this.year;
    return data;
  }
}

export interface ICostInspectionCRequest {
  monthNumber?: number;
  year?: number;
}

export class DeleteCostInspectionRequest
  implements IDeleteCostInspectionRequest
{
  constructor(data?: IDeleteCostInspectionRequest) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {}

  static fromJS(data: any): DeleteCostInspectionRequest {
    data = typeof data === "object" ? data : {};
    let result = new DeleteCostInspectionRequest();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    return data;
  }
}

export interface IDeleteCostInspectionRequest {}

export class CostInspectionGResponse implements ICostInspectionGResponse {
  costInspection?: CostInspectionDto;
  cheackableFixcostsAreUpdateable?: boolean;

  constructor(data?: ICostInspectionGResponse) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.costInspection = _data["costInspection"]
        ? CostInspectionDto.fromJS(_data["costInspection"])
        : <any>undefined;
      this.cheackableFixcostsAreUpdateable =
        _data["cheackableFixcostsAreUpdateable"];
    }
  }

  static fromJS(data: any): CostInspectionGResponse {
    data = typeof data === "object" ? data : {};
    let result = new CostInspectionGResponse();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["costInspection"] = this.costInspection
      ? this.costInspection.toJSON()
      : <any>undefined;
    data["cheackableFixcostsAreUpdateable"] =
      this.cheackableFixcostsAreUpdateable;
    return data;
  }
}

export interface ICostInspectionGResponse {
  costInspection?: CostInspectionDto;
  cheackableFixcostsAreUpdateable?: boolean;
}

export class CostInspectionDto implements ICostInspectionDto {
  id?: number;
  userYearMonthKey?: string;
  fixedCostChecklist?: CheckableFixedCostDto[] | undefined;
  monthlyBudgets?: MonthlyBudgetDto[] | undefined;
  credits?: CreditDto[];
  createdAt?: Date;

  constructor(data?: ICostInspectionDto) {
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
      this.userYearMonthKey = _data["userYearMonthKey"];
      if (Array.isArray(_data["fixedCostChecklist"])) {
        this.fixedCostChecklist = [] as any;
        for (let item of _data["fixedCostChecklist"])
          this.fixedCostChecklist!.push(CheckableFixedCostDto.fromJS(item));
      }
      if (Array.isArray(_data["monthlyBudgets"])) {
        this.monthlyBudgets = [] as any;
        for (let item of _data["monthlyBudgets"])
          this.monthlyBudgets!.push(MonthlyBudgetDto.fromJS(item));
      }
      if (Array.isArray(_data["credits"])) {
        this.credits = [] as any;
        for (let item of _data["credits"])
          this.credits!.push(CreditDto.fromJS(item));
      }
      this.createdAt = _data["createdAt"]
        ? new Date(_data["createdAt"].toString())
        : <any>undefined;
    }
  }

  static fromJS(data: any): CostInspectionDto {
    data = typeof data === "object" ? data : {};
    let result = new CostInspectionDto();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["id"] = this.id;
    data["userYearMonthKey"] = this.userYearMonthKey;
    if (Array.isArray(this.fixedCostChecklist)) {
      data["fixedCostChecklist"] = [];
      for (let item of this.fixedCostChecklist)
        data["fixedCostChecklist"].push(item.toJSON());
    }
    if (Array.isArray(this.monthlyBudgets)) {
      data["monthlyBudgets"] = [];
      for (let item of this.monthlyBudgets)
        data["monthlyBudgets"].push(item.toJSON());
    }
    if (Array.isArray(this.credits)) {
      data["credits"] = [];
      for (let item of this.credits) data["credits"].push(item.toJSON());
    }
    data["createdAt"] = this.createdAt
      ? this.createdAt.toISOString()
      : <any>undefined;
    return data;
  }
}

export interface ICostInspectionDto {
  id?: number;
  userYearMonthKey?: string;
  fixedCostChecklist?: CheckableFixedCostDto[] | undefined;
  monthlyBudgets?: MonthlyBudgetDto[] | undefined;
  credits?: CreditDto[];
  createdAt?: Date;
}

export class CheckableFixedCostDto implements ICheckableFixedCostDto {
  key?: number;
  name?: string;
  value?: number;
  isChecked?: boolean;
  createdAt?: Date;

  constructor(data?: ICheckableFixedCostDto) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.key = _data["key"];
      this.name = _data["name"];
      this.value = _data["value"];
      this.isChecked = _data["isChecked"];
      this.createdAt = _data["createdAt"]
        ? new Date(_data["createdAt"].toString())
        : <any>undefined;
    }
  }

  static fromJS(data: any): CheckableFixedCostDto {
    data = typeof data === "object" ? data : {};
    let result = new CheckableFixedCostDto();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["key"] = this.key;
    data["name"] = this.name;
    data["value"] = this.value;
    data["isChecked"] = this.isChecked;
    data["createdAt"] = this.createdAt
      ? this.createdAt.toISOString()
      : <any>undefined;
    return data;
  }
}

export interface ICheckableFixedCostDto {
  key?: number;
  name?: string;
  value?: number;
  isChecked?: boolean;
  createdAt?: Date;
}

export class MonthlyBudgetDto implements IMonthlyBudgetDto {
  id?: number;
  name?: string;
  limit?: number;
  charges?: ChargeDto[] | undefined;
  costInspectionId?: number;

  constructor(data?: IMonthlyBudgetDto) {
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
      this.limit = _data["limit"];
      if (Array.isArray(_data["charges"])) {
        this.charges = [] as any;
        for (let item of _data["charges"])
          this.charges!.push(ChargeDto.fromJS(item));
      }
      this.costInspectionId = _data["costInspectionId"];
    }
  }

  static fromJS(data: any): MonthlyBudgetDto {
    data = typeof data === "object" ? data : {};
    let result = new MonthlyBudgetDto();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["id"] = this.id;
    data["name"] = this.name;
    data["limit"] = this.limit;
    if (Array.isArray(this.charges)) {
      data["charges"] = [];
      for (let item of this.charges) data["charges"].push(item.toJSON());
    }
    data["costInspectionId"] = this.costInspectionId;
    return data;
  }
}

export interface IMonthlyBudgetDto {
  id?: number;
  name?: string;
  limit?: number;
  charges?: ChargeDto[] | undefined;
  costInspectionId?: number;
}

export class ChargeDto implements IChargeDto {
  id?: number;
  name?: string;
  value?: number;
  monthlyBudgetId?: number;
  costInspection?: CostInspectionDto;

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
      this.name = _data["name"];
      this.value = _data["value"];
      this.monthlyBudgetId = _data["monthlyBudgetId"];
      this.costInspection = _data["costInspection"]
        ? CostInspectionDto.fromJS(_data["costInspection"])
        : <any>undefined;
    }
  }

  static fromJS(data: any): ChargeDto {
    data = typeof data === "object" ? data : {};
    let result = new ChargeDto();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["id"] = this.id;
    data["name"] = this.name;
    data["value"] = this.value;
    data["monthlyBudgetId"] = this.monthlyBudgetId;
    data["costInspection"] = this.costInspection
      ? this.costInspection.toJSON()
      : <any>undefined;
    return data;
  }
}

export interface IChargeDto {
  id?: number;
  name?: string;
  value?: number;
  monthlyBudgetId?: number;
  costInspection?: CostInspectionDto;
}

export class CostInspectionGRequest implements ICostInspectionGRequest {
  constructor(data?: ICostInspectionGRequest) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {}

  static fromJS(data: any): CostInspectionGRequest {
    data = typeof data === "object" ? data : {};
    let result = new CostInspectionGRequest();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    return data;
  }
}

export interface ICostInspectionGRequest {}

export class UpdateCheckableFixedCostRequest
  implements IUpdateCheckableFixedCostRequest
{
  checkableFixedCostUDto?: CheckableFixedCostUDto;

  constructor(data?: IUpdateCheckableFixedCostRequest) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.checkableFixedCostUDto = _data["checkableFixedCostUDto"]
        ? CheckableFixedCostUDto.fromJS(_data["checkableFixedCostUDto"])
        : <any>undefined;
    }
  }

  static fromJS(data: any): UpdateCheckableFixedCostRequest {
    data = typeof data === "object" ? data : {};
    let result = new UpdateCheckableFixedCostRequest();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["checkableFixedCostUDto"] = this.checkableFixedCostUDto
      ? this.checkableFixedCostUDto.toJSON()
      : <any>undefined;
    return data;
  }
}

export interface IUpdateCheckableFixedCostRequest {
  checkableFixedCostUDto?: CheckableFixedCostUDto;
}

export class CheckableFixedCostUDto implements ICheckableFixedCostUDto {
  checkableFixcostKey?: number;
  costInspectionId?: number;
  isChecked?: boolean;

  constructor(data?: ICheckableFixedCostUDto) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.checkableFixcostKey = _data["checkableFixcostKey"];
      this.costInspectionId = _data["costInspectionId"];
      this.isChecked = _data["isChecked"];
    }
  }

  static fromJS(data: any): CheckableFixedCostUDto {
    data = typeof data === "object" ? data : {};
    let result = new CheckableFixedCostUDto();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["checkableFixcostKey"] = this.checkableFixcostKey;
    data["costInspectionId"] = this.costInspectionId;
    data["isChecked"] = this.isChecked;
    return data;
  }
}

export interface ICheckableFixedCostUDto {
  checkableFixcostKey?: number;
  costInspectionId?: number;
  isChecked?: boolean;
}

export class MonthlyBudgetUResponse implements IMonthlyBudgetUResponse {
  success?: boolean;

  constructor(data?: IMonthlyBudgetUResponse) {
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

  static fromJS(data: any): MonthlyBudgetUResponse {
    data = typeof data === "object" ? data : {};
    let result = new MonthlyBudgetUResponse();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["success"] = this.success;
    return data;
  }
}

export interface IMonthlyBudgetUResponse {
  success?: boolean;
}

export class MonthlyBudgetUDto implements IMonthlyBudgetUDto {
  monthlyBudgetId?: number;
  name?: string;
  limit?: number;

  constructor(data?: IMonthlyBudgetUDto) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.monthlyBudgetId = _data["monthlyBudgetId"];
      this.name = _data["name"];
      this.limit = _data["limit"];
    }
  }

  static fromJS(data: any): MonthlyBudgetUDto {
    data = typeof data === "object" ? data : {};
    let result = new MonthlyBudgetUDto();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["monthlyBudgetId"] = this.monthlyBudgetId;
    data["name"] = this.name;
    data["limit"] = this.limit;
    return data;
  }
}

export interface IMonthlyBudgetUDto {
  monthlyBudgetId?: number;
  name?: string;
  limit?: number;
}

export class LoginResponse implements ILoginResponse {
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
      this.success = _data["success"];
      this.jwtToken = _data["jwtToken"];
      this.refreshToken = _data["refreshToken"];
      this.expireTime = _data["expireTime"]
        ? new Date(_data["expireTime"].toString())
        : <any>undefined;
    }
  }

  static fromJS(data: any): LoginResponse {
    data = typeof data === "object" ? data : {};
    let result = new LoginResponse();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["success"] = this.success;
    data["jwtToken"] = this.jwtToken;
    data["refreshToken"] = this.refreshToken;
    data["expireTime"] = this.expireTime
      ? this.expireTime.toISOString()
      : <any>undefined;
    return data;
  }
}

export interface ILoginResponse {
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
  errors?: { [key: string]: string[] };

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
            (<any>this.errors)![key] =
              _data["errors"][key] !== undefined ? _data["errors"][key] : [];
        }
      }
    }
  }

  static fromJS(data: any): ErrorResponse {
    data = typeof data === "object" ? data : {};
    let result = new ErrorResponse();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
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
}

/** the dto used to send an error response to the client */
export interface IErrorResponse {
  /** the http status code sent to the client. default is 400. */
  statusCode?: number;
  /** the message for the error response */
  message?: string;
  /** the collection of errors for the current context */
  errors?: { [key: string]: string[] };
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
    data = typeof data === "object" ? data : {};
    let result = new LoginRequest();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["username"] = this.username;
    data["password"] = this.password;
    return data;
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
    data = typeof data === "object" ? data : {};
    let result = new RefreshAuthTokenResponse();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["success"] = this.success;
    data["jwtToken"] = this.jwtToken;
    data["refreshToken"] = this.refreshToken;
    return data;
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
    data = typeof data === "object" ? data : {};
    let result = new RefreshAuthTokenRequest();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["refreshToken"] = this.refreshToken;
    return data;
  }
}

export interface IRefreshAuthTokenRequest {
  refreshToken?: string;
}

export class CreateRevenueResponse implements ICreateRevenueResponse {
  newRevenueDto?: RevenueDto;

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
      this.newRevenueDto = _data["newRevenueDto"]
        ? RevenueDto.fromJS(_data["newRevenueDto"])
        : <any>undefined;
    }
  }

  static fromJS(data: any): CreateRevenueResponse {
    data = typeof data === "object" ? data : {};
    let result = new CreateRevenueResponse();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["newRevenueDto"] = this.newRevenueDto
      ? this.newRevenueDto.toJSON()
      : <any>undefined;
    return data;
  }
}

export interface ICreateRevenueResponse {
  newRevenueDto?: RevenueDto;
}

export class RevenueDto implements IRevenueDto {
  id?: number;
  source?: string;
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
      this.source = _data["source"];
      this.value = _data["value"];
      this.userId = _data["userId"];
    }
  }

  static fromJS(data: any): RevenueDto {
    data = typeof data === "object" ? data : {};
    let result = new RevenueDto();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["id"] = this.id;
    data["source"] = this.source;
    data["value"] = this.value;
    data["userId"] = this.userId;
    return data;
  }
}

export interface IRevenueDto {
  id?: number;
  source?: string;
  value?: number;
  userId?: string;
}

export class CreateRevenueRequest implements ICreateRevenueRequest {
  revenue?: RevenueDto;

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
      this.revenue = _data["revenue"]
        ? RevenueDto.fromJS(_data["revenue"])
        : <any>undefined;
    }
  }

  static fromJS(data: any): CreateRevenueRequest {
    data = typeof data === "object" ? data : {};
    let result = new CreateRevenueRequest();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["revenue"] = this.revenue ? this.revenue.toJSON() : <any>undefined;
    return data;
  }
}

export interface ICreateRevenueRequest {
  revenue?: RevenueDto;
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
    data = typeof data === "object" ? data : {};
    let result = new GetRevenuesResponse();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    if (Array.isArray(this.revenues)) {
      data["revenues"] = [];
      for (let item of this.revenues) data["revenues"].push(item.toJSON());
    }
    return data;
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
    data = typeof data === "object" ? data : {};
    let result = new UpdateRevenueResponse();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["success"] = this.success;
    return data;
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
      this.uRevenueDto = _data["uRevenueDto"]
        ? RevenueDto.fromJS(_data["uRevenueDto"])
        : <any>undefined;
    }
  }

  static fromJS(data: any): UpdateRevenueRequest {
    data = typeof data === "object" ? data : {};
    let result = new UpdateRevenueRequest();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["uRevenueDto"] = this.uRevenueDto
      ? this.uRevenueDto.toJSON()
      : <any>undefined;
    return data;
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
    data = typeof data === "object" ? data : {};
    let result = new CreateChargeRespone();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["success"] = this.success;
    return data;
  }
}

export interface ICreateChargeRespone {
  success?: boolean;
}

export class CreateChargeRequest implements ICreateChargeRequest {
  chargeCDto?: ChargeCDto;

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
      this.chargeCDto = _data["chargeCDto"]
        ? ChargeCDto.fromJS(_data["chargeCDto"])
        : <any>undefined;
    }
  }

  static fromJS(data: any): CreateChargeRequest {
    data = typeof data === "object" ? data : {};
    let result = new CreateChargeRequest();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["chargeCDto"] = this.chargeCDto
      ? this.chargeCDto.toJSON()
      : <any>undefined;
    return data;
  }
}

export interface ICreateChargeRequest {
  chargeCDto?: ChargeCDto;
}

export class ChargeCDto implements IChargeCDto {
  name?: string;
  value?: number;
  monthlyBudgetId?: number;

  constructor(data?: IChargeCDto) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.name = _data["name"];
      this.value = _data["value"];
      this.monthlyBudgetId = _data["monthlyBudgetId"];
    }
  }

  static fromJS(data: any): ChargeCDto {
    data = typeof data === "object" ? data : {};
    let result = new ChargeCDto();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["name"] = this.name;
    data["value"] = this.value;
    data["monthlyBudgetId"] = this.monthlyBudgetId;
    return data;
  }
}

export interface IChargeCDto {
  name?: string;
  value?: number;
  monthlyBudgetId?: number;
}

export class DeleteChargesRequest2 implements IDeleteChargesRequest2 {
  constructor(data?: IDeleteChargesRequest2) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {}

  static fromJS(data: any): DeleteChargesRequest2 {
    data = typeof data === "object" ? data : {};
    let result = new DeleteChargesRequest2();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    return data;
  }
}

export interface IDeleteChargesRequest2 {}

export class GetChargesByTimeIntervalRequest
  implements IGetChargesByTimeIntervalRequest
{
  constructor(data?: IGetChargesByTimeIntervalRequest) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {}

  static fromJS(data: any): GetChargesByTimeIntervalRequest {
    data = typeof data === "object" ? data : {};
    let result = new GetChargesByTimeIntervalRequest();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    return data;
  }
}

export interface IGetChargesByTimeIntervalRequest {}

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
    data = typeof data === "object" ? data : {};
    let result = new GetChargesResponse();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    if (Array.isArray(this.charges)) {
      data["charges"] = [];
      for (let item of this.charges) data["charges"].push(item.toJSON());
    }
    return data;
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

  init(_data?: any) {}

  static fromJS(data: any): GetChargesRequest {
    data = typeof data === "object" ? data : {};
    let result = new GetChargesRequest();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    return data;
  }
}

export interface IGetChargesRequest {}

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
    data = typeof data === "object" ? data : {};
    let result = new UpdateChargeResponse();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["success"] = this.success;
    return data;
  }
}

export interface IUpdateChargeResponse {
  success?: boolean;
}

export class UpdateChargeRequest implements IUpdateChargeRequest {
  chargeUDto?: ChargeUDto;

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
      this.chargeUDto = _data["chargeUDto"]
        ? ChargeUDto.fromJS(_data["chargeUDto"])
        : <any>undefined;
    }
  }

  static fromJS(data: any): UpdateChargeRequest {
    data = typeof data === "object" ? data : {};
    let result = new UpdateChargeRequest();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["chargeUDto"] = this.chargeUDto
      ? this.chargeUDto.toJSON()
      : <any>undefined;
    return data;
  }
}

export interface IUpdateChargeRequest {
  chargeUDto?: ChargeUDto;
}

export class ChargeUDto implements IChargeUDto {
  id?: number;
  name?: string;
  value?: number;
  monthlyBudgetId?: number;

  constructor(data?: IChargeUDto) {
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
      this.monthlyBudgetId = _data["monthlyBudgetId"];
    }
  }

  static fromJS(data: any): ChargeUDto {
    data = typeof data === "object" ? data : {};
    let result = new ChargeUDto();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["id"] = this.id;
    data["name"] = this.name;
    data["value"] = this.value;
    data["monthlyBudgetId"] = this.monthlyBudgetId;
    return data;
  }
}

export interface IChargeUDto {
  id?: number;
  name?: string;
  value?: number;
  monthlyBudgetId?: number;
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
      this.budget = _data["budget"]
        ? BudgetDto.fromJS(_data["budget"])
        : <any>undefined;
      this.success = _data["success"];
    }
  }

  static fromJS(data: any): CBudgetResponse {
    data = typeof data === "object" ? data : {};
    let result = new CBudgetResponse();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["budget"] = this.budget ? this.budget.toJSON() : <any>undefined;
    data["success"] = this.success;
    return data;
  }
}

export interface ICBudgetResponse {
  budget?: BudgetDto;
  success?: boolean;
}

export class BudgetDto implements IBudgetDto {
  id?: number;
  name?: string;
  limit?: number;
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
      this.limit = _data["limit"];
      this.userId = _data["userId"];
    }
  }

  static fromJS(data: any): BudgetDto {
    data = typeof data === "object" ? data : {};
    let result = new BudgetDto();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["id"] = this.id;
    data["name"] = this.name;
    data["limit"] = this.limit;
    data["userId"] = this.userId;
    return data;
  }
}

export interface IBudgetDto {
  id?: number;
  name?: string;
  limit?: number;
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
      this.budget = _data["budget"]
        ? BudgetDto.fromJS(_data["budget"])
        : <any>undefined;
    }
  }

  static fromJS(data: any): CBudgetRequest {
    data = typeof data === "object" ? data : {};
    let result = new CBudgetRequest();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["budget"] = this.budget ? this.budget.toJSON() : <any>undefined;
    return data;
  }
}

export interface ICBudgetRequest {
  budget?: BudgetDto;
}

export class DeleteBudgetRequest implements IDeleteBudgetRequest {
  constructor(data?: IDeleteBudgetRequest) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {}

  static fromJS(data: any): DeleteBudgetRequest {
    data = typeof data === "object" ? data : {};
    let result = new DeleteBudgetRequest();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    return data;
  }
}

export interface IDeleteBudgetRequest {}

export class GetBudgetWithChargesResponse
  implements IGetBudgetWithChargesResponse
{
  charges?: ChargeDto[];

  constructor(data?: IGetBudgetWithChargesResponse) {
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

  static fromJS(data: any): GetBudgetWithChargesResponse {
    data = typeof data === "object" ? data : {};
    let result = new GetBudgetWithChargesResponse();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    if (Array.isArray(this.charges)) {
      data["charges"] = [];
      for (let item of this.charges) data["charges"].push(item.toJSON());
    }
    return data;
  }
}

export interface IGetBudgetWithChargesResponse {
  charges?: ChargeDto[];
}

export class GetBudgetWithChargesRequest
  implements IGetBudgetWithChargesRequest
{
  constructor(data?: IGetBudgetWithChargesRequest) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {}

  static fromJS(data: any): GetBudgetWithChargesRequest {
    data = typeof data === "object" ? data : {};
    let result = new GetBudgetWithChargesRequest();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    return data;
  }
}

export interface IGetBudgetWithChargesRequest {}

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
    data = typeof data === "object" ? data : {};
    let result = new GetBudgetsResponse();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    if (Array.isArray(this.budgets)) {
      data["budgets"] = [];
      for (let item of this.budgets) data["budgets"].push(item.toJSON());
    }
    return data;
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

  init(_data?: any) {}

  static fromJS(data: any): GetBudgetsRequest {
    data = typeof data === "object" ? data : {};
    let result = new GetBudgetsRequest();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    return data;
  }
}

export interface IGetBudgetsRequest {}

export class UpdateBudgetResponse2 implements IUpdateBudgetResponse2 {
  success?: boolean;

  constructor(data?: IUpdateBudgetResponse2) {
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

  static fromJS(data: any): UpdateBudgetResponse2 {
    data = typeof data === "object" ? data : {};
    let result = new UpdateBudgetResponse2();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["success"] = this.success;
    return data;
  }
}

export interface IUpdateBudgetResponse2 {
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
      this.uBudgetDto = _data["uBudgetDto"]
        ? BudgetDto.fromJS(_data["uBudgetDto"])
        : <any>undefined;
    }
  }

  static fromJS(data: any): UpdateBudgetRequest {
    data = typeof data === "object" ? data : {};
    let result = new UpdateBudgetRequest();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["uBudgetDto"] = this.uBudgetDto
      ? this.uBudgetDto.toJSON()
      : <any>undefined;
    return data;
  }
}

export interface IUpdateBudgetRequest {
  uBudgetDto?: BudgetDto;
}

export class ClientApiException extends Error {
  override message: string;
  status: number;
  response: string;
  headers: { [key: string]: any };
  result: any;

  constructor(
    message: string,
    status: number,
    response: string,
    headers: { [key: string]: any },
    result: any
  ) {
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

function throwException(
  message: string,
  status: number,
  response: string,
  headers: { [key: string]: any },
  result?: any
): any {
  if (result !== null && result !== undefined) throw result;
  else throw new ClientApiException(message, status, response, headers, null);
}
