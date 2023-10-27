import { BaseAPIClient } from "~/api/BaseAPIClient";

export interface IAdminClient {
  /**
   * Get all App Settings
   * @return Success
   */
  getAppSettings(): Promise<ApplicationSettings>;

  /**
   * Set settings
   * @param jwtKey jwt encryption salt
   * @param connectionString connectionstring to db
   * @param adress adress
   * @return Update settings
   */
  setSettings(
    jwtKey: string,
    connectionString: string,
    adress: string
  ): Promise<void>;

  /**
   * Check Database
   * @return DB Ready info
   */
  getDatabaseReady(): Promise<DatabaseHealthReportDTO>;

  /**
   * Sets custom Setting
   * @param settingName Setting to change
   * @param value New value
   * @return Update generic Settings
   */
  setCustomSetting(settingName: string, value: string): Promise<void>;
}

export class AdminClient extends BaseAPIClient implements IAdminClient {
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
    this.baseUrl = this.getBaseUrl("", baseUrl);
  }

  /**
   * Get all App Settings
   * @return Success
   */
  getAppSettings(): Promise<ApplicationSettings> {
    let url_ = this.baseUrl + "/api/core/v1/Admin/Settings";
    url_ = url_.replace(/[?&]$/, "");

    let options_: RequestInit = {
      method: "GET",
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
          this.processGetAppSettings(_response)
        );
      });
  }

  protected processGetAppSettings(
    response: Response
  ): Promise<ApplicationSettings> {
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
        result200 = ApplicationSettings.fromJS(resultData200);
        return result200;
      });
    } else if (status === 401) {
      return response.text().then((_responseText) => {
        return throwException("Unauthorized", status, _responseText, _headers);
      });
    } else if (status === 204) {
      return response.text().then((_responseText) => {
        return throwException("No Content", status, _responseText, _headers);
      });
    } else if (status === 400) {
      return response.text().then((_responseText) => {
        let result400: any = null;
        let resultData400 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result400 = ErrorDTO.fromJS(resultData400);
        return throwException(
          "An server-error occured",
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
    return Promise.resolve<ApplicationSettings>(null as any);
  }

  /**
   * Set settings
   * @param jwtKey jwt encryption salt
   * @param connectionString connectionstring to db
   * @param adress adress
   * @return Update settings
   */
  setSettings(
    jwtKey: string,
    connectionString: string,
    adress: string
  ): Promise<void> {
    let url_ = this.baseUrl + "/api/core/v1/Admin/Settings?";
    if (jwtKey === undefined || jwtKey === null)
      throw new Error(
        "The parameter 'jwtKey' must be defined and cannot be null."
      );
    else url_ += "jwtKey=" + encodeURIComponent("" + jwtKey) + "&";
    if (connectionString === undefined || connectionString === null)
      throw new Error(
        "The parameter 'connectionString' must be defined and cannot be null."
      );
    else
      url_ +=
        "connectionString=" + encodeURIComponent("" + connectionString) + "&";
    if (adress === undefined || adress === null)
      throw new Error(
        "The parameter 'adress' must be defined and cannot be null."
      );
    else url_ += "adress=" + encodeURIComponent("" + adress) + "&";
    url_ = url_.replace(/[?&]$/, "");

    let options_: RequestInit = {
      method: "PUT",
      headers: {},
    };

    return this.transformOptions(options_)
      .then((transformedOptions_) => {
        return this.http.fetch(url_, transformedOptions_);
      })
      .then((_response: Response) => {
        return this.transformResult(url_, _response, (_response: Response) =>
          this.processSetSettings(_response)
        );
      });
  }

  protected processSetSettings(response: Response): Promise<void> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && response.headers.forEach) {
      response.headers.forEach((v: any, k: any) => (_headers[k] = v));
    }
    if (status === 200) {
      return response.text().then((_responseText) => {
        return;
      });
    } else if (status === 401) {
      return response.text().then((_responseText) => {
        return throwException("Unauthorized", status, _responseText, _headers);
      });
    } else if (status === 204) {
      return response.text().then((_responseText) => {
        return;
      });
    } else if (status === 400) {
      return response.text().then((_responseText) => {
        let result400: any = null;
        let resultData400 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result400 = ErrorDTO.fromJS(resultData400);
        return throwException(
          "An server-error occured",
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
    return Promise.resolve<void>(null as any);
  }

  /**
   * Check Database
   * @return DB Ready info
   */
  getDatabaseReady(): Promise<DatabaseHealthReportDTO> {
    let url_ = this.baseUrl + "/api/core/v1/Admin/Dbchecker";
    url_ = url_.replace(/[?&]$/, "");

    let options_: RequestInit = {
      method: "GET",
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
          this.processGetDatabaseReady(_response)
        );
      });
  }

  protected processGetDatabaseReady(
    response: Response
  ): Promise<DatabaseHealthReportDTO> {
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
        result200 = DatabaseHealthReportDTO.fromJS(resultData200);
        return result200;
      });
    } else if (status === 401) {
      return response.text().then((_responseText) => {
        return throwException("Unauthorized", status, _responseText, _headers);
      });
    } else if (status === 204) {
      return response.text().then((_responseText) => {
        return throwException("No Content", status, _responseText, _headers);
      });
    } else if (status === 400) {
      return response.text().then((_responseText) => {
        let result400: any = null;
        let resultData400 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result400 = ErrorDTO.fromJS(resultData400);
        return throwException(
          "An server-error occured",
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
    return Promise.resolve<DatabaseHealthReportDTO>(null as any);
  }

  /**
   * Sets custom Setting
   * @param settingName Setting to change
   * @param value New value
   * @return Update generic Settings
   */
  setCustomSetting(settingName: string, value: string): Promise<void> {
    let url_ = this.baseUrl + "/api/core/v1/Admin/Settings/{settingName}?";
    if (settingName === undefined || settingName === null)
      throw new Error("The parameter 'settingName' must be defined.");
    url_ = url_.replace("{settingName}", encodeURIComponent("" + settingName));
    if (value === undefined || value === null)
      throw new Error(
        "The parameter 'value' must be defined and cannot be null."
      );
    else url_ += "value=" + encodeURIComponent("" + value) + "&";
    url_ = url_.replace(/[?&]$/, "");

    let options_: RequestInit = {
      method: "PUT",
      headers: {},
    };

    return this.transformOptions(options_)
      .then((transformedOptions_) => {
        return this.http.fetch(url_, transformedOptions_);
      })
      .then((_response: Response) => {
        return this.transformResult(url_, _response, (_response: Response) =>
          this.processSetCustomSetting(_response)
        );
      });
  }

  protected processSetCustomSetting(response: Response): Promise<void> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && response.headers.forEach) {
      response.headers.forEach((v: any, k: any) => (_headers[k] = v));
    }
    if (status === 200) {
      return response.text().then((_responseText) => {
        return;
      });
    } else if (status === 401) {
      return response.text().then((_responseText) => {
        return throwException("Unauthorized", status, _responseText, _headers);
      });
    } else if (status === 204) {
      return response.text().then((_responseText) => {
        return;
      });
    } else if (status === 400) {
      return response.text().then((_responseText) => {
        let result400: any = null;
        let resultData400 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result400 = ErrorDTO.fromJS(resultData400);
        return throwException(
          "An server-error occured",
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
    return Promise.resolve<void>(null as any);
  }
}

export interface ICertificatesClient {
  /**
   * Upload a certificate
   * @param certificateTypes (optional) Type of certificate
   * @param ik (optional) IK for certificate
   * @param pin (optional) Pin of the certificate
   * @param files (optional)
   * @return Certificate got uploaded
   */
  uploadCertificate(
    certificateTypes: CertificateTypes | undefined,
    ik: string | undefined,
    pin: string | undefined,
    files: FileParameter[] | undefined
  ): Promise<void>;

  /**
   * Check certificate available
   * @param ik IK for certificate
   * @return Certificate is availible
   */
  checkCertificateAvailable(ik: string): Promise<boolean>;
}

export class CertificatesClient
  extends BaseAPIClient
  implements ICertificatesClient
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
    this.baseUrl = this.getBaseUrl("", baseUrl);
  }

  /**
   * Upload a certificate
   * @param certificateTypes (optional) Type of certificate
   * @param ik (optional) IK for certificate
   * @param pin (optional) Pin of the certificate
   * @param files (optional)
   * @return Certificate got uploaded
   */
  uploadCertificate(
    certificateTypes: CertificateTypes | undefined,
    ik: string | undefined,
    pin: string | undefined,
    files: FileParameter[] | undefined
  ): Promise<void> {
    let url_ = this.baseUrl + "/api/core/v1/Certificates?";
    if (certificateTypes === null)
      throw new Error("The parameter 'certificateTypes' cannot be null.");
    else if (certificateTypes !== undefined)
      url_ +=
        "certificateTypes=" + encodeURIComponent("" + certificateTypes) + "&";
    if (ik === null) throw new Error("The parameter 'ik' cannot be null.");
    else if (ik !== undefined)
      url_ += "ik=" + encodeURIComponent("" + ik) + "&";
    if (pin === null) throw new Error("The parameter 'pin' cannot be null.");
    else if (pin !== undefined)
      url_ += "pin=" + encodeURIComponent("" + pin) + "&";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = new FormData();
    if (files === null || files === undefined)
      throw new Error("The parameter 'files' cannot be null.");
    else
      files.forEach((item_) =>
        content_.append(
          "files",
          item_.data,
          item_.fileName ? item_.fileName : "files"
        )
      );

    let options_: RequestInit = {
      body: content_,
      method: "POST",
      headers: {},
    };

    return this.transformOptions(options_)
      .then((transformedOptions_) => {
        return this.http.fetch(url_, transformedOptions_);
      })
      .then((_response: Response) => {
        return this.transformResult(url_, _response, (_response: Response) =>
          this.processUploadCertificate(_response)
        );
      });
  }

  protected processUploadCertificate(response: Response): Promise<void> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && response.headers.forEach) {
      response.headers.forEach((v: any, k: any) => (_headers[k] = v));
    }
    if (status === 200) {
      return response.text().then((_responseText) => {
        return;
      });
    } else if (status === 400) {
      return response.text().then((_responseText) => {
        let result400: any = null;
        let resultData400 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result400 = ErrorDTO.fromJS(resultData400);
        return throwException(
          "One of: Issues while processing the certificate (0) or File(s) are missing (1) or Certificate type is missing (2) or Ik is missing (3) or Pin is missing (4) or File must be a pfx certificate (5) or File must be a cer certificate (6) or File must be a key certificate (7) or Certificates do not match or wrong password (8)",
          status,
          _responseText,
          _headers,
          result400
        );
      });
    } else if (status === 401) {
      return response.text().then((_responseText) => {
        return throwException("Unauthorized", status, _responseText, _headers);
      });
    } else if (status === 204) {
      return response.text().then((_responseText) => {
        return;
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
    return Promise.resolve<void>(null as any);
  }

  /**
   * Check certificate available
   * @param ik IK for certificate
   * @return Certificate is availible
   */
  checkCertificateAvailable(ik: string): Promise<boolean> {
    let url_ = this.baseUrl + "/api/core/v1/Certificates?";
    if (ik === undefined || ik === null)
      throw new Error("The parameter 'ik' must be defined and cannot be null.");
    else url_ += "ik=" + encodeURIComponent("" + ik) + "&";
    url_ = url_.replace(/[?&]$/, "");

    let options_: RequestInit = {
      method: "GET",
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
          this.processCheckCertificateAvailable(_response)
        );
      });
  }

  protected processCheckCertificateAvailable(
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
    } else if (status === 204) {
      return response.text().then((_responseText) => {
        return throwException("No Content", status, _responseText, _headers);
      });
    } else if (status === 400) {
      return response.text().then((_responseText) => {
        let result400: any = null;
        let resultData400 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result400 = ErrorDTO.fromJS(resultData400);
        return throwException(
          "An server-error occured",
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
    return Promise.resolve<boolean>(null as any);
  }
}

export interface ICommonSearchClient {
  /**
   * Searches for data
   * @param referenceValue Searchtext
   * @param typeFilter Limit Types (Types in that list will be used except 'NegativeTypeFilter' is given then it will use all except these) [Person,Document,NegativeTypeFilter,Station,LogicalUnit]
   * @param take Length (limit 50)
   * @return Found some entries
   */
  search(
    referenceValue: string,
    typeFilter: string[],
    take: number
  ): Promise<SearchResultDTO[]>;
}

export class CommonSearchClient
  extends BaseAPIClient
  implements ICommonSearchClient
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
    this.baseUrl = this.getBaseUrl("", baseUrl);
  }

  /**
   * Searches for data
   * @param referenceValue Searchtext
   * @param typeFilter Limit Types (Types in that list will be used except 'NegativeTypeFilter' is given then it will use all except these) [Person,Document,NegativeTypeFilter,Station,LogicalUnit]
   * @param take Length (limit 50)
   * @return Found some entries
   */
  search(
    referenceValue: string,
    typeFilter: string[],
    take: number
  ): Promise<SearchResultDTO[]> {
    let url_ = this.baseUrl + "/api/core/v1/CommonSearch/Search?";
    if (referenceValue === undefined || referenceValue === null)
      throw new Error(
        "The parameter 'referenceValue' must be defined and cannot be null."
      );
    else
      url_ += "referenceValue=" + encodeURIComponent("" + referenceValue) + "&";
    if (typeFilter === undefined || typeFilter === null)
      throw new Error(
        "The parameter 'typeFilter' must be defined and cannot be null."
      );
    else
      typeFilter &&
        typeFilter.forEach((item) => {
          url_ += "typeFilter=" + encodeURIComponent("" + item) + "&";
        });
    if (take === undefined || take === null)
      throw new Error(
        "The parameter 'take' must be defined and cannot be null."
      );
    else url_ += "take=" + encodeURIComponent("" + take) + "&";
    url_ = url_.replace(/[?&]$/, "");

    let options_: RequestInit = {
      method: "GET",
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
          this.processSearch(_response)
        );
      });
  }

  protected processSearch(response: Response): Promise<SearchResultDTO[]> {
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
            result200!.push(SearchResultDTO.fromJS(item));
        } else {
          result200 = <any>null;
        }
        return result200;
      });
    } else if (status === 204) {
      return response.text().then((_responseText) => {
        return throwException("No Content", status, _responseText, _headers);
      });
    } else if (status === 400) {
      return response.text().then((_responseText) => {
        let result400: any = null;
        let resultData400 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result400 = ErrorDTO.fromJS(resultData400);
        return throwException(
          "An server-error occured",
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
    return Promise.resolve<SearchResultDTO[]>(null as any);
  }
}

export interface IDocumentClient {
  /**
   * Get Documents
   * @param ids (optional) Id of documents
   * @param title (optional) Title of document
   * @param fileId (optional) File id
   * @param fileName (optional) File name
   * @param fileExtension (optional) File extension
   * @param fileTag (optional) File tag
   * @return Metadata
   */
  getDocuments(
    ids: number[] | undefined,
    title: string | undefined,
    fileId: number | undefined,
    fileName: string | undefined,
    fileExtension: string | undefined,
    fileTag: string | undefined
  ): Promise<DocumentDTO[]>;

  /**
   * Updates a document
   * @param body (optional)
   * @return New document
   */
  updateDocument(body: DocumentUDTO | undefined): Promise<DocumentDTO>;

  /**
   * Get Document
   * @param id Id of the document
   * @return Metadata
   */
  getDocument(id: number): Promise<DocumentDTO>;

  /**
   * Delete a document
   * @param id Id of document
   * @return File got deleted
   */
  removeDocument(id: number): Promise<void>;

  /**
   * Download file content
   * @param fileId Id of the file
   * @return FileContentResult
   */
  downloadDocumentContent(fileId: number): Promise<FileResponse>;

  /**
   * Download files content as zip
   * @param documentIds Id of the files
   * @return FileContentResult
   */
  downloadDocumentContents(documentIds: number[]): Promise<FileResponse>;

  /**
   * Download Documents
   * @param ids (optional) Id of documents
   * @param title (optional) Title of document
   * @param fileId (optional) File id
   * @param fileName (optional) File name
   * @param fileExtension (optional) File extension
   * @param fileTag (optional) File tag
   * @return Documents
   */
  downloadDocuments(
    ids: number[] | undefined,
    title: string | undefined,
    fileId: number | undefined,
    fileName: string | undefined,
    fileExtension: string | undefined,
    fileTag: string | undefined
  ): Promise<Document[]>;

  /**
   * Download Document
   * @param id Id of the document
   * @return Documents
   */
  downloadDocument(id: number): Promise<Document>;

  /**
   * Upload an document
   * @param id Id of the document
   * @param files (optional)
   * @return File got uploaded
   */
  uploadDocument(id: number, files: FileParameter[] | undefined): Promise<void>;

  /**
   * Adds a document
   * @param body (optional)
   * @return New document
   */
  addDocument(body: NewDocumentDTO | undefined): Promise<DocumentDTO>;

  /**
   * Delete a file
   * @param fileId Id of file
   * @return File got deleted
   */
  removeFile(fileId: number): Promise<void>;

  /**
   * Generate OTU
   * @param body (optional)
   * @return Link was generated
   */
  generateUploadLink(
    documentId: number,
    body: string | undefined
  ): Promise<UploadLinkDTO>;

  /**
   * Deletes an Uploadlink
   * @return Link deleted
   */
  abortUploadLink(code: string): Promise<void>;

  /**
   * Upload data
   * @param files (optional)
   * @return Data uploaded
   */
  useUploadLink(
    tenant: string,
    code: string,
    files: FileParameter[] | undefined
  ): Promise<void>;

  /**
   * Finish link
   * @return Completed
   */
  completeUploadLink(tenant: string, code: string): Promise<void>;

  /**
   * Get info
   * @return Completed
   */
  getUploadLinkInfo(
    tenant: string,
    code: string
  ): Promise<UploadLinkDatasetDTO>;

  /**
   * Deletes an Uploadlink
   * @return Link deleted
   */
  endUploadLink(tenant: string, code: string): Promise<void>;
}

export class DocumentClient extends BaseAPIClient implements IDocumentClient {
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
    this.baseUrl = this.getBaseUrl("", baseUrl);
  }

  /**
   * Get Documents
   * @param ids (optional) Id of documents
   * @param title (optional) Title of document
   * @param fileId (optional) File id
   * @param fileName (optional) File name
   * @param fileExtension (optional) File extension
   * @param fileTag (optional) File tag
   * @return Metadata
   */
  getDocuments(
    ids: number[] | undefined,
    title: string | undefined,
    fileId: number | undefined,
    fileName: string | undefined,
    fileExtension: string | undefined,
    fileTag: string | undefined
  ): Promise<DocumentDTO[]> {
    let url_ = this.baseUrl + "/api/core/v1/Document?";
    if (ids === null) throw new Error("The parameter 'ids' cannot be null.");
    else if (ids !== undefined)
      ids &&
        ids.forEach((item) => {
          url_ += "ids=" + encodeURIComponent("" + item) + "&";
        });
    if (title === null)
      throw new Error("The parameter 'title' cannot be null.");
    else if (title !== undefined)
      url_ += "title=" + encodeURIComponent("" + title) + "&";
    if (fileId === null)
      throw new Error("The parameter 'fileId' cannot be null.");
    else if (fileId !== undefined)
      url_ += "fileId=" + encodeURIComponent("" + fileId) + "&";
    if (fileName === null)
      throw new Error("The parameter 'fileName' cannot be null.");
    else if (fileName !== undefined)
      url_ += "fileName=" + encodeURIComponent("" + fileName) + "&";
    if (fileExtension === null)
      throw new Error("The parameter 'fileExtension' cannot be null.");
    else if (fileExtension !== undefined)
      url_ += "fileExtension=" + encodeURIComponent("" + fileExtension) + "&";
    if (fileTag === null)
      throw new Error("The parameter 'fileTag' cannot be null.");
    else if (fileTag !== undefined)
      url_ += "fileTag=" + encodeURIComponent("" + fileTag) + "&";
    url_ = url_.replace(/[?&]$/, "");

    let options_: RequestInit = {
      method: "GET",
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
          this.processGetDocuments(_response)
        );
      });
  }

  protected processGetDocuments(response: Response): Promise<DocumentDTO[]> {
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
            result200!.push(DocumentDTO.fromJS(item));
        } else {
          result200 = <any>null;
        }
        return result200;
      });
    } else if (status === 401) {
      return response.text().then((_responseText) => {
        return throwException("Unauthorized", status, _responseText, _headers);
      });
    } else if (status === 204) {
      return response.text().then((_responseText) => {
        return throwException("No Content", status, _responseText, _headers);
      });
    } else if (status === 400) {
      return response.text().then((_responseText) => {
        let result400: any = null;
        let resultData400 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result400 = ErrorDTO.fromJS(resultData400);
        return throwException(
          "An server-error occured",
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
    return Promise.resolve<DocumentDTO[]>(null as any);
  }

  /**
   * Updates a document
   * @param body (optional)
   * @return New document
   */
  updateDocument(body: DocumentUDTO | undefined): Promise<DocumentDTO> {
    let url_ = this.baseUrl + "/api/core/v1/Document";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(body);

    let options_: RequestInit = {
      body: content_,
      method: "PUT",
      headers: {
        "Content-Type": "application/json-patch+json",
        Accept: "text/plain",
      },
    };

    return this.transformOptions(options_)
      .then((transformedOptions_) => {
        return this.http.fetch(url_, transformedOptions_);
      })
      .then((_response: Response) => {
        return this.transformResult(url_, _response, (_response: Response) =>
          this.processUpdateDocument(_response)
        );
      });
  }

  protected processUpdateDocument(response: Response): Promise<DocumentDTO> {
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
        result200 = DocumentDTO.fromJS(resultData200);
        return result200;
      });
    } else if (status === 401) {
      return response.text().then((_responseText) => {
        return throwException("Unauthorized", status, _responseText, _headers);
      });
    } else if (status === 204) {
      return response.text().then((_responseText) => {
        return throwException("No Content", status, _responseText, _headers);
      });
    } else if (status === 400) {
      return response.text().then((_responseText) => {
        let result400: any = null;
        let resultData400 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result400 = ErrorDTO.fromJS(resultData400);
        return throwException(
          "An server-error occured",
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
    return Promise.resolve<DocumentDTO>(null as any);
  }

  /**
   * Get Document
   * @param id Id of the document
   * @return Metadata
   */
  getDocument(id: number): Promise<DocumentDTO> {
    let url_ = this.baseUrl + "/api/core/v1/Document/{id}";
    if (id === undefined || id === null)
      throw new Error("The parameter 'id' must be defined.");
    url_ = url_.replace("{id}", encodeURIComponent("" + id));
    url_ = url_.replace(/[?&]$/, "");

    let options_: RequestInit = {
      method: "GET",
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
          this.processGetDocument(_response)
        );
      });
  }

  protected processGetDocument(response: Response): Promise<DocumentDTO> {
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
        result200 = DocumentDTO.fromJS(resultData200);
        return result200;
      });
    } else if (status === 404) {
      return response.text().then((_responseText) => {
        let result404: any = null;
        let resultData404 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result404 = ErrorDTO.fromJS(resultData404);
        return throwException(
          "Document not found",
          status,
          _responseText,
          _headers,
          result404
        );
      });
    } else if (status === 401) {
      return response.text().then((_responseText) => {
        return throwException("Unauthorized", status, _responseText, _headers);
      });
    } else if (status === 204) {
      return response.text().then((_responseText) => {
        return throwException("No Content", status, _responseText, _headers);
      });
    } else if (status === 400) {
      return response.text().then((_responseText) => {
        let result400: any = null;
        let resultData400 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result400 = ErrorDTO.fromJS(resultData400);
        return throwException(
          "An server-error occured",
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
    return Promise.resolve<DocumentDTO>(null as any);
  }

  /**
   * Delete a document
   * @param id Id of document
   * @return File got deleted
   */
  removeDocument(id: number): Promise<void> {
    let url_ = this.baseUrl + "/api/core/v1/Document/{id}";
    if (id === undefined || id === null)
      throw new Error("The parameter 'id' must be defined.");
    url_ = url_.replace("{id}", encodeURIComponent("" + id));
    url_ = url_.replace(/[?&]$/, "");

    let options_: RequestInit = {
      method: "DELETE",
      headers: {},
    };

    return this.transformOptions(options_)
      .then((transformedOptions_) => {
        return this.http.fetch(url_, transformedOptions_);
      })
      .then((_response: Response) => {
        return this.transformResult(url_, _response, (_response: Response) =>
          this.processRemoveDocument(_response)
        );
      });
  }

  protected processRemoveDocument(response: Response): Promise<void> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && response.headers.forEach) {
      response.headers.forEach((v: any, k: any) => (_headers[k] = v));
    }
    if (status === 200) {
      return response.text().then((_responseText) => {
        return;
      });
    } else if (status === 401) {
      return response.text().then((_responseText) => {
        return throwException("Unauthorized", status, _responseText, _headers);
      });
    } else if (status === 204) {
      return response.text().then((_responseText) => {
        return;
      });
    } else if (status === 400) {
      return response.text().then((_responseText) => {
        let result400: any = null;
        let resultData400 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result400 = ErrorDTO.fromJS(resultData400);
        return throwException(
          "An server-error occured",
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
    return Promise.resolve<void>(null as any);
  }

  /**
   * Download file content
   * @param fileId Id of the file
   * @return FileContentResult
   */
  downloadDocumentContent(fileId: number): Promise<FileResponse> {
    let url_ = this.baseUrl + "/api/core/v1/Document/content/file/{fileId}";
    if (fileId === undefined || fileId === null)
      throw new Error("The parameter 'fileId' must be defined.");
    url_ = url_.replace("{fileId}", encodeURIComponent("" + fileId));
    url_ = url_.replace(/[?&]$/, "");

    let options_: RequestInit = {
      method: "GET",
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
          this.processDownloadDocumentContent(_response)
        );
      });
  }

  protected processDownloadDocumentContent(
    response: Response
  ): Promise<FileResponse> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && response.headers.forEach) {
      response.headers.forEach((v: any, k: any) => (_headers[k] = v));
    }
    if (status === 200 || status === 206) {
      const contentDisposition = response.headers
        ? response.headers.get("content-disposition")
        : undefined;
      let fileNameMatch = contentDisposition
        ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(
            contentDisposition
          )
        : undefined;
      let fileName =
        fileNameMatch && fileNameMatch.length > 1
          ? fileNameMatch[3] || fileNameMatch[2]
          : undefined;
      if (fileName) {
        fileName = decodeURIComponent(fileName);
      } else {
        fileNameMatch = contentDisposition
          ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition)
          : undefined;
        fileName =
          fileNameMatch && fileNameMatch.length > 1
            ? fileNameMatch[1]
            : undefined;
      }
      return response.blob().then((blob) => {
        return {
          fileName: fileName,
          data: blob,
          status: status,
          headers: _headers,
        };
      });
    } else if (status === 404) {
      return response.text().then((_responseText) => {
        let result404: any = null;
        let resultData404 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result404 = ErrorDTO.fromJS(resultData404);
        return throwException(
          "File not found",
          status,
          _responseText,
          _headers,
          result404
        );
      });
    } else if (status === 401) {
      return response.text().then((_responseText) => {
        return throwException("Unauthorized", status, _responseText, _headers);
      });
    } else if (status === 204) {
      return response.text().then((_responseText) => {
        return throwException("No Content", status, _responseText, _headers);
      });
    } else if (status === 400) {
      return response.text().then((_responseText) => {
        let result400: any = null;
        let resultData400 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result400 = ErrorDTO.fromJS(resultData400);
        return throwException(
          "An server-error occured",
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
    return Promise.resolve<FileResponse>(null as any);
  }

  /**
   * Download files content as zip
   * @param documentIds Id of the files
   * @return FileContentResult
   */
  downloadDocumentContents(documentIds: number[]): Promise<FileResponse> {
    let url_ = this.baseUrl + "/api/core/v1/Document/content/files?";
    if (documentIds === undefined || documentIds === null)
      throw new Error(
        "The parameter 'documentIds' must be defined and cannot be null."
      );
    else
      documentIds &&
        documentIds.forEach((item) => {
          url_ += "documentIds=" + encodeURIComponent("" + item) + "&";
        });
    url_ = url_.replace(/[?&]$/, "");

    let options_: RequestInit = {
      method: "GET",
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
          this.processDownloadDocumentContents(_response)
        );
      });
  }

  protected processDownloadDocumentContents(
    response: Response
  ): Promise<FileResponse> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && response.headers.forEach) {
      response.headers.forEach((v: any, k: any) => (_headers[k] = v));
    }
    if (status === 200 || status === 206) {
      const contentDisposition = response.headers
        ? response.headers.get("content-disposition")
        : undefined;
      let fileNameMatch = contentDisposition
        ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(
            contentDisposition
          )
        : undefined;
      let fileName =
        fileNameMatch && fileNameMatch.length > 1
          ? fileNameMatch[3] || fileNameMatch[2]
          : undefined;
      if (fileName) {
        fileName = decodeURIComponent(fileName);
      } else {
        fileNameMatch = contentDisposition
          ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition)
          : undefined;
        fileName =
          fileNameMatch && fileNameMatch.length > 1
            ? fileNameMatch[1]
            : undefined;
      }
      return response.blob().then((blob) => {
        return {
          fileName: fileName,
          data: blob,
          status: status,
          headers: _headers,
        };
      });
    } else if (status === 404) {
      return response.text().then((_responseText) => {
        let result404: any = null;
        let resultData404 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result404 = ErrorDTO.fromJS(resultData404);
        return throwException(
          "File not found",
          status,
          _responseText,
          _headers,
          result404
        );
      });
    } else if (status === 401) {
      return response.text().then((_responseText) => {
        return throwException("Unauthorized", status, _responseText, _headers);
      });
    } else if (status === 204) {
      return response.text().then((_responseText) => {
        return throwException("No Content", status, _responseText, _headers);
      });
    } else if (status === 400) {
      return response.text().then((_responseText) => {
        let result400: any = null;
        let resultData400 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result400 = ErrorDTO.fromJS(resultData400);
        return throwException(
          "An server-error occured",
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
    return Promise.resolve<FileResponse>(null as any);
  }

  /**
   * Download Documents
   * @param ids (optional) Id of documents
   * @param title (optional) Title of document
   * @param fileId (optional) File id
   * @param fileName (optional) File name
   * @param fileExtension (optional) File extension
   * @param fileTag (optional) File tag
   * @return Documents
   */
  downloadDocuments(
    ids: number[] | undefined,
    title: string | undefined,
    fileId: number | undefined,
    fileName: string | undefined,
    fileExtension: string | undefined,
    fileTag: string | undefined
  ): Promise<Document[]> {
    let url_ = this.baseUrl + "/api/core/v1/Document/download?";
    if (ids === null) throw new Error("The parameter 'ids' cannot be null.");
    else if (ids !== undefined)
      ids &&
        ids.forEach((item) => {
          url_ += "ids=" + encodeURIComponent("" + item) + "&";
        });
    if (title === null)
      throw new Error("The parameter 'title' cannot be null.");
    else if (title !== undefined)
      url_ += "title=" + encodeURIComponent("" + title) + "&";
    if (fileId === null)
      throw new Error("The parameter 'fileId' cannot be null.");
    else if (fileId !== undefined)
      url_ += "fileId=" + encodeURIComponent("" + fileId) + "&";
    if (fileName === null)
      throw new Error("The parameter 'fileName' cannot be null.");
    else if (fileName !== undefined)
      url_ += "fileName=" + encodeURIComponent("" + fileName) + "&";
    if (fileExtension === null)
      throw new Error("The parameter 'fileExtension' cannot be null.");
    else if (fileExtension !== undefined)
      url_ += "fileExtension=" + encodeURIComponent("" + fileExtension) + "&";
    if (fileTag === null)
      throw new Error("The parameter 'fileTag' cannot be null.");
    else if (fileTag !== undefined)
      url_ += "fileTag=" + encodeURIComponent("" + fileTag) + "&";
    url_ = url_.replace(/[?&]$/, "");

    let options_: RequestInit = {
      method: "GET",
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
          this.processDownloadDocuments(_response)
        );
      });
  }

  protected processDownloadDocuments(response: Response): Promise<Document[]> {
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
            result200!.push(Document.fromJS(item));
        } else {
          result200 = <any>null;
        }
        return result200;
      });
    } else if (status === 401) {
      return response.text().then((_responseText) => {
        return throwException("Unauthorized", status, _responseText, _headers);
      });
    } else if (status === 204) {
      return response.text().then((_responseText) => {
        return throwException("No Content", status, _responseText, _headers);
      });
    } else if (status === 400) {
      return response.text().then((_responseText) => {
        let result400: any = null;
        let resultData400 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result400 = ErrorDTO.fromJS(resultData400);
        return throwException(
          "An server-error occured",
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
    return Promise.resolve<Document[]>(null as any);
  }

  /**
   * Download Document
   * @param id Id of the document
   * @return Documents
   */
  downloadDocument(id: number): Promise<Document> {
    let url_ = this.baseUrl + "/api/core/v1/Document/download/{id}";
    if (id === undefined || id === null)
      throw new Error("The parameter 'id' must be defined.");
    url_ = url_.replace("{id}", encodeURIComponent("" + id));
    url_ = url_.replace(/[?&]$/, "");

    let options_: RequestInit = {
      method: "GET",
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
          this.processDownloadDocument(_response)
        );
      });
  }

  protected processDownloadDocument(response: Response): Promise<Document> {
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
        result200 = Document.fromJS(resultData200);
        return result200;
      });
    } else if (status === 404) {
      return response.text().then((_responseText) => {
        let result404: any = null;
        let resultData404 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result404 = ErrorDTO.fromJS(resultData404);
        return throwException(
          "Document not found",
          status,
          _responseText,
          _headers,
          result404
        );
      });
    } else if (status === 401) {
      return response.text().then((_responseText) => {
        return throwException("Unauthorized", status, _responseText, _headers);
      });
    } else if (status === 204) {
      return response.text().then((_responseText) => {
        return throwException("No Content", status, _responseText, _headers);
      });
    } else if (status === 400) {
      return response.text().then((_responseText) => {
        let result400: any = null;
        let resultData400 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result400 = ErrorDTO.fromJS(resultData400);
        return throwException(
          "An server-error occured",
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
    return Promise.resolve<Document>(null as any);
  }

  /**
   * Upload an document
   * @param id Id of the document
   * @param files (optional)
   * @return File got uploaded
   */
  uploadDocument(
    id: number,
    files: FileParameter[] | undefined
  ): Promise<void> {
    let url_ = this.baseUrl + "/api/core/v1/Document/upload/{id}";
    if (id === undefined || id === null)
      throw new Error("The parameter 'id' must be defined.");
    url_ = url_.replace("{id}", encodeURIComponent("" + id));
    url_ = url_.replace(/[?&]$/, "");

    const content_ = new FormData();
    if (files === null || files === undefined)
      throw new Error("The parameter 'files' cannot be null.");
    else
      files.forEach((item_) =>
        content_.append(
          "files",
          item_.data,
          item_.fileName ? item_.fileName : "files"
        )
      );

    let options_: RequestInit = {
      body: content_,
      method: "PUT",
      headers: {},
    };

    return this.transformOptions(options_)
      .then((transformedOptions_) => {
        return this.http.fetch(url_, transformedOptions_);
      })
      .then((_response: Response) => {
        return this.transformResult(url_, _response, (_response: Response) =>
          this.processUploadDocument(_response)
        );
      });
  }

  protected processUploadDocument(response: Response): Promise<void> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && response.headers.forEach) {
      response.headers.forEach((v: any, k: any) => (_headers[k] = v));
    }
    if (status === 200) {
      return response.text().then((_responseText) => {
        return;
      });
    } else if (status === 401) {
      return response.text().then((_responseText) => {
        return throwException("Unauthorized", status, _responseText, _headers);
      });
    } else if (status === 204) {
      return response.text().then((_responseText) => {
        return;
      });
    } else if (status === 400) {
      return response.text().then((_responseText) => {
        let result400: any = null;
        let resultData400 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result400 = ErrorDTO.fromJS(resultData400);
        return throwException(
          "An server-error occured",
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
    return Promise.resolve<void>(null as any);
  }

  /**
   * Adds a document
   * @param body (optional)
   * @return New document
   */
  addDocument(body: NewDocumentDTO | undefined): Promise<DocumentDTO> {
    let url_ = this.baseUrl + "/api/core/v1/Document/add";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(body);

    let options_: RequestInit = {
      body: content_,
      method: "POST",
      headers: {
        "Content-Type": "application/json-patch+json",
        Accept: "text/plain",
      },
    };

    return this.transformOptions(options_)
      .then((transformedOptions_) => {
        return this.http.fetch(url_, transformedOptions_);
      })
      .then((_response: Response) => {
        return this.transformResult(url_, _response, (_response: Response) =>
          this.processAddDocument(_response)
        );
      });
  }

  protected processAddDocument(response: Response): Promise<DocumentDTO> {
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
        result200 = DocumentDTO.fromJS(resultData200);
        return result200;
      });
    } else if (status === 401) {
      return response.text().then((_responseText) => {
        return throwException("Unauthorized", status, _responseText, _headers);
      });
    } else if (status === 204) {
      return response.text().then((_responseText) => {
        return throwException("No Content", status, _responseText, _headers);
      });
    } else if (status === 400) {
      return response.text().then((_responseText) => {
        let result400: any = null;
        let resultData400 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result400 = ErrorDTO.fromJS(resultData400);
        return throwException(
          "An server-error occured",
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
    return Promise.resolve<DocumentDTO>(null as any);
  }

  /**
   * Delete a file
   * @param fileId Id of file
   * @return File got deleted
   */
  removeFile(fileId: number): Promise<void> {
    let url_ = this.baseUrl + "/api/core/v1/Document/file/{fileId}";
    if (fileId === undefined || fileId === null)
      throw new Error("The parameter 'fileId' must be defined.");
    url_ = url_.replace("{fileId}", encodeURIComponent("" + fileId));
    url_ = url_.replace(/[?&]$/, "");

    let options_: RequestInit = {
      method: "DELETE",
      headers: {},
    };

    return this.transformOptions(options_)
      .then((transformedOptions_) => {
        return this.http.fetch(url_, transformedOptions_);
      })
      .then((_response: Response) => {
        return this.transformResult(url_, _response, (_response: Response) =>
          this.processRemoveFile(_response)
        );
      });
  }

  protected processRemoveFile(response: Response): Promise<void> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && response.headers.forEach) {
      response.headers.forEach((v: any, k: any) => (_headers[k] = v));
    }
    if (status === 200) {
      return response.text().then((_responseText) => {
        return;
      });
    } else if (status === 401) {
      return response.text().then((_responseText) => {
        return throwException("Unauthorized", status, _responseText, _headers);
      });
    } else if (status === 204) {
      return response.text().then((_responseText) => {
        return;
      });
    } else if (status === 400) {
      return response.text().then((_responseText) => {
        let result400: any = null;
        let resultData400 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result400 = ErrorDTO.fromJS(resultData400);
        return throwException(
          "An server-error occured",
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
    return Promise.resolve<void>(null as any);
  }

  /**
   * Generate OTU
   * @param body (optional)
   * @return Link was generated
   */
  generateUploadLink(
    documentId: number,
    body: string | undefined
  ): Promise<UploadLinkDTO> {
    let url_ = this.baseUrl + "/api/core/v1/Document/GenerateUploadLink?";
    if (documentId === undefined || documentId === null)
      throw new Error(
        "The parameter 'documentId' must be defined and cannot be null."
      );
    else url_ += "DocumentId=" + encodeURIComponent("" + documentId) + "&";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(body);

    let options_: RequestInit = {
      body: content_,
      method: "POST",
      headers: {
        "Content-Type": "application/json-patch+json",
        Accept: "text/plain",
      },
    };

    return this.transformOptions(options_)
      .then((transformedOptions_) => {
        return this.http.fetch(url_, transformedOptions_);
      })
      .then((_response: Response) => {
        return this.transformResult(url_, _response, (_response: Response) =>
          this.processGenerateUploadLink(_response)
        );
      });
  }

  protected processGenerateUploadLink(
    response: Response
  ): Promise<UploadLinkDTO> {
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
        result200 = UploadLinkDTO.fromJS(resultData200);
        return result200;
      });
    } else if (status === 401) {
      return response.text().then((_responseText) => {
        return throwException("Unauthorized", status, _responseText, _headers);
      });
    } else if (status === 204) {
      return response.text().then((_responseText) => {
        return throwException("No Content", status, _responseText, _headers);
      });
    } else if (status === 400) {
      return response.text().then((_responseText) => {
        let result400: any = null;
        let resultData400 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result400 = ErrorDTO.fromJS(resultData400);
        return throwException(
          "An server-error occured",
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
    return Promise.resolve<UploadLinkDTO>(null as any);
  }

  /**
   * Deletes an Uploadlink
   * @return Link deleted
   */
  abortUploadLink(code: string): Promise<void> {
    let url_ = this.baseUrl + "/api/core/v1/Document/AbortUploadLink?";
    if (code === undefined || code === null)
      throw new Error(
        "The parameter 'code' must be defined and cannot be null."
      );
    else url_ += "code=" + encodeURIComponent("" + code) + "&";
    url_ = url_.replace(/[?&]$/, "");

    let options_: RequestInit = {
      method: "GET",
      headers: {},
    };

    return this.transformOptions(options_)
      .then((transformedOptions_) => {
        return this.http.fetch(url_, transformedOptions_);
      })
      .then((_response: Response) => {
        return this.transformResult(url_, _response, (_response: Response) =>
          this.processAbortUploadLink(_response)
        );
      });
  }

  protected processAbortUploadLink(response: Response): Promise<void> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && response.headers.forEach) {
      response.headers.forEach((v: any, k: any) => (_headers[k] = v));
    }
    if (status === 200) {
      return response.text().then((_responseText) => {
        return;
      });
    } else if (status === 401) {
      return response.text().then((_responseText) => {
        return throwException("Unauthorized", status, _responseText, _headers);
      });
    } else if (status === 204) {
      return response.text().then((_responseText) => {
        return;
      });
    } else if (status === 400) {
      return response.text().then((_responseText) => {
        let result400: any = null;
        let resultData400 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result400 = ErrorDTO.fromJS(resultData400);
        return throwException(
          "An server-error occured",
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
    return Promise.resolve<void>(null as any);
  }

  /**
   * Upload data
   * @param files (optional)
   * @return Data uploaded
   */
  useUploadLink(
    tenant: string,
    code: string,
    files: FileParameter[] | undefined
  ): Promise<void> {
    let url_ = this.baseUrl + "/api/core/v1/Document/UseUploadLink?";
    if (tenant === undefined || tenant === null)
      throw new Error(
        "The parameter 'tenant' must be defined and cannot be null."
      );
    else url_ += "tenant=" + encodeURIComponent("" + tenant) + "&";
    if (code === undefined || code === null)
      throw new Error(
        "The parameter 'code' must be defined and cannot be null."
      );
    else url_ += "code=" + encodeURIComponent("" + code) + "&";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = new FormData();
    if (files === null || files === undefined)
      throw new Error("The parameter 'files' cannot be null.");
    else
      files.forEach((item_) =>
        content_.append(
          "files",
          item_.data,
          item_.fileName ? item_.fileName : "files"
        )
      );

    let options_: RequestInit = {
      body: content_,
      method: "PATCH",
      headers: {},
    };

    return this.transformOptions(options_)
      .then((transformedOptions_) => {
        return this.http.fetch(url_, transformedOptions_);
      })
      .then((_response: Response) => {
        return this.transformResult(url_, _response, (_response: Response) =>
          this.processUseUploadLink(_response)
        );
      });
  }

  protected processUseUploadLink(response: Response): Promise<void> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && response.headers.forEach) {
      response.headers.forEach((v: any, k: any) => (_headers[k] = v));
    }
    if (status === 200) {
      return response.text().then((_responseText) => {
        return;
      });
    } else if (status === 204) {
      return response.text().then((_responseText) => {
        return;
      });
    } else if (status === 400) {
      return response.text().then((_responseText) => {
        let result400: any = null;
        let resultData400 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result400 = ErrorDTO.fromJS(resultData400);
        return throwException(
          "An server-error occured",
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
    return Promise.resolve<void>(null as any);
  }

  /**
   * Finish link
   * @return Completed
   */
  completeUploadLink(tenant: string, code: string): Promise<void> {
    let url_ = this.baseUrl + "/api/core/v1/Document/CompleteUploadLink?";
    if (tenant === undefined || tenant === null)
      throw new Error(
        "The parameter 'tenant' must be defined and cannot be null."
      );
    else url_ += "tenant=" + encodeURIComponent("" + tenant) + "&";
    if (code === undefined || code === null)
      throw new Error(
        "The parameter 'code' must be defined and cannot be null."
      );
    else url_ += "code=" + encodeURIComponent("" + code) + "&";
    url_ = url_.replace(/[?&]$/, "");

    let options_: RequestInit = {
      method: "POST",
      headers: {},
    };

    return this.transformOptions(options_)
      .then((transformedOptions_) => {
        return this.http.fetch(url_, transformedOptions_);
      })
      .then((_response: Response) => {
        return this.transformResult(url_, _response, (_response: Response) =>
          this.processCompleteUploadLink(_response)
        );
      });
  }

  protected processCompleteUploadLink(response: Response): Promise<void> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && response.headers.forEach) {
      response.headers.forEach((v: any, k: any) => (_headers[k] = v));
    }
    if (status === 200) {
      return response.text().then((_responseText) => {
        return;
      });
    } else if (status === 204) {
      return response.text().then((_responseText) => {
        return;
      });
    } else if (status === 400) {
      return response.text().then((_responseText) => {
        let result400: any = null;
        let resultData400 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result400 = ErrorDTO.fromJS(resultData400);
        return throwException(
          "An server-error occured",
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
    return Promise.resolve<void>(null as any);
  }

  /**
   * Get info
   * @return Completed
   */
  getUploadLinkInfo(
    tenant: string,
    code: string
  ): Promise<UploadLinkDatasetDTO> {
    let url_ = this.baseUrl + "/api/core/v1/Document/GetUploadLinkInfo?";
    if (tenant === undefined || tenant === null)
      throw new Error(
        "The parameter 'tenant' must be defined and cannot be null."
      );
    else url_ += "tenant=" + encodeURIComponent("" + tenant) + "&";
    if (code === undefined || code === null)
      throw new Error(
        "The parameter 'code' must be defined and cannot be null."
      );
    else url_ += "code=" + encodeURIComponent("" + code) + "&";
    url_ = url_.replace(/[?&]$/, "");

    let options_: RequestInit = {
      method: "POST",
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
          this.processGetUploadLinkInfo(_response)
        );
      });
  }

  protected processGetUploadLinkInfo(
    response: Response
  ): Promise<UploadLinkDatasetDTO> {
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
        result200 = UploadLinkDatasetDTO.fromJS(resultData200);
        return result200;
      });
    } else if (status === 204) {
      return response.text().then((_responseText) => {
        return throwException("No Content", status, _responseText, _headers);
      });
    } else if (status === 400) {
      return response.text().then((_responseText) => {
        let result400: any = null;
        let resultData400 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result400 = ErrorDTO.fromJS(resultData400);
        return throwException(
          "An server-error occured",
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
    return Promise.resolve<UploadLinkDatasetDTO>(null as any);
  }

  /**
   * Deletes an Uploadlink
   * @return Link deleted
   */
  endUploadLink(tenant: string, code: string): Promise<void> {
    let url_ = this.baseUrl + "/api/core/v1/Document/EndUploadLink?";
    if (tenant === undefined || tenant === null)
      throw new Error(
        "The parameter 'tenant' must be defined and cannot be null."
      );
    else url_ += "tenant=" + encodeURIComponent("" + tenant) + "&";
    if (code === undefined || code === null)
      throw new Error(
        "The parameter 'code' must be defined and cannot be null."
      );
    else url_ += "code=" + encodeURIComponent("" + code) + "&";
    url_ = url_.replace(/[?&]$/, "");

    let options_: RequestInit = {
      method: "DELETE",
      headers: {},
    };

    return this.transformOptions(options_)
      .then((transformedOptions_) => {
        return this.http.fetch(url_, transformedOptions_);
      })
      .then((_response: Response) => {
        return this.transformResult(url_, _response, (_response: Response) =>
          this.processEndUploadLink(_response)
        );
      });
  }

  protected processEndUploadLink(response: Response): Promise<void> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && response.headers.forEach) {
      response.headers.forEach((v: any, k: any) => (_headers[k] = v));
    }
    if (status === 200) {
      return response.text().then((_responseText) => {
        return;
      });
    } else if (status === 204) {
      return response.text().then((_responseText) => {
        return;
      });
    } else if (status === 400) {
      return response.text().then((_responseText) => {
        let result400: any = null;
        let resultData400 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result400 = ErrorDTO.fromJS(resultData400);
        return throwException(
          "An server-error occured",
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
    return Promise.resolve<void>(null as any);
  }
}

export interface IExportClient {
  /**
   * Export
   * @param body (optional)
   * @return Export
   */
  export(body: ExportDTO | undefined): Promise<void>;

  /**
   * IQTIG packer
   * @param fileId fileId
   * @return IQTIG Packer
   */
  iQTIGPacker(fileId: number): Promise<void>;

  /**
   * Send emails
   * @param fileId (optional) fileId
   * @return File sent
   */
  sendEmailToIQTIG(fileId: number | undefined): Promise<boolean>;
}

export class ExportClient extends BaseAPIClient implements IExportClient {
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
    this.baseUrl = this.getBaseUrl("", baseUrl);
  }

  /**
   * Export
   * @param body (optional)
   * @return Export
   */
  export(body: ExportDTO | undefined): Promise<void> {
    let url_ = this.baseUrl + "/api/qsffx/v1/Export";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(body);

    let options_: RequestInit = {
      body: content_,
      method: "POST",
      headers: {
        "Content-Type": "application/json-patch+json",
      },
    };

    return this.transformOptions(options_)
      .then((transformedOptions_) => {
        return this.http.fetch(url_, transformedOptions_);
      })
      .then((_response: Response) => {
        return this.transformResult(url_, _response, (_response: Response) =>
          this.processExport(_response)
        );
      });
  }

  protected processExport(response: Response): Promise<void> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && response.headers.forEach) {
      response.headers.forEach((v: any, k: any) => (_headers[k] = v));
    }
    if (status === 200) {
      return response.text().then((_responseText) => {
        return;
      });
    } else if (status === 404) {
      return response.text().then((_responseText) => {
        let result404: any = null;
        let resultData404 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result404 = ErrorDTO.fromJS(resultData404);
        return throwException(
          "Vorgang histories not found",
          status,
          _responseText,
          _headers,
          result404
        );
      });
    } else if (status === 401) {
      return response.text().then((_responseText) => {
        return throwException("Unauthorized", status, _responseText, _headers);
      });
    } else if (status === 204) {
      return response.text().then((_responseText) => {
        return;
      });
    } else if (status === 400) {
      return response.text().then((_responseText) => {
        let result400: any = null;
        let resultData400 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result400 = ErrorDTO.fromJS(resultData400);
        return throwException(
          "An server-error occured",
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
    return Promise.resolve<void>(null as any);
  }

  /**
   * IQTIG packer
   * @param fileId fileId
   * @return IQTIG Packer
   */
  iQTIGPacker(fileId: number): Promise<void> {
    let url_ = this.baseUrl + "/api/qsffx/v1/Export/IQTIGPacker?";
    if (fileId === undefined || fileId === null)
      throw new Error(
        "The parameter 'fileId' must be defined and cannot be null."
      );
    else url_ += "fileId=" + encodeURIComponent("" + fileId) + "&";
    url_ = url_.replace(/[?&]$/, "");

    let options_: RequestInit = {
      method: "POST",
      headers: {},
    };

    return this.transformOptions(options_)
      .then((transformedOptions_) => {
        return this.http.fetch(url_, transformedOptions_);
      })
      .then((_response: Response) => {
        return this.transformResult(url_, _response, (_response: Response) =>
          this.processIQTIGPacker(_response)
        );
      });
  }

  protected processIQTIGPacker(response: Response): Promise<void> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && response.headers.forEach) {
      response.headers.forEach((v: any, k: any) => (_headers[k] = v));
    }
    if (status === 200) {
      return response.text().then((_responseText) => {
        return;
      });
    } else if (status === 404) {
      return response.text().then((_responseText) => {
        let result404: any = null;
        let resultData404 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result404 = ErrorDTO.fromJS(resultData404);
        return throwException(
          "One of: 1. File not found in database, 2. Packer jar file does not exist, 3. Export file does not exist, 4. Public key file does not exist",
          status,
          _responseText,
          _headers,
          result404
        );
      });
    } else if (status === 401) {
      return response.text().then((_responseText) => {
        return throwException("Unauthorized", status, _responseText, _headers);
      });
    } else if (status === 204) {
      return response.text().then((_responseText) => {
        return;
      });
    } else if (status === 400) {
      return response.text().then((_responseText) => {
        let result400: any = null;
        let resultData400 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result400 = ErrorDTO.fromJS(resultData400);
        return throwException(
          "An server-error occured",
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
    return Promise.resolve<void>(null as any);
  }

  /**
   * Send emails
   * @param fileId (optional) fileId
   * @return File sent
   */
  sendEmailToIQTIG(fileId: number | undefined): Promise<boolean> {
    let url_ = this.baseUrl + "/api/qsffx/v1/Export/SendEmailToIQTIG?";
    if (fileId === null)
      throw new Error("The parameter 'fileId' cannot be null.");
    else if (fileId !== undefined)
      url_ += "fileId=" + encodeURIComponent("" + fileId) + "&";
    url_ = url_.replace(/[?&]$/, "");

    let options_: RequestInit = {
      method: "POST",
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
          this.processSendEmailToIQTIG(_response)
        );
      });
  }

  protected processSendEmailToIQTIG(response: Response): Promise<boolean> {
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
    } else if (status === 400) {
      return response.text().then((_responseText) => {
        let result400: any = null;
        let resultData400 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result400 = ErrorDTO.fromJS(resultData400);
        return throwException(
          "File id is missing or Ik is missing",
          status,
          _responseText,
          _headers,
          result400
        );
      });
    } else if (status === 404) {
      return response.text().then((_responseText) => {
        let result404: any = null;
        let resultData404 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result404 = ErrorDTO.fromJS(resultData404);
        return throwException(
          "File not found in database",
          status,
          _responseText,
          _headers,
          result404
        );
      });
    } else if (status === 401) {
      return response.text().then((_responseText) => {
        return throwException("Unauthorized", status, _responseText, _headers);
      });
    } else if (status === 204) {
      return response.text().then((_responseText) => {
        return throwException("No Content", status, _responseText, _headers);
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
}

export interface IExportHistoryClient {
  /**
   * Get Export Histories
   * @param documentId (optional) Document id
   * @param exportGroup (optional) Export group id
   * @param exportDocumentId (optional) Export document id
   * @param resultDocumentId (optional) Result document id
   * @param exportType (optional) ExportType
   * @param isTest (optional) IsTest
   * @param year (optional) Year
   * @param exportedDateFrom (optional) ExportedDateFrom
   * @param exportedDateTo (optional) ExportedDateTo
   * @return Metadata
   */
  getExportHistories(
    documentId: string | undefined,
    exportGroup: string | undefined,
    exportDocumentId: number | undefined,
    resultDocumentId: number | undefined,
    exportType: string | undefined,
    isTest: boolean | undefined,
    year: number | undefined,
    exportedDateFrom: Date | undefined,
    exportedDateTo: Date | undefined
  ): Promise<ExportableDTO[]>;

  /**
   * Download Documents info
   * @param documentId Id of document
   * @return Documents
   */
  downloadDocumentsInfo(documentId: string): Promise<boolean>;

  /**
   * Get File Content
   * @param exportId ExportId
   * @param fromResult FromResult
   * @param tag Tag
   * @return File content
   */
  getFile(
    exportId: number,
    fromResult: boolean,
    tag: string
  ): Promise<FileContent>;

  /**
   * Generates email file for an export
   * @param id Id in the ExportHistories table
   * @return Email generated
   */
  generateEmailFile(id: number): Promise<void>;

  /**
   * Download export files content as zip
   * @param exportIds Id of the files
   * @return FileContentResult
   */
  downloadZip(exportIds: number[]): Promise<FileResponse>;
}

export class ExportHistoryClient
  extends BaseAPIClient
  implements IExportHistoryClient
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
    this.baseUrl = this.getBaseUrl("", baseUrl);
  }

  /**
   * Get Export Histories
   * @param documentId (optional) Document id
   * @param exportGroup (optional) Export group id
   * @param exportDocumentId (optional) Export document id
   * @param resultDocumentId (optional) Result document id
   * @param exportType (optional) ExportType
   * @param isTest (optional) IsTest
   * @param year (optional) Year
   * @param exportedDateFrom (optional) ExportedDateFrom
   * @param exportedDateTo (optional) ExportedDateTo
   * @return Metadata
   */
  getExportHistories(
    documentId: string | undefined,
    exportGroup: string | undefined,
    exportDocumentId: number | undefined,
    resultDocumentId: number | undefined,
    exportType: string | undefined,
    isTest: boolean | undefined,
    year: number | undefined,
    exportedDateFrom: Date | undefined,
    exportedDateTo: Date | undefined
  ): Promise<ExportableDTO[]> {
    let url_ = this.baseUrl + "/api/qsffx/v1/ExportHistory?";
    if (documentId === null)
      throw new Error("The parameter 'documentId' cannot be null.");
    else if (documentId !== undefined)
      url_ += "documentId=" + encodeURIComponent("" + documentId) + "&";
    if (exportGroup === null)
      throw new Error("The parameter 'exportGroup' cannot be null.");
    else if (exportGroup !== undefined)
      url_ += "exportGroup=" + encodeURIComponent("" + exportGroup) + "&";
    if (exportDocumentId === null)
      throw new Error("The parameter 'exportDocumentId' cannot be null.");
    else if (exportDocumentId !== undefined)
      url_ +=
        "exportDocumentId=" + encodeURIComponent("" + exportDocumentId) + "&";
    if (resultDocumentId === null)
      throw new Error("The parameter 'resultDocumentId' cannot be null.");
    else if (resultDocumentId !== undefined)
      url_ +=
        "resultDocumentId=" + encodeURIComponent("" + resultDocumentId) + "&";
    if (exportType === null)
      throw new Error("The parameter 'exportType' cannot be null.");
    else if (exportType !== undefined)
      url_ += "exportType=" + encodeURIComponent("" + exportType) + "&";
    if (isTest === null)
      throw new Error("The parameter 'isTest' cannot be null.");
    else if (isTest !== undefined)
      url_ += "isTest=" + encodeURIComponent("" + isTest) + "&";
    if (year === null) throw new Error("The parameter 'year' cannot be null.");
    else if (year !== undefined)
      url_ += "year=" + encodeURIComponent("" + year) + "&";
    if (exportedDateFrom === null)
      throw new Error("The parameter 'exportedDateFrom' cannot be null.");
    else if (exportedDateFrom !== undefined)
      url_ +=
        "exportedDateFrom=" +
        encodeURIComponent(
          exportedDateFrom ? "" + exportedDateFrom.toISOString() : ""
        ) +
        "&";
    if (exportedDateTo === null)
      throw new Error("The parameter 'exportedDateTo' cannot be null.");
    else if (exportedDateTo !== undefined)
      url_ +=
        "exportedDateTo=" +
        encodeURIComponent(
          exportedDateTo ? "" + exportedDateTo.toISOString() : ""
        ) +
        "&";
    url_ = url_.replace(/[?&]$/, "");

    let options_: RequestInit = {
      method: "GET",
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
          this.processGetExportHistories(_response)
        );
      });
  }

  protected processGetExportHistories(
    response: Response
  ): Promise<ExportableDTO[]> {
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
            result200!.push(ExportableDTO.fromJS(item));
        } else {
          result200 = <any>null;
        }
        return result200;
      });
    } else if (status === 401) {
      return response.text().then((_responseText) => {
        return throwException("Unauthorized", status, _responseText, _headers);
      });
    } else if (status === 204) {
      return response.text().then((_responseText) => {
        return throwException("No Content", status, _responseText, _headers);
      });
    } else if (status === 400) {
      return response.text().then((_responseText) => {
        let result400: any = null;
        let resultData400 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result400 = ErrorDTO.fromJS(resultData400);
        return throwException(
          "An server-error occured",
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
    return Promise.resolve<ExportableDTO[]>(null as any);
  }

  /**
   * Download Documents info
   * @param documentId Id of document
   * @return Documents
   */
  downloadDocumentsInfo(documentId: string): Promise<boolean> {
    let url_ = this.baseUrl + "/api/qsffx/v1/ExportHistory/info/{documentId}";
    if (documentId === undefined || documentId === null)
      throw new Error("The parameter 'documentId' must be defined.");
    url_ = url_.replace("{documentId}", encodeURIComponent("" + documentId));
    url_ = url_.replace(/[?&]$/, "");

    let options_: RequestInit = {
      method: "GET",
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
          this.processDownloadDocumentsInfo(_response)
        );
      });
  }

  protected processDownloadDocumentsInfo(response: Response): Promise<boolean> {
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
    } else if (status === 204) {
      return response.text().then((_responseText) => {
        return throwException("No Content", status, _responseText, _headers);
      });
    } else if (status === 400) {
      return response.text().then((_responseText) => {
        let result400: any = null;
        let resultData400 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result400 = ErrorDTO.fromJS(resultData400);
        return throwException(
          "An server-error occured",
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
    return Promise.resolve<boolean>(null as any);
  }

  /**
   * Get File Content
   * @param exportId ExportId
   * @param fromResult FromResult
   * @param tag Tag
   * @return File content
   */
  getFile(
    exportId: number,
    fromResult: boolean,
    tag: string
  ): Promise<FileContent> {
    let url_ =
      this.baseUrl + "/api/qsffx/v1/ExportHistory/TextFile/{exportId}?";
    if (exportId === undefined || exportId === null)
      throw new Error("The parameter 'exportId' must be defined.");
    url_ = url_.replace("{exportId}", encodeURIComponent("" + exportId));
    if (fromResult === undefined || fromResult === null)
      throw new Error(
        "The parameter 'fromResult' must be defined and cannot be null."
      );
    else url_ += "fromResult=" + encodeURIComponent("" + fromResult) + "&";
    if (tag === undefined || tag === null)
      throw new Error(
        "The parameter 'tag' must be defined and cannot be null."
      );
    else url_ += "tag=" + encodeURIComponent("" + tag) + "&";
    url_ = url_.replace(/[?&]$/, "");

    let options_: RequestInit = {
      method: "GET",
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
          this.processGetFile(_response)
        );
      });
  }

  protected processGetFile(response: Response): Promise<FileContent> {
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
        result200 = FileContent.fromJS(resultData200);
        return result200;
      });
    } else if (status === 401) {
      return response.text().then((_responseText) => {
        return throwException("Unauthorized", status, _responseText, _headers);
      });
    } else if (status === 204) {
      return response.text().then((_responseText) => {
        return throwException("No Content", status, _responseText, _headers);
      });
    } else if (status === 400) {
      return response.text().then((_responseText) => {
        let result400: any = null;
        let resultData400 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result400 = ErrorDTO.fromJS(resultData400);
        return throwException(
          "An server-error occured",
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
    return Promise.resolve<FileContent>(null as any);
  }

  /**
   * Generates email file for an export
   * @param id Id in the ExportHistories table
   * @return Email generated
   */
  generateEmailFile(id: number): Promise<void> {
    let url_ =
      this.baseUrl + "/api/qsffx/v1/ExportHistory/GenerateEmailFile/{id}";
    if (id === undefined || id === null)
      throw new Error("The parameter 'id' must be defined.");
    url_ = url_.replace("{id}", encodeURIComponent("" + id));
    url_ = url_.replace(/[?&]$/, "");

    let options_: RequestInit = {
      method: "POST",
      headers: {},
    };

    return this.transformOptions(options_)
      .then((transformedOptions_) => {
        return this.http.fetch(url_, transformedOptions_);
      })
      .then((_response: Response) => {
        return this.transformResult(url_, _response, (_response: Response) =>
          this.processGenerateEmailFile(_response)
        );
      });
  }

  protected processGenerateEmailFile(response: Response): Promise<void> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && response.headers.forEach) {
      response.headers.forEach((v: any, k: any) => (_headers[k] = v));
    }
    if (status === 200) {
      return response.text().then((_responseText) => {
        return;
      });
    } else if (status === 400) {
      return response.text().then((_responseText) => {
        let result400: any = null;
        let resultData400 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result400 = ObjectErrorDTO.fromJS(resultData400);
        return throwException(
          "Bad request",
          status,
          _responseText,
          _headers,
          result400
        );
      });
    } else if (status === 401) {
      return response.text().then((_responseText) => {
        return throwException("Unauthorized", status, _responseText, _headers);
      });
    } else if (status === 204) {
      return response.text().then((_responseText) => {
        return;
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
    return Promise.resolve<void>(null as any);
  }

  /**
   * Download export files content as zip
   * @param exportIds Id of the files
   * @return FileContentResult
   */
  downloadZip(exportIds: number[]): Promise<FileResponse> {
    let url_ = this.baseUrl + "/api/qsffx/v1/ExportHistory/content/files?";
    if (exportIds === undefined || exportIds === null)
      throw new Error(
        "The parameter 'exportIds' must be defined and cannot be null."
      );
    else
      exportIds &&
        exportIds.forEach((item) => {
          url_ += "exportIds=" + encodeURIComponent("" + item) + "&";
        });
    url_ = url_.replace(/[?&]$/, "");

    let options_: RequestInit = {
      method: "GET",
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
          this.processDownloadZip(_response)
        );
      });
  }

  protected processDownloadZip(response: Response): Promise<FileResponse> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && response.headers.forEach) {
      response.headers.forEach((v: any, k: any) => (_headers[k] = v));
    }
    if (status === 200 || status === 206) {
      const contentDisposition = response.headers
        ? response.headers.get("content-disposition")
        : undefined;
      let fileNameMatch = contentDisposition
        ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(
            contentDisposition
          )
        : undefined;
      let fileName =
        fileNameMatch && fileNameMatch.length > 1
          ? fileNameMatch[3] || fileNameMatch[2]
          : undefined;
      if (fileName) {
        fileName = decodeURIComponent(fileName);
      } else {
        fileNameMatch = contentDisposition
          ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition)
          : undefined;
        fileName =
          fileNameMatch && fileNameMatch.length > 1
            ? fileNameMatch[1]
            : undefined;
      }
      return response.blob().then((blob) => {
        return {
          fileName: fileName,
          data: blob,
          status: status,
          headers: _headers,
        };
      });
    } else if (status === 404) {
      return response.text().then((_responseText) => {
        let result404: any = null;
        let resultData404 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result404 = ErrorDTO.fromJS(resultData404);
        return throwException(
          "File not found",
          status,
          _responseText,
          _headers,
          result404
        );
      });
    } else if (status === 401) {
      return response.text().then((_responseText) => {
        return throwException("Unauthorized", status, _responseText, _headers);
      });
    } else if (status === 204) {
      return response.text().then((_responseText) => {
        return throwException("No Content", status, _responseText, _headers);
      });
    } else if (status === 400) {
      return response.text().then((_responseText) => {
        let result400: any = null;
        let resultData400 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result400 = ErrorDTO.fromJS(resultData400);
        return throwException(
          "An server-error occured",
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
    return Promise.resolve<FileResponse>(null as any);
  }
}

export interface IGeneralSettingsClient {
  /**
   * Get Setting
   * @param body (optional)
   * @return Value
   */
  getSettingByKey(
    body: StorageScopeQueryDTO | undefined
  ): Promise<GeneralSettingsResultDTO>;

  /**
   * Get Settings
   * @param body (optional)
   * @return Value
   */
  getManySettingsByKey(
    body: StorageScopeQueryDTO[] | undefined
  ): Promise<GeneralSettingsResultDTO[]>;

  /**
   * Set Setting
   * @param body (optional)
   * @return Changed entries
   */
  setSettingByKey(body: StorageScopeStoreDTO | undefined): Promise<number>;

  /**
   * Remove Setting
   * @param body (optional)
   * @return Changed entries
   */
  removeSettingByKey(body: StorageScopeQueryDTO | undefined): Promise<number>;
}

export class GeneralSettingsClient
  extends BaseAPIClient
  implements IGeneralSettingsClient
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
    this.baseUrl = this.getBaseUrl("", baseUrl);
  }

  /**
   * Get Setting
   * @param body (optional)
   * @return Value
   */
  getSettingByKey(
    body: StorageScopeQueryDTO | undefined
  ): Promise<GeneralSettingsResultDTO> {
    let url_ = this.baseUrl + "/api/core/v1/GeneralSettings/GetSettingByKey";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(body);

    let options_: RequestInit = {
      body: content_,
      method: "POST",
      headers: {
        "Content-Type": "application/json-patch+json",
        Accept: "text/plain",
      },
    };

    return this.transformOptions(options_)
      .then((transformedOptions_) => {
        return this.http.fetch(url_, transformedOptions_);
      })
      .then((_response: Response) => {
        return this.transformResult(url_, _response, (_response: Response) =>
          this.processGetSettingByKey(_response)
        );
      });
  }

  protected processGetSettingByKey(
    response: Response
  ): Promise<GeneralSettingsResultDTO> {
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
        result200 = GeneralSettingsResultDTO.fromJS(resultData200);
        return result200;
      });
    } else if (status === 401) {
      return response.text().then((_responseText) => {
        return throwException("Unauthorized", status, _responseText, _headers);
      });
    } else if (status === 204) {
      return response.text().then((_responseText) => {
        return throwException("No Content", status, _responseText, _headers);
      });
    } else if (status === 400) {
      return response.text().then((_responseText) => {
        let result400: any = null;
        let resultData400 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result400 = ErrorDTO.fromJS(resultData400);
        return throwException(
          "An server-error occured",
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
    return Promise.resolve<GeneralSettingsResultDTO>(null as any);
  }

  /**
   * Get Settings
   * @param body (optional)
   * @return Value
   */
  getManySettingsByKey(
    body: StorageScopeQueryDTO[] | undefined
  ): Promise<GeneralSettingsResultDTO[]> {
    let url_ =
      this.baseUrl + "/api/core/v1/GeneralSettings/GetManySettingsByKey";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(body);

    let options_: RequestInit = {
      body: content_,
      method: "POST",
      headers: {
        "Content-Type": "application/json-patch+json",
        Accept: "text/plain",
      },
    };

    return this.transformOptions(options_)
      .then((transformedOptions_) => {
        return this.http.fetch(url_, transformedOptions_);
      })
      .then((_response: Response) => {
        return this.transformResult(url_, _response, (_response: Response) =>
          this.processGetManySettingsByKey(_response)
        );
      });
  }

  protected processGetManySettingsByKey(
    response: Response
  ): Promise<GeneralSettingsResultDTO[]> {
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
            result200!.push(GeneralSettingsResultDTO.fromJS(item));
        } else {
          result200 = <any>null;
        }
        return result200;
      });
    } else if (status === 401) {
      return response.text().then((_responseText) => {
        return throwException("Unauthorized", status, _responseText, _headers);
      });
    } else if (status === 204) {
      return response.text().then((_responseText) => {
        return throwException("No Content", status, _responseText, _headers);
      });
    } else if (status === 400) {
      return response.text().then((_responseText) => {
        let result400: any = null;
        let resultData400 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result400 = ErrorDTO.fromJS(resultData400);
        return throwException(
          "An server-error occured",
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
    return Promise.resolve<GeneralSettingsResultDTO[]>(null as any);
  }

  /**
   * Set Setting
   * @param body (optional)
   * @return Changed entries
   */
  setSettingByKey(body: StorageScopeStoreDTO | undefined): Promise<number> {
    let url_ = this.baseUrl + "/api/core/v1/GeneralSettings/SetSettingByKey";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(body);

    let options_: RequestInit = {
      body: content_,
      method: "POST",
      headers: {
        "Content-Type": "application/json-patch+json",
        Accept: "text/plain",
      },
    };

    return this.transformOptions(options_)
      .then((transformedOptions_) => {
        return this.http.fetch(url_, transformedOptions_);
      })
      .then((_response: Response) => {
        return this.transformResult(url_, _response, (_response: Response) =>
          this.processSetSettingByKey(_response)
        );
      });
  }

  protected processSetSettingByKey(response: Response): Promise<number> {
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
    } else if (status === 400) {
      return response.text().then((_responseText) => {
        let result400: any = null;
        let resultData400 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result400 = resultData400 !== undefined ? resultData400 : <any>null;

        return throwException(
          "Operation not permitted",
          status,
          _responseText,
          _headers,
          result400
        );
      });
    } else if (status === 401) {
      return response.text().then((_responseText) => {
        return throwException("Unauthorized", status, _responseText, _headers);
      });
    } else if (status === 204) {
      return response.text().then((_responseText) => {
        return throwException("No Content", status, _responseText, _headers);
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
    return Promise.resolve<number>(null as any);
  }

  /**
   * Remove Setting
   * @param body (optional)
   * @return Changed entries
   */
  removeSettingByKey(body: StorageScopeQueryDTO | undefined): Promise<number> {
    let url_ = this.baseUrl + "/api/core/v1/GeneralSettings/RemoveSettingByKey";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(body);

    let options_: RequestInit = {
      body: content_,
      method: "POST",
      headers: {
        "Content-Type": "application/json-patch+json",
        Accept: "text/plain",
      },
    };

    return this.transformOptions(options_)
      .then((transformedOptions_) => {
        return this.http.fetch(url_, transformedOptions_);
      })
      .then((_response: Response) => {
        return this.transformResult(url_, _response, (_response: Response) =>
          this.processRemoveSettingByKey(_response)
        );
      });
  }

  protected processRemoveSettingByKey(response: Response): Promise<number> {
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
    } else if (status === 400) {
      return response.text().then((_responseText) => {
        let result400: any = null;
        let resultData400 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result400 = resultData400 !== undefined ? resultData400 : <any>null;

        return throwException(
          "Operation not permitted",
          status,
          _responseText,
          _headers,
          result400
        );
      });
    } else if (status === 401) {
      return response.text().then((_responseText) => {
        return throwException("Unauthorized", status, _responseText, _headers);
      });
    } else if (status === 204) {
      return response.text().then((_responseText) => {
        return throwException("No Content", status, _responseText, _headers);
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
    return Promise.resolve<number>(null as any);
  }
}

export interface IGgtClient {
  /**
   * Get bundeslander
   * @return Values
   */
  getBundeslander(): Promise<string[]>;

  /**
   * Get all destinations
   * @param kassenart (optional) Kassenart (if empty then all types are returned)
   * @return Destinations
   */
  getAllDestinations(
    kassenart: string | undefined
  ): Promise<GgtDestinationDTO[]>;

  /**
   * Get destinations by bundesland
   * @param bundesland Bundesland name
   * @param kassenart (optional) Kassenart (if empty then all types are returned)
   * @return Destinations
   */
  getDestinationsByBundesland(
    bundesland: string,
    kassenart: string | undefined
  ): Promise<GgtDestinationDTO[]>;

  /**
   * Get destinations by location
   * @param standortId Standort ID
   * @param kassenart (optional) Kassenart (if empty then all types are returned)
   * @return Destinations
   */
  getDestinationsByStandort(
    standortId: string,
    kassenart: string | undefined
  ): Promise<GgtDestinationDTO[]>;

  /**
   * Generates email file for an export
   * @param id Id in the ExportHistories table
   * @return Email generated
   */
  generateEmailFile2(id: number): Promise<void>;

  /**
   * Generates email files for an export group
   * @param exportGroup Export group Guid in the ExportHistories table
   * @return Number of emails done/skipped
   */
  generateEmailGroup(exportGroup: string): Promise<Int32Int32ValueTuple>;
}

export class GgtClient extends BaseAPIClient implements IGgtClient {
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
    this.baseUrl = this.getBaseUrl("", baseUrl);
  }

  /**
   * Get bundeslander
   * @return Values
   */
  getBundeslander(): Promise<string[]> {
    let url_ = this.baseUrl + "/api/qsffx/v1/Ggt/GetBundeslander";
    url_ = url_.replace(/[?&]$/, "");

    let options_: RequestInit = {
      method: "GET",
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
          this.processGetBundeslander(_response)
        );
      });
  }

  protected processGetBundeslander(response: Response): Promise<string[]> {
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
          for (let item of resultData200) result200!.push(item);
        } else {
          result200 = <any>null;
        }
        return result200;
      });
    } else if (status === 204) {
      return response.text().then((_responseText) => {
        return throwException("No Content", status, _responseText, _headers);
      });
    } else if (status === 400) {
      return response.text().then((_responseText) => {
        let result400: any = null;
        let resultData400 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result400 = ErrorDTO.fromJS(resultData400);
        return throwException(
          "An server-error occured",
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
    return Promise.resolve<string[]>(null as any);
  }

  /**
   * Get all destinations
   * @param kassenart (optional) Kassenart (if empty then all types are returned)
   * @return Destinations
   */
  getAllDestinations(
    kassenart: string | undefined
  ): Promise<GgtDestinationDTO[]> {
    let url_ = this.baseUrl + "/api/qsffx/v1/Ggt/GetAllDestinations?";
    if (kassenart === null)
      throw new Error("The parameter 'kassenart' cannot be null.");
    else if (kassenart !== undefined)
      url_ += "kassenart=" + encodeURIComponent("" + kassenart) + "&";
    url_ = url_.replace(/[?&]$/, "");

    let options_: RequestInit = {
      method: "GET",
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
          this.processGetAllDestinations(_response)
        );
      });
  }

  protected processGetAllDestinations(
    response: Response
  ): Promise<GgtDestinationDTO[]> {
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
            result200!.push(GgtDestinationDTO.fromJS(item));
        } else {
          result200 = <any>null;
        }
        return result200;
      });
    } else if (status === 401) {
      return response.text().then((_responseText) => {
        return throwException("Unauthorized", status, _responseText, _headers);
      });
    } else if (status === 204) {
      return response.text().then((_responseText) => {
        return throwException("No Content", status, _responseText, _headers);
      });
    } else if (status === 400) {
      return response.text().then((_responseText) => {
        let result400: any = null;
        let resultData400 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result400 = ErrorDTO.fromJS(resultData400);
        return throwException(
          "An server-error occured",
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
    return Promise.resolve<GgtDestinationDTO[]>(null as any);
  }

  /**
   * Get destinations by bundesland
   * @param bundesland Bundesland name
   * @param kassenart (optional) Kassenart (if empty then all types are returned)
   * @return Destinations
   */
  getDestinationsByBundesland(
    bundesland: string,
    kassenart: string | undefined
  ): Promise<GgtDestinationDTO[]> {
    let url_ =
      this.baseUrl +
      "/api/qsffx/v1/Ggt/GetDestinationsByBundesland/{bundesland}?";
    if (bundesland === undefined || bundesland === null)
      throw new Error("The parameter 'bundesland' must be defined.");
    url_ = url_.replace("{bundesland}", encodeURIComponent("" + bundesland));
    if (kassenart === null)
      throw new Error("The parameter 'kassenart' cannot be null.");
    else if (kassenart !== undefined)
      url_ += "kassenart=" + encodeURIComponent("" + kassenart) + "&";
    url_ = url_.replace(/[?&]$/, "");

    let options_: RequestInit = {
      method: "GET",
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
          this.processGetDestinationsByBundesland(_response)
        );
      });
  }

  protected processGetDestinationsByBundesland(
    response: Response
  ): Promise<GgtDestinationDTO[]> {
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
            result200!.push(GgtDestinationDTO.fromJS(item));
        } else {
          result200 = <any>null;
        }
        return result200;
      });
    } else if (status === 401) {
      return response.text().then((_responseText) => {
        return throwException("Unauthorized", status, _responseText, _headers);
      });
    } else if (status === 204) {
      return response.text().then((_responseText) => {
        return throwException("No Content", status, _responseText, _headers);
      });
    } else if (status === 400) {
      return response.text().then((_responseText) => {
        let result400: any = null;
        let resultData400 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result400 = ErrorDTO.fromJS(resultData400);
        return throwException(
          "An server-error occured",
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
    return Promise.resolve<GgtDestinationDTO[]>(null as any);
  }

  /**
   * Get destinations by location
   * @param standortId Standort ID
   * @param kassenart (optional) Kassenart (if empty then all types are returned)
   * @return Destinations
   */
  getDestinationsByStandort(
    standortId: string,
    kassenart: string | undefined
  ): Promise<GgtDestinationDTO[]> {
    let url_ =
      this.baseUrl +
      "/api/qsffx/v1/Ggt/GetDestinationsByStandort/{standortId}?";
    if (standortId === undefined || standortId === null)
      throw new Error("The parameter 'standortId' must be defined.");
    url_ = url_.replace("{standortId}", encodeURIComponent("" + standortId));
    if (kassenart === null)
      throw new Error("The parameter 'kassenart' cannot be null.");
    else if (kassenart !== undefined)
      url_ += "kassenart=" + encodeURIComponent("" + kassenart) + "&";
    url_ = url_.replace(/[?&]$/, "");

    let options_: RequestInit = {
      method: "GET",
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
          this.processGetDestinationsByStandort(_response)
        );
      });
  }

  protected processGetDestinationsByStandort(
    response: Response
  ): Promise<GgtDestinationDTO[]> {
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
            result200!.push(GgtDestinationDTO.fromJS(item));
        } else {
          result200 = <any>null;
        }
        return result200;
      });
    } else if (status === 401) {
      return response.text().then((_responseText) => {
        return throwException("Unauthorized", status, _responseText, _headers);
      });
    } else if (status === 204) {
      return response.text().then((_responseText) => {
        return throwException("No Content", status, _responseText, _headers);
      });
    } else if (status === 400) {
      return response.text().then((_responseText) => {
        let result400: any = null;
        let resultData400 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result400 = ErrorDTO.fromJS(resultData400);
        return throwException(
          "An server-error occured",
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
    return Promise.resolve<GgtDestinationDTO[]>(null as any);
  }

  /**
   * Generates email file for an export
   * @param id Id in the ExportHistories table
   * @return Email generated
   */
  generateEmailFile2(id: number): Promise<void> {
    let url_ = this.baseUrl + "/api/qsffx/v1/Ggt/GenerateEmailFile/{id}";
    if (id === undefined || id === null)
      throw new Error("The parameter 'id' must be defined.");
    url_ = url_.replace("{id}", encodeURIComponent("" + id));
    url_ = url_.replace(/[?&]$/, "");

    let options_: RequestInit = {
      method: "POST",
      headers: {},
    };

    return this.transformOptions(options_)
      .then((transformedOptions_) => {
        return this.http.fetch(url_, transformedOptions_);
      })
      .then((_response: Response) => {
        return this.transformResult(url_, _response, (_response: Response) =>
          this.processGenerateEmailFile2(_response)
        );
      });
  }

  protected processGenerateEmailFile2(response: Response): Promise<void> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && response.headers.forEach) {
      response.headers.forEach((v: any, k: any) => (_headers[k] = v));
    }
    if (status === 200) {
      return response.text().then((_responseText) => {
        return;
      });
    } else if (status === 401) {
      return response.text().then((_responseText) => {
        return throwException("Unauthorized", status, _responseText, _headers);
      });
    } else if (status === 204) {
      return response.text().then((_responseText) => {
        return;
      });
    } else if (status === 400) {
      return response.text().then((_responseText) => {
        let result400: any = null;
        let resultData400 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result400 = ErrorDTO.fromJS(resultData400);
        return throwException(
          "An server-error occured",
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
    return Promise.resolve<void>(null as any);
  }

  /**
   * Generates email files for an export group
   * @param exportGroup Export group Guid in the ExportHistories table
   * @return Number of emails done/skipped
   */
  generateEmailGroup(exportGroup: string): Promise<Int32Int32ValueTuple> {
    let url_ =
      this.baseUrl + "/api/qsffx/v1/Ggt/GenerateEmailGroup/{exportGroup}";
    if (exportGroup === undefined || exportGroup === null)
      throw new Error("The parameter 'exportGroup' must be defined.");
    url_ = url_.replace("{exportGroup}", encodeURIComponent("" + exportGroup));
    url_ = url_.replace(/[?&]$/, "");

    let options_: RequestInit = {
      method: "POST",
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
          this.processGenerateEmailGroup(_response)
        );
      });
  }

  protected processGenerateEmailGroup(
    response: Response
  ): Promise<Int32Int32ValueTuple> {
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
        result200 = Int32Int32ValueTuple.fromJS(resultData200);
        return result200;
      });
    } else if (status === 401) {
      return response.text().then((_responseText) => {
        return throwException("Unauthorized", status, _responseText, _headers);
      });
    } else if (status === 204) {
      return response.text().then((_responseText) => {
        return throwException("No Content", status, _responseText, _headers);
      });
    } else if (status === 400) {
      return response.text().then((_responseText) => {
        let result400: any = null;
        let resultData400 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result400 = ErrorDTO.fromJS(resultData400);
        return throwException(
          "An server-error occured",
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
    return Promise.resolve<Int32Int32ValueTuple>(null as any);
  }
}

export interface IIconifyClient {
  /**
   * Gets icon count
   * @return Count of icons
   */
  getCount(): Promise<number>;

  /**
   * Gets all icons
   * @return IconifyDTO object
   */
  getAllIcons(): Promise<IconifyDTO>;

  /**
   * Updates all icons
   * @param body (optional)
   * @return Number of icons loaded
   */
  updateIcons(body: IconifyDTO | undefined): Promise<number>;
}

export class IconifyClient extends BaseAPIClient implements IIconifyClient {
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
    this.baseUrl = this.getBaseUrl("", baseUrl);
  }

  /**
   * Gets icon count
   * @return Count of icons
   */
  getCount(): Promise<number> {
    let url_ = this.baseUrl + "/api/core/v1/Iconify/GetCount";
    url_ = url_.replace(/[?&]$/, "");

    let options_: RequestInit = {
      method: "GET",
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
          this.processGetCount(_response)
        );
      });
  }

  protected processGetCount(response: Response): Promise<number> {
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
    } else if (status === 400) {
      return response.text().then((_responseText) => {
        let result400: any = null;
        let resultData400 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result400 = ObjectErrorDTO.fromJS(resultData400);
        return throwException(
          "An internal server error occured",
          status,
          _responseText,
          _headers,
          result400
        );
      });
    } else if (status === 204) {
      return response.text().then((_responseText) => {
        return throwException("No Content", status, _responseText, _headers);
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
    return Promise.resolve<number>(null as any);
  }

  /**
   * Gets all icons
   * @return IconifyDTO object
   */
  getAllIcons(): Promise<IconifyDTO> {
    let url_ = this.baseUrl + "/api/core/v1/Iconify/GetAll";
    url_ = url_.replace(/[?&]$/, "");

    let options_: RequestInit = {
      method: "GET",
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
          this.processGetAllIcons(_response)
        );
      });
  }

  protected processGetAllIcons(response: Response): Promise<IconifyDTO> {
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
        result200 = IconifyDTO.fromJS(resultData200);
        return result200;
      });
    } else if (status === 400) {
      return response.text().then((_responseText) => {
        let result400: any = null;
        let resultData400 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result400 = ObjectErrorDTO.fromJS(resultData400);
        return throwException(
          "An internal server error occured",
          status,
          _responseText,
          _headers,
          result400
        );
      });
    } else if (status === 204) {
      return response.text().then((_responseText) => {
        return throwException("No Content", status, _responseText, _headers);
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
    return Promise.resolve<IconifyDTO>(null as any);
  }

  /**
   * Updates all icons
   * @param body (optional)
   * @return Number of icons loaded
   */
  updateIcons(body: IconifyDTO | undefined): Promise<number> {
    let url_ = this.baseUrl + "/api/core/v1/Iconify/UpdateIcons";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(body);

    let options_: RequestInit = {
      body: content_,
      method: "POST",
      headers: {
        "Content-Type": "application/json-patch+json",
        Accept: "text/plain",
      },
    };

    return this.transformOptions(options_)
      .then((transformedOptions_) => {
        return this.http.fetch(url_, transformedOptions_);
      })
      .then((_response: Response) => {
        return this.transformResult(url_, _response, (_response: Response) =>
          this.processUpdateIcons(_response)
        );
      });
  }

  protected processUpdateIcons(response: Response): Promise<number> {
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
    } else if (status === 400) {
      return response.text().then((_responseText) => {
        let result400: any = null;
        let resultData400 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result400 = ObjectErrorDTO.fromJS(resultData400);
        return throwException(
          "An internal server error occured",
          status,
          _responseText,
          _headers,
          result400
        );
      });
    } else if (status === 403) {
      return response.text().then((_responseText) => {
        return throwException(
          "Only systembetreuer can upload icons",
          status,
          _responseText,
          _headers
        );
      });
    } else if (status === 401) {
      return response.text().then((_responseText) => {
        return throwException("Unauthorized", status, _responseText, _headers);
      });
    } else if (status === 204) {
      return response.text().then((_responseText) => {
        return throwException("No Content", status, _responseText, _headers);
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
    return Promise.resolve<number>(null as any);
  }
}

export interface IInstitutionResponseClient {
  /**
   * Upload institution response
   * @param files (optional)
   * @return Status of response
   */
  upload(files: FileParameter[] | undefined): Promise<InstitutionResponseDTO>;
}

export class InstitutionResponseClient
  extends BaseAPIClient
  implements IInstitutionResponseClient
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
    this.baseUrl = this.getBaseUrl("", baseUrl);
  }

  /**
   * Upload institution response
   * @param files (optional)
   * @return Status of response
   */
  upload(files: FileParameter[] | undefined): Promise<InstitutionResponseDTO> {
    let url_ = this.baseUrl + "/api/qsffx/v1/InstitutionResponse/Upload";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = new FormData();
    if (files === null || files === undefined)
      throw new Error("The parameter 'files' cannot be null.");
    else
      files.forEach((item_) =>
        content_.append(
          "files",
          item_.data,
          item_.fileName ? item_.fileName : "files"
        )
      );

    let options_: RequestInit = {
      body: content_,
      method: "PUT",
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
          this.processUpload(_response)
        );
      });
  }

  protected processUpload(response: Response): Promise<InstitutionResponseDTO> {
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
        result200 = InstitutionResponseDTO.fromJS(resultData200);
        return result200;
      });
    } else if (status === 401) {
      return response.text().then((_responseText) => {
        return throwException("Unauthorized", status, _responseText, _headers);
      });
    } else if (status === 204) {
      return response.text().then((_responseText) => {
        return throwException("No Content", status, _responseText, _headers);
      });
    } else if (status === 400) {
      return response.text().then((_responseText) => {
        let result400: any = null;
        let resultData400 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result400 = ErrorDTO.fromJS(resultData400);
        return throwException(
          "An server-error occured",
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
    return Promise.resolve<InstitutionResponseDTO>(null as any);
  }
}

export interface ILicenseClient {
  /**
   * Tries to check pin for Leitstand license
   * @param body (optional)
   * @return Check pin result
   */
  doCheckPin(body: CheckPinDTO | undefined): Promise<boolean>;

  /**
   * Tries to check license flags for tenant
   * @return License result
   */
  doCheckLicense(tenant: string): Promise<LeitstandLicence>;
}

export class LicenseClient extends BaseAPIClient implements ILicenseClient {
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
    this.baseUrl = this.getBaseUrl("", baseUrl);
  }

  /**
   * Tries to check pin for Leitstand license
   * @param body (optional)
   * @return Check pin result
   */
  doCheckPin(body: CheckPinDTO | undefined): Promise<boolean> {
    let url_ = this.baseUrl + "/api/core/v1/License/CheckPin";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(body);

    let options_: RequestInit = {
      body: content_,
      method: "POST",
      headers: {
        "Content-Type": "application/json-patch+json",
        Accept: "text/plain",
      },
    };

    return this.transformOptions(options_)
      .then((transformedOptions_) => {
        return this.http.fetch(url_, transformedOptions_);
      })
      .then((_response: Response) => {
        return this.transformResult(url_, _response, (_response: Response) =>
          this.processDoCheckPin(_response)
        );
      });
  }

  protected processDoCheckPin(response: Response): Promise<boolean> {
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
    } else if (status === 400) {
      return response.text().then((_responseText) => {
        let result400: any = null;
        let resultData400 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result400 = ErrorDTO.fromJS(resultData400);
        return throwException(
          "Server error",
          status,
          _responseText,
          _headers,
          result400
        );
      });
    } else if (status === 401) {
      return response.text().then((_responseText) => {
        return throwException("Unauthorized", status, _responseText, _headers);
      });
    } else if (status === 204) {
      return response.text().then((_responseText) => {
        return throwException("No Content", status, _responseText, _headers);
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
   * Tries to check license flags for tenant
   * @return License result
   */
  doCheckLicense(tenant: string): Promise<LeitstandLicence> {
    let url_ = this.baseUrl + "/api/core/v1/License/{tenant}";
    if (tenant === undefined || tenant === null)
      throw new Error("The parameter 'tenant' must be defined.");
    url_ = url_.replace("{tenant}", encodeURIComponent("" + tenant));
    url_ = url_.replace(/[?&]$/, "");

    let options_: RequestInit = {
      method: "GET",
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
          this.processDoCheckLicense(_response)
        );
      });
  }

  protected processDoCheckLicense(
    response: Response
  ): Promise<LeitstandLicence> {
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
        result200 = LeitstandLicence.fromJS(resultData200);
        return result200;
      });
    } else if (status === 401) {
      return response.text().then((_responseText) => {
        return throwException("Unauthorized", status, _responseText, _headers);
      });
    } else if (status === 204) {
      return response.text().then((_responseText) => {
        return throwException("No Content", status, _responseText, _headers);
      });
    } else if (status === 400) {
      return response.text().then((_responseText) => {
        let result400: any = null;
        let resultData400 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result400 = ErrorDTO.fromJS(resultData400);
        return throwException(
          "An server-error occured",
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
    return Promise.resolve<LeitstandLicence>(null as any);
  }
}

export interface ILocationClient {
  /**
   * Updates Location
   * @param body (optional)
   * @return Updates Location
   */
  updateLocation(body: LocationUDTO | undefined): Promise<LocationDTO>;
}

export class LocationClient extends BaseAPIClient implements ILocationClient {
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
    this.baseUrl = this.getBaseUrl("", baseUrl);
  }

  /**
   * Updates Location
   * @param body (optional)
   * @return Updates Location
   */
  updateLocation(body: LocationUDTO | undefined): Promise<LocationDTO> {
    let url_ = this.baseUrl + "/api/core/v1/Location/UpdateLocation";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(body);

    let options_: RequestInit = {
      body: content_,
      method: "PUT",
      headers: {
        "Content-Type": "application/json-patch+json",
        Accept: "text/plain",
      },
    };

    return this.transformOptions(options_)
      .then((transformedOptions_) => {
        return this.http.fetch(url_, transformedOptions_);
      })
      .then((_response: Response) => {
        return this.transformResult(url_, _response, (_response: Response) =>
          this.processUpdateLocation(_response)
        );
      });
  }

  protected processUpdateLocation(response: Response): Promise<LocationDTO> {
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
        result200 = LocationDTO.fromJS(resultData200);
        return result200;
      });
    } else if (status === 204) {
      return response.text().then((_responseText) => {
        return throwException("No Content", status, _responseText, _headers);
      });
    } else if (status === 400) {
      return response.text().then((_responseText) => {
        let result400: any = null;
        let resultData400 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result400 = ErrorDTO.fromJS(resultData400);
        return throwException(
          "An server-error occured",
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
    return Promise.resolve<LocationDTO>(null as any);
  }
}

export interface ILogicalUnitClient {
  /**
   * Gets all Units of Location
   * @return List of all Units
   */
  getAllUnits(): Promise<LogicalUnitDTO[]>;

  /**
   * Updates Location
   * @param body (optional)
   * @return updated LogicalUnit
   */
  updateLogicalUnit(body: LogicalUnitUDTO | undefined): Promise<LogicalUnitDTO>;
}

export class LogicalUnitClient
  extends BaseAPIClient
  implements ILogicalUnitClient
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
    this.baseUrl = this.getBaseUrl("", baseUrl);
  }

  /**
   * Gets all Units of Location
   * @return List of all Units
   */
  getAllUnits(): Promise<LogicalUnitDTO[]> {
    let url_ = this.baseUrl + "/api/core/v1/LogicalUnit/GetAllUnits";
    url_ = url_.replace(/[?&]$/, "");

    let options_: RequestInit = {
      method: "GET",
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
          this.processGetAllUnits(_response)
        );
      });
  }

  protected processGetAllUnits(response: Response): Promise<LogicalUnitDTO[]> {
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
            result200!.push(LogicalUnitDTO.fromJS(item));
        } else {
          result200 = <any>null;
        }
        return result200;
      });
    } else if (status === 401) {
      return response.text().then((_responseText) => {
        return throwException("Unauthorized", status, _responseText, _headers);
      });
    } else if (status === 204) {
      return response.text().then((_responseText) => {
        return throwException("No Content", status, _responseText, _headers);
      });
    } else if (status === 400) {
      return response.text().then((_responseText) => {
        let result400: any = null;
        let resultData400 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result400 = ErrorDTO.fromJS(resultData400);
        return throwException(
          "An server-error occured",
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
    return Promise.resolve<LogicalUnitDTO[]>(null as any);
  }

  /**
   * Updates Location
   * @param body (optional)
   * @return updated LogicalUnit
   */
  updateLogicalUnit(
    body: LogicalUnitUDTO | undefined
  ): Promise<LogicalUnitDTO> {
    let url_ = this.baseUrl + "/api/core/v1/LogicalUnit/UpdateLogicalUnit";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(body);

    let options_: RequestInit = {
      body: content_,
      method: "PUT",
      headers: {
        "Content-Type": "application/json-patch+json",
        Accept: "text/plain",
      },
    };

    return this.transformOptions(options_)
      .then((transformedOptions_) => {
        return this.http.fetch(url_, transformedOptions_);
      })
      .then((_response: Response) => {
        return this.transformResult(url_, _response, (_response: Response) =>
          this.processUpdateLogicalUnit(_response)
        );
      });
  }

  protected processUpdateLogicalUnit(
    response: Response
  ): Promise<LogicalUnitDTO> {
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
        result200 = LogicalUnitDTO.fromJS(resultData200);
        return result200;
      });
    } else if (status === 401) {
      return response.text().then((_responseText) => {
        return throwException("Unauthorized", status, _responseText, _headers);
      });
    } else if (status === 204) {
      return response.text().then((_responseText) => {
        return throwException("No Content", status, _responseText, _headers);
      });
    } else if (status === 400) {
      return response.text().then((_responseText) => {
        let result400: any = null;
        let resultData400 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result400 = ErrorDTO.fromJS(resultData400);
        return throwException(
          "An server-error occured",
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
    return Promise.resolve<LogicalUnitDTO>(null as any);
  }
}

export interface IMetaModulesClient {
  /**
   * Get meta module
   * @param id Id of MetaModule
   * @return MetaModule
   */
  getMetaModule(id: number): Promise<MetaModulDTO>;

  /**
   * Get meta module
   * @param name Vorgangsname
   * @param year vorgangsjahr
   * @return MetaModule
   */
  getMetaModule2(name: string, year: number): Promise<MetaModulDTO>;

  /**
   * Get all meta module
   * @return MetaModules
   */
  getMetaModules(): Promise<MetaModulDTO[]>;
}

export class MetaModulesClient
  extends BaseAPIClient
  implements IMetaModulesClient
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
    this.baseUrl = this.getBaseUrl("", baseUrl);
  }

  /**
   * Get meta module
   * @param id Id of MetaModule
   * @return MetaModule
   */
  getMetaModule(id: number): Promise<MetaModulDTO> {
    let url_ = this.baseUrl + "/api/qsffx/v1/MetaModules/{id}";
    if (id === undefined || id === null)
      throw new Error("The parameter 'id' must be defined.");
    url_ = url_.replace("{id}", encodeURIComponent("" + id));
    url_ = url_.replace(/[?&]$/, "");

    let options_: RequestInit = {
      method: "GET",
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
          this.processGetMetaModule(_response)
        );
      });
  }

  protected processGetMetaModule(response: Response): Promise<MetaModulDTO> {
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
        result200 = MetaModulDTO.fromJS(resultData200);
        return result200;
      });
    } else if (status === 401) {
      return response.text().then((_responseText) => {
        return throwException("Unauthorized", status, _responseText, _headers);
      });
    } else if (status === 204) {
      return response.text().then((_responseText) => {
        return throwException("No Content", status, _responseText, _headers);
      });
    } else if (status === 400) {
      return response.text().then((_responseText) => {
        let result400: any = null;
        let resultData400 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result400 = ErrorDTO.fromJS(resultData400);
        return throwException(
          "An server-error occured",
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
    return Promise.resolve<MetaModulDTO>(null as any);
  }

  /**
   * Get meta module
   * @param name Vorgangsname
   * @param year vorgangsjahr
   * @return MetaModule
   */
  getMetaModule2(name: string, year: number): Promise<MetaModulDTO> {
    let url_ = this.baseUrl + "/api/qsffx/v1/MetaModules/{name}/{year}";
    if (name === undefined || name === null)
      throw new Error("The parameter 'name' must be defined.");
    url_ = url_.replace("{name}", encodeURIComponent("" + name));
    if (year === undefined || year === null)
      throw new Error("The parameter 'year' must be defined.");
    url_ = url_.replace("{year}", encodeURIComponent("" + year));
    url_ = url_.replace(/[?&]$/, "");

    let options_: RequestInit = {
      method: "GET",
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
          this.processGetMetaModule2(_response)
        );
      });
  }

  protected processGetMetaModule2(response: Response): Promise<MetaModulDTO> {
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
        result200 = MetaModulDTO.fromJS(resultData200);
        return result200;
      });
    } else if (status === 401) {
      return response.text().then((_responseText) => {
        return throwException("Unauthorized", status, _responseText, _headers);
      });
    } else if (status === 204) {
      return response.text().then((_responseText) => {
        return throwException("No Content", status, _responseText, _headers);
      });
    } else if (status === 400) {
      return response.text().then((_responseText) => {
        let result400: any = null;
        let resultData400 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result400 = ErrorDTO.fromJS(resultData400);
        return throwException(
          "An server-error occured",
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
    return Promise.resolve<MetaModulDTO>(null as any);
  }

  /**
   * Get all meta module
   * @return MetaModules
   */
  getMetaModules(): Promise<MetaModulDTO[]> {
    let url_ = this.baseUrl + "/api/qsffx/v1/MetaModules";
    url_ = url_.replace(/[?&]$/, "");

    let options_: RequestInit = {
      method: "GET",
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
          this.processGetMetaModules(_response)
        );
      });
  }

  protected processGetMetaModules(response: Response): Promise<MetaModulDTO[]> {
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
            result200!.push(MetaModulDTO.fromJS(item));
        } else {
          result200 = <any>null;
        }
        return result200;
      });
    } else if (status === 401) {
      return response.text().then((_responseText) => {
        return throwException("Unauthorized", status, _responseText, _headers);
      });
    } else if (status === 204) {
      return response.text().then((_responseText) => {
        return throwException("No Content", status, _responseText, _headers);
      });
    } else if (status === 400) {
      return response.text().then((_responseText) => {
        let result400: any = null;
        let resultData400 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result400 = ErrorDTO.fromJS(resultData400);
        return throwException(
          "An server-error occured",
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
    return Promise.resolve<MetaModulDTO[]>(null as any);
  }
}

export interface INotificationClient {
  /**
   * Get Notifications
   * @return Notifications
   */
  getNotifications(): Promise<NotificationDTO[]>;

  /**
   * Mark notification
   * @param id Target Notification-ID
   * @return Notification was marked
   */
  setNotificationRead(id: number): Promise<void>;

  /**
   * Delete notification
   * @param id Target Notification-ID
   * @return Notification was deleted
   */
  deleteNotification(id: number): Promise<void>;
}

export class NotificationClient
  extends BaseAPIClient
  implements INotificationClient
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
    this.baseUrl = this.getBaseUrl("", baseUrl);
  }

  /**
   * Get Notifications
   * @return Notifications
   */
  getNotifications(): Promise<NotificationDTO[]> {
    let url_ = this.baseUrl + "/api/core/v1/Notification/GetNotifications";
    url_ = url_.replace(/[?&]$/, "");

    let options_: RequestInit = {
      method: "GET",
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
          this.processGetNotifications(_response)
        );
      });
  }

  protected processGetNotifications(
    response: Response
  ): Promise<NotificationDTO[]> {
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
            result200!.push(NotificationDTO.fromJS(item));
        } else {
          result200 = <any>null;
        }
        return result200;
      });
    } else if (status === 400) {
      return response.text().then((_responseText) => {
        let result400: any = null;
        let resultData400 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result400 = ErrorDTO.fromJS(resultData400);
        return throwException(
          "An server-error occured",
          status,
          _responseText,
          _headers,
          result400
        );
      });
    } else if (status === 401) {
      return response.text().then((_responseText) => {
        return throwException("Unauthorized", status, _responseText, _headers);
      });
    } else if (status === 204) {
      return response.text().then((_responseText) => {
        return throwException("No Content", status, _responseText, _headers);
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
    return Promise.resolve<NotificationDTO[]>(null as any);
  }

  /**
   * Mark notification
   * @param id Target Notification-ID
   * @return Notification was marked
   */
  setNotificationRead(id: number): Promise<void> {
    let url_ = this.baseUrl + "/api/core/v1/Notification/ReadNotification/{id}";
    if (id === undefined || id === null)
      throw new Error("The parameter 'id' must be defined.");
    url_ = url_.replace("{id}", encodeURIComponent("" + id));
    url_ = url_.replace(/[?&]$/, "");

    let options_: RequestInit = {
      method: "PATCH",
      headers: {},
    };

    return this.transformOptions(options_)
      .then((transformedOptions_) => {
        return this.http.fetch(url_, transformedOptions_);
      })
      .then((_response: Response) => {
        return this.transformResult(url_, _response, (_response: Response) =>
          this.processSetNotificationRead(_response)
        );
      });
  }

  protected processSetNotificationRead(response: Response): Promise<void> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && response.headers.forEach) {
      response.headers.forEach((v: any, k: any) => (_headers[k] = v));
    }
    if (status === 200) {
      return response.text().then((_responseText) => {
        return;
      });
    } else if (status === 404) {
      return response.text().then((_responseText) => {
        let result404: any = null;
        let resultData404 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result404 = ErrorDTO.fromJS(resultData404);
        return throwException(
          "Entry wasnt found or doesnt belong to this user",
          status,
          _responseText,
          _headers,
          result404
        );
      });
    } else if (status === 400) {
      return response.text().then((_responseText) => {
        let result400: any = null;
        let resultData400 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result400 = ErrorDTO.fromJS(resultData400);
        return throwException(
          "An server-error occured",
          status,
          _responseText,
          _headers,
          result400
        );
      });
    } else if (status === 401) {
      return response.text().then((_responseText) => {
        return throwException("Unauthorized", status, _responseText, _headers);
      });
    } else if (status === 204) {
      return response.text().then((_responseText) => {
        return;
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
    return Promise.resolve<void>(null as any);
  }

  /**
   * Delete notification
   * @param id Target Notification-ID
   * @return Notification was deleted
   */
  deleteNotification(id: number): Promise<void> {
    let url_ =
      this.baseUrl + "/api/core/v1/Notification/DeleteNotification/{id}";
    if (id === undefined || id === null)
      throw new Error("The parameter 'id' must be defined.");
    url_ = url_.replace("{id}", encodeURIComponent("" + id));
    url_ = url_.replace(/[?&]$/, "");

    let options_: RequestInit = {
      method: "DELETE",
      headers: {},
    };

    return this.transformOptions(options_)
      .then((transformedOptions_) => {
        return this.http.fetch(url_, transformedOptions_);
      })
      .then((_response: Response) => {
        return this.transformResult(url_, _response, (_response: Response) =>
          this.processDeleteNotification(_response)
        );
      });
  }

  protected processDeleteNotification(response: Response): Promise<void> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && response.headers.forEach) {
      response.headers.forEach((v: any, k: any) => (_headers[k] = v));
    }
    if (status === 200) {
      return response.text().then((_responseText) => {
        return;
      });
    } else if (status === 404) {
      return response.text().then((_responseText) => {
        let result404: any = null;
        let resultData404 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result404 = ErrorDTO.fromJS(resultData404);
        return throwException(
          "Entry wasnt found or doesnt belong to this user",
          status,
          _responseText,
          _headers,
          result404
        );
      });
    } else if (status === 400) {
      return response.text().then((_responseText) => {
        let result400: any = null;
        let resultData400 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result400 = ErrorDTO.fromJS(resultData400);
        return throwException(
          "An server-error occured",
          status,
          _responseText,
          _headers,
          result400
        );
      });
    } else if (status === 401) {
      return response.text().then((_responseText) => {
        return throwException("Unauthorized", status, _responseText, _headers);
      });
    } else if (status === 204) {
      return response.text().then((_responseText) => {
        return;
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
    return Promise.resolve<void>(null as any);
  }
}

export interface IOpsClient {
  /**
   * Gets list of Ops codes
   * @return List of Ops
   */
  getOps(): Promise<OpsDTO[]>;

  /**
   * Gets Ops Data by Ops-Code
   * @return Ops Data
   */
  getOpsByCode(opsCode: string): Promise<LoginResultDTO>;
}

export class OpsClient extends BaseAPIClient implements IOpsClient {
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
    this.baseUrl = this.getBaseUrl("", baseUrl);
  }

  /**
   * Gets list of Ops codes
   * @return List of Ops
   */
  getOps(): Promise<OpsDTO[]> {
    let url_ = this.baseUrl + "/api/strops/v1/Ops/GetOps";
    url_ = url_.replace(/[?&]$/, "");

    let options_: RequestInit = {
      method: "GET",
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
          this.processGetOps(_response)
        );
      });
  }

  protected processGetOps(response: Response): Promise<OpsDTO[]> {
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
          for (let item of resultData200) result200!.push(OpsDTO.fromJS(item));
        } else {
          result200 = <any>null;
        }
        return result200;
      });
    } else if (status === 401) {
      return response.text().then((_responseText) => {
        return throwException("Unauthorized", status, _responseText, _headers);
      });
    } else if (status === 204) {
      return response.text().then((_responseText) => {
        return throwException("No Content", status, _responseText, _headers);
      });
    } else if (status === 400) {
      return response.text().then((_responseText) => {
        let result400: any = null;
        let resultData400 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result400 = ErrorDTO.fromJS(resultData400);
        return throwException(
          "An server-error occured",
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
    return Promise.resolve<OpsDTO[]>(null as any);
  }

  /**
   * Gets Ops Data by Ops-Code
   * @return Ops Data
   */
  getOpsByCode(opsCode: string): Promise<LoginResultDTO> {
    let url_ = this.baseUrl + "/api/strops/v1/Ops/GetOpsByCode?";
    if (opsCode === undefined || opsCode === null)
      throw new Error(
        "The parameter 'opsCode' must be defined and cannot be null."
      );
    else url_ += "opsCode=" + encodeURIComponent("" + opsCode) + "&";
    url_ = url_.replace(/[?&]$/, "");

    let options_: RequestInit = {
      method: "GET",
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
          this.processGetOpsByCode(_response)
        );
      });
  }

  protected processGetOpsByCode(response: Response): Promise<LoginResultDTO> {
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
        result200 = LoginResultDTO.fromJS(resultData200);
        return result200;
      });
    } else if (status === 400) {
      return response.text().then((_responseText) => {
        let result400: any = null;
        let resultData400 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result400 = ErrorDTO.fromJS(resultData400);
        return throwException(
          "Server error",
          status,
          _responseText,
          _headers,
          result400
        );
      });
    } else if (status === 401) {
      return response.text().then((_responseText) => {
        return throwException("Unauthorized", status, _responseText, _headers);
      });
    } else if (status === 204) {
      return response.text().then((_responseText) => {
        return throwException("No Content", status, _responseText, _headers);
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
    return Promise.resolve<LoginResultDTO>(null as any);
  }
}

export interface IOpsRequirementClient {
  /**
   * Returns Requirement of Ops
   * @param opsCode OpsCode
   * @return Saved Requierement for Ops
   */
  getRequirementofOps(opsCode: string): Promise<OpsRequirementDTO[]>;

  /**
   * Adds Requierement for Ops-Code
   * @return Saved Requierement for Ops
   */
  addOpsRequierement(): Promise<LoginResultDTO>;
}

export class OpsRequirementClient
  extends BaseAPIClient
  implements IOpsRequirementClient
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
    this.baseUrl = this.getBaseUrl("", baseUrl);
  }

  /**
   * Returns Requirement of Ops
   * @param opsCode OpsCode
   * @return Saved Requierement for Ops
   */
  getRequirementofOps(opsCode: string): Promise<OpsRequirementDTO[]> {
    let url_ = this.baseUrl + "/api/strops/v1/OpsRequirement?";
    if (opsCode === undefined || opsCode === null)
      throw new Error(
        "The parameter 'opsCode' must be defined and cannot be null."
      );
    else url_ += "OpsCode=" + encodeURIComponent("" + opsCode) + "&";
    url_ = url_.replace(/[?&]$/, "");

    let options_: RequestInit = {
      method: "GET",
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
          this.processGetRequirementofOps(_response)
        );
      });
  }

  protected processGetRequirementofOps(
    response: Response
  ): Promise<OpsRequirementDTO[]> {
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
            result200!.push(OpsRequirementDTO.fromJS(item));
        } else {
          result200 = <any>null;
        }
        return result200;
      });
    } else if (status === 400) {
      return response.text().then((_responseText) => {
        let result400: any = null;
        let resultData400 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result400 = ErrorDTO.fromJS(resultData400);
        return throwException(
          "Server error",
          status,
          _responseText,
          _headers,
          result400
        );
      });
    } else if (status === 404) {
      return response.text().then((_responseText) => {
        let result404: any = null;
        let resultData404 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result404 = ErrorDTO.fromJS(resultData404);
        return throwException(
          "entry wasnt found",
          status,
          _responseText,
          _headers,
          result404
        );
      });
    } else if (status === 401) {
      return response.text().then((_responseText) => {
        return throwException("Unauthorized", status, _responseText, _headers);
      });
    } else if (status === 204) {
      return response.text().then((_responseText) => {
        return throwException("No Content", status, _responseText, _headers);
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
    return Promise.resolve<OpsRequirementDTO[]>(null as any);
  }

  /**
   * Adds Requierement for Ops-Code
   * @return Saved Requierement for Ops
   */
  addOpsRequierement(): Promise<LoginResultDTO> {
    let url_ = this.baseUrl + "/api/strops/v1/OpsRequirement";
    url_ = url_.replace(/[?&]$/, "");

    let options_: RequestInit = {
      method: "POST",
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
          this.processAddOpsRequierement(_response)
        );
      });
  }

  protected processAddOpsRequierement(
    response: Response
  ): Promise<LoginResultDTO> {
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
        result200 = LoginResultDTO.fromJS(resultData200);
        return result200;
      });
    } else if (status === 400) {
      return response.text().then((_responseText) => {
        let result400: any = null;
        let resultData400 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result400 = ErrorDTO.fromJS(resultData400);
        return throwException(
          "Server error",
          status,
          _responseText,
          _headers,
          result400
        );
      });
    } else if (status === 401) {
      return response.text().then((_responseText) => {
        return throwException("Unauthorized", status, _responseText, _headers);
      });
    } else if (status === 204) {
      return response.text().then((_responseText) => {
        return throwException("No Content", status, _responseText, _headers);
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
    return Promise.resolve<LoginResultDTO>(null as any);
  }
}

export interface IOuLocationClient {
  /**
   * Returns a list of valid OU locations
   * @param minRight (optional) Minimum right level (defaults to 20 RightValue.Allowed)
   * @param validFrom (optional) Valid from (defaults to 01.01.0001)
   * @param validTo (optional) Valid to (defaults to 31.12.9999)
   * @param userId (optional) UserID (defaults to current logged-in user's ID)
   * @param tenant (optional) Tenant shortName (defaults to current logged-in tenant)
   * @return List of OU locations
   */
  getAll(
    minRight: number | undefined,
    validFrom: Date | undefined,
    validTo: Date | undefined,
    userId: string | undefined,
    tenant: string | undefined
  ): Promise<OuLocation[]>;

  /**
   * Checks if an user has sufficient rights for an OU location
   * @param standortId (optional)
   * @param minRight (optional) Minimum right level (defaults to 20 RightValue.Allowed)
   * @param validFrom (optional) Valid from (defaults to 01.01.0001)
   * @param validTo (optional) Valid to (defaults to 31.12.9999)
   * @param userId (optional) UserID (defaults to current logged-in user's ID)
   * @param tenant (optional) Tenant shortName (defaults to current logged-in tenant)
   * @return bool
   */
  hasRight(
    standortId: string | undefined,
    minRight: number | undefined,
    validFrom: Date | undefined,
    validTo: Date | undefined,
    userId: string | undefined,
    tenant: string | undefined
  ): Promise<boolean>;

  /**
   * Gets all the locations licenced for one tenant.
   * @param validFrom (optional) Valid from (defaults to 01.01.0001)
   * @param validTo (optional) Valid to (defaults to 31.12.9999)
   * @param tenant (optional) Tenant shortName (defaults to current logged-in tenant)
   * @return List of LicenceStandort
   */
  licenced(
    validFrom: Date | undefined,
    validTo: Date | undefined,
    tenant: string | undefined
  ): Promise<LicenceStandort[]>;
}

export class OuLocationClient
  extends BaseAPIClient
  implements IOuLocationClient
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
    this.baseUrl = this.getBaseUrl("", baseUrl);
  }

  /**
   * Returns a list of valid OU locations
   * @param minRight (optional) Minimum right level (defaults to 20 RightValue.Allowed)
   * @param validFrom (optional) Valid from (defaults to 01.01.0001)
   * @param validTo (optional) Valid to (defaults to 31.12.9999)
   * @param userId (optional) UserID (defaults to current logged-in user's ID)
   * @param tenant (optional) Tenant shortName (defaults to current logged-in tenant)
   * @return List of OU locations
   */
  getAll(
    minRight: number | undefined,
    validFrom: Date | undefined,
    validTo: Date | undefined,
    userId: string | undefined,
    tenant: string | undefined
  ): Promise<OuLocation[]> {
    let url_ = this.baseUrl + "/api/core/v1/OuLocation?";
    if (minRight === null)
      throw new Error("The parameter 'minRight' cannot be null.");
    else if (minRight !== undefined)
      url_ += "minRight=" + encodeURIComponent("" + minRight) + "&";
    if (validFrom === null)
      throw new Error("The parameter 'validFrom' cannot be null.");
    else if (validFrom !== undefined)
      url_ +=
        "validFrom=" +
        encodeURIComponent(validFrom ? "" + validFrom.toISOString() : "") +
        "&";
    if (validTo === null)
      throw new Error("The parameter 'validTo' cannot be null.");
    else if (validTo !== undefined)
      url_ +=
        "validTo=" +
        encodeURIComponent(validTo ? "" + validTo.toISOString() : "") +
        "&";
    if (userId === null)
      throw new Error("The parameter 'userId' cannot be null.");
    else if (userId !== undefined)
      url_ += "userId=" + encodeURIComponent("" + userId) + "&";
    if (tenant === null)
      throw new Error("The parameter 'tenant' cannot be null.");
    else if (tenant !== undefined)
      url_ += "tenant=" + encodeURIComponent("" + tenant) + "&";
    url_ = url_.replace(/[?&]$/, "");

    let options_: RequestInit = {
      method: "GET",
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
          this.processGetAll(_response)
        );
      });
  }

  protected processGetAll(response: Response): Promise<OuLocation[]> {
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
            result200!.push(OuLocation.fromJS(item));
        } else {
          result200 = <any>null;
        }
        return result200;
      });
    } else if (status === 401) {
      return response.text().then((_responseText) => {
        return throwException("Unauthorized", status, _responseText, _headers);
      });
    } else if (status === 204) {
      return response.text().then((_responseText) => {
        return throwException("No Content", status, _responseText, _headers);
      });
    } else if (status === 400) {
      return response.text().then((_responseText) => {
        let result400: any = null;
        let resultData400 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result400 = ErrorDTO.fromJS(resultData400);
        return throwException(
          "An server-error occured",
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
    return Promise.resolve<OuLocation[]>(null as any);
  }

  /**
   * Checks if an user has sufficient rights for an OU location
   * @param standortId (optional)
   * @param minRight (optional) Minimum right level (defaults to 20 RightValue.Allowed)
   * @param validFrom (optional) Valid from (defaults to 01.01.0001)
   * @param validTo (optional) Valid to (defaults to 31.12.9999)
   * @param userId (optional) UserID (defaults to current logged-in user's ID)
   * @param tenant (optional) Tenant shortName (defaults to current logged-in tenant)
   * @return bool
   */
  hasRight(
    standortId: string | undefined,
    minRight: number | undefined,
    validFrom: Date | undefined,
    validTo: Date | undefined,
    userId: string | undefined,
    tenant: string | undefined
  ): Promise<boolean> {
    let url_ = this.baseUrl + "/api/core/v1/OuLocation/HasRight/{standortId}?";
    if (standortId !== null && standortId !== undefined)
      url_ = url_.replace("{standortId}", encodeURIComponent("" + standortId));
    else url_ = url_.replace("/{standortId}", "");
    if (minRight === null)
      throw new Error("The parameter 'minRight' cannot be null.");
    else if (minRight !== undefined)
      url_ += "minRight=" + encodeURIComponent("" + minRight) + "&";
    if (validFrom === null)
      throw new Error("The parameter 'validFrom' cannot be null.");
    else if (validFrom !== undefined)
      url_ +=
        "validFrom=" +
        encodeURIComponent(validFrom ? "" + validFrom.toISOString() : "") +
        "&";
    if (validTo === null)
      throw new Error("The parameter 'validTo' cannot be null.");
    else if (validTo !== undefined)
      url_ +=
        "validTo=" +
        encodeURIComponent(validTo ? "" + validTo.toISOString() : "") +
        "&";
    if (userId === null)
      throw new Error("The parameter 'userId' cannot be null.");
    else if (userId !== undefined)
      url_ += "userId=" + encodeURIComponent("" + userId) + "&";
    if (tenant === null)
      throw new Error("The parameter 'tenant' cannot be null.");
    else if (tenant !== undefined)
      url_ += "tenant=" + encodeURIComponent("" + tenant) + "&";
    url_ = url_.replace(/[?&]$/, "");

    let options_: RequestInit = {
      method: "GET",
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
          this.processHasRight(_response)
        );
      });
  }

  protected processHasRight(response: Response): Promise<boolean> {
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
    } else if (status === 204) {
      return response.text().then((_responseText) => {
        return throwException("No Content", status, _responseText, _headers);
      });
    } else if (status === 400) {
      return response.text().then((_responseText) => {
        let result400: any = null;
        let resultData400 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result400 = ErrorDTO.fromJS(resultData400);
        return throwException(
          "An server-error occured",
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
    return Promise.resolve<boolean>(null as any);
  }

  /**
   * Gets all the locations licenced for one tenant.
   * @param validFrom (optional) Valid from (defaults to 01.01.0001)
   * @param validTo (optional) Valid to (defaults to 31.12.9999)
   * @param tenant (optional) Tenant shortName (defaults to current logged-in tenant)
   * @return List of LicenceStandort
   */
  licenced(
    validFrom: Date | undefined,
    validTo: Date | undefined,
    tenant: string | undefined
  ): Promise<LicenceStandort[]> {
    let url_ = this.baseUrl + "/api/core/v1/OuLocation/Licenced?";
    if (validFrom === null)
      throw new Error("The parameter 'validFrom' cannot be null.");
    else if (validFrom !== undefined)
      url_ +=
        "validFrom=" +
        encodeURIComponent(validFrom ? "" + validFrom.toISOString() : "") +
        "&";
    if (validTo === null)
      throw new Error("The parameter 'validTo' cannot be null.");
    else if (validTo !== undefined)
      url_ +=
        "validTo=" +
        encodeURIComponent(validTo ? "" + validTo.toISOString() : "") +
        "&";
    if (tenant === null)
      throw new Error("The parameter 'tenant' cannot be null.");
    else if (tenant !== undefined)
      url_ += "tenant=" + encodeURIComponent("" + tenant) + "&";
    url_ = url_.replace(/[?&]$/, "");

    let options_: RequestInit = {
      method: "GET",
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
          this.processLicenced(_response)
        );
      });
  }

  protected processLicenced(response: Response): Promise<LicenceStandort[]> {
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
            result200!.push(LicenceStandort.fromJS(item));
        } else {
          result200 = <any>null;
        }
        return result200;
      });
    } else if (status === 401) {
      return response.text().then((_responseText) => {
        return throwException("Unauthorized", status, _responseText, _headers);
      });
    } else if (status === 204) {
      return response.text().then((_responseText) => {
        return throwException("No Content", status, _responseText, _headers);
      });
    } else if (status === 400) {
      return response.text().then((_responseText) => {
        let result400: any = null;
        let resultData400 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result400 = ErrorDTO.fromJS(resultData400);
        return throwException(
          "An server-error occured",
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
    return Promise.resolve<LicenceStandort[]>(null as any);
  }
}

export interface IPersonClient {
  /**
   * Gets all persons
   * @return List of personsDtos
   */
  getAllPersons(): Promise<PersonDTO[]>;

  /**
   * Gets persons
   * @return List of personDTOs
   */
  getAllFilteredPersons(filter: string): Promise<PersonDTO[]>;

  /**
   * Adds a person
   * @param body (optional)
   * @return New Person
   */
  addPerson(body: PersonCDTO | undefined): Promise<PersonDTO>;

  /**
   * Updates a person
   * @param body (optional)
   * @return New Person
   */
  updatePerson(body: PersonUDTO | undefined): Promise<PersonDTO>;
}

export class PersonClient extends BaseAPIClient implements IPersonClient {
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
    this.baseUrl = this.getBaseUrl("", baseUrl);
  }

  /**
   * Gets all persons
   * @return List of personsDtos
   */
  getAllPersons(): Promise<PersonDTO[]> {
    let url_ = this.baseUrl + "/api/core/v1/Person/GetAll";
    url_ = url_.replace(/[?&]$/, "");

    let options_: RequestInit = {
      method: "GET",
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
          this.processGetAllPersons(_response)
        );
      });
  }

  protected processGetAllPersons(response: Response): Promise<PersonDTO[]> {
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
            result200!.push(PersonDTO.fromJS(item));
        } else {
          result200 = <any>null;
        }
        return result200;
      });
    } else if (status === 400) {
      return response.text().then((_responseText) => {
        let result400: any = null;
        let resultData400 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result400 = ErrorDTO.fromJS(resultData400);
        return throwException(
          "An internal server error occured",
          status,
          _responseText,
          _headers,
          result400
        );
      });
    } else if (status === 401) {
      return response.text().then((_responseText) => {
        return throwException("Unauthorized", status, _responseText, _headers);
      });
    } else if (status === 204) {
      return response.text().then((_responseText) => {
        return throwException("No Content", status, _responseText, _headers);
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
    return Promise.resolve<PersonDTO[]>(null as any);
  }

  /**
   * Gets persons
   * @return List of personDTOs
   */
  getAllFilteredPersons(filter: string): Promise<PersonDTO[]> {
    let url_ = this.baseUrl + "/api/core/v1/Person/GetFiltered?";
    if (filter === undefined || filter === null)
      throw new Error(
        "The parameter 'filter' must be defined and cannot be null."
      );
    else url_ += "filter=" + encodeURIComponent("" + filter) + "&";
    url_ = url_.replace(/[?&]$/, "");

    let options_: RequestInit = {
      method: "GET",
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
          this.processGetAllFilteredPersons(_response)
        );
      });
  }

  protected processGetAllFilteredPersons(
    response: Response
  ): Promise<PersonDTO[]> {
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
            result200!.push(PersonDTO.fromJS(item));
        } else {
          result200 = <any>null;
        }
        return result200;
      });
    } else if (status === 401) {
      return response.text().then((_responseText) => {
        return throwException("Unauthorized", status, _responseText, _headers);
      });
    } else if (status === 204) {
      return response.text().then((_responseText) => {
        return throwException("No Content", status, _responseText, _headers);
      });
    } else if (status === 400) {
      return response.text().then((_responseText) => {
        let result400: any = null;
        let resultData400 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result400 = ErrorDTO.fromJS(resultData400);
        return throwException(
          "An server-error occured",
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
    return Promise.resolve<PersonDTO[]>(null as any);
  }

  /**
   * Adds a person
   * @param body (optional)
   * @return New Person
   */
  addPerson(body: PersonCDTO | undefined): Promise<PersonDTO> {
    let url_ = this.baseUrl + "/api/core/v1/Person/AddPerson";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(body);

    let options_: RequestInit = {
      body: content_,
      method: "POST",
      headers: {
        "Content-Type": "application/json-patch+json",
        Accept: "text/plain",
      },
    };

    return this.transformOptions(options_)
      .then((transformedOptions_) => {
        return this.http.fetch(url_, transformedOptions_);
      })
      .then((_response: Response) => {
        return this.transformResult(url_, _response, (_response: Response) =>
          this.processAddPerson(_response)
        );
      });
  }

  protected processAddPerson(response: Response): Promise<PersonDTO> {
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
        result200 = PersonDTO.fromJS(resultData200);
        return result200;
      });
    } else if (status === 401) {
      return response.text().then((_responseText) => {
        return throwException("Unauthorized", status, _responseText, _headers);
      });
    } else if (status === 204) {
      return response.text().then((_responseText) => {
        return throwException("No Content", status, _responseText, _headers);
      });
    } else if (status === 400) {
      return response.text().then((_responseText) => {
        let result400: any = null;
        let resultData400 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result400 = ErrorDTO.fromJS(resultData400);
        return throwException(
          "An server-error occured",
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
    return Promise.resolve<PersonDTO>(null as any);
  }

  /**
   * Updates a person
   * @param body (optional)
   * @return New Person
   */
  updatePerson(body: PersonUDTO | undefined): Promise<PersonDTO> {
    let url_ = this.baseUrl + "/api/core/v1/Person/UpdatePerson";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(body);

    let options_: RequestInit = {
      body: content_,
      method: "POST",
      headers: {
        "Content-Type": "application/json-patch+json",
        Accept: "text/plain",
      },
    };

    return this.transformOptions(options_)
      .then((transformedOptions_) => {
        return this.http.fetch(url_, transformedOptions_);
      })
      .then((_response: Response) => {
        return this.transformResult(url_, _response, (_response: Response) =>
          this.processUpdatePerson(_response)
        );
      });
  }

  protected processUpdatePerson(response: Response): Promise<PersonDTO> {
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
        result200 = PersonDTO.fromJS(resultData200);
        return result200;
      });
    } else if (status === 401) {
      return response.text().then((_responseText) => {
        return throwException("Unauthorized", status, _responseText, _headers);
      });
    } else if (status === 204) {
      return response.text().then((_responseText) => {
        return throwException("No Content", status, _responseText, _headers);
      });
    } else if (status === 400) {
      return response.text().then((_responseText) => {
        let result400: any = null;
        let resultData400 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result400 = ErrorDTO.fromJS(resultData400);
        return throwException(
          "An server-error occured",
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
    return Promise.resolve<PersonDTO>(null as any);
  }
}

export interface IQSHintsClient {
  /**
   * Get hint code
   * @param modul Modul name
   * @param year Year of the modul definition
   * @param fieldName Technical name of the field
   * @return html code
   */
  getHintFor(modul: string, year: string, fieldName: string): Promise<string>;
}

export class QSHintsClient extends BaseAPIClient implements IQSHintsClient {
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
    this.baseUrl = this.getBaseUrl("", baseUrl);
  }

  /**
   * Get hint code
   * @param modul Modul name
   * @param year Year of the modul definition
   * @param fieldName Technical name of the field
   * @return html code
   */
  getHintFor(modul: string, year: string, fieldName: string): Promise<string> {
    let url_ = this.baseUrl + "/api/core/v1/QSHints/{modul}/{year}/{fieldName}";
    if (modul === undefined || modul === null)
      throw new Error("The parameter 'modul' must be defined.");
    url_ = url_.replace("{modul}", encodeURIComponent("" + modul));
    if (year === undefined || year === null)
      throw new Error("The parameter 'year' must be defined.");
    url_ = url_.replace("{year}", encodeURIComponent("" + year));
    if (fieldName === undefined || fieldName === null)
      throw new Error("The parameter 'fieldName' must be defined.");
    url_ = url_.replace("{fieldName}", encodeURIComponent("" + fieldName));
    url_ = url_.replace(/[?&]$/, "");

    let options_: RequestInit = {
      method: "GET",
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
          this.processGetHintFor(_response)
        );
      });
  }

  protected processGetHintFor(response: Response): Promise<string> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && response.headers.forEach) {
      response.headers.forEach((v: any, k: any) => (_headers[k] = v));
    }
    if (status === 200) {
      return response.text().then((_responseText) => {
        let result200: any = null;
        let resultData200 = _responseText === "" ? null : _responseText;
        result200 = resultData200 !== undefined ? resultData200 : <any>null;

        return result200;
      });
    } else if (status === 404) {
      return response.text().then((_responseText) => {
        let result404: any = null;
        let resultData404 = _responseText === "" ? null : _responseText;
        result404 = GetHintForExceptionErrorDTO.fromJS(resultData404);
        return throwException(
          "Something went wrong",
          status,
          _responseText,
          _headers,
          result404
        );
      });
    } else if (status === 401) {
      return response.text().then((_responseText) => {
        return throwException("Unauthorized", status, _responseText, _headers);
      });
    } else if (status === 204) {
      return response.text().then((_responseText) => {
        return throwException("No Content", status, _responseText, _headers);
      });
    } else if (status === 400) {
      return response.text().then((_responseText) => {
        let result400: any = null;
        let resultData400 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result400 = ErrorDTO.fromJS(resultData400);
        return throwException(
          "An server-error occured",
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
    return Promise.resolve<string>(null as any);
  }
}

export interface IQsmMimeConfigurationClient {
  /**
   * Returns a list of QsMonitor-importable tenants for a location
   * @param standortId (optional)
   * @return List of good tenants
   */
  checkAvailability(standortId: string | undefined): Promise<GisHeader[]>;

  /**
   * Imports QS-Monitor MiMe Configuration from a tenant and location
   * @param body (optional)
   * @return Success
   */
  import(body: QsmImportParametersDTO | undefined): Promise<void>;
}

export class QsmMimeConfigurationClient
  extends BaseAPIClient
  implements IQsmMimeConfigurationClient
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
    this.baseUrl = this.getBaseUrl("", baseUrl);
  }

  /**
   * Returns a list of QsMonitor-importable tenants for a location
   * @param standortId (optional)
   * @return List of good tenants
   */
  checkAvailability(standortId: string | undefined): Promise<GisHeader[]> {
    let url_ =
      this.baseUrl +
      "/api/core/v1/QsmMimeConfiguration/CheckAvailability/{standortId}";
    if (standortId !== null && standortId !== undefined)
      url_ = url_.replace("{standortId}", encodeURIComponent("" + standortId));
    else url_ = url_.replace("/{standortId}", "");
    url_ = url_.replace(/[?&]$/, "");

    let options_: RequestInit = {
      method: "GET",
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
          this.processCheckAvailability(_response)
        );
      });
  }

  protected processCheckAvailability(response: Response): Promise<GisHeader[]> {
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
            result200!.push(GisHeader.fromJS(item));
        } else {
          result200 = <any>null;
        }
        return result200;
      });
    } else if (status === 401) {
      return response.text().then((_responseText) => {
        return throwException("Unauthorized", status, _responseText, _headers);
      });
    } else if (status === 204) {
      return response.text().then((_responseText) => {
        return throwException("No Content", status, _responseText, _headers);
      });
    } else if (status === 400) {
      return response.text().then((_responseText) => {
        let result400: any = null;
        let resultData400 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result400 = ErrorDTO.fromJS(resultData400);
        return throwException(
          "An server-error occured",
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
    return Promise.resolve<GisHeader[]>(null as any);
  }

  /**
   * Imports QS-Monitor MiMe Configuration from a tenant and location
   * @param body (optional)
   * @return Success
   */
  import(body: QsmImportParametersDTO | undefined): Promise<void> {
    let url_ = this.baseUrl + "/api/core/v1/QsmMimeConfiguration/Import";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(body);

    let options_: RequestInit = {
      body: content_,
      method: "PUT",
      headers: {
        "Content-Type": "application/json-patch+json",
      },
    };

    return this.transformOptions(options_)
      .then((transformedOptions_) => {
        return this.http.fetch(url_, transformedOptions_);
      })
      .then((_response: Response) => {
        return this.transformResult(url_, _response, (_response: Response) =>
          this.processImport(_response)
        );
      });
  }

  protected processImport(response: Response): Promise<void> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && response.headers.forEach) {
      response.headers.forEach((v: any, k: any) => (_headers[k] = v));
    }
    if (status === 200) {
      return response.text().then((_responseText) => {
        return;
      });
    } else if (status === 403) {
      return response.text().then((_responseText) => {
        return throwException("Forbidden", status, _responseText, _headers);
      });
    } else if (status === 401) {
      return response.text().then((_responseText) => {
        return throwException("Unauthorized", status, _responseText, _headers);
      });
    } else if (status === 204) {
      return response.text().then((_responseText) => {
        return;
      });
    } else if (status === 400) {
      return response.text().then((_responseText) => {
        let result400: any = null;
        let resultData400 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result400 = ErrorDTO.fromJS(resultData400);
        return throwException(
          "An server-error occured",
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
    return Promise.resolve<void>(null as any);
  }
}

export interface ISLQClient {
  /**
   * @return Success
   */
  leitstandStropsManagerEndPointsTestMyEndpoint(
    body: MyTestRequest
  ): Promise<MyTestResponse>;
}

export class SLQClient extends BaseAPIClient implements ISLQClient {
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
    this.baseUrl = this.getBaseUrl("", baseUrl);
  }

  /**
   * @return Success
   */
  leitstandStropsManagerEndPointsTestMyEndpoint(
    body: MyTestRequest
  ): Promise<MyTestResponse> {
    let url_ = this.baseUrl + "/api/strops/v1/myEndpoint/test";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(body);

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
          this.processLeitstandStropsManagerEndPointsTestMyEndpoint(_response)
        );
      });
  }

  protected processLeitstandStropsManagerEndPointsTestMyEndpoint(
    response: Response
  ): Promise<MyTestResponse> {
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
        result200 = MyTestResponse.fromJS(resultData200);
        return result200;
      });
    } else if (status === 401) {
      return response.text().then((_responseText) => {
        return throwException("Unauthorized", status, _responseText, _headers);
      });
    } else if (status === 204) {
      return response.text().then((_responseText) => {
        return throwException("No Content", status, _responseText, _headers);
      });
    } else if (status === 400) {
      return response.text().then((_responseText) => {
        let result400: any = null;
        let resultData400 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result400 = ErrorDTO.fromJS(resultData400);
        return throwException(
          "An server-error occured",
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
    return Promise.resolve<MyTestResponse>(null as any);
  }
}

export interface IHostClient {
  /**
   * Server status
   * @return Success
   */
  anonymous(): Promise<string>;
}

export class HostClient extends BaseAPIClient implements IHostClient {
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
    this.baseUrl = this.getBaseUrl("", baseUrl);
  }

  /**
   * Server status
   * @return Success
   */
  anonymous(): Promise<string> {
    let url_ = this.baseUrl + "/";
    url_ = url_.replace(/[?&]$/, "");

    let options_: RequestInit = {
      method: "GET",
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
          this.processAnonymous(_response)
        );
      });
  }

  protected processAnonymous(response: Response): Promise<string> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && response.headers.forEach) {
      response.headers.forEach((v: any, k: any) => (_headers[k] = v));
    }
    if (status === 200) {
      return response.text().then((_responseText) => {
        let result200: any = null;
        let resultData200 = _responseText === "" ? null : _responseText;
        result200 = resultData200 !== undefined ? resultData200 : <any>null;

        return result200;
      });
    } else if (status === 401) {
      return response.text().then((_responseText) => {
        return throwException("Unauthorized", status, _responseText, _headers);
      });
    } else if (status === 204) {
      return response.text().then((_responseText) => {
        return throwException("No Content", status, _responseText, _headers);
      });
    } else if (status === 400) {
      return response.text().then((_responseText) => {
        let result400: any = null;
        let resultData400 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result400 = ErrorDTO.fromJS(resultData400);
        return throwException(
          "An server-error occured",
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
    return Promise.resolve<string>(null as any);
  }
}

export interface ISoftwareInfoClient {
  /**
   * Returns the software information
   * @return Software information
   */
  getSoftwareInfo(): Promise<SoftwareInfoDTO>;

  /**
   * Returns the database information
   * @return Database information
   */
  getDatabaseInfo(): Promise<DatabaseInfo>;
}

export class SoftwareInfoClient
  extends BaseAPIClient
  implements ISoftwareInfoClient
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
    this.baseUrl = this.getBaseUrl("", baseUrl);
  }

  /**
   * Returns the software information
   * @return Software information
   */
  getSoftwareInfo(): Promise<SoftwareInfoDTO> {
    let url_ = this.baseUrl + "/api/qsffx/v1/SoftwareInfo/GetSoftwareInfo";
    url_ = url_.replace(/[?&]$/, "");

    let options_: RequestInit = {
      method: "GET",
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
          this.processGetSoftwareInfo(_response)
        );
      });
  }

  protected processGetSoftwareInfo(
    response: Response
  ): Promise<SoftwareInfoDTO> {
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
        result200 = SoftwareInfoDTO.fromJS(resultData200);
        return result200;
      });
    } else if (status === 401) {
      return response.text().then((_responseText) => {
        return throwException("Unauthorized", status, _responseText, _headers);
      });
    } else if (status === 204) {
      return response.text().then((_responseText) => {
        return throwException("No Content", status, _responseText, _headers);
      });
    } else if (status === 400) {
      return response.text().then((_responseText) => {
        let result400: any = null;
        let resultData400 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result400 = ErrorDTO.fromJS(resultData400);
        return throwException(
          "An server-error occured",
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
    return Promise.resolve<SoftwareInfoDTO>(null as any);
  }

  /**
   * Returns the database information
   * @return Database information
   */
  getDatabaseInfo(): Promise<DatabaseInfo> {
    let url_ = this.baseUrl + "/api/qsffx/v1/SoftwareInfo/GetDatabaseInfo";
    url_ = url_.replace(/[?&]$/, "");

    let options_: RequestInit = {
      method: "GET",
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
          this.processGetDatabaseInfo(_response)
        );
      });
  }

  protected processGetDatabaseInfo(response: Response): Promise<DatabaseInfo> {
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
        result200 = DatabaseInfo.fromJS(resultData200);
        return result200;
      });
    } else if (status === 401) {
      return response.text().then((_responseText) => {
        return throwException("Unauthorized", status, _responseText, _headers);
      });
    } else if (status === 204) {
      return response.text().then((_responseText) => {
        return throwException("No Content", status, _responseText, _headers);
      });
    } else if (status === 400) {
      return response.text().then((_responseText) => {
        let result400: any = null;
        let resultData400 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result400 = ErrorDTO.fromJS(resultData400);
        return throwException(
          "An server-error occured",
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
    return Promise.resolve<DatabaseInfo>(null as any);
  }
}

export interface IStationClient {
  /**
   * Gets all Stations of Location
   * @return List of all Stations
   */
  getAllStations(): Promise<StationDTO[]>;

  /**
   * Updates station
   * @param body (optional)
   * @return Updated station
   */
  updateStation(body: StationUDTO | undefined): Promise<StationDTO>;
}

export class StationClient extends BaseAPIClient implements IStationClient {
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
    this.baseUrl = this.getBaseUrl("", baseUrl);
  }

  /**
   * Gets all Stations of Location
   * @return List of all Stations
   */
  getAllStations(): Promise<StationDTO[]> {
    let url_ = this.baseUrl + "/api/core/v1/Station/GetAllStations";
    url_ = url_.replace(/[?&]$/, "");

    let options_: RequestInit = {
      method: "GET",
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
          this.processGetAllStations(_response)
        );
      });
  }

  protected processGetAllStations(response: Response): Promise<StationDTO[]> {
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
            result200!.push(StationDTO.fromJS(item));
        } else {
          result200 = <any>null;
        }
        return result200;
      });
    } else if (status === 401) {
      return response.text().then((_responseText) => {
        return throwException("Unauthorized", status, _responseText, _headers);
      });
    } else if (status === 204) {
      return response.text().then((_responseText) => {
        return throwException("No Content", status, _responseText, _headers);
      });
    } else if (status === 400) {
      return response.text().then((_responseText) => {
        let result400: any = null;
        let resultData400 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result400 = ErrorDTO.fromJS(resultData400);
        return throwException(
          "An server-error occured",
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
    return Promise.resolve<StationDTO[]>(null as any);
  }

  /**
   * Updates station
   * @param body (optional)
   * @return Updated station
   */
  updateStation(body: StationUDTO | undefined): Promise<StationDTO> {
    let url_ = this.baseUrl + "/api/core/v1/Station/UpdateStation";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(body);

    let options_: RequestInit = {
      body: content_,
      method: "PUT",
      headers: {
        "Content-Type": "application/json-patch+json",
        Accept: "text/plain",
      },
    };

    return this.transformOptions(options_)
      .then((transformedOptions_) => {
        return this.http.fetch(url_, transformedOptions_);
      })
      .then((_response: Response) => {
        return this.transformResult(url_, _response, (_response: Response) =>
          this.processUpdateStation(_response)
        );
      });
  }

  protected processUpdateStation(response: Response): Promise<StationDTO> {
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
        result200 = StationDTO.fromJS(resultData200);
        return result200;
      });
    } else if (status === 401) {
      return response.text().then((_responseText) => {
        return throwException("Unauthorized", status, _responseText, _headers);
      });
    } else if (status === 204) {
      return response.text().then((_responseText) => {
        return throwException("No Content", status, _responseText, _headers);
      });
    } else if (status === 400) {
      return response.text().then((_responseText) => {
        let result400: any = null;
        let resultData400 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result400 = ErrorDTO.fromJS(resultData400);
        return throwException(
          "An server-error occured",
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
    return Promise.resolve<StationDTO>(null as any);
  }
}

export interface IStropsClient {
  /**
   * Gets all stropsitems
   * @return List of stropsitems
   */
  getAllStropsItems(): Promise<StropsItemDTO[]>;

  /**
   * Creates new StropsItem with given list of Opscodes
   * @param body (optional)
   * @return List of new created StropsItem
   */
  addStropsItem(body: string[] | undefined): Promise<StropsItemDTO[]>;

  /**
   * Request a fileupload to an strops item
   * @param body (optional)
   * @return Task is created
   */
  requestFileUpload(
    body: RequestFileUploadParameterDTO | undefined
  ): Promise<void>;

  /**
   * Updates stropsItem
   * @param body (optional)
   * @return Updates StropsItem
   */
  updateStropsItem(body: StropsItemUDTO | undefined): Promise<StropsItemDTO>;

  /**
   * Delete an document
   * @param id Id of stropsItem
   * @return File got deleted
   */
  deleteStropsItem(id: number): Promise<boolean>;
}

export class StropsClient extends BaseAPIClient implements IStropsClient {
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
    this.baseUrl = this.getBaseUrl("", baseUrl);
  }

  /**
   * Gets all stropsitems
   * @return List of stropsitems
   */
  getAllStropsItems(): Promise<StropsItemDTO[]> {
    let url_ = this.baseUrl + "/api/strops/v1/Strops/GetAll";
    url_ = url_.replace(/[?&]$/, "");

    let options_: RequestInit = {
      method: "GET",
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
          this.processGetAllStropsItems(_response)
        );
      });
  }

  protected processGetAllStropsItems(
    response: Response
  ): Promise<StropsItemDTO[]> {
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
            result200!.push(StropsItemDTO.fromJS(item));
        } else {
          result200 = <any>null;
        }
        return result200;
      });
    } else if (status === 400) {
      return response.text().then((_responseText) => {
        let result400: any = null;
        let resultData400 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result400 = ErrorDTO.fromJS(resultData400);
        return throwException(
          "An internal server error occured",
          status,
          _responseText,
          _headers,
          result400
        );
      });
    } else if (status === 401) {
      return response.text().then((_responseText) => {
        return throwException("Unauthorized", status, _responseText, _headers);
      });
    } else if (status === 204) {
      return response.text().then((_responseText) => {
        return throwException("No Content", status, _responseText, _headers);
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
    return Promise.resolve<StropsItemDTO[]>(null as any);
  }

  /**
   * Creates new StropsItem with given list of Opscodes
   * @param body (optional)
   * @return List of new created StropsItem
   */
  addStropsItem(body: string[] | undefined): Promise<StropsItemDTO[]> {
    let url_ = this.baseUrl + "/api/strops/v1/Strops";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(body);

    let options_: RequestInit = {
      body: content_,
      method: "POST",
      headers: {
        "Content-Type": "application/json-patch+json",
        Accept: "text/plain",
      },
    };

    return this.transformOptions(options_)
      .then((transformedOptions_) => {
        return this.http.fetch(url_, transformedOptions_);
      })
      .then((_response: Response) => {
        return this.transformResult(url_, _response, (_response: Response) =>
          this.processAddStropsItem(_response)
        );
      });
  }

  protected processAddStropsItem(response: Response): Promise<StropsItemDTO[]> {
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
            result200!.push(StropsItemDTO.fromJS(item));
        } else {
          result200 = <any>null;
        }
        return result200;
      });
    } else if (status === 401) {
      return response.text().then((_responseText) => {
        return throwException("Unauthorized", status, _responseText, _headers);
      });
    } else if (status === 204) {
      return response.text().then((_responseText) => {
        return throwException("No Content", status, _responseText, _headers);
      });
    } else if (status === 400) {
      return response.text().then((_responseText) => {
        let result400: any = null;
        let resultData400 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result400 = ErrorDTO.fromJS(resultData400);
        return throwException(
          "An server-error occured",
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
    return Promise.resolve<StropsItemDTO[]>(null as any);
  }

  /**
   * Request a fileupload to an strops item
   * @param body (optional)
   * @return Task is created
   */
  requestFileUpload(
    body: RequestFileUploadParameterDTO | undefined
  ): Promise<void> {
    let url_ = this.baseUrl + "/api/strops/v1/Strops/RequestFileUpload";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(body);

    let options_: RequestInit = {
      body: content_,
      method: "POST",
      headers: {
        "Content-Type": "application/json-patch+json",
      },
    };

    return this.transformOptions(options_)
      .then((transformedOptions_) => {
        return this.http.fetch(url_, transformedOptions_);
      })
      .then((_response: Response) => {
        return this.transformResult(url_, _response, (_response: Response) =>
          this.processRequestFileUpload(_response)
        );
      });
  }

  protected processRequestFileUpload(response: Response): Promise<void> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && response.headers.forEach) {
      response.headers.forEach((v: any, k: any) => (_headers[k] = v));
    }
    if (status === 200) {
      return response.text().then((_responseText) => {
        return;
      });
    } else if (status === 401) {
      return response.text().then((_responseText) => {
        return throwException("Unauthorized", status, _responseText, _headers);
      });
    } else if (status === 204) {
      return response.text().then((_responseText) => {
        return;
      });
    } else if (status === 400) {
      return response.text().then((_responseText) => {
        let result400: any = null;
        let resultData400 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result400 = ErrorDTO.fromJS(resultData400);
        return throwException(
          "An server-error occured",
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
    return Promise.resolve<void>(null as any);
  }

  /**
   * Updates stropsItem
   * @param body (optional)
   * @return Updates StropsItem
   */
  updateStropsItem(body: StropsItemUDTO | undefined): Promise<StropsItemDTO> {
    let url_ = this.baseUrl + "/api/strops/v1/Strops/UpdateStropsItem";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(body);

    let options_: RequestInit = {
      body: content_,
      method: "PATCH",
      headers: {
        "Content-Type": "application/json-patch+json",
        Accept: "text/plain",
      },
    };

    return this.transformOptions(options_)
      .then((transformedOptions_) => {
        return this.http.fetch(url_, transformedOptions_);
      })
      .then((_response: Response) => {
        return this.transformResult(url_, _response, (_response: Response) =>
          this.processUpdateStropsItem(_response)
        );
      });
  }

  protected processUpdateStropsItem(
    response: Response
  ): Promise<StropsItemDTO> {
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
        result200 = StropsItemDTO.fromJS(resultData200);
        return result200;
      });
    } else if (status === 401) {
      return response.text().then((_responseText) => {
        return throwException("Unauthorized", status, _responseText, _headers);
      });
    } else if (status === 204) {
      return response.text().then((_responseText) => {
        return throwException("No Content", status, _responseText, _headers);
      });
    } else if (status === 400) {
      return response.text().then((_responseText) => {
        let result400: any = null;
        let resultData400 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result400 = ErrorDTO.fromJS(resultData400);
        return throwException(
          "An server-error occured",
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
    return Promise.resolve<StropsItemDTO>(null as any);
  }

  /**
   * Delete an document
   * @param id Id of stropsItem
   * @return File got deleted
   */
  deleteStropsItem(id: number): Promise<boolean> {
    let url_ = this.baseUrl + "/api/strops/v1/Strops/DeleteStropsItem?";
    if (id === undefined || id === null)
      throw new Error("The parameter 'id' must be defined and cannot be null.");
    else url_ += "Id=" + encodeURIComponent("" + id) + "&";
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
          this.processDeleteStropsItem(_response)
        );
      });
  }

  protected processDeleteStropsItem(response: Response): Promise<boolean> {
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
    } else if (status === 204) {
      return response.text().then((_responseText) => {
        return throwException("No Content", status, _responseText, _headers);
      });
    } else if (status === 400) {
      return response.text().then((_responseText) => {
        let result400: any = null;
        let resultData400 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result400 = ErrorDTO.fromJS(resultData400);
        return throwException(
          "An server-error occured",
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
    return Promise.resolve<boolean>(null as any);
  }
}

export interface ISystemInfoClient {
  /**
   * System information
   * @return AggregatedSystemInfo
   */
  get(): Promise<AggregatedSystemInfo>;

  /**
   * Ssl servers information
   * @return SQL system information
   */
  getSql(): Promise<SqlSystemInfo[]>;

  /**
   * Information about the machine hosting the Leitstand
   * @return Machine information
   */
  getApp(): Promise<MachineSystemInfo>;

  /**
   * Network connectivity of the Leitstand
   * @return Network information
   */
  getNetwork(): Promise<NetworkSystemInfo>;

  /**
   * CheckDb reports of the databases known to the Leitstand
   * @return CheckDb reports
   */
  getDb(): Promise<CheckDbReport[]>;
}

export class SystemInfoClient
  extends BaseAPIClient
  implements ISystemInfoClient
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
    this.baseUrl = this.getBaseUrl("", baseUrl);
  }

  /**
   * System information
   * @return AggregatedSystemInfo
   */
  get(): Promise<AggregatedSystemInfo> {
    let url_ = this.baseUrl + "/api/SystemInfo";
    url_ = url_.replace(/[?&]$/, "");

    let options_: RequestInit = {
      method: "GET",
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
          this.processGet(_response)
        );
      });
  }

  protected processGet(response: Response): Promise<AggregatedSystemInfo> {
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
        result200 = AggregatedSystemInfo.fromJS(resultData200);
        return result200;
      });
    } else if (status === 401) {
      return response.text().then((_responseText) => {
        return throwException("Unauthorized", status, _responseText, _headers);
      });
    } else if (status === 204) {
      return response.text().then((_responseText) => {
        return throwException("No Content", status, _responseText, _headers);
      });
    } else if (status === 400) {
      return response.text().then((_responseText) => {
        let result400: any = null;
        let resultData400 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result400 = ErrorDTO.fromJS(resultData400);
        return throwException(
          "An server-error occured",
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
    return Promise.resolve<AggregatedSystemInfo>(null as any);
  }

  /**
   * Ssl servers information
   * @return SQL system information
   */
  getSql(): Promise<SqlSystemInfo[]> {
    let url_ = this.baseUrl + "/api/SystemInfo/sql";
    url_ = url_.replace(/[?&]$/, "");

    let options_: RequestInit = {
      method: "GET",
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
          this.processGetSql(_response)
        );
      });
  }

  protected processGetSql(response: Response): Promise<SqlSystemInfo[]> {
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
            result200!.push(SqlSystemInfo.fromJS(item));
        } else {
          result200 = <any>null;
        }
        return result200;
      });
    } else if (status === 401) {
      return response.text().then((_responseText) => {
        return throwException("Unauthorized", status, _responseText, _headers);
      });
    } else if (status === 204) {
      return response.text().then((_responseText) => {
        return throwException("No Content", status, _responseText, _headers);
      });
    } else if (status === 400) {
      return response.text().then((_responseText) => {
        let result400: any = null;
        let resultData400 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result400 = ErrorDTO.fromJS(resultData400);
        return throwException(
          "An server-error occured",
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
    return Promise.resolve<SqlSystemInfo[]>(null as any);
  }

  /**
   * Information about the machine hosting the Leitstand
   * @return Machine information
   */
  getApp(): Promise<MachineSystemInfo> {
    let url_ = this.baseUrl + "/api/SystemInfo/app";
    url_ = url_.replace(/[?&]$/, "");

    let options_: RequestInit = {
      method: "GET",
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
          this.processGetApp(_response)
        );
      });
  }

  protected processGetApp(response: Response): Promise<MachineSystemInfo> {
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
        result200 = MachineSystemInfo.fromJS(resultData200);
        return result200;
      });
    } else if (status === 401) {
      return response.text().then((_responseText) => {
        return throwException("Unauthorized", status, _responseText, _headers);
      });
    } else if (status === 204) {
      return response.text().then((_responseText) => {
        return throwException("No Content", status, _responseText, _headers);
      });
    } else if (status === 400) {
      return response.text().then((_responseText) => {
        let result400: any = null;
        let resultData400 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result400 = ErrorDTO.fromJS(resultData400);
        return throwException(
          "An server-error occured",
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
    return Promise.resolve<MachineSystemInfo>(null as any);
  }

  /**
   * Network connectivity of the Leitstand
   * @return Network information
   */
  getNetwork(): Promise<NetworkSystemInfo> {
    let url_ = this.baseUrl + "/api/SystemInfo/network";
    url_ = url_.replace(/[?&]$/, "");

    let options_: RequestInit = {
      method: "GET",
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
          this.processGetNetwork(_response)
        );
      });
  }

  protected processGetNetwork(response: Response): Promise<NetworkSystemInfo> {
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
        result200 = NetworkSystemInfo.fromJS(resultData200);
        return result200;
      });
    } else if (status === 401) {
      return response.text().then((_responseText) => {
        return throwException("Unauthorized", status, _responseText, _headers);
      });
    } else if (status === 204) {
      return response.text().then((_responseText) => {
        return throwException("No Content", status, _responseText, _headers);
      });
    } else if (status === 400) {
      return response.text().then((_responseText) => {
        let result400: any = null;
        let resultData400 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result400 = ErrorDTO.fromJS(resultData400);
        return throwException(
          "An server-error occured",
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
    return Promise.resolve<NetworkSystemInfo>(null as any);
  }

  /**
   * CheckDb reports of the databases known to the Leitstand
   * @return CheckDb reports
   */
  getDb(): Promise<CheckDbReport[]> {
    let url_ = this.baseUrl + "/api/SystemInfo/db";
    url_ = url_.replace(/[?&]$/, "");

    let options_: RequestInit = {
      method: "GET",
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
          this.processGetDb(_response)
        );
      });
  }

  protected processGetDb(response: Response): Promise<CheckDbReport[]> {
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
            result200!.push(CheckDbReport.fromJS(item));
        } else {
          result200 = <any>null;
        }
        return result200;
      });
    } else if (status === 401) {
      return response.text().then((_responseText) => {
        return throwException("Unauthorized", status, _responseText, _headers);
      });
    } else if (status === 204) {
      return response.text().then((_responseText) => {
        return throwException("No Content", status, _responseText, _headers);
      });
    } else if (status === 400) {
      return response.text().then((_responseText) => {
        let result400: any = null;
        let resultData400 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result400 = ErrorDTO.fromJS(resultData400);
        return throwException(
          "An server-error occured",
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
    return Promise.resolve<CheckDbReport[]>(null as any);
  }
}

export interface ITaskClient {
  /**
   * Gets list of tasks
   * @return List of tasks
   */
  getMyTasks(): Promise<TaskDTO[]>;

  /**
   * Gets list of tasks
   * @return List of tasks
   */
  getCreatedTasks(): Promise<TaskDTO[]>;
}

export class TaskClient extends BaseAPIClient implements ITaskClient {
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
    this.baseUrl = this.getBaseUrl("", baseUrl);
  }

  /**
   * Gets list of tasks
   * @return List of tasks
   */
  getMyTasks(): Promise<TaskDTO[]> {
    let url_ = this.baseUrl + "/api/core/v1/Task/GetMyTasks";
    url_ = url_.replace(/[?&]$/, "");

    let options_: RequestInit = {
      method: "GET",
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
          this.processGetMyTasks(_response)
        );
      });
  }

  protected processGetMyTasks(response: Response): Promise<TaskDTO[]> {
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
          for (let item of resultData200) result200!.push(TaskDTO.fromJS(item));
        } else {
          result200 = <any>null;
        }
        return result200;
      });
    } else if (status === 400) {
      return response.text().then((_responseText) => {
        let result400: any = null;
        let resultData400 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result400 = ErrorDTO.fromJS(resultData400);
        return throwException(
          "An server-error occured",
          status,
          _responseText,
          _headers,
          result400
        );
      });
    } else if (status === 401) {
      return response.text().then((_responseText) => {
        return throwException("Unauthorized", status, _responseText, _headers);
      });
    } else if (status === 204) {
      return response.text().then((_responseText) => {
        return throwException("No Content", status, _responseText, _headers);
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
    return Promise.resolve<TaskDTO[]>(null as any);
  }

  /**
   * Gets list of tasks
   * @return List of tasks
   */
  getCreatedTasks(): Promise<TaskDTO[]> {
    let url_ = this.baseUrl + "/api/core/v1/Task/GetCreatedTasks";
    url_ = url_.replace(/[?&]$/, "");

    let options_: RequestInit = {
      method: "GET",
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
          this.processGetCreatedTasks(_response)
        );
      });
  }

  protected processGetCreatedTasks(response: Response): Promise<TaskDTO[]> {
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
          for (let item of resultData200) result200!.push(TaskDTO.fromJS(item));
        } else {
          result200 = <any>null;
        }
        return result200;
      });
    } else if (status === 400) {
      return response.text().then((_responseText) => {
        let result400: any = null;
        let resultData400 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result400 = ErrorDTO.fromJS(resultData400);
        return throwException(
          "An server-error occured",
          status,
          _responseText,
          _headers,
          result400
        );
      });
    } else if (status === 401) {
      return response.text().then((_responseText) => {
        return throwException("Unauthorized", status, _responseText, _headers);
      });
    } else if (status === 204) {
      return response.text().then((_responseText) => {
        return throwException("No Content", status, _responseText, _headers);
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
    return Promise.resolve<TaskDTO[]>(null as any);
  }
}

export interface ITenantClient {
  /**
   * Returns a list of all tenants
   * @return List of tenants
   */
  getTenant(): Promise<GisHeader[]>;
}

export class TenantClient extends BaseAPIClient implements ITenantClient {
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
    this.baseUrl = this.getBaseUrl("", baseUrl);
  }

  /**
   * Returns a list of all tenants
   * @return List of tenants
   */
  getTenant(): Promise<GisHeader[]> {
    let url_ = this.baseUrl + "/api/core/v1/Tenant/GetTenant";
    url_ = url_.replace(/[?&]$/, "");

    let options_: RequestInit = {
      method: "GET",
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
          this.processGetTenant(_response)
        );
      });
  }

  protected processGetTenant(response: Response): Promise<GisHeader[]> {
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
            result200!.push(GisHeader.fromJS(item));
        } else {
          result200 = <any>null;
        }
        return result200;
      });
    } else if (status === 401) {
      return response.text().then((_responseText) => {
        return throwException("Unauthorized", status, _responseText, _headers);
      });
    } else if (status === 204) {
      return response.text().then((_responseText) => {
        return throwException("No Content", status, _responseText, _headers);
      });
    } else if (status === 400) {
      return response.text().then((_responseText) => {
        let result400: any = null;
        let resultData400 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result400 = ErrorDTO.fromJS(resultData400);
        return throwException(
          "An server-error occured",
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
    return Promise.resolve<GisHeader[]>(null as any);
  }
}

export interface IUserRightsClient {
  /**
   * Tries to get user rights by RightIds
   * @param body (optional)
   * @return User rights information
   */
  doGetRights(body: UserRightsDTO | undefined): Promise<BNVGivenRightDTO[]>;
}

export class UserRightsClient
  extends BaseAPIClient
  implements IUserRightsClient
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
    this.baseUrl = this.getBaseUrl("", baseUrl);
  }

  /**
   * Tries to get user rights by RightIds
   * @param body (optional)
   * @return User rights information
   */
  doGetRights(body: UserRightsDTO | undefined): Promise<BNVGivenRightDTO[]> {
    let url_ = this.baseUrl + "/api/core/v1/UserRights/GetAll";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(body);

    let options_: RequestInit = {
      body: content_,
      method: "POST",
      headers: {
        "Content-Type": "application/json-patch+json",
        Accept: "text/plain",
      },
    };

    return this.transformOptions(options_)
      .then((transformedOptions_) => {
        return this.http.fetch(url_, transformedOptions_);
      })
      .then((_response: Response) => {
        return this.transformResult(url_, _response, (_response: Response) =>
          this.processDoGetRights(_response)
        );
      });
  }

  protected processDoGetRights(
    response: Response
  ): Promise<BNVGivenRightDTO[]> {
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
            result200!.push(BNVGivenRightDTO.fromJS(item));
        } else {
          result200 = <any>null;
        }
        return result200;
      });
    } else if (status === 404) {
      return response.text().then((_responseText) => {
        let result404: any = null;
        let resultData404 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result404 = ErrorDTO.fromJS(resultData404);
        return throwException(
          "Data not found",
          status,
          _responseText,
          _headers,
          result404
        );
      });
    } else if (status === 400) {
      return response.text().then((_responseText) => {
        let result400: any = null;
        let resultData400 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result400 = ErrorDTO.fromJS(resultData400);
        return throwException(
          "Server error",
          status,
          _responseText,
          _headers,
          result400
        );
      });
    } else if (status === 401) {
      return response.text().then((_responseText) => {
        return throwException("Unauthorized", status, _responseText, _headers);
      });
    } else if (status === 204) {
      return response.text().then((_responseText) => {
        return throwException("No Content", status, _responseText, _headers);
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
    return Promise.resolve<BNVGivenRightDTO[]>(null as any);
  }
}

export interface IUsersClient {
  /**
   * Gets all users
   * @return List of Users
   */
  getUsers(): Promise<UserInfoDTO[]>;

  /**
   * Tries to login into GIS
   * @param body (optional)
   * @return User information with accesstoken
   */
  doLogin(body: CredentialsDTO | undefined): Promise<LoginResultDTO>;

  /**
   * Token refresh
   * @return New Token
   */
  refreshToken(): Promise<LoginResultDTO>;

  /**
   * @return Success
   */
  clearSiteData(): Promise<void>;
}

export class UsersClient extends BaseAPIClient implements IUsersClient {
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
    this.baseUrl = this.getBaseUrl("", baseUrl);
  }

  /**
   * Gets all users
   * @return List of Users
   */
  getUsers(): Promise<UserInfoDTO[]> {
    let url_ = this.baseUrl + "/api/core/v1/Users/GetUsers";
    url_ = url_.replace(/[?&]$/, "");

    let options_: RequestInit = {
      method: "GET",
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
          this.processGetUsers(_response)
        );
      });
  }

  protected processGetUsers(response: Response): Promise<UserInfoDTO[]> {
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
            result200!.push(UserInfoDTO.fromJS(item));
        } else {
          result200 = <any>null;
        }
        return result200;
      });
    } else if (status === 400) {
      return response.text().then((_responseText) => {
        let result400: any = null;
        let resultData400 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result400 = ErrorDTO.fromJS(resultData400);
        return throwException(
          "Server error",
          status,
          _responseText,
          _headers,
          result400
        );
      });
    } else if (status === 204) {
      return response.text().then((_responseText) => {
        return throwException("No Content", status, _responseText, _headers);
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
    return Promise.resolve<UserInfoDTO[]>(null as any);
  }

  /**
   * Tries to login into GIS
   * @param body (optional)
   * @return User information with accesstoken
   */
  doLogin(body: CredentialsDTO | undefined): Promise<LoginResultDTO> {
    let url_ = this.baseUrl + "/api/core/v1/Users/Login";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(body);

    let options_: RequestInit = {
      body: content_,
      method: "POST",
      headers: {
        "Content-Type": "application/json-patch+json",
        Accept: "text/plain",
      },
    };

    return this.transformOptions(options_)
      .then((transformedOptions_) => {
        return this.http.fetch(url_, transformedOptions_);
      })
      .then((_response: Response) => {
        return this.transformResult(url_, _response, (_response: Response) =>
          this.processDoLogin(_response)
        );
      });
  }

  protected processDoLogin(response: Response): Promise<LoginResultDTO> {
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
        result200 = LoginResultDTO.fromJS(resultData200);
        return result200;
      });
    } else if (status === 404) {
      return response.text().then((_responseText) => {
        let result404: any = null;
        let resultData404 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result404 = ErrorDTO.fromJS(resultData404);
        return throwException(
          "Login data incorrect",
          status,
          _responseText,
          _headers,
          result404
        );
      });
    } else if (status === 400) {
      return response.text().then((_responseText) => {
        let result400: any = null;
        let resultData400 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result400 = ErrorDTO.fromJS(resultData400);
        return throwException(
          "Server error",
          status,
          _responseText,
          _headers,
          result400
        );
      });
    } else if (status === 204) {
      return response.text().then((_responseText) => {
        return throwException("No Content", status, _responseText, _headers);
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
    return Promise.resolve<LoginResultDTO>(null as any);
  }

  /**
   * Token refresh
   * @return New Token
   */
  refreshToken(): Promise<LoginResultDTO> {
    let url_ = this.baseUrl + "/api/core/v1/Users/RefreshToken";
    url_ = url_.replace(/[?&]$/, "");

    let options_: RequestInit = {
      method: "GET",
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
          this.processRefreshToken(_response)
        );
      });
  }

  protected processRefreshToken(response: Response): Promise<LoginResultDTO> {
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
        result200 = LoginResultDTO.fromJS(resultData200);
        return result200;
      });
    } else if (status === 401) {
      return response.text().then((_responseText) => {
        return throwException("Unauthorized", status, _responseText, _headers);
      });
    } else if (status === 204) {
      return response.text().then((_responseText) => {
        return throwException("No Content", status, _responseText, _headers);
      });
    } else if (status === 400) {
      return response.text().then((_responseText) => {
        let result400: any = null;
        let resultData400 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result400 = ErrorDTO.fromJS(resultData400);
        return throwException(
          "An server-error occured",
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
    return Promise.resolve<LoginResultDTO>(null as any);
  }

  /**
   * @return Success
   */
  clearSiteData(): Promise<void> {
    let url_ = this.baseUrl + "/api/core/v1/Users/ClearSiteData";
    url_ = url_.replace(/[?&]$/, "");

    let options_: RequestInit = {
      method: "GET",
      headers: {},
    };

    return this.transformOptions(options_)
      .then((transformedOptions_) => {
        return this.http.fetch(url_, transformedOptions_);
      })
      .then((_response: Response) => {
        return this.transformResult(url_, _response, (_response: Response) =>
          this.processClearSiteData(_response)
        );
      });
  }

  protected processClearSiteData(response: Response): Promise<void> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && response.headers.forEach) {
      response.headers.forEach((v: any, k: any) => (_headers[k] = v));
    }
    if (status === 200) {
      return response.text().then((_responseText) => {
        return;
      });
    } else if (status === 401) {
      return response.text().then((_responseText) => {
        return throwException("Unauthorized", status, _responseText, _headers);
      });
    } else if (status === 204) {
      return response.text().then((_responseText) => {
        return;
      });
    } else if (status === 400) {
      return response.text().then((_responseText) => {
        let result400: any = null;
        let resultData400 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result400 = ErrorDTO.fromJS(resultData400);
        return throwException(
          "An server-error occured",
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
    return Promise.resolve<void>(null as any);
  }
}

export interface IUserSettingsClient {
  /**
   * Gets all user settings
   * @return List of user settings
   */
  getUserSettings(): Promise<string>;

  /**
   * Saves user settings
   * @param body (optional)
   * @return User settings saved
   */
  saveUserSetting(body: UserSettingsDTO | undefined): Promise<boolean>;
}

export class UserSettingsClient
  extends BaseAPIClient
  implements IUserSettingsClient
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
    this.baseUrl = this.getBaseUrl("", baseUrl);
  }

  /**
   * Gets all user settings
   * @return List of user settings
   */
  getUserSettings(): Promise<string> {
    let url_ = this.baseUrl + "/api/core/v1/UserSettings/GetUserSettings";
    url_ = url_.replace(/[?&]$/, "");

    let options_: RequestInit = {
      method: "GET",
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
          this.processGetUserSettings(_response)
        );
      });
  }

  protected processGetUserSettings(response: Response): Promise<string> {
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
    } else if (status === 400) {
      return response.text().then((_responseText) => {
        let result400: any = null;
        let resultData400 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result400 = ErrorDTO.fromJS(resultData400);
        return throwException(
          "Server error",
          status,
          _responseText,
          _headers,
          result400
        );
      });
    } else if (status === 401) {
      return response.text().then((_responseText) => {
        return throwException("Unauthorized", status, _responseText, _headers);
      });
    } else if (status === 204) {
      return response.text().then((_responseText) => {
        return throwException("No Content", status, _responseText, _headers);
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
    return Promise.resolve<string>(null as any);
  }

  /**
   * Saves user settings
   * @param body (optional)
   * @return User settings saved
   */
  saveUserSetting(body: UserSettingsDTO | undefined): Promise<boolean> {
    let url_ = this.baseUrl + "/api/core/v1/UserSettings/SaveUserSettings";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(body);

    let options_: RequestInit = {
      body: content_,
      method: "POST",
      headers: {
        "Content-Type": "application/json-patch+json",
        Accept: "text/plain",
      },
    };

    return this.transformOptions(options_)
      .then((transformedOptions_) => {
        return this.http.fetch(url_, transformedOptions_);
      })
      .then((_response: Response) => {
        return this.transformResult(url_, _response, (_response: Response) =>
          this.processSaveUserSetting(_response)
        );
      });
  }

  protected processSaveUserSetting(response: Response): Promise<boolean> {
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
    } else if (status === 400) {
      return response.text().then((_responseText) => {
        let result400: any = null;
        let resultData400 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result400 = ErrorDTO.fromJS(resultData400);
        return throwException(
          "Server error",
          status,
          _responseText,
          _headers,
          result400
        );
      });
    } else if (status === 401) {
      return response.text().then((_responseText) => {
        return throwException("Unauthorized", status, _responseText, _headers);
      });
    } else if (status === 204) {
      return response.text().then((_responseText) => {
        return throwException("No Content", status, _responseText, _headers);
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
}

export interface IVorgangClient {
  /**
   * Query Vorgänge
   * @param year (optional) year
   * @param location (optional) location id
   * @return Vorgänge
   */
  getVorgaenge(
    year: number | undefined,
    location: string | undefined
  ): Promise<VorgangDTO[]>;

  /**
   * Update Vorgänge
   * @param location (optional) location id
   * @return Vorgänge updated
   */
  updateVorgaengeWithNewConfiguration(
    location: string | undefined
  ): Promise<boolean>;

  /**
   * Create Vorgang
   * @param year year
   * @param moduleName module
   * @param location location id
   * @return Id of vorgang
   */
  createVorgang(
    year: number,
    moduleName: string,
    location: string
  ): Promise<number>;

  /**
   * Get Vorgänge save status
   * @param location (optional) location id
   * @param body (optional)
   * @return Vorgänge
   */
  getVorgaengeSaveStatus(
    location: string | undefined,
    body: VorgangSaveStatusDTO[] | undefined
  ): Promise<VorgangSaveStatusDTOResult>;

  /**
   * Get Bögen
   * @param vid Vorgang ID
   * @return Bögen of an Vorgang
   */
  getBoegen(vid: number): Promise<BogenDTO[]>;

  /**
   * Add Bögen
   * @param vid Vorgang Id
   * @param body (optional)
   * @return OK
   */
  appendBoegen(
    vid: number,
    body: BogenBatchUpdate | undefined
  ): Promise<number>;

  /**
   * Get status of bogen
   * @return Bogenstatus
   */
  getBogenStatus(bogenId: number): Promise<BogenStatus>;

  /**
   * Deletes a Bogen
   * @param vid Vorgang ID
   * @param bid Bogen ID
   * @return Bogen got deleted
   */
  deleteBogen(vid: number, bid: number): Promise<void>;

  /**
   * Sets the approval state
   * @param body (optional)
   * @return Success
   */
  setApproval(
    vid: number,
    bid: number,
    body: boolean | undefined
  ): Promise<void>;

  /**
   * Delete a Vorgang
   * @param vid Vorgang Id
   * @return Vorgang got deleted
   */
  deleteVorgang(vid: number): Promise<void>;
}

export class VorgangClient extends BaseAPIClient implements IVorgangClient {
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
    this.baseUrl = this.getBaseUrl("", baseUrl);
  }

  /**
   * Query Vorgänge
   * @param year (optional) year
   * @param location (optional) location id
   * @return Vorgänge
   */
  getVorgaenge(
    year: number | undefined,
    location: string | undefined
  ): Promise<VorgangDTO[]> {
    let url_ = this.baseUrl + "/api/qsffx/v1/Vorgang?";
    if (year === null) throw new Error("The parameter 'year' cannot be null.");
    else if (year !== undefined)
      url_ += "year=" + encodeURIComponent("" + year) + "&";
    if (location === null)
      throw new Error("The parameter 'location' cannot be null.");
    else if (location !== undefined)
      url_ += "location=" + encodeURIComponent("" + location) + "&";
    url_ = url_.replace(/[?&]$/, "");

    let options_: RequestInit = {
      method: "GET",
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
          this.processGetVorgaenge(_response)
        );
      });
  }

  protected processGetVorgaenge(response: Response): Promise<VorgangDTO[]> {
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
            result200!.push(VorgangDTO.fromJS(item));
        } else {
          result200 = <any>null;
        }
        return result200;
      });
    } else if (status === 401) {
      return response.text().then((_responseText) => {
        return throwException("Unauthorized", status, _responseText, _headers);
      });
    } else if (status === 204) {
      return response.text().then((_responseText) => {
        return throwException("No Content", status, _responseText, _headers);
      });
    } else if (status === 400) {
      return response.text().then((_responseText) => {
        let result400: any = null;
        let resultData400 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result400 = ErrorDTO.fromJS(resultData400);
        return throwException(
          "An server-error occured",
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
    return Promise.resolve<VorgangDTO[]>(null as any);
  }

  /**
   * Update Vorgänge
   * @param location (optional) location id
   * @return Vorgänge updated
   */
  updateVorgaengeWithNewConfiguration(
    location: string | undefined
  ): Promise<boolean> {
    let url_ = this.baseUrl + "/api/qsffx/v1/Vorgang?";
    if (location === null)
      throw new Error("The parameter 'location' cannot be null.");
    else if (location !== undefined)
      url_ += "location=" + encodeURIComponent("" + location) + "&";
    url_ = url_.replace(/[?&]$/, "");

    let options_: RequestInit = {
      method: "POST",
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
          this.processUpdateVorgaengeWithNewConfiguration(_response)
        );
      });
  }

  protected processUpdateVorgaengeWithNewConfiguration(
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
    } else if (status === 204) {
      return response.text().then((_responseText) => {
        return throwException("No Content", status, _responseText, _headers);
      });
    } else if (status === 400) {
      return response.text().then((_responseText) => {
        let result400: any = null;
        let resultData400 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result400 = ErrorDTO.fromJS(resultData400);
        return throwException(
          "An server-error occured",
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
    return Promise.resolve<boolean>(null as any);
  }

  /**
   * Create Vorgang
   * @param year year
   * @param moduleName module
   * @param location location id
   * @return Id of vorgang
   */
  createVorgang(
    year: number,
    moduleName: string,
    location: string
  ): Promise<number> {
    let url_ = this.baseUrl + "/api/qsffx/v1/Vorgang?";
    if (year === undefined || year === null)
      throw new Error(
        "The parameter 'year' must be defined and cannot be null."
      );
    else url_ += "year=" + encodeURIComponent("" + year) + "&";
    if (moduleName === undefined || moduleName === null)
      throw new Error(
        "The parameter 'moduleName' must be defined and cannot be null."
      );
    else url_ += "moduleName=" + encodeURIComponent("" + moduleName) + "&";
    if (location === undefined || location === null)
      throw new Error(
        "The parameter 'location' must be defined and cannot be null."
      );
    else url_ += "location=" + encodeURIComponent("" + location) + "&";
    url_ = url_.replace(/[?&]$/, "");

    let options_: RequestInit = {
      method: "PUT",
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
          this.processCreateVorgang(_response)
        );
      });
  }

  protected processCreateVorgang(response: Response): Promise<number> {
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
    } else if (status === 404) {
      return response.text().then((_responseText) => {
        return throwException(
          "Module not found",
          status,
          _responseText,
          _headers
        );
      });
    } else if (status === 401) {
      return response.text().then((_responseText) => {
        return throwException("Unauthorized", status, _responseText, _headers);
      });
    } else if (status === 204) {
      return response.text().then((_responseText) => {
        return throwException("No Content", status, _responseText, _headers);
      });
    } else if (status === 400) {
      return response.text().then((_responseText) => {
        let result400: any = null;
        let resultData400 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result400 = ErrorDTO.fromJS(resultData400);
        return throwException(
          "An server-error occured",
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
    return Promise.resolve<number>(null as any);
  }

  /**
   * Get Vorgänge save status
   * @param location (optional) location id
   * @param body (optional)
   * @return Vorgänge
   */
  getVorgaengeSaveStatus(
    location: string | undefined,
    body: VorgangSaveStatusDTO[] | undefined
  ): Promise<VorgangSaveStatusDTOResult> {
    let url_ = this.baseUrl + "/api/qsffx/v1/Vorgang/vorgaengesavestatus?";
    if (location === null)
      throw new Error("The parameter 'location' cannot be null.");
    else if (location !== undefined)
      url_ += "location=" + encodeURIComponent("" + location) + "&";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(body);

    let options_: RequestInit = {
      body: content_,
      method: "POST",
      headers: {
        "Content-Type": "application/json-patch+json",
        Accept: "text/plain",
      },
    };

    return this.transformOptions(options_)
      .then((transformedOptions_) => {
        return this.http.fetch(url_, transformedOptions_);
      })
      .then((_response: Response) => {
        return this.transformResult(url_, _response, (_response: Response) =>
          this.processGetVorgaengeSaveStatus(_response)
        );
      });
  }

  protected processGetVorgaengeSaveStatus(
    response: Response
  ): Promise<VorgangSaveStatusDTOResult> {
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
        result200 = VorgangSaveStatusDTOResult.fromJS(resultData200);
        return result200;
      });
    } else if (status === 401) {
      return response.text().then((_responseText) => {
        return throwException("Unauthorized", status, _responseText, _headers);
      });
    } else if (status === 204) {
      return response.text().then((_responseText) => {
        return throwException("No Content", status, _responseText, _headers);
      });
    } else if (status === 400) {
      return response.text().then((_responseText) => {
        let result400: any = null;
        let resultData400 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result400 = ErrorDTO.fromJS(resultData400);
        return throwException(
          "An server-error occured",
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
    return Promise.resolve<VorgangSaveStatusDTOResult>(null as any);
  }

  /**
   * Get Bögen
   * @param vid Vorgang ID
   * @return Bögen of an Vorgang
   */
  getBoegen(vid: number): Promise<BogenDTO[]> {
    let url_ = this.baseUrl + "/api/qsffx/v1/Vorgang/{vid}/boegen";
    if (vid === undefined || vid === null)
      throw new Error("The parameter 'vid' must be defined.");
    url_ = url_.replace("{vid}", encodeURIComponent("" + vid));
    url_ = url_.replace(/[?&]$/, "");

    let options_: RequestInit = {
      method: "GET",
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
          this.processGetBoegen(_response)
        );
      });
  }

  protected processGetBoegen(response: Response): Promise<BogenDTO[]> {
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
            result200!.push(BogenDTO.fromJS(item));
        } else {
          result200 = <any>null;
        }
        return result200;
      });
    } else if (status === 401) {
      return response.text().then((_responseText) => {
        return throwException("Unauthorized", status, _responseText, _headers);
      });
    } else if (status === 204) {
      return response.text().then((_responseText) => {
        return throwException("No Content", status, _responseText, _headers);
      });
    } else if (status === 400) {
      return response.text().then((_responseText) => {
        let result400: any = null;
        let resultData400 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result400 = ErrorDTO.fromJS(resultData400);
        return throwException(
          "An server-error occured",
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
    return Promise.resolve<BogenDTO[]>(null as any);
  }

  /**
   * Add Bögen
   * @param vid Vorgang Id
   * @param body (optional)
   * @return OK
   */
  appendBoegen(
    vid: number,
    body: BogenBatchUpdate | undefined
  ): Promise<number> {
    let url_ = this.baseUrl + "/api/qsffx/v1/Vorgang/{vid}/boegen";
    if (vid === undefined || vid === null)
      throw new Error("The parameter 'vid' must be defined.");
    url_ = url_.replace("{vid}", encodeURIComponent("" + vid));
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(body);

    let options_: RequestInit = {
      body: content_,
      method: "POST",
      headers: {
        "Content-Type": "application/json-patch+json",
        Accept: "text/plain",
      },
    };

    return this.transformOptions(options_)
      .then((transformedOptions_) => {
        return this.http.fetch(url_, transformedOptions_);
      })
      .then((_response: Response) => {
        return this.transformResult(url_, _response, (_response: Response) =>
          this.processAppendBoegen(_response)
        );
      });
  }

  protected processAppendBoegen(response: Response): Promise<number> {
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
    } else if (status === 404) {
      return response.text().then((_responseText) => {
        let result404: any = null;
        let resultData404 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result404 = ErrorDTO.fromJS(resultData404);
        return throwException(
          "couldnt determin result",
          status,
          _responseText,
          _headers,
          result404
        );
      });
    } else if (status === 401) {
      return response.text().then((_responseText) => {
        return throwException("Unauthorized", status, _responseText, _headers);
      });
    } else if (status === 204) {
      return response.text().then((_responseText) => {
        return throwException("No Content", status, _responseText, _headers);
      });
    } else if (status === 400) {
      return response.text().then((_responseText) => {
        let result400: any = null;
        let resultData400 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result400 = ErrorDTO.fromJS(resultData400);
        return throwException(
          "An server-error occured",
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
    return Promise.resolve<number>(null as any);
  }

  /**
   * Get status of bogen
   * @return Bogenstatus
   */
  getBogenStatus(bogenId: number): Promise<BogenStatus> {
    let url_ = this.baseUrl + "/api/qsffx/v1/Vorgang/bogen/{bogenId}/status";
    if (bogenId === undefined || bogenId === null)
      throw new Error("The parameter 'bogenId' must be defined.");
    url_ = url_.replace("{bogenId}", encodeURIComponent("" + bogenId));
    url_ = url_.replace(/[?&]$/, "");

    let options_: RequestInit = {
      method: "GET",
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
          this.processGetBogenStatus(_response)
        );
      });
  }

  protected processGetBogenStatus(response: Response): Promise<BogenStatus> {
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
    } else if (status === 204) {
      return response.text().then((_responseText) => {
        return throwException("No Content", status, _responseText, _headers);
      });
    } else if (status === 400) {
      return response.text().then((_responseText) => {
        let result400: any = null;
        let resultData400 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result400 = ErrorDTO.fromJS(resultData400);
        return throwException(
          "An server-error occured",
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
    return Promise.resolve<BogenStatus>(null as any);
  }

  /**
   * Deletes a Bogen
   * @param vid Vorgang ID
   * @param bid Bogen ID
   * @return Bogen got deleted
   */
  deleteBogen(vid: number, bid: number): Promise<void> {
    let url_ = this.baseUrl + "/api/qsffx/v1/Vorgang/{vid}/boegen/{bid}";
    if (vid === undefined || vid === null)
      throw new Error("The parameter 'vid' must be defined.");
    url_ = url_.replace("{vid}", encodeURIComponent("" + vid));
    if (bid === undefined || bid === null)
      throw new Error("The parameter 'bid' must be defined.");
    url_ = url_.replace("{bid}", encodeURIComponent("" + bid));
    url_ = url_.replace(/[?&]$/, "");

    let options_: RequestInit = {
      method: "DELETE",
      headers: {},
    };

    return this.transformOptions(options_)
      .then((transformedOptions_) => {
        return this.http.fetch(url_, transformedOptions_);
      })
      .then((_response: Response) => {
        return this.transformResult(url_, _response, (_response: Response) =>
          this.processDeleteBogen(_response)
        );
      });
  }

  protected processDeleteBogen(response: Response): Promise<void> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && response.headers.forEach) {
      response.headers.forEach((v: any, k: any) => (_headers[k] = v));
    }
    if (status === 200) {
      return response.text().then((_responseText) => {
        return;
      });
    } else if (status === 401) {
      return response.text().then((_responseText) => {
        return throwException("Unauthorized", status, _responseText, _headers);
      });
    } else if (status === 204) {
      return response.text().then((_responseText) => {
        return;
      });
    } else if (status === 400) {
      return response.text().then((_responseText) => {
        let result400: any = null;
        let resultData400 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result400 = ErrorDTO.fromJS(resultData400);
        return throwException(
          "An server-error occured",
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
    return Promise.resolve<void>(null as any);
  }

  /**
   * Sets the approval state
   * @param body (optional)
   * @return Success
   */
  setApproval(
    vid: number,
    bid: number,
    body: boolean | undefined
  ): Promise<void> {
    let url_ = this.baseUrl + "/api/qsffx/v1/Vorgang/{vid}/boegen/{bid}";
    if (vid === undefined || vid === null)
      throw new Error("The parameter 'vid' must be defined.");
    url_ = url_.replace("{vid}", encodeURIComponent("" + vid));
    if (bid === undefined || bid === null)
      throw new Error("The parameter 'bid' must be defined.");
    url_ = url_.replace("{bid}", encodeURIComponent("" + bid));
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(body);

    let options_: RequestInit = {
      body: content_,
      method: "POST",
      headers: {
        "Content-Type": "application/json-patch+json",
      },
    };

    return this.transformOptions(options_)
      .then((transformedOptions_) => {
        return this.http.fetch(url_, transformedOptions_);
      })
      .then((_response: Response) => {
        return this.transformResult(url_, _response, (_response: Response) =>
          this.processSetApproval(_response)
        );
      });
  }

  protected processSetApproval(response: Response): Promise<void> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && response.headers.forEach) {
      response.headers.forEach((v: any, k: any) => (_headers[k] = v));
    }
    if (status === 200) {
      return response.text().then((_responseText) => {
        return;
      });
    } else if (status === 401) {
      return response.text().then((_responseText) => {
        return throwException("Unauthorized", status, _responseText, _headers);
      });
    } else if (status === 204) {
      return response.text().then((_responseText) => {
        return;
      });
    } else if (status === 400) {
      return response.text().then((_responseText) => {
        let result400: any = null;
        let resultData400 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result400 = ErrorDTO.fromJS(resultData400);
        return throwException(
          "An server-error occured",
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
    return Promise.resolve<void>(null as any);
  }

  /**
   * Delete a Vorgang
   * @param vid Vorgang Id
   * @return Vorgang got deleted
   */
  deleteVorgang(vid: number): Promise<void> {
    let url_ = this.baseUrl + "/api/qsffx/v1/Vorgang/{vid}";
    if (vid === undefined || vid === null)
      throw new Error("The parameter 'vid' must be defined.");
    url_ = url_.replace("{vid}", encodeURIComponent("" + vid));
    url_ = url_.replace(/[?&]$/, "");

    let options_: RequestInit = {
      method: "DELETE",
      headers: {},
    };

    return this.transformOptions(options_)
      .then((transformedOptions_) => {
        return this.http.fetch(url_, transformedOptions_);
      })
      .then((_response: Response) => {
        return this.transformResult(url_, _response, (_response: Response) =>
          this.processDeleteVorgang(_response)
        );
      });
  }

  protected processDeleteVorgang(response: Response): Promise<void> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && response.headers.forEach) {
      response.headers.forEach((v: any, k: any) => (_headers[k] = v));
    }
    if (status === 200) {
      return response.text().then((_responseText) => {
        return;
      });
    } else if (status === 401) {
      return response.text().then((_responseText) => {
        return throwException("Unauthorized", status, _responseText, _headers);
      });
    } else if (status === 204) {
      return response.text().then((_responseText) => {
        return;
      });
    } else if (status === 400) {
      return response.text().then((_responseText) => {
        let result400: any = null;
        let resultData400 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result400 = ErrorDTO.fromJS(resultData400);
        return throwException(
          "An server-error occured",
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
    return Promise.resolve<void>(null as any);
  }
}

export interface IWindowsServiceClient {
  /**
   * @return Success
   */
  windowsService(): Promise<string>;

  /**
   * @return Success
   */
  stop(): Promise<string>;

  /**
   * @return Success
   */
  start(): Promise<string>;

  /**
   * @return Success
   */
  install(): Promise<string>;

  /**
   * @return Success
   */
  uninstall(): Promise<string>;
}

export class WindowsServiceClient
  extends BaseAPIClient
  implements IWindowsServiceClient
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
    this.baseUrl = this.getBaseUrl("", baseUrl);
  }

  /**
   * @return Success
   */
  windowsService(): Promise<string> {
    let url_ = this.baseUrl + "/api/core/v1/WindowsService";
    url_ = url_.replace(/[?&]$/, "");

    let options_: RequestInit = {
      method: "GET",
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
          this.processWindowsService(_response)
        );
      });
  }

  protected processWindowsService(response: Response): Promise<string> {
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
    } else if (status === 204) {
      return response.text().then((_responseText) => {
        return throwException("No Content", status, _responseText, _headers);
      });
    } else if (status === 400) {
      return response.text().then((_responseText) => {
        let result400: any = null;
        let resultData400 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result400 = ErrorDTO.fromJS(resultData400);
        return throwException(
          "An server-error occured",
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
    return Promise.resolve<string>(null as any);
  }

  /**
   * @return Success
   */
  stop(): Promise<string> {
    let url_ = this.baseUrl + "/api/core/v1/WindowsService/stop";
    url_ = url_.replace(/[?&]$/, "");

    let options_: RequestInit = {
      method: "POST",
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
          this.processStop(_response)
        );
      });
  }

  protected processStop(response: Response): Promise<string> {
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
    } else if (status === 204) {
      return response.text().then((_responseText) => {
        return throwException("No Content", status, _responseText, _headers);
      });
    } else if (status === 400) {
      return response.text().then((_responseText) => {
        let result400: any = null;
        let resultData400 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result400 = ErrorDTO.fromJS(resultData400);
        return throwException(
          "An server-error occured",
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
    return Promise.resolve<string>(null as any);
  }

  /**
   * @return Success
   */
  start(): Promise<string> {
    let url_ = this.baseUrl + "/api/core/v1/WindowsService/start";
    url_ = url_.replace(/[?&]$/, "");

    let options_: RequestInit = {
      method: "POST",
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
          this.processStart(_response)
        );
      });
  }

  protected processStart(response: Response): Promise<string> {
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
    } else if (status === 204) {
      return response.text().then((_responseText) => {
        return throwException("No Content", status, _responseText, _headers);
      });
    } else if (status === 400) {
      return response.text().then((_responseText) => {
        let result400: any = null;
        let resultData400 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result400 = ErrorDTO.fromJS(resultData400);
        return throwException(
          "An server-error occured",
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
    return Promise.resolve<string>(null as any);
  }

  /**
   * @return Success
   */
  install(): Promise<string> {
    let url_ = this.baseUrl + "/api/core/v1/WindowsService/install";
    url_ = url_.replace(/[?&]$/, "");

    let options_: RequestInit = {
      method: "POST",
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
          this.processInstall(_response)
        );
      });
  }

  protected processInstall(response: Response): Promise<string> {
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
    } else if (status === 204) {
      return response.text().then((_responseText) => {
        return throwException("No Content", status, _responseText, _headers);
      });
    } else if (status === 400) {
      return response.text().then((_responseText) => {
        let result400: any = null;
        let resultData400 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result400 = ErrorDTO.fromJS(resultData400);
        return throwException(
          "An server-error occured",
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
    return Promise.resolve<string>(null as any);
  }

  /**
   * @return Success
   */
  uninstall(): Promise<string> {
    let url_ = this.baseUrl + "/api/core/v1/WindowsService/uninstall";
    url_ = url_.replace(/[?&]$/, "");

    let options_: RequestInit = {
      method: "POST",
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
          this.processUninstall(_response)
        );
      });
  }

  protected processUninstall(response: Response): Promise<string> {
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
    } else if (status === 204) {
      return response.text().then((_responseText) => {
        return throwException("No Content", status, _responseText, _headers);
      });
    } else if (status === 400) {
      return response.text().then((_responseText) => {
        let result400: any = null;
        let resultData400 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result400 = ErrorDTO.fromJS(resultData400);
        return throwException(
          "An server-error occured",
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
    return Promise.resolve<string>(null as any);
  }
}

export class AggregatedSystemInfo implements IAggregatedSystemInfo {
  appServerInfo?: MachineSystemInfo | undefined;
  sqlServerInfo?: SqlSystemInfo[] | undefined;
  networkInfo?: NetworkSystemInfo | undefined;
  checkDbReports?: CheckDbReport[] | undefined;

  constructor(data?: IAggregatedSystemInfo) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.appServerInfo = _data["appServerInfo"]
        ? MachineSystemInfo.fromJS(_data["appServerInfo"])
        : <any>undefined;
      if (Array.isArray(_data["sqlServerInfo"])) {
        this.sqlServerInfo = [] as any;
        for (let item of _data["sqlServerInfo"])
          this.sqlServerInfo!.push(SqlSystemInfo.fromJS(item));
      }
      this.networkInfo = _data["networkInfo"]
        ? NetworkSystemInfo.fromJS(_data["networkInfo"])
        : <any>undefined;
      if (Array.isArray(_data["checkDbReports"])) {
        this.checkDbReports = [] as any;
        for (let item of _data["checkDbReports"])
          this.checkDbReports!.push(CheckDbReport.fromJS(item));
      }
    }
  }

  static fromJS(data: any): AggregatedSystemInfo {
    data = typeof data === "object" ? data : {};
    let result = new AggregatedSystemInfo();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["appServerInfo"] = this.appServerInfo
      ? this.appServerInfo.toJSON()
      : <any>undefined;
    if (Array.isArray(this.sqlServerInfo)) {
      data["sqlServerInfo"] = [];
      for (let item of this.sqlServerInfo)
        data["sqlServerInfo"].push(item.toJSON());
    }
    data["networkInfo"] = this.networkInfo
      ? this.networkInfo.toJSON()
      : <any>undefined;
    if (Array.isArray(this.checkDbReports)) {
      data["checkDbReports"] = [];
      for (let item of this.checkDbReports)
        data["checkDbReports"].push(item.toJSON());
    }
    return data;
  }

  clone(): AggregatedSystemInfo {
    const json = this.toJSON();
    let result = new AggregatedSystemInfo();
    result.init(json);
    return result;
  }
}

export interface IAggregatedSystemInfo {
  appServerInfo?: MachineSystemInfo | undefined;
  sqlServerInfo?: SqlSystemInfo[] | undefined;
  networkInfo?: NetworkSystemInfo | undefined;
  checkDbReports?: CheckDbReport[] | undefined;
}

export class ApplicationSettings implements IApplicationSettings {
  jwtKey!: string;
  databaseConnectionString!: string;
  gisServiceAdress!: string;
  tenantCacheExpirationSeconds?: number | undefined;
  backgroundSchedulerOptions?: BackgroundSchedulerOptions | undefined;
  logManagementOptions?: LogManagementOptions | undefined;
  indentJson?: boolean | undefined;
  openSSLPath?: string | undefined;
  export!: IqtigExportOptions;

  constructor(data?: IApplicationSettings) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
    if (!data) {
      this.export = new IqtigExportOptions();
    }
  }

  init(_data?: any) {
    if (_data) {
      this.jwtKey = _data["jwtKey"];
      this.databaseConnectionString = _data["databaseConnectionString"];
      this.gisServiceAdress = _data["gisServiceAdress"];
      this.tenantCacheExpirationSeconds = _data["tenantCacheExpirationSeconds"];
      this.backgroundSchedulerOptions = _data["backgroundSchedulerOptions"]
        ? BackgroundSchedulerOptions.fromJS(_data["backgroundSchedulerOptions"])
        : <any>undefined;
      this.logManagementOptions = _data["logManagementOptions"]
        ? LogManagementOptions.fromJS(_data["logManagementOptions"])
        : <any>undefined;
      this.indentJson = _data["indentJson"];
      this.openSSLPath = _data["openSSLPath"];
      this.export = _data["export"]
        ? IqtigExportOptions.fromJS(_data["export"])
        : new IqtigExportOptions();
    }
  }

  static fromJS(data: any): ApplicationSettings {
    data = typeof data === "object" ? data : {};
    let result = new ApplicationSettings();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["jwtKey"] = this.jwtKey;
    data["databaseConnectionString"] = this.databaseConnectionString;
    data["gisServiceAdress"] = this.gisServiceAdress;
    data["tenantCacheExpirationSeconds"] = this.tenantCacheExpirationSeconds;
    data["backgroundSchedulerOptions"] = this.backgroundSchedulerOptions
      ? this.backgroundSchedulerOptions.toJSON()
      : <any>undefined;
    data["logManagementOptions"] = this.logManagementOptions
      ? this.logManagementOptions.toJSON()
      : <any>undefined;
    data["indentJson"] = this.indentJson;
    data["openSSLPath"] = this.openSSLPath;
    data["export"] = this.export ? this.export.toJSON() : <any>undefined;
    return data;
  }

  clone(): ApplicationSettings {
    const json = this.toJSON();
    let result = new ApplicationSettings();
    result.init(json);
    return result;
  }
}

export interface IApplicationSettings {
  jwtKey: string;
  databaseConnectionString: string;
  gisServiceAdress: string;
  tenantCacheExpirationSeconds?: number | undefined;
  backgroundSchedulerOptions?: BackgroundSchedulerOptions | undefined;
  logManagementOptions?: LogManagementOptions | undefined;
  indentJson?: boolean | undefined;
  openSSLPath?: string | undefined;
  export: IqtigExportOptions;
}

export class BNVGivenRightDTO implements IBNVGivenRightDTO {
  /** Right id */
  rightID?: string | undefined;
  /** Value */
  value?: number | undefined;
  /** state */
  state?: string | undefined;

  constructor(data?: IBNVGivenRightDTO) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.rightID = _data["rightID"];
      this.value = _data["value"];
      this.state = _data["state"];
    }
  }

  static fromJS(data: any): BNVGivenRightDTO {
    data = typeof data === "object" ? data : {};
    let result = new BNVGivenRightDTO();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["rightID"] = this.rightID;
    data["value"] = this.value;
    data["state"] = this.state;
    return data;
  }

  clone(): BNVGivenRightDTO {
    const json = this.toJSON();
    let result = new BNVGivenRightDTO();
    result.init(json);
    return result;
  }
}

export interface IBNVGivenRightDTO {
  /** Right id */
  rightID?: string | undefined;
  /** Value */
  value?: number | undefined;
  /** state */
  state?: string | undefined;
}

export class BackgroundSchedulerOptions implements IBackgroundSchedulerOptions {
  maintenanceWindowStart?: string | undefined;
  maintenanceWindowEnd?: string | undefined;
  dbFolder?: string | undefined;

  constructor(data?: IBackgroundSchedulerOptions) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.maintenanceWindowStart = _data["maintenanceWindowStart"];
      this.maintenanceWindowEnd = _data["maintenanceWindowEnd"];
      this.dbFolder = _data["dbFolder"];
    }
  }

  static fromJS(data: any): BackgroundSchedulerOptions {
    data = typeof data === "object" ? data : {};
    let result = new BackgroundSchedulerOptions();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["maintenanceWindowStart"] = this.maintenanceWindowStart;
    data["maintenanceWindowEnd"] = this.maintenanceWindowEnd;
    data["dbFolder"] = this.dbFolder;
    return data;
  }

  clone(): BackgroundSchedulerOptions {
    const json = this.toJSON();
    let result = new BackgroundSchedulerOptions();
    result.init(json);
    return result;
  }
}

export interface IBackgroundSchedulerOptions {
  maintenanceWindowStart?: string | undefined;
  maintenanceWindowEnd?: string | undefined;
  dbFolder?: string | undefined;
}

export class BogenBatchUpdate implements IBogenBatchUpdate {
  changeList?: BogenUpdateDTO[] | undefined;

  constructor(data?: IBogenBatchUpdate) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      if (Array.isArray(_data["changeList"])) {
        this.changeList = [] as any;
        for (let item of _data["changeList"])
          this.changeList!.push(BogenUpdateDTO.fromJS(item));
      }
    }
  }

  static fromJS(data: any): BogenBatchUpdate {
    data = typeof data === "object" ? data : {};
    let result = new BogenBatchUpdate();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    if (Array.isArray(this.changeList)) {
      data["changeList"] = [];
      for (let item of this.changeList) data["changeList"].push(item.toJSON());
    }
    return data;
  }

  clone(): BogenBatchUpdate {
    const json = this.toJSON();
    let result = new BogenBatchUpdate();
    result.init(json);
    return result;
  }
}

export interface IBogenBatchUpdate {
  changeList?: BogenUpdateDTO[] | undefined;
}

export class BogenDTO implements IBogenDTO {
  id?: number | undefined;
  relativeId?: number | undefined;
  data?: any | undefined;
  isApproved?: boolean | undefined;
  status?: BogenStatus | undefined;

  constructor(data?: IBogenDTO) {
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
      this.relativeId = _data["relativeId"];
      this.data = _data["data"];
      this.isApproved = _data["isApproved"];
      this.status = _data["status"];
    }
  }

  static fromJS(data: any): BogenDTO {
    data = typeof data === "object" ? data : {};
    let result = new BogenDTO();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["id"] = this.id;
    data["relativeId"] = this.relativeId;
    data["data"] = this.data;
    data["isApproved"] = this.isApproved;
    data["status"] = this.status;
    return data;
  }

  clone(): BogenDTO {
    const json = this.toJSON();
    let result = new BogenDTO();
    result.init(json);
    return result;
  }
}

export interface IBogenDTO {
  id?: number | undefined;
  relativeId?: number | undefined;
  data?: any | undefined;
  isApproved?: boolean | undefined;
  status?: BogenStatus | undefined;
}

export enum BogenOperation {
  Update = "Update",
  Delete = "Delete",
  SetFlag = "SetFlag",
}

export enum BogenStatus {
  Draft = "Draft",
  Approved = "Approved",
  Export = "Export",
  ResponseReceived = "ResponseReceived",
}

export class BogenUpdateDTO implements IBogenUpdateDTO {
  operation?: BogenOperation | undefined;
  relativeId?: number | undefined;
  parentRelativeId!: number;
  data?: any | undefined;

  constructor(data?: IBogenUpdateDTO) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.operation = _data["operation"];
      this.relativeId = _data["relativeId"];
      this.parentRelativeId = _data["parentRelativeId"];
      this.data = _data["data"];
    }
  }

  static fromJS(data: any): BogenUpdateDTO {
    data = typeof data === "object" ? data : {};
    let result = new BogenUpdateDTO();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["operation"] = this.operation;
    data["relativeId"] = this.relativeId;
    data["parentRelativeId"] = this.parentRelativeId;
    data["data"] = this.data;
    return data;
  }

  clone(): BogenUpdateDTO {
    const json = this.toJSON();
    let result = new BogenUpdateDTO();
    result.init(json);
    return result;
  }
}

export interface IBogenUpdateDTO {
  operation?: BogenOperation | undefined;
  relativeId?: number | undefined;
  parentRelativeId: number;
  data?: any | undefined;
}

export enum CertificateTypes {
  Pfx = "Pfx",
  CerKey = "CerKey",
  CrtKey = "CrtKey",
  PemPem = "PemPem",
  CrtRsa = "CrtRsa",
  Pem = "Pem",
}

export class CheckDbReport implements ICheckDbReport {
  id?: string | undefined;
  server?: string | undefined;
  databaseName?: string | undefined;
  timeChecked?: Date | undefined;
  status?: string | undefined;
  content?: string | undefined;

  constructor(data?: ICheckDbReport) {
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
      this.server = _data["server"];
      this.databaseName = _data["databaseName"];
      this.timeChecked = _data["timeChecked"]
        ? new Date(_data["timeChecked"].toString())
        : <any>undefined;
      this.status = _data["status"];
      this.content = _data["content"];
    }
  }

  static fromJS(data: any): CheckDbReport {
    data = typeof data === "object" ? data : {};
    let result = new CheckDbReport();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["id"] = this.id;
    data["server"] = this.server;
    data["databaseName"] = this.databaseName;
    data["timeChecked"] = this.timeChecked
      ? this.timeChecked.toISOString()
      : <any>undefined;
    data["status"] = this.status;
    data["content"] = this.content;
    return data;
  }

  clone(): CheckDbReport {
    const json = this.toJSON();
    let result = new CheckDbReport();
    result.init(json);
    return result;
  }
}

export interface ICheckDbReport {
  id?: string | undefined;
  server?: string | undefined;
  databaseName?: string | undefined;
  timeChecked?: Date | undefined;
  status?: string | undefined;
  content?: string | undefined;
}

/** Pin ckeck */
export class CheckPinDTO implements ICheckPinDTO {
  /** pin */
  pin?: string | undefined;
  /** tenant */
  tenant?: string | undefined;

  constructor(data?: ICheckPinDTO) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.pin = _data["pin"];
      this.tenant = _data["tenant"];
    }
  }

  static fromJS(data: any): CheckPinDTO {
    data = typeof data === "object" ? data : {};
    let result = new CheckPinDTO();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["pin"] = this.pin;
    data["tenant"] = this.tenant;
    return data;
  }

  clone(): CheckPinDTO {
    const json = this.toJSON();
    let result = new CheckPinDTO();
    result.init(json);
    return result;
  }
}

/** Pin ckeck */
export interface ICheckPinDTO {
  /** pin */
  pin?: string | undefined;
  /** tenant */
  tenant?: string | undefined;
}

/** login credentials */
export class CredentialsDTO implements ICredentialsDTO {
  /** username */
  username?: string | undefined;
  /** password */
  password?: string | undefined;
  /** tenant */
  tenant?: string | undefined;
  clientVersion!: string;

  constructor(data?: ICredentialsDTO) {
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
      this.tenant = _data["tenant"];
      this.clientVersion = _data["clientVersion"];
    }
  }

  static fromJS(data: any): CredentialsDTO {
    data = typeof data === "object" ? data : {};
    let result = new CredentialsDTO();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["username"] = this.username;
    data["password"] = this.password;
    data["tenant"] = this.tenant;
    data["clientVersion"] = this.clientVersion;
    return data;
  }

  clone(): CredentialsDTO {
    const json = this.toJSON();
    let result = new CredentialsDTO();
    result.init(json);
    return result;
  }
}

/** login credentials */
export interface ICredentialsDTO {
  /** username */
  username?: string | undefined;
  /** password */
  password?: string | undefined;
  /** tenant */
  tenant?: string | undefined;
  clientVersion: string;
}

/** Health Report for EF */
export class DatabaseHealthReportDTO implements IDatabaseHealthReportDTO {
  /** Connection to database is possible */
  canConnect?: boolean | undefined;
  /** Database is created (doesnt test all Tables) */
  databaseExists?: boolean | undefined;

  constructor(data?: IDatabaseHealthReportDTO) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.canConnect = _data["canConnect"];
      this.databaseExists = _data["databaseExists"];
    }
  }

  static fromJS(data: any): DatabaseHealthReportDTO {
    data = typeof data === "object" ? data : {};
    let result = new DatabaseHealthReportDTO();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["canConnect"] = this.canConnect;
    data["databaseExists"] = this.databaseExists;
    return data;
  }

  clone(): DatabaseHealthReportDTO {
    const json = this.toJSON();
    let result = new DatabaseHealthReportDTO();
    result.init(json);
    return result;
  }
}

/** Health Report for EF */
export interface IDatabaseHealthReportDTO {
  /** Connection to database is possible */
  canConnect?: boolean | undefined;
  /** Database is created (doesnt test all Tables) */
  databaseExists?: boolean | undefined;
}

export class DatabaseInfo implements IDatabaseInfo {
  server?: string | undefined;
  database?: string | undefined;
  integratedSecurity?: boolean | undefined;
  updateStatus?: DatabaseUpdateStatus[] | undefined;

  constructor(data?: IDatabaseInfo) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.server = _data["server"];
      this.database = _data["database"];
      this.integratedSecurity = _data["integratedSecurity"];
      if (Array.isArray(_data["updateStatus"])) {
        this.updateStatus = [] as any;
        for (let item of _data["updateStatus"])
          this.updateStatus!.push(DatabaseUpdateStatus.fromJS(item));
      }
    }
  }

  static fromJS(data: any): DatabaseInfo {
    data = typeof data === "object" ? data : {};
    let result = new DatabaseInfo();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["server"] = this.server;
    data["database"] = this.database;
    data["integratedSecurity"] = this.integratedSecurity;
    if (Array.isArray(this.updateStatus)) {
      data["updateStatus"] = [];
      for (let item of this.updateStatus)
        data["updateStatus"].push(item.toJSON());
    }
    return data;
  }

  clone(): DatabaseInfo {
    const json = this.toJSON();
    let result = new DatabaseInfo();
    result.init(json);
    return result;
  }
}

export interface IDatabaseInfo {
  server?: string | undefined;
  database?: string | undefined;
  integratedSecurity?: boolean | undefined;
  updateStatus?: DatabaseUpdateStatus[] | undefined;
}

export class DatabaseUpdateStatus implements IDatabaseUpdateStatus {
  komponente?: string | undefined;
  version!: string;
  updateScript!: string;
  inUpdate?: boolean | undefined;

  constructor(data?: IDatabaseUpdateStatus) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.komponente = _data["komponente"];
      this.version = _data["version"];
      this.updateScript = _data["updateScript"];
      this.inUpdate = _data["inUpdate"];
    }
  }

  static fromJS(data: any): DatabaseUpdateStatus {
    data = typeof data === "object" ? data : {};
    let result = new DatabaseUpdateStatus();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["komponente"] = this.komponente;
    data["version"] = this.version;
    data["updateScript"] = this.updateScript;
    data["inUpdate"] = this.inUpdate;
    return data;
  }

  clone(): DatabaseUpdateStatus {
    const json = this.toJSON();
    let result = new DatabaseUpdateStatus();
    result.init(json);
    return result;
  }
}

export interface IDatabaseUpdateStatus {
  komponente?: string | undefined;
  version: string;
  updateScript: string;
  inUpdate?: boolean | undefined;
}

export class DateTimeNullableParameterWrapper
  implements IDateTimeNullableParameterWrapper
{
  value!: Date;

  constructor(data?: IDateTimeNullableParameterWrapper) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.value = _data["value"]
        ? new Date(_data["value"].toString())
        : <any>undefined;
    }
  }

  static fromJS(data: any): DateTimeNullableParameterWrapper {
    data = typeof data === "object" ? data : {};
    let result = new DateTimeNullableParameterWrapper();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["value"] = this.value ? this.value.toISOString() : <any>undefined;
    return data;
  }

  clone(): DateTimeNullableParameterWrapper {
    const json = this.toJSON();
    let result = new DateTimeNullableParameterWrapper();
    result.init(json);
    return result;
  }
}

export interface IDateTimeNullableParameterWrapper {
  value: Date;
}

export class DiskSystemInfo implements IDiskSystemInfo {
  drive?: string | undefined;
  totalSizeGB!: number;
  availableGB!: number;

  constructor(data?: IDiskSystemInfo) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.drive = _data["drive"];
      this.totalSizeGB = _data["totalSizeGB"];
      this.availableGB = _data["availableGB"];
    }
  }

  static fromJS(data: any): DiskSystemInfo {
    data = typeof data === "object" ? data : {};
    let result = new DiskSystemInfo();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["drive"] = this.drive;
    data["totalSizeGB"] = this.totalSizeGB;
    data["availableGB"] = this.availableGB;
    return data;
  }

  clone(): DiskSystemInfo {
    const json = this.toJSON();
    let result = new DiskSystemInfo();
    result.init(json);
    return result;
  }
}

export interface IDiskSystemInfo {
  drive?: string | undefined;
  totalSizeGB: number;
  availableGB: number;
}

export class Document implements IDocument {
  id?: number | undefined;
  title?: string | undefined;
  boundPeople?: Person[] | undefined;
  files?: DocumentFile[] | undefined;
  dateOfExpiry?: Date | undefined;

  constructor(data?: IDocument) {
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
      this.title = _data["title"];
      if (Array.isArray(_data["boundPeople"])) {
        this.boundPeople = [] as any;
        for (let item of _data["boundPeople"])
          this.boundPeople!.push(Person.fromJS(item));
      }
      if (Array.isArray(_data["files"])) {
        this.files = [] as any;
        for (let item of _data["files"])
          this.files!.push(DocumentFile.fromJS(item));
      }
      this.dateOfExpiry = _data["dateOfExpiry"]
        ? new Date(_data["dateOfExpiry"].toString())
        : <any>undefined;
    }
  }

  static fromJS(data: any): Document {
    data = typeof data === "object" ? data : {};
    let result = new Document();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["id"] = this.id;
    data["title"] = this.title;
    if (Array.isArray(this.boundPeople)) {
      data["boundPeople"] = [];
      for (let item of this.boundPeople)
        data["boundPeople"].push(item.toJSON());
    }
    if (Array.isArray(this.files)) {
      data["files"] = [];
      for (let item of this.files) data["files"].push(item.toJSON());
    }
    data["dateOfExpiry"] = this.dateOfExpiry
      ? this.dateOfExpiry.toISOString()
      : <any>undefined;
    return data;
  }

  clone(): Document {
    const json = this.toJSON();
    let result = new Document();
    result.init(json);
    return result;
  }
}

export interface IDocument {
  id?: number | undefined;
  title?: string | undefined;
  boundPeople?: Person[] | undefined;
  files?: DocumentFile[] | undefined;
  dateOfExpiry?: Date | undefined;
}

/** Document */
export class DocumentDTO implements IDocumentDTO {
  /** Id for reference */
  id?: number | undefined;
  /** Title of the document */
  title?: string | undefined;
  /** Files data */
  files?: DocumentFile[] | undefined;
  /** People connected to the document */
  boundPeople?: PersonDTO[] | undefined;
  /** Document can safly be used till the end of this date */
  dateOfExpiry?: Date | undefined;

  constructor(data?: IDocumentDTO) {
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
      this.title = _data["title"];
      if (Array.isArray(_data["files"])) {
        this.files = [] as any;
        for (let item of _data["files"])
          this.files!.push(DocumentFile.fromJS(item));
      }
      if (Array.isArray(_data["boundPeople"])) {
        this.boundPeople = [] as any;
        for (let item of _data["boundPeople"])
          this.boundPeople!.push(PersonDTO.fromJS(item));
      }
      this.dateOfExpiry = _data["dateOfExpiry"]
        ? new Date(_data["dateOfExpiry"].toString())
        : <any>undefined;
    }
  }

  static fromJS(data: any): DocumentDTO {
    data = typeof data === "object" ? data : {};
    let result = new DocumentDTO();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["id"] = this.id;
    data["title"] = this.title;
    if (Array.isArray(this.files)) {
      data["files"] = [];
      for (let item of this.files) data["files"].push(item.toJSON());
    }
    if (Array.isArray(this.boundPeople)) {
      data["boundPeople"] = [];
      for (let item of this.boundPeople)
        data["boundPeople"].push(item.toJSON());
    }
    data["dateOfExpiry"] = this.dateOfExpiry
      ? this.dateOfExpiry.toISOString()
      : <any>undefined;
    return data;
  }

  clone(): DocumentDTO {
    const json = this.toJSON();
    let result = new DocumentDTO();
    result.init(json);
    return result;
  }
}

/** Document */
export interface IDocumentDTO {
  /** Id for reference */
  id?: number | undefined;
  /** Title of the document */
  title?: string | undefined;
  /** Files data */
  files?: DocumentFile[] | undefined;
  /** People connected to the document */
  boundPeople?: PersonDTO[] | undefined;
  /** Document can safly be used till the end of this date */
  dateOfExpiry?: Date | undefined;
}

export class DocumentFile implements IDocumentFile {
  id?: number | undefined;
  name?: string | undefined;
  extension?: string | undefined;
  dataLength?: number | undefined;
  tag!: string;
  fileLocation?: string | undefined;

  constructor(data?: IDocumentFile) {
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
      this.extension = _data["extension"];
      this.dataLength = _data["dataLength"];
      this.tag = _data["tag"];
      this.fileLocation = _data["fileLocation"];
    }
  }

  static fromJS(data: any): DocumentFile {
    data = typeof data === "object" ? data : {};
    let result = new DocumentFile();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["id"] = this.id;
    data["name"] = this.name;
    data["extension"] = this.extension;
    data["dataLength"] = this.dataLength;
    data["tag"] = this.tag;
    data["fileLocation"] = this.fileLocation;
    return data;
  }

  clone(): DocumentFile {
    const json = this.toJSON();
    let result = new DocumentFile();
    result.init(json);
    return result;
  }
}

export interface IDocumentFile {
  id?: number | undefined;
  name?: string | undefined;
  extension?: string | undefined;
  dataLength?: number | undefined;
  tag: string;
  fileLocation?: string | undefined;
}

export class SearchResultDTO implements ISearchResultDTO {
  readonly sortIndex?: string | undefined;

  protected _discriminator: string;

  constructor(data?: ISearchResultDTO) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
    this._discriminator = "SearchResultDTO";
  }

  init(_data?: any) {
    if (_data) {
      (<any>this).sortIndex = _data["sortIndex"];
    }
  }

  static fromJS(data: any): SearchResultDTO {
    data = typeof data === "object" ? data : {};
    if (data["resultType"] === "PersonSearchResultDTO") {
      let result = new PersonSearchResultDTO();
      result.init(data);
      return result;
    }
    if (data["resultType"] === "DocumentSearchResultDTO") {
      let result = new DocumentSearchResultDTO();
      result.init(data);
      return result;
    }
    if (data["resultType"] === "StationSearchResultDTO") {
      let result = new StationSearchResultDTO();
      result.init(data);
      return result;
    }
    if (data["resultType"] === "UnitSearchResultDTO") {
      let result = new UnitSearchResultDTO();
      result.init(data);
      return result;
    }
    let result = new SearchResultDTO();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["resultType"] = this._discriminator;
    data["sortIndex"] = this.sortIndex;
    return data;
  }

  clone(): SearchResultDTO {
    const json = this.toJSON();
    let result = new SearchResultDTO();
    result.init(json);
    return result;
  }
}

export interface ISearchResultDTO {
  sortIndex?: string | undefined;
}

export class DocumentSearchResultDTO
  extends SearchResultDTO
  implements IDocumentSearchResultDTO
{
  readonly resultType?: string | undefined;
  readonly sortIndex?: string | undefined;
  /** Document */
  readonly data?: DocumentDTO | undefined;

  constructor(data?: IDocumentSearchResultDTO) {
    super(data);
    this._discriminator = "DocumentSearchResultDTO";
  }

  override init(_data?: any) {
    super.init(_data);
    if (_data) {
      (<any>this).resultType = _data["resultType"];
      (<any>this).sortIndex = _data["sortIndex"];
      (<any>this).data = _data["data"]
        ? DocumentDTO.fromJS(_data["data"])
        : <any>undefined;
    }
  }

  static override fromJS(data: any): DocumentSearchResultDTO {
    data = typeof data === "object" ? data : {};
    let result = new DocumentSearchResultDTO();
    result.init(data);
    return result;
  }

  override toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["resultType"] = this.resultType;
    data["sortIndex"] = this.sortIndex;
    data["data"] = this.data ? this.data.toJSON() : <any>undefined;
    super.toJSON(data);
    return data;
  }

  clone(): DocumentSearchResultDTO {
    const json = this.toJSON();
    let result = new DocumentSearchResultDTO();
    result.init(json);
    return result;
  }
}

export interface IDocumentSearchResultDTO extends ISearchResultDTO {
  resultType?: string | undefined;
  sortIndex?: string | undefined;
  /** Document */
  data?: DocumentDTO | undefined;
}

/** Update parameter for an document */
export class DocumentUDTO implements IDocumentUDTO {
  /** Target of the update */
  id?: number | undefined;
  /** Title of the document */
  title!: string;
  /** People connected to this document */
  boundPeople!: number[];
  /** Document can safly be used till the end of this date */
  dateOfExpiry!: Date;

  constructor(data?: IDocumentUDTO) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
    if (!data) {
      this.boundPeople = [];
    }
  }

  init(_data?: any) {
    if (_data) {
      this.id = _data["id"];
      this.title = _data["title"];
      if (Array.isArray(_data["boundPeople"])) {
        this.boundPeople = [] as any;
        for (let item of _data["boundPeople"]) this.boundPeople!.push(item);
      }
      this.dateOfExpiry = _data["dateOfExpiry"]
        ? new Date(_data["dateOfExpiry"].toString())
        : <any>undefined;
    }
  }

  static fromJS(data: any): DocumentUDTO {
    data = typeof data === "object" ? data : {};
    let result = new DocumentUDTO();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["id"] = this.id;
    data["title"] = this.title;
    if (Array.isArray(this.boundPeople)) {
      data["boundPeople"] = [];
      for (let item of this.boundPeople) data["boundPeople"].push(item);
    }
    data["dateOfExpiry"] = this.dateOfExpiry
      ? this.dateOfExpiry.toISOString()
      : <any>undefined;
    return data;
  }

  clone(): DocumentUDTO {
    const json = this.toJSON();
    let result = new DocumentUDTO();
    result.init(json);
    return result;
  }
}

/** Update parameter for an document */
export interface IDocumentUDTO {
  /** Target of the update */
  id?: number | undefined;
  /** Title of the document */
  title: string;
  /** People connected to this document */
  boundPeople: number[];
  /** Document can safly be used till the end of this date */
  dateOfExpiry: Date;
}

export enum EStropsItemAuditType {
  None = "None",
  Written = "Written",
  Verbal = "Verbal",
}

export enum EStropsItemRequestType {
  Paper = "Paper",
  Digital = "Digital",
}

export enum EStropsItemResult {
  None = "None",
  Positive = "Positive",
  Negative = "Negative",
}

export enum EStropsItemState {
  Created = "Created",
  Open = "Open",
  Requested = "Requested",
  Done = "Done",
}

export enum EStropsItemTargetLimit {
  Location = "Location",
  LogicalUnit = "LogicalUnit",
  Station = "Station",
  Both = "Both",
}

export enum ETaskState {
  Open = "Open",
  Edited = "Edited",
  Paused = "Paused",
  Done = "Done",
}

export enum ErrorCodes {
  ServerNotHealthy = "ServerNotHealthy",
  InputDataMismatch = "InputDataMismatch",
  EntryNotFound = "EntryNotFound",
  NotPermitted = "NotPermitted",
}

/** Error wrapper */
export class ErrorDTO implements IErrorDTO {
  /** Text describing the error. The Language is limited to german. */
  errorMessage!: string;
  /** Main error code. Describes the Error on a general level. */
  errorCode?: ErrorCodes | undefined;
  /** Sub error code. This code can help to specify the issue but might be null if it is a security issue to broadcast the information. */
  subCode!: number;

  constructor(data?: IErrorDTO) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.errorMessage = _data["errorMessage"];
      this.errorCode = _data["errorCode"];
      this.subCode = _data["subCode"];
    }
  }

  static fromJS(data: any): ErrorDTO {
    data = typeof data === "object" ? data : {};
    let result = new ErrorDTO();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["errorMessage"] = this.errorMessage;
    data["errorCode"] = this.errorCode;
    data["subCode"] = this.subCode;
    return data;
  }

  clone(): ErrorDTO {
    const json = this.toJSON();
    let result = new ErrorDTO();
    result.init(json);
    return result;
  }
}

/** Error wrapper */
export interface IErrorDTO {
  /** Text describing the error. The Language is limited to german. */
  errorMessage: string;
  /** Main error code. Describes the Error on a general level. */
  errorCode?: ErrorCodes | undefined;
  /** Sub error code. This code can help to specify the issue but might be null if it is a security issue to broadcast the information. */
  subCode: number;
}

/** Export */
export class ExportDTO implements IExportDTO {
  /** exportType */
  exportType?: string | undefined;
  /** standortId */
  standortId?: string | undefined;
  /** vorgangId */
  vorgangIds!: number[];
  /** year */
  year?: number | undefined;
  /** iknrlvkks */
  iknrlvkks!: string[];
  /** isTest */
  isTest!: boolean;

  constructor(data?: IExportDTO) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
    if (!data) {
      this.vorgangIds = [];
      this.iknrlvkks = [];
    }
  }

  init(_data?: any) {
    if (_data) {
      this.exportType = _data["exportType"];
      this.standortId = _data["standortId"];
      if (Array.isArray(_data["vorgangIds"])) {
        this.vorgangIds = [] as any;
        for (let item of _data["vorgangIds"]) this.vorgangIds!.push(item);
      }
      this.year = _data["year"];
      if (Array.isArray(_data["iknrlvkks"])) {
        this.iknrlvkks = [] as any;
        for (let item of _data["iknrlvkks"]) this.iknrlvkks!.push(item);
      }
      this.isTest = _data["isTest"];
    }
  }

  static fromJS(data: any): ExportDTO {
    data = typeof data === "object" ? data : {};
    let result = new ExportDTO();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["exportType"] = this.exportType;
    data["standortId"] = this.standortId;
    if (Array.isArray(this.vorgangIds)) {
      data["vorgangIds"] = [];
      for (let item of this.vorgangIds) data["vorgangIds"].push(item);
    }
    data["year"] = this.year;
    if (Array.isArray(this.iknrlvkks)) {
      data["iknrlvkks"] = [];
      for (let item of this.iknrlvkks) data["iknrlvkks"].push(item);
    }
    data["isTest"] = this.isTest;
    return data;
  }

  clone(): ExportDTO {
    const json = this.toJSON();
    let result = new ExportDTO();
    result.init(json);
    return result;
  }
}

/** Export */
export interface IExportDTO {
  /** exportType */
  exportType?: string | undefined;
  /** standortId */
  standortId?: string | undefined;
  /** vorgangId */
  vorgangIds: number[];
  /** year */
  year?: number | undefined;
  /** iknrlvkks */
  iknrlvkks: string[];
  /** isTest */
  isTest: boolean;
}

export class ExportableDTO implements IExportableDTO {
  exportType?: string | undefined;
  vorgangIds?: number[] | undefined;
  standortId?: string | undefined;
  exportGroup?: string | undefined;
  year?: number | undefined;
  moduleName?: string | undefined;

  protected _discriminator: string;

  constructor(data?: IExportableDTO) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
    this._discriminator = "ExportableDTO";
  }

  init(_data?: any) {
    if (_data) {
      this.exportType = _data["exportType"];
      if (Array.isArray(_data["vorgangIds"])) {
        this.vorgangIds = [] as any;
        for (let item of _data["vorgangIds"]) this.vorgangIds!.push(item);
      }
      this.standortId = _data["standortId"];
      this.exportGroup = _data["exportGroup"];
      this.year = _data["year"];
      this.moduleName = _data["moduleName"];
    }
  }

  static fromJS(data: any): ExportableDTO {
    data = typeof data === "object" ? data : {};
    if (data["phase"] === "ExportHistoryDTO") {
      let result = new ExportHistoryDTO();
      result.init(data);
      return result;
    }
    let result = new ExportableDTO();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["phase"] = this._discriminator;
    data["exportType"] = this.exportType;
    if (Array.isArray(this.vorgangIds)) {
      data["vorgangIds"] = [];
      for (let item of this.vorgangIds) data["vorgangIds"].push(item);
    }
    data["standortId"] = this.standortId;
    data["exportGroup"] = this.exportGroup;
    data["year"] = this.year;
    data["moduleName"] = this.moduleName;
    return data;
  }

  clone(): ExportableDTO {
    const json = this.toJSON();
    let result = new ExportableDTO();
    result.init(json);
    return result;
  }
}

export interface IExportableDTO {
  exportType?: string | undefined;
  vorgangIds?: number[] | undefined;
  standortId?: string | undefined;
  exportGroup?: string | undefined;
  year?: number | undefined;
  moduleName?: string | undefined;
}

export class ExportHistoryDTO
  extends ExportableDTO
  implements IExportHistoryDTO
{
  /** Id */
  id?: number | undefined;
  /** DocumentId */
  documentId?: string | undefined;
  /** IKNRKh */
  iknrKh?: string | undefined;
  /** TransferNumber */
  transferNumber!: number;
  /** IsTest */
  isTest?: boolean | undefined;
  /** Iknrlvkk */
  iknrlvkk!: string;
  /** Version */
  version?: number | undefined;
  /** ExportedDate */
  exportedDate?: Date | undefined;
  /** EmailSentDate */
  emailSentDate!: Date;
  /** DateConfirmation */
  dateConfirmation!: Date;
  /** ResponseUploadDate */
  responseUploadDate!: Date;
  /** Status */
  status?: ExportStatus | undefined;
  /** ErrorMessage */
  errorMessage!: string;

  constructor(data?: IExportHistoryDTO) {
    super(data);
    this._discriminator = "ExportHistoryDTO";
  }

  override init(_data?: any) {
    super.init(_data);
    if (_data) {
      this.id = _data["id"];
      this.documentId = _data["documentId"];
      this.iknrKh = _data["iknrKh"];
      this.transferNumber = _data["transferNumber"];
      this.isTest = _data["isTest"];
      this.iknrlvkk = _data["iknrlvkk"];
      this.version = _data["version"];
      this.exportedDate = _data["exportedDate"]
        ? new Date(_data["exportedDate"].toString())
        : <any>undefined;
      this.emailSentDate = _data["emailSentDate"]
        ? new Date(_data["emailSentDate"].toString())
        : <any>undefined;
      this.dateConfirmation = _data["dateConfirmation"]
        ? new Date(_data["dateConfirmation"].toString())
        : <any>undefined;
      this.responseUploadDate = _data["responseUploadDate"]
        ? new Date(_data["responseUploadDate"].toString())
        : <any>undefined;
      this.status = _data["status"];
      this.errorMessage = _data["errorMessage"];
    }
  }

  static override fromJS(data: any): ExportHistoryDTO {
    data = typeof data === "object" ? data : {};
    let result = new ExportHistoryDTO();
    result.init(data);
    return result;
  }

  override toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["id"] = this.id;
    data["documentId"] = this.documentId;
    data["iknrKh"] = this.iknrKh;
    data["transferNumber"] = this.transferNumber;
    data["isTest"] = this.isTest;
    data["iknrlvkk"] = this.iknrlvkk;
    data["version"] = this.version;
    data["exportedDate"] = this.exportedDate
      ? this.exportedDate.toISOString()
      : <any>undefined;
    data["emailSentDate"] = this.emailSentDate
      ? this.emailSentDate.toISOString()
      : <any>undefined;
    data["dateConfirmation"] = this.dateConfirmation
      ? this.dateConfirmation.toISOString()
      : <any>undefined;
    data["responseUploadDate"] = this.responseUploadDate
      ? this.responseUploadDate.toISOString()
      : <any>undefined;
    data["status"] = this.status;
    data["errorMessage"] = this.errorMessage;
    super.toJSON(data);
    return data;
  }

  clone(): ExportHistoryDTO {
    const json = this.toJSON();
    let result = new ExportHistoryDTO();
    result.init(json);
    return result;
  }
}

export interface IExportHistoryDTO extends IExportableDTO {
  /** Id */
  id?: number | undefined;
  /** DocumentId */
  documentId?: string | undefined;
  /** IKNRKh */
  iknrKh?: string | undefined;
  /** TransferNumber */
  transferNumber: number;
  /** IsTest */
  isTest?: boolean | undefined;
  /** Iknrlvkk */
  iknrlvkk: string;
  /** Version */
  version?: number | undefined;
  /** ExportedDate */
  exportedDate?: Date | undefined;
  /** EmailSentDate */
  emailSentDate: Date;
  /** DateConfirmation */
  dateConfirmation: Date;
  /** ResponseUploadDate */
  responseUploadDate: Date;
  /** Status */
  status?: ExportStatus | undefined;
  /** ErrorMessage */
  errorMessage: string;
}

export enum ExportStatus {
  Exported = "Exported",
  Encrypted = "Encrypted",
  Sent = "Sent",
  AnsweredOk = "AnsweredOk",
  AnsweredNotOk = "AnsweredNotOk",
  EmailGenerated = "EmailGenerated",
  Exportable = "Exportable",
}

export class FieldFolderNotFoundException
  implements IFieldFolderNotFoundException
{
  readonly typeDef?: string | undefined;

  constructor(data?: IFieldFolderNotFoundException) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      (<any>this).typeDef = _data["typeDef"];
    }
  }

  static fromJS(data: any): FieldFolderNotFoundException {
    data = typeof data === "object" ? data : {};
    let result = new FieldFolderNotFoundException();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["typeDef"] = this.typeDef;
    return data;
  }

  clone(): FieldFolderNotFoundException {
    const json = this.toJSON();
    let result = new FieldFolderNotFoundException();
    result.init(json);
    return result;
  }
}

export interface IFieldFolderNotFoundException {
  typeDef?: string | undefined;
}

export class FileContent implements IFileContent {
  content!: string;
  id?: number | undefined;
  name?: string | undefined;
  extension?: string | undefined;
  dataLength?: number | undefined;
  tag!: string;
  fileLocation?: string | undefined;

  constructor(data?: IFileContent) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.content = _data["content"];
      this.id = _data["id"];
      this.name = _data["name"];
      this.extension = _data["extension"];
      this.dataLength = _data["dataLength"];
      this.tag = _data["tag"];
      this.fileLocation = _data["fileLocation"];
    }
  }

  static fromJS(data: any): FileContent {
    data = typeof data === "object" ? data : {};
    let result = new FileContent();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["content"] = this.content;
    data["id"] = this.id;
    data["name"] = this.name;
    data["extension"] = this.extension;
    data["dataLength"] = this.dataLength;
    data["tag"] = this.tag;
    data["fileLocation"] = this.fileLocation;
    return data;
  }

  clone(): FileContent {
    const json = this.toJSON();
    let result = new FileContent();
    result.init(json);
    return result;
  }
}

export interface IFileContent {
  content: string;
  id?: number | undefined;
  name?: string | undefined;
  extension?: string | undefined;
  dataLength?: number | undefined;
  tag: string;
  fileLocation?: string | undefined;
}

export class GeneralSetting implements IGeneralSetting {
  key?: string | undefined;
  storageScope!: string;
  storageScopeValue!: string;
  value!: string;

  constructor(data?: IGeneralSetting) {
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
      this.storageScope = _data["storageScope"];
      this.storageScopeValue = _data["storageScopeValue"];
      this.value = _data["value"];
    }
  }

  static fromJS(data: any): GeneralSetting {
    data = typeof data === "object" ? data : {};
    let result = new GeneralSetting();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["key"] = this.key;
    data["storageScope"] = this.storageScope;
    data["storageScopeValue"] = this.storageScopeValue;
    data["value"] = this.value;
    return data;
  }

  clone(): GeneralSetting {
    const json = this.toJSON();
    let result = new GeneralSetting();
    result.init(json);
    return result;
  }
}

export interface IGeneralSetting {
  key?: string | undefined;
  storageScope: string;
  storageScopeValue: string;
  value: string;
}

/** Settings result value */
export class GeneralSettingsResultDTO implements IGeneralSettingsResultDTO {
  /** Effective Setting */
  effective!: GeneralSetting;
  /** Fallback Setting if setting does not exist */
  fallback!: GeneralSetting;

  constructor(data?: IGeneralSettingsResultDTO) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
    if (!data) {
      this.effective = new GeneralSetting();
      this.fallback = new GeneralSetting();
    }
  }

  init(_data?: any) {
    if (_data) {
      this.effective = _data["effective"]
        ? GeneralSetting.fromJS(_data["effective"])
        : new GeneralSetting();
      this.fallback = _data["fallback"]
        ? GeneralSetting.fromJS(_data["fallback"])
        : new GeneralSetting();
    }
  }

  static fromJS(data: any): GeneralSettingsResultDTO {
    data = typeof data === "object" ? data : {};
    let result = new GeneralSettingsResultDTO();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["effective"] = this.effective
      ? this.effective.toJSON()
      : <any>undefined;
    data["fallback"] = this.fallback ? this.fallback.toJSON() : <any>undefined;
    return data;
  }

  clone(): GeneralSettingsResultDTO {
    const json = this.toJSON();
    let result = new GeneralSettingsResultDTO();
    result.init(json);
    return result;
  }
}

/** Settings result value */
export interface IGeneralSettingsResultDTO {
  /** Effective Setting */
  effective: GeneralSetting;
  /** Fallback Setting if setting does not exist */
  fallback: GeneralSetting;
}

export class GetHintForException implements IGetHintForException {
  readonly typeDef?: string | undefined;

  protected _discriminator: string;

  constructor(data?: IGetHintForException) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
    this._discriminator = "GetHintForException";
  }

  init(_data?: any) {
    if (_data) {
      (<any>this).typeDef = _data["typeDef"];
    }
  }

  static fromJS(data: any): GetHintForException {
    data = typeof data === "object" ? data : {};
    let result = new GetHintForException();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["TypeDef"] = this._discriminator;
    data["typeDef"] = this.typeDef;
    return data;
  }

  clone(): GetHintForException {
    const json = this.toJSON();
    let result = new GetHintForException();
    result.init(json);
    return result;
  }
}

export interface IGetHintForException {
  typeDef?: string | undefined;
}

/** Error wrapper */
export class GetHintForExceptionErrorDTO
  implements IGetHintForExceptionErrorDTO
{
  /** Text describing the error. The Language is limited to german. */
  errorMessage!: string;
  /** Main error code. Describes the Error on a general level. */
  errorCode?: ErrorCodes | undefined;
  /** Sub error code. This code can help to specify the issue but might be null if it is a security issue to broadcast the information. */
  subCode!: GetHintForException;

  constructor(data?: IGetHintForExceptionErrorDTO) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
    if (!data) {
      this.subCode = new GetHintForException();
    }
  }

  init(_data?: any) {
    if (_data) {
      this.errorMessage = _data["errorMessage"];
      this.errorCode = _data["errorCode"];
      this.subCode = _data["subCode"]
        ? GetHintForException.fromJS(_data["subCode"])
        : new GetHintForException();
    }
  }

  static fromJS(data: any): GetHintForExceptionErrorDTO {
    data = typeof data === "object" ? data : {};
    let result = new GetHintForExceptionErrorDTO();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["errorMessage"] = this.errorMessage;
    data["errorCode"] = this.errorCode;
    data["subCode"] = this.subCode ? this.subCode.toJSON() : <any>undefined;
    return data;
  }

  clone(): GetHintForExceptionErrorDTO {
    const json = this.toJSON();
    let result = new GetHintForExceptionErrorDTO();
    result.init(json);
    return result;
  }
}

/** Error wrapper */
export interface IGetHintForExceptionErrorDTO {
  /** Text describing the error. The Language is limited to german. */
  errorMessage: string;
  /** Main error code. Describes the Error on a general level. */
  errorCode?: ErrorCodes | undefined;
  /** Sub error code. This code can help to specify the issue but might be null if it is a security issue to broadcast the information. */
  subCode: GetHintForException;
}

export class GgtDestinationDTO implements IGgtDestinationDTO {
  id?: number | undefined;
  bezeichnung?: string | undefined;
  kassenart?: string | undefined;
  iK_logisch?: string | undefined;
  iK_physikalisch?: string | undefined;
  mail?: string | undefined;
  telefon?: string | undefined;
  zustaendigkeit?: string | undefined;

  constructor(data?: IGgtDestinationDTO) {
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
      this.bezeichnung = _data["bezeichnung"];
      this.kassenart = _data["kassenart"];
      this.iK_logisch = _data["iK_logisch"];
      this.iK_physikalisch = _data["iK_physikalisch"];
      this.mail = _data["mail"];
      this.telefon = _data["telefon"];
      this.zustaendigkeit = _data["zustaendigkeit"];
    }
  }

  static fromJS(data: any): GgtDestinationDTO {
    data = typeof data === "object" ? data : {};
    let result = new GgtDestinationDTO();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["id"] = this.id;
    data["bezeichnung"] = this.bezeichnung;
    data["kassenart"] = this.kassenart;
    data["iK_logisch"] = this.iK_logisch;
    data["iK_physikalisch"] = this.iK_physikalisch;
    data["mail"] = this.mail;
    data["telefon"] = this.telefon;
    data["zustaendigkeit"] = this.zustaendigkeit;
    return data;
  }

  clone(): GgtDestinationDTO {
    const json = this.toJSON();
    let result = new GgtDestinationDTO();
    result.init(json);
    return result;
  }
}

export interface IGgtDestinationDTO {
  id?: number | undefined;
  bezeichnung?: string | undefined;
  kassenart?: string | undefined;
  iK_logisch?: string | undefined;
  iK_physikalisch?: string | undefined;
  mail?: string | undefined;
  telefon?: string | undefined;
  zustaendigkeit?: string | undefined;
}

export class GisHeader implements IGisHeader {
  shortIdent?: string | undefined;
  caption?: string | undefined;
  licenceIdent?: string | undefined;

  constructor(data?: IGisHeader) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.shortIdent = _data["shortIdent"];
      this.caption = _data["caption"];
      this.licenceIdent = _data["licenceIdent"];
    }
  }

  static fromJS(data: any): GisHeader {
    data = typeof data === "object" ? data : {};
    let result = new GisHeader();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["shortIdent"] = this.shortIdent;
    data["caption"] = this.caption;
    data["licenceIdent"] = this.licenceIdent;
    return data;
  }

  clone(): GisHeader {
    const json = this.toJSON();
    let result = new GisHeader();
    result.init(json);
    return result;
  }
}

export interface IGisHeader {
  shortIdent?: string | undefined;
  caption?: string | undefined;
  licenceIdent?: string | undefined;
}

export class IPInterfaceStatistics implements IIPInterfaceStatistics {
  readonly bytesReceived?: number | undefined;
  readonly bytesSent?: number | undefined;
  readonly incomingPacketsDiscarded?: number | undefined;
  readonly incomingPacketsWithErrors?: number | undefined;
  readonly incomingUnknownProtocolPackets?: number | undefined;
  readonly nonUnicastPacketsReceived?: number | undefined;
  readonly nonUnicastPacketsSent?: number | undefined;
  readonly outgoingPacketsDiscarded?: number | undefined;
  readonly outgoingPacketsWithErrors?: number | undefined;
  readonly outputQueueLength?: number | undefined;
  readonly unicastPacketsReceived?: number | undefined;
  readonly unicastPacketsSent?: number | undefined;

  constructor(data?: IIPInterfaceStatistics) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      (<any>this).bytesReceived = _data["bytesReceived"];
      (<any>this).bytesSent = _data["bytesSent"];
      (<any>this).incomingPacketsDiscarded = _data["incomingPacketsDiscarded"];
      (<any>this).incomingPacketsWithErrors =
        _data["incomingPacketsWithErrors"];
      (<any>this).incomingUnknownProtocolPackets =
        _data["incomingUnknownProtocolPackets"];
      (<any>this).nonUnicastPacketsReceived =
        _data["nonUnicastPacketsReceived"];
      (<any>this).nonUnicastPacketsSent = _data["nonUnicastPacketsSent"];
      (<any>this).outgoingPacketsDiscarded = _data["outgoingPacketsDiscarded"];
      (<any>this).outgoingPacketsWithErrors =
        _data["outgoingPacketsWithErrors"];
      (<any>this).outputQueueLength = _data["outputQueueLength"];
      (<any>this).unicastPacketsReceived = _data["unicastPacketsReceived"];
      (<any>this).unicastPacketsSent = _data["unicastPacketsSent"];
    }
  }

  static fromJS(data: any): IPInterfaceStatistics {
    data = typeof data === "object" ? data : {};
    let result = new IPInterfaceStatistics();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["bytesReceived"] = this.bytesReceived;
    data["bytesSent"] = this.bytesSent;
    data["incomingPacketsDiscarded"] = this.incomingPacketsDiscarded;
    data["incomingPacketsWithErrors"] = this.incomingPacketsWithErrors;
    data["incomingUnknownProtocolPackets"] =
      this.incomingUnknownProtocolPackets;
    data["nonUnicastPacketsReceived"] = this.nonUnicastPacketsReceived;
    data["nonUnicastPacketsSent"] = this.nonUnicastPacketsSent;
    data["outgoingPacketsDiscarded"] = this.outgoingPacketsDiscarded;
    data["outgoingPacketsWithErrors"] = this.outgoingPacketsWithErrors;
    data["outputQueueLength"] = this.outputQueueLength;
    data["unicastPacketsReceived"] = this.unicastPacketsReceived;
    data["unicastPacketsSent"] = this.unicastPacketsSent;
    return data;
  }

  clone(): IPInterfaceStatistics {
    const json = this.toJSON();
    let result = new IPInterfaceStatistics();
    result.init(json);
    return result;
  }
}

export interface IIPInterfaceStatistics {
  bytesReceived?: number | undefined;
  bytesSent?: number | undefined;
  incomingPacketsDiscarded?: number | undefined;
  incomingPacketsWithErrors?: number | undefined;
  incomingUnknownProtocolPackets?: number | undefined;
  nonUnicastPacketsReceived?: number | undefined;
  nonUnicastPacketsSent?: number | undefined;
  outgoingPacketsDiscarded?: number | undefined;
  outgoingPacketsWithErrors?: number | undefined;
  outputQueueLength?: number | undefined;
  unicastPacketsReceived?: number | undefined;
  unicastPacketsSent?: number | undefined;
}

export class IconifyDTO implements IIconifyDTO {
  version!: string;
  icons!: string[];

  constructor(data?: IIconifyDTO) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
    if (!data) {
      this.icons = [];
    }
  }

  init(_data?: any) {
    if (_data) {
      this.version = _data["version"];
      if (Array.isArray(_data["icons"])) {
        this.icons = [] as any;
        for (let item of _data["icons"]) this.icons!.push(item);
      }
    }
  }

  static fromJS(data: any): IconifyDTO {
    data = typeof data === "object" ? data : {};
    let result = new IconifyDTO();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["version"] = this.version;
    if (Array.isArray(this.icons)) {
      data["icons"] = [];
      for (let item of this.icons) data["icons"].push(item);
    }
    return data;
  }

  clone(): IconifyDTO {
    const json = this.toJSON();
    let result = new IconifyDTO();
    result.init(json);
    return result;
  }
}

export interface IIconifyDTO {
  version: string;
  icons: string[];
}

/** A system based message */
export class InfoNotification implements IInfoNotification {
  /** Message to display */
  message?: string | undefined;

  constructor(data?: IInfoNotification) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.message = _data["message"];
    }
  }

  static fromJS(data: any): InfoNotification {
    data = typeof data === "object" ? data : {};
    let result = new InfoNotification();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["message"] = this.message;
    return data;
  }

  clone(): InfoNotification {
    const json = this.toJSON();
    let result = new InfoNotification();
    result.init(json);
    return result;
  }
}

/** A system based message */
export interface IInfoNotification {
  /** Message to display */
  message?: string | undefined;
}

/** Notification */
export class NotificationDTO implements INotificationDTO {
  /** Id for reference */
  id?: number | undefined;
  /** User that will receive the message */
  targetUser?: number | undefined;
  /** Needs an alert? */
  read?: boolean | undefined;
  /** Can be discarded. (Not bound to an object) */
  readonly deleteable?: boolean | undefined;
  /** Indexing value (Type + Index = UID) */
  readonly indexing?: string | undefined;

  protected _discriminator: string;

  constructor(data?: INotificationDTO) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
    this._discriminator = "NotificationDTO";
  }

  init(_data?: any) {
    if (_data) {
      this.id = _data["id"];
      this.targetUser = _data["targetUser"];
      this.read = _data["read"];
      (<any>this).deleteable = _data["deleteable"];
      (<any>this).indexing = _data["indexing"];
    }
  }

  static fromJS(data: any): NotificationDTO {
    data = typeof data === "object" ? data : {};
    if (data["notificationType"] === "1") {
      let result = new InfoNotificationDTO();
      result.init(data);
      return result;
    }
    let result = new NotificationDTO();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["notificationType"] = this._discriminator;
    data["id"] = this.id;
    data["targetUser"] = this.targetUser;
    data["read"] = this.read;
    data["deleteable"] = this.deleteable;
    data["indexing"] = this.indexing;
    return data;
  }

  clone(): NotificationDTO {
    const json = this.toJSON();
    let result = new NotificationDTO();
    result.init(json);
    return result;
  }
}

/** Notification */
export interface INotificationDTO {
  /** Id for reference */
  id?: number | undefined;
  /** User that will receive the message */
  targetUser?: number | undefined;
  /** Needs an alert? */
  read?: boolean | undefined;
  /** Can be discarded. (Not bound to an object) */
  deleteable?: boolean | undefined;
  /** Indexing value (Type + Index = UID) */
  indexing?: string | undefined;
}

/** Notification for system based infos */
export class InfoNotificationDTO
  extends NotificationDTO
  implements IInfoNotificationDTO
{
  /** Defines the Content. (0 => No Content), (1 => Info) */
  readonly notificationType?: number | undefined;
  /** Notification Content */
  content?: InfoNotification | undefined;

  constructor(data?: IInfoNotificationDTO) {
    super(data);
    this._discriminator = "1";
  }

  override init(_data?: any) {
    super.init(_data);
    if (_data) {
      (<any>this).notificationType = _data["notificationType"];
      this.content = _data["content"]
        ? InfoNotification.fromJS(_data["content"])
        : <any>undefined;
    }
  }

  static override fromJS(data: any): InfoNotificationDTO {
    data = typeof data === "object" ? data : {};
    let result = new InfoNotificationDTO();
    result.init(data);
    return result;
  }

  override toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["notificationType"] = this.notificationType;
    data["content"] = this.content ? this.content.toJSON() : <any>undefined;
    super.toJSON(data);
    return data;
  }

  clone(): InfoNotificationDTO {
    const json = this.toJSON();
    let result = new InfoNotificationDTO();
    result.init(json);
    return result;
  }
}

/** Notification for system based infos */
export interface IInfoNotificationDTO extends INotificationDTO {
  /** Defines the Content. (0 => No Content), (1 => Info) */
  notificationType?: number | undefined;
  /** Notification Content */
  content?: InfoNotification | undefined;
}

export class InstitutionResponseDTO implements IInstitutionResponseDTO {
  exportId?: string | undefined;
  isOk?: boolean | undefined;
  errorMessage!: string;
  creationDate!: Date;
  standortId!: string;
  exportType!: string;

  constructor(data?: IInstitutionResponseDTO) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.exportId = _data["exportId"];
      this.isOk = _data["isOk"];
      this.errorMessage = _data["errorMessage"];
      this.creationDate = _data["creationDate"]
        ? new Date(_data["creationDate"].toString())
        : <any>undefined;
      this.standortId = _data["standortId"];
      this.exportType = _data["exportType"];
    }
  }

  static fromJS(data: any): InstitutionResponseDTO {
    data = typeof data === "object" ? data : {};
    let result = new InstitutionResponseDTO();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["exportId"] = this.exportId;
    data["isOk"] = this.isOk;
    data["errorMessage"] = this.errorMessage;
    data["creationDate"] = this.creationDate
      ? this.creationDate.toISOString()
      : <any>undefined;
    data["standortId"] = this.standortId;
    data["exportType"] = this.exportType;
    return data;
  }

  clone(): InstitutionResponseDTO {
    const json = this.toJSON();
    let result = new InstitutionResponseDTO();
    result.init(json);
    return result;
  }
}

export interface IInstitutionResponseDTO {
  exportId?: string | undefined;
  isOk?: boolean | undefined;
  errorMessage: string;
  creationDate: Date;
  standortId: string;
  exportType: string;
}

export class Int32Int32ValueTuple implements IInt32Int32ValueTuple {
  item1?: number | undefined;
  item2?: number | undefined;

  constructor(data?: IInt32Int32ValueTuple) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.item1 = _data["item1"];
      this.item2 = _data["item2"];
    }
  }

  static fromJS(data: any): Int32Int32ValueTuple {
    data = typeof data === "object" ? data : {};
    let result = new Int32Int32ValueTuple();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["item1"] = this.item1;
    data["item2"] = this.item2;
    return data;
  }

  clone(): Int32Int32ValueTuple {
    const json = this.toJSON();
    let result = new Int32Int32ValueTuple();
    result.init(json);
    return result;
  }
}

export interface IInt32Int32ValueTuple {
  item1?: number | undefined;
  item2?: number | undefined;
}

export class Int32NullableParameterWrapper
  implements IInt32NullableParameterWrapper
{
  value!: number;

  constructor(data?: IInt32NullableParameterWrapper) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.value = _data["value"];
    }
  }

  static fromJS(data: any): Int32NullableParameterWrapper {
    data = typeof data === "object" ? data : {};
    let result = new Int32NullableParameterWrapper();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["value"] = this.value;
    return data;
  }

  clone(): Int32NullableParameterWrapper {
    const json = this.toJSON();
    let result = new Int32NullableParameterWrapper();
    result.init(json);
    return result;
  }
}

export interface IInt32NullableParameterWrapper {
  value: number;
}

export class IqtigExportOptions implements IIqtigExportOptions {
  jarPath!: string;
  publicKeyPath!: string;

  constructor(data?: IIqtigExportOptions) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.jarPath = _data["jarPath"];
      this.publicKeyPath = _data["publicKeyPath"];
    }
  }

  static fromJS(data: any): IqtigExportOptions {
    data = typeof data === "object" ? data : {};
    let result = new IqtigExportOptions();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["jarPath"] = this.jarPath;
    data["publicKeyPath"] = this.publicKeyPath;
    return data;
  }

  clone(): IqtigExportOptions {
    const json = this.toJSON();
    let result = new IqtigExportOptions();
    result.init(json);
    return result;
  }
}

export interface IIqtigExportOptions {
  jarPath: string;
  publicKeyPath: string;
}

export class LeitstandLicence implements ILeitstandLicence {
  readonly main_Ik?: string | undefined;
  readonly licenced?: boolean | undefined;
  readonly demo?: boolean | undefined;
  readonly strOPS?: LicenceProperty[] | undefined;
  readonly qsfFx?: LicenceProperty[] | undefined;

  constructor(data?: ILeitstandLicence) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      (<any>this).main_Ik = _data["main_Ik"];
      (<any>this).licenced = _data["licenced"];
      (<any>this).demo = _data["demo"];
      if (Array.isArray(_data["strOPS"])) {
        (<any>this).strOPS = [] as any;
        for (let item of _data["strOPS"])
          (<any>this).strOPS!.push(LicenceProperty.fromJS(item));
      }
      if (Array.isArray(_data["qsfFx"])) {
        (<any>this).qsfFx = [] as any;
        for (let item of _data["qsfFx"])
          (<any>this).qsfFx!.push(LicenceProperty.fromJS(item));
      }
    }
  }

  static fromJS(data: any): LeitstandLicence {
    data = typeof data === "object" ? data : {};
    let result = new LeitstandLicence();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["main_Ik"] = this.main_Ik;
    data["licenced"] = this.licenced;
    data["demo"] = this.demo;
    if (Array.isArray(this.strOPS)) {
      data["strOPS"] = [];
      for (let item of this.strOPS) data["strOPS"].push(item.toJSON());
    }
    if (Array.isArray(this.qsfFx)) {
      data["qsfFx"] = [];
      for (let item of this.qsfFx) data["qsfFx"].push(item.toJSON());
    }
    return data;
  }

  clone(): LeitstandLicence {
    const json = this.toJSON();
    let result = new LeitstandLicence();
    result.init(json);
    return result;
  }
}

export interface ILeitstandLicence {
  main_Ik?: string | undefined;
  licenced?: boolean | undefined;
  demo?: boolean | undefined;
  strOPS?: LicenceProperty[] | undefined;
  qsfFx?: LicenceProperty[] | undefined;
}

export class LicenceProperty implements ILicenceProperty {
  name?: string | undefined;
  value?: string | undefined;

  constructor(data?: ILicenceProperty) {
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
    }
  }

  static fromJS(data: any): LicenceProperty {
    data = typeof data === "object" ? data : {};
    let result = new LicenceProperty();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["name"] = this.name;
    data["value"] = this.value;
    return data;
  }

  clone(): LicenceProperty {
    const json = this.toJSON();
    let result = new LicenceProperty();
    result.init(json);
    return result;
  }
}

export interface ILicenceProperty {
  name?: string | undefined;
  value?: string | undefined;
}

export class LicenceStandort implements ILicenceStandort {
  iknrkh?: string | undefined;
  nummer?: string | undefined;
  standortID?: string | undefined;
  kurzbezeichnung?: string | undefined;
  langbezeichnung?: string | undefined;
  gueltigVon?: Date | undefined;
  gueltigBis?: Date | undefined;

  constructor(data?: ILicenceStandort) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.iknrkh = _data["iknrkh"];
      this.nummer = _data["nummer"];
      this.standortID = _data["standortID"];
      this.kurzbezeichnung = _data["kurzbezeichnung"];
      this.langbezeichnung = _data["langbezeichnung"];
      this.gueltigVon = _data["gueltigVon"]
        ? new Date(_data["gueltigVon"].toString())
        : <any>undefined;
      this.gueltigBis = _data["gueltigBis"]
        ? new Date(_data["gueltigBis"].toString())
        : <any>undefined;
    }
  }

  static fromJS(data: any): LicenceStandort {
    data = typeof data === "object" ? data : {};
    let result = new LicenceStandort();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["iknrkh"] = this.iknrkh;
    data["nummer"] = this.nummer;
    data["standortID"] = this.standortID;
    data["kurzbezeichnung"] = this.kurzbezeichnung;
    data["langbezeichnung"] = this.langbezeichnung;
    data["gueltigVon"] = this.gueltigVon
      ? this.gueltigVon.toISOString()
      : <any>undefined;
    data["gueltigBis"] = this.gueltigBis
      ? this.gueltigBis.toISOString()
      : <any>undefined;
    return data;
  }

  clone(): LicenceStandort {
    const json = this.toJSON();
    let result = new LicenceStandort();
    result.init(json);
    return result;
  }
}

export interface ILicenceStandort {
  iknrkh?: string | undefined;
  nummer?: string | undefined;
  standortID?: string | undefined;
  kurzbezeichnung?: string | undefined;
  langbezeichnung?: string | undefined;
  gueltigVon?: Date | undefined;
  gueltigBis?: Date | undefined;
}

/** Location information */
export class LocationDTO implements ILocationDTO {
  /** Id for reference */
  id?: number | undefined;
  /** City name (implied to be in germany) */
  city?: string | undefined;
  /** Street and housenumber */
  adress?: string | undefined;
  /** City postal code */
  postalCode?: string | undefined;
  /** Logical Units */
  logicalUnits?: LogicalUnitDTO[] | undefined;
  /** Station / Geographical Units */
  stations?: StationDTO[] | undefined;

  constructor(data?: ILocationDTO) {
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
      this.city = _data["city"];
      this.adress = _data["adress"];
      this.postalCode = _data["postalCode"];
      if (Array.isArray(_data["logicalUnits"])) {
        this.logicalUnits = [] as any;
        for (let item of _data["logicalUnits"])
          this.logicalUnits!.push(LogicalUnitDTO.fromJS(item));
      }
      if (Array.isArray(_data["stations"])) {
        this.stations = [] as any;
        for (let item of _data["stations"])
          this.stations!.push(StationDTO.fromJS(item));
      }
    }
  }

  static fromJS(data: any): LocationDTO {
    data = typeof data === "object" ? data : {};
    let result = new LocationDTO();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["id"] = this.id;
    data["city"] = this.city;
    data["adress"] = this.adress;
    data["postalCode"] = this.postalCode;
    if (Array.isArray(this.logicalUnits)) {
      data["logicalUnits"] = [];
      for (let item of this.logicalUnits)
        data["logicalUnits"].push(item.toJSON());
    }
    if (Array.isArray(this.stations)) {
      data["stations"] = [];
      for (let item of this.stations) data["stations"].push(item.toJSON());
    }
    return data;
  }

  clone(): LocationDTO {
    const json = this.toJSON();
    let result = new LocationDTO();
    result.init(json);
    return result;
  }
}

/** Location information */
export interface ILocationDTO {
  /** Id for reference */
  id?: number | undefined;
  /** City name (implied to be in germany) */
  city?: string | undefined;
  /** Street and housenumber */
  adress?: string | undefined;
  /** City postal code */
  postalCode?: string | undefined;
  /** Logical Units */
  logicalUnits?: LogicalUnitDTO[] | undefined;
  /** Station / Geographical Units */
  stations?: StationDTO[] | undefined;
}

export class LocationUDTO implements ILocationUDTO {
  /** Id for reference */
  id?: number | undefined;
  /** City name (implied to be in germany) */
  city?: string | undefined;
  /** Street and housenumber */
  adress?: string | undefined;
  /** City postal code */
  postalCode?: string | undefined;

  constructor(data?: ILocationUDTO) {
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
      this.city = _data["city"];
      this.adress = _data["adress"];
      this.postalCode = _data["postalCode"];
    }
  }

  static fromJS(data: any): LocationUDTO {
    data = typeof data === "object" ? data : {};
    let result = new LocationUDTO();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["id"] = this.id;
    data["city"] = this.city;
    data["adress"] = this.adress;
    data["postalCode"] = this.postalCode;
    return data;
  }

  clone(): LocationUDTO {
    const json = this.toJSON();
    let result = new LocationUDTO();
    result.init(json);
    return result;
  }
}

export interface ILocationUDTO {
  /** Id for reference */
  id?: number | undefined;
  /** City name (implied to be in germany) */
  city?: string | undefined;
  /** Street and housenumber */
  adress?: string | undefined;
  /** City postal code */
  postalCode?: string | undefined;
}

export class LogManagementOptions implements ILogManagementOptions {
  folder?: string | undefined;
  fileNameBeginning?: string | undefined;
  windowsEventLogSource?: string | undefined;
  deactivateLogManagement?: boolean | undefined;
  logFilesToKeep?: number | undefined;
  compressOldFiles?: boolean | undefined;
  moveOldFiles?: boolean | undefined;
  olderFolder?: string | undefined;
  olderFilesToKeep?: number | undefined;

  constructor(data?: ILogManagementOptions) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.folder = _data["folder"];
      this.fileNameBeginning = _data["fileNameBeginning"];
      this.windowsEventLogSource = _data["windowsEventLogSource"];
      this.deactivateLogManagement = _data["deactivateLogManagement"];
      this.logFilesToKeep = _data["logFilesToKeep"];
      this.compressOldFiles = _data["compressOldFiles"];
      this.moveOldFiles = _data["moveOldFiles"];
      this.olderFolder = _data["olderFolder"];
      this.olderFilesToKeep = _data["olderFilesToKeep"];
    }
  }

  static fromJS(data: any): LogManagementOptions {
    data = typeof data === "object" ? data : {};
    let result = new LogManagementOptions();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["folder"] = this.folder;
    data["fileNameBeginning"] = this.fileNameBeginning;
    data["windowsEventLogSource"] = this.windowsEventLogSource;
    data["deactivateLogManagement"] = this.deactivateLogManagement;
    data["logFilesToKeep"] = this.logFilesToKeep;
    data["compressOldFiles"] = this.compressOldFiles;
    data["moveOldFiles"] = this.moveOldFiles;
    data["olderFolder"] = this.olderFolder;
    data["olderFilesToKeep"] = this.olderFilesToKeep;
    return data;
  }

  clone(): LogManagementOptions {
    const json = this.toJSON();
    let result = new LogManagementOptions();
    result.init(json);
    return result;
  }
}

export interface ILogManagementOptions {
  folder?: string | undefined;
  fileNameBeginning?: string | undefined;
  windowsEventLogSource?: string | undefined;
  deactivateLogManagement?: boolean | undefined;
  logFilesToKeep?: number | undefined;
  compressOldFiles?: boolean | undefined;
  moveOldFiles?: boolean | undefined;
  olderFolder?: string | undefined;
  olderFilesToKeep?: number | undefined;
}

/** Logical Unit */
export class LogicalUnitDTO implements ILogicalUnitDTO {
  /** Id for reference */
  id?: number | undefined;
  /** Name of the logical unit */
  name?: string | undefined;
  /** Supervising Location */
  location?: LocationDTO | undefined;

  constructor(data?: ILogicalUnitDTO) {
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
      this.location = _data["location"]
        ? LocationDTO.fromJS(_data["location"])
        : <any>undefined;
    }
  }

  static fromJS(data: any): LogicalUnitDTO {
    data = typeof data === "object" ? data : {};
    let result = new LogicalUnitDTO();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["id"] = this.id;
    data["name"] = this.name;
    data["location"] = this.location ? this.location.toJSON() : <any>undefined;
    return data;
  }

  clone(): LogicalUnitDTO {
    const json = this.toJSON();
    let result = new LogicalUnitDTO();
    result.init(json);
    return result;
  }
}

/** Logical Unit */
export interface ILogicalUnitDTO {
  /** Id for reference */
  id?: number | undefined;
  /** Name of the logical unit */
  name?: string | undefined;
  /** Supervising Location */
  location?: LocationDTO | undefined;
}

export class LogicalUnitUDTO implements ILogicalUnitUDTO {
  /** Id for reference */
  id?: number | undefined;
  /** Name of the logical unit */
  name?: string | undefined;

  constructor(data?: ILogicalUnitUDTO) {
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

  static fromJS(data: any): LogicalUnitUDTO {
    data = typeof data === "object" ? data : {};
    let result = new LogicalUnitUDTO();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["id"] = this.id;
    data["name"] = this.name;
    return data;
  }

  clone(): LogicalUnitUDTO {
    const json = this.toJSON();
    let result = new LogicalUnitUDTO();
    result.init(json);
    return result;
  }
}

export interface ILogicalUnitUDTO {
  /** Id for reference */
  id?: number | undefined;
  /** Name of the logical unit */
  name?: string | undefined;
}

/** User info with Accesstoken */
export class LoginResultDTO implements ILoginResultDTO {
  /** Infos about the User */
  userInfo?: UserInfoDTO | undefined;
  /** Accesstoken used for auth */
  readonly token?: string | undefined;
  /** Is user's first time logging in */
  readonly firstTimeLogIn?: boolean | undefined;
  serverVersion!: string;

  constructor(data?: ILoginResultDTO) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.userInfo = _data["userInfo"]
        ? UserInfoDTO.fromJS(_data["userInfo"])
        : <any>undefined;
      (<any>this).token = _data["token"];
      (<any>this).firstTimeLogIn = _data["firstTimeLogIn"];
      this.serverVersion = _data["serverVersion"];
    }
  }

  static fromJS(data: any): LoginResultDTO {
    data = typeof data === "object" ? data : {};
    let result = new LoginResultDTO();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["userInfo"] = this.userInfo ? this.userInfo.toJSON() : <any>undefined;
    data["token"] = this.token;
    data["firstTimeLogIn"] = this.firstTimeLogIn;
    data["serverVersion"] = this.serverVersion;
    return data;
  }

  clone(): LoginResultDTO {
    const json = this.toJSON();
    let result = new LoginResultDTO();
    result.init(json);
    return result;
  }
}

/** User info with Accesstoken */
export interface ILoginResultDTO {
  /** Infos about the User */
  userInfo?: UserInfoDTO | undefined;
  /** Accesstoken used for auth */
  token?: string | undefined;
  /** Is user's first time logging in */
  firstTimeLogIn?: boolean | undefined;
  serverVersion: string;
}

export class MachineSystemInfo implements IMachineSystemInfo {
  machineName!: string;
  platform!: string;
  distribution!: string;
  release!: string;
  servicePack!: string;
  totalRamGB!: number;
  freeRamPercent!: number;
  totalPageFileGB!: number;
  freePageFilePercent!: number;
  logicalProcessors!: number;
  processorSpeedGHz!: number;
  currentSystemIdlePercent!: number;
  hourlyAverageSystemIdlePercent!: number;
  hourlyMinimumSystemIdlePercent!: number;
  disks?: DiskSystemInfo[] | undefined;

  constructor(data?: IMachineSystemInfo) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.machineName = _data["machineName"];
      this.platform = _data["platform"];
      this.distribution = _data["distribution"];
      this.release = _data["release"];
      this.servicePack = _data["servicePack"];
      this.totalRamGB = _data["totalRamGB"];
      this.freeRamPercent = _data["freeRamPercent"];
      this.totalPageFileGB = _data["totalPageFileGB"];
      this.freePageFilePercent = _data["freePageFilePercent"];
      this.logicalProcessors = _data["logicalProcessors"];
      this.processorSpeedGHz = _data["processorSpeedGHz"];
      this.currentSystemIdlePercent = _data["currentSystemIdlePercent"];
      this.hourlyAverageSystemIdlePercent =
        _data["hourlyAverageSystemIdlePercent"];
      this.hourlyMinimumSystemIdlePercent =
        _data["hourlyMinimumSystemIdlePercent"];
      if (Array.isArray(_data["disks"])) {
        this.disks = [] as any;
        for (let item of _data["disks"])
          this.disks!.push(DiskSystemInfo.fromJS(item));
      }
    }
  }

  static fromJS(data: any): MachineSystemInfo {
    data = typeof data === "object" ? data : {};
    let result = new MachineSystemInfo();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["machineName"] = this.machineName;
    data["platform"] = this.platform;
    data["distribution"] = this.distribution;
    data["release"] = this.release;
    data["servicePack"] = this.servicePack;
    data["totalRamGB"] = this.totalRamGB;
    data["freeRamPercent"] = this.freeRamPercent;
    data["totalPageFileGB"] = this.totalPageFileGB;
    data["freePageFilePercent"] = this.freePageFilePercent;
    data["logicalProcessors"] = this.logicalProcessors;
    data["processorSpeedGHz"] = this.processorSpeedGHz;
    data["currentSystemIdlePercent"] = this.currentSystemIdlePercent;
    data["hourlyAverageSystemIdlePercent"] =
      this.hourlyAverageSystemIdlePercent;
    data["hourlyMinimumSystemIdlePercent"] =
      this.hourlyMinimumSystemIdlePercent;
    if (Array.isArray(this.disks)) {
      data["disks"] = [];
      for (let item of this.disks) data["disks"].push(item.toJSON());
    }
    return data;
  }

  clone(): MachineSystemInfo {
    const json = this.toJSON();
    let result = new MachineSystemInfo();
    result.init(json);
    return result;
  }
}

export interface IMachineSystemInfo {
  machineName: string;
  platform: string;
  distribution: string;
  release: string;
  servicePack: string;
  totalRamGB: number;
  freeRamPercent: number;
  totalPageFileGB: number;
  freePageFilePercent: number;
  logicalProcessors: number;
  processorSpeedGHz: number;
  currentSystemIdlePercent: number;
  hourlyAverageSystemIdlePercent: number;
  hourlyMinimumSystemIdlePercent: number;
  disks?: DiskSystemInfo[] | undefined;
}

export class MetaModulDTO implements IMetaModulDTO {
  id?: number | undefined;
  data?: QsxDataWebFormat | undefined;

  constructor(data?: IMetaModulDTO) {
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
      this.data = _data["data"]
        ? QsxDataWebFormat.fromJS(_data["data"])
        : <any>undefined;
    }
  }

  static fromJS(data: any): MetaModulDTO {
    data = typeof data === "object" ? data : {};
    let result = new MetaModulDTO();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["id"] = this.id;
    data["data"] = this.data ? this.data.toJSON() : <any>undefined;
    return data;
  }

  clone(): MetaModulDTO {
    const json = this.toJSON();
    let result = new MetaModulDTO();
    result.init(json);
    return result;
  }
}

export interface IMetaModulDTO {
  id?: number | undefined;
  data?: QsxDataWebFormat | undefined;
}

export class ModulFolderNotFoundException
  implements IModulFolderNotFoundException
{
  readonly typeDef?: string | undefined;

  constructor(data?: IModulFolderNotFoundException) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      (<any>this).typeDef = _data["typeDef"];
    }
  }

  static fromJS(data: any): ModulFolderNotFoundException {
    data = typeof data === "object" ? data : {};
    let result = new ModulFolderNotFoundException();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["typeDef"] = this.typeDef;
    return data;
  }

  clone(): ModulFolderNotFoundException {
    const json = this.toJSON();
    let result = new ModulFolderNotFoundException();
    result.init(json);
    return result;
  }
}

export interface IModulFolderNotFoundException {
  typeDef?: string | undefined;
}

export class MyTestRequest implements IMyTestRequest {
  name?: string | undefined;

  constructor(data?: IMyTestRequest) {
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

  static fromJS(data: any): MyTestRequest {
    data = typeof data === "object" ? data : {};
    let result = new MyTestRequest();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["name"] = this.name;
    return data;
  }

  clone(): MyTestRequest {
    const json = this.toJSON();
    let result = new MyTestRequest();
    result.init(json);
    return result;
  }
}

export interface IMyTestRequest {
  name?: string | undefined;
}

export class MyTestResponse implements IMyTestResponse {
  message?: string | undefined;
  requestName?: string | undefined;
  success?: boolean | undefined;

  constructor(data?: IMyTestResponse) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.message = _data["message"];
      this.requestName = _data["requestName"];
      this.success = _data["success"];
    }
  }

  static fromJS(data: any): MyTestResponse {
    data = typeof data === "object" ? data : {};
    let result = new MyTestResponse();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["message"] = this.message;
    data["requestName"] = this.requestName;
    data["success"] = this.success;
    return data;
  }

  clone(): MyTestResponse {
    const json = this.toJSON();
    let result = new MyTestResponse();
    result.init(json);
    return result;
  }
}

export interface IMyTestResponse {
  message?: string | undefined;
  requestName?: string | undefined;
  success?: boolean | undefined;
}

export class NetworkInterfaceSystemInfo implements INetworkInterfaceSystemInfo {
  name?: string | undefined;
  description?: string | undefined;
  addresses?: string[] | undefined;
  speedMbps?: number | undefined;
  type?: string | undefined;
  statistics?: IPInterfaceStatistics | undefined;

  constructor(data?: INetworkInterfaceSystemInfo) {
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
      this.description = _data["description"];
      if (Array.isArray(_data["addresses"])) {
        this.addresses = [] as any;
        for (let item of _data["addresses"]) this.addresses!.push(item);
      }
      this.speedMbps = _data["speedMbps"];
      this.type = _data["type"];
      this.statistics = _data["statistics"]
        ? IPInterfaceStatistics.fromJS(_data["statistics"])
        : <any>undefined;
    }
  }

  static fromJS(data: any): NetworkInterfaceSystemInfo {
    data = typeof data === "object" ? data : {};
    let result = new NetworkInterfaceSystemInfo();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["name"] = this.name;
    data["description"] = this.description;
    if (Array.isArray(this.addresses)) {
      data["addresses"] = [];
      for (let item of this.addresses) data["addresses"].push(item);
    }
    data["speedMbps"] = this.speedMbps;
    data["type"] = this.type;
    data["statistics"] = this.statistics
      ? this.statistics.toJSON()
      : <any>undefined;
    return data;
  }

  clone(): NetworkInterfaceSystemInfo {
    const json = this.toJSON();
    let result = new NetworkInterfaceSystemInfo();
    result.init(json);
    return result;
  }
}

export interface INetworkInterfaceSystemInfo {
  name?: string | undefined;
  description?: string | undefined;
  addresses?: string[] | undefined;
  speedMbps?: number | undefined;
  type?: string | undefined;
  statistics?: IPInterfaceStatistics | undefined;
}

export class NetworkSystemInfo implements INetworkSystemInfo {
  networkInterfaces?: NetworkInterfaceSystemInfo[] | undefined;
  pingResults?: RepeatedPingResult[] | undefined;

  constructor(data?: INetworkSystemInfo) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      if (Array.isArray(_data["networkInterfaces"])) {
        this.networkInterfaces = [] as any;
        for (let item of _data["networkInterfaces"])
          this.networkInterfaces!.push(NetworkInterfaceSystemInfo.fromJS(item));
      }
      if (Array.isArray(_data["pingResults"])) {
        this.pingResults = [] as any;
        for (let item of _data["pingResults"])
          this.pingResults!.push(RepeatedPingResult.fromJS(item));
      }
    }
  }

  static fromJS(data: any): NetworkSystemInfo {
    data = typeof data === "object" ? data : {};
    let result = new NetworkSystemInfo();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    if (Array.isArray(this.networkInterfaces)) {
      data["networkInterfaces"] = [];
      for (let item of this.networkInterfaces)
        data["networkInterfaces"].push(item.toJSON());
    }
    if (Array.isArray(this.pingResults)) {
      data["pingResults"] = [];
      for (let item of this.pingResults)
        data["pingResults"].push(item.toJSON());
    }
    return data;
  }

  clone(): NetworkSystemInfo {
    const json = this.toJSON();
    let result = new NetworkSystemInfo();
    result.init(json);
    return result;
  }
}

export interface INetworkSystemInfo {
  networkInterfaces?: NetworkInterfaceSystemInfo[] | undefined;
  pingResults?: RepeatedPingResult[] | undefined;
}

/** Creation parameter for an document */
export class NewDocumentDTO implements INewDocumentDTO {
  /** Title of the document */
  title?: string | undefined;
  /** Document can safly be used till the end of this date */
  dateOfExpiry?: Date | undefined;

  constructor(data?: INewDocumentDTO) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.title = _data["title"];
      this.dateOfExpiry = _data["dateOfExpiry"]
        ? new Date(_data["dateOfExpiry"].toString())
        : <any>undefined;
    }
  }

  static fromJS(data: any): NewDocumentDTO {
    data = typeof data === "object" ? data : {};
    let result = new NewDocumentDTO();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["title"] = this.title;
    data["dateOfExpiry"] = this.dateOfExpiry
      ? this.dateOfExpiry.toISOString()
      : <any>undefined;
    return data;
  }

  clone(): NewDocumentDTO {
    const json = this.toJSON();
    let result = new NewDocumentDTO();
    result.init(json);
    return result;
  }
}

/** Creation parameter for an document */
export interface INewDocumentDTO {
  /** Title of the document */
  title?: string | undefined;
  /** Document can safly be used till the end of this date */
  dateOfExpiry?: Date | undefined;
}

/** Information about an generic Task */
export class NotificationBoundTask implements INotificationBoundTask {
  /** Notification that gets deleted when task finishes */
  boundNotification?: number | undefined;
  /** Id for reference */
  id?: number | undefined;
  /** User to receive the task */
  target?: PersonDTO | undefined;
  /** Contact for questions */
  contact?: PersonDTO | undefined;
  /** Creator of the task */
  creator?: PersonDTO | undefined;
  /** Date of creation including time */
  creationTime?: Date | undefined;
  /** Deadline for the task. Time will be 00:00 */
  deadline?: Date | undefined;
  /** Readable description */
  description?: string | undefined;
  /** Module the Task is bound to */
  module?: string | undefined;
  /** State of the Task */
  state?: ETaskState | undefined;
  /** Id for the Task. Some Module might host multiple task types */
  readonly taskType?: number | undefined;

  constructor(data?: INotificationBoundTask) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.boundNotification = _data["boundNotification"];
      this.id = _data["id"];
      this.target = _data["target"]
        ? PersonDTO.fromJS(_data["target"])
        : <any>undefined;
      this.contact = _data["contact"]
        ? PersonDTO.fromJS(_data["contact"])
        : <any>undefined;
      this.creator = _data["creator"]
        ? PersonDTO.fromJS(_data["creator"])
        : <any>undefined;
      this.creationTime = _data["creationTime"]
        ? new Date(_data["creationTime"].toString())
        : <any>undefined;
      this.deadline = _data["deadline"]
        ? new Date(_data["deadline"].toString())
        : <any>undefined;
      this.description = _data["description"];
      this.module = _data["module"];
      this.state = _data["state"];
      (<any>this).taskType = _data["taskType"];
    }
  }

  static fromJS(data: any): NotificationBoundTask {
    data = typeof data === "object" ? data : {};
    let result = new NotificationBoundTask();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["boundNotification"] = this.boundNotification;
    data["id"] = this.id;
    data["target"] = this.target ? this.target.toJSON() : <any>undefined;
    data["contact"] = this.contact ? this.contact.toJSON() : <any>undefined;
    data["creator"] = this.creator ? this.creator.toJSON() : <any>undefined;
    data["creationTime"] = this.creationTime
      ? this.creationTime.toISOString()
      : <any>undefined;
    data["deadline"] = this.deadline
      ? this.deadline.toISOString()
      : <any>undefined;
    data["description"] = this.description;
    data["module"] = this.module;
    data["state"] = this.state;
    data["taskType"] = this.taskType;
    return data;
  }

  clone(): NotificationBoundTask {
    const json = this.toJSON();
    let result = new NotificationBoundTask();
    result.init(json);
    return result;
  }
}

/** Information about an generic Task */
export interface INotificationBoundTask {
  /** Notification that gets deleted when task finishes */
  boundNotification?: number | undefined;
  /** Id for reference */
  id?: number | undefined;
  /** User to receive the task */
  target?: PersonDTO | undefined;
  /** Contact for questions */
  contact?: PersonDTO | undefined;
  /** Creator of the task */
  creator?: PersonDTO | undefined;
  /** Date of creation including time */
  creationTime?: Date | undefined;
  /** Deadline for the task. Time will be 00:00 */
  deadline?: Date | undefined;
  /** Readable description */
  description?: string | undefined;
  /** Module the Task is bound to */
  module?: string | undefined;
  /** State of the Task */
  state?: ETaskState | undefined;
  /** Id for the Task. Some Module might host multiple task types */
  taskType?: number | undefined;
}

/** Error wrapper */
export class ObjectErrorDTO implements IObjectErrorDTO {
  /** Text describing the error. The Language is limited to german. */
  errorMessage!: string;
  /** Main error code. Describes the Error on a general level. */
  errorCode?: ErrorCodes | undefined;
  /** Sub error code. This code can help to specify the issue but might be null if it is a security issue to broadcast the information. */
  subCode!: any;

  constructor(data?: IObjectErrorDTO) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.errorMessage = _data["errorMessage"];
      this.errorCode = _data["errorCode"];
      this.subCode = _data["subCode"];
    }
  }

  static fromJS(data: any): ObjectErrorDTO {
    data = typeof data === "object" ? data : {};
    let result = new ObjectErrorDTO();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["errorMessage"] = this.errorMessage;
    data["errorCode"] = this.errorCode;
    data["subCode"] = this.subCode;
    return data;
  }

  clone(): ObjectErrorDTO {
    const json = this.toJSON();
    let result = new ObjectErrorDTO();
    result.init(json);
    return result;
  }
}

/** Error wrapper */
export interface IObjectErrorDTO {
  /** Text describing the error. The Language is limited to german. */
  errorMessage: string;
  /** Main error code. Describes the Error on a general level. */
  errorCode?: ErrorCodes | undefined;
  /** Sub error code. This code can help to specify the issue but might be null if it is a security issue to broadcast the information. */
  subCode: any;
}

/** Ops */
export class OpsDTO implements IOpsDTO {
  /** Id for reference */
  id?: number | undefined;
  /** OpsCode */
  code?: string | undefined;
  /** Description in german */
  description?: string | undefined;
  /** Casenumber */
  caseNumber?: number | undefined;
  /** Requirements to fullfill for request */
  requirements?: OpsRequirementDTO[] | undefined;
  /** Possible Targets of the Strops */
  possibleTarget?: EStropsItemTargetLimit | undefined;

  constructor(data?: IOpsDTO) {
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
      this.code = _data["code"];
      this.description = _data["description"];
      this.caseNumber = _data["caseNumber"];
      if (Array.isArray(_data["requirements"])) {
        this.requirements = [] as any;
        for (let item of _data["requirements"])
          this.requirements!.push(OpsRequirementDTO.fromJS(item));
      }
      this.possibleTarget = _data["possibleTarget"];
    }
  }

  static fromJS(data: any): OpsDTO {
    data = typeof data === "object" ? data : {};
    let result = new OpsDTO();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["id"] = this.id;
    data["code"] = this.code;
    data["description"] = this.description;
    data["caseNumber"] = this.caseNumber;
    if (Array.isArray(this.requirements)) {
      data["requirements"] = [];
      for (let item of this.requirements)
        data["requirements"].push(item.toJSON());
    }
    data["possibleTarget"] = this.possibleTarget;
    return data;
  }

  clone(): OpsDTO {
    const json = this.toJSON();
    let result = new OpsDTO();
    result.init(json);
    return result;
  }
}

/** Ops */
export interface IOpsDTO {
  /** Id for reference */
  id?: number | undefined;
  /** OpsCode */
  code?: string | undefined;
  /** Description in german */
  description?: string | undefined;
  /** Casenumber */
  caseNumber?: number | undefined;
  /** Requirements to fullfill for request */
  requirements?: OpsRequirementDTO[] | undefined;
  /** Possible Targets of the Strops */
  possibleTarget?: EStropsItemTargetLimit | undefined;
}

/** Request for proof */
export class OpsKeyPointDTO implements IOpsKeyPointDTO {
  /** ID for reference */
  id?: number | undefined;
  /** Title of the proof */
  name?: string | undefined;
  /** Config descripign the required data */
  jsonDefinition?: string | undefined;

  constructor(data?: IOpsKeyPointDTO) {
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
      this.jsonDefinition = _data["jsonDefinition"];
    }
  }

  static fromJS(data: any): OpsKeyPointDTO {
    data = typeof data === "object" ? data : {};
    let result = new OpsKeyPointDTO();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["id"] = this.id;
    data["name"] = this.name;
    data["jsonDefinition"] = this.jsonDefinition;
    return data;
  }

  clone(): OpsKeyPointDTO {
    const json = this.toJSON();
    let result = new OpsKeyPointDTO();
    result.init(json);
    return result;
  }
}

/** Request for proof */
export interface IOpsKeyPointDTO {
  /** ID for reference */
  id?: number | undefined;
  /** Title of the proof */
  name?: string | undefined;
  /** Config descripign the required data */
  jsonDefinition?: string | undefined;
}

/** Grouped Ops KeyPoints */
export class OpsKeyPointGroupDTO implements IOpsKeyPointGroupDTO {
  /** Id for reference */
  id?: number | undefined;
  /** Grouptitle, might descripe the needed documents */
  title?: string | undefined;
  /** List of required infos */
  keyPoints?: OpsKeyPointDTO[] | undefined;

  constructor(data?: IOpsKeyPointGroupDTO) {
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
      this.title = _data["title"];
      if (Array.isArray(_data["keyPoints"])) {
        this.keyPoints = [] as any;
        for (let item of _data["keyPoints"])
          this.keyPoints!.push(OpsKeyPointDTO.fromJS(item));
      }
    }
  }

  static fromJS(data: any): OpsKeyPointGroupDTO {
    data = typeof data === "object" ? data : {};
    let result = new OpsKeyPointGroupDTO();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["id"] = this.id;
    data["title"] = this.title;
    if (Array.isArray(this.keyPoints)) {
      data["keyPoints"] = [];
      for (let item of this.keyPoints) data["keyPoints"].push(item.toJSON());
    }
    return data;
  }

  clone(): OpsKeyPointGroupDTO {
    const json = this.toJSON();
    let result = new OpsKeyPointGroupDTO();
    result.init(json);
    return result;
  }
}

/** Grouped Ops KeyPoints */
export interface IOpsKeyPointGroupDTO {
  /** Id for reference */
  id?: number | undefined;
  /** Grouptitle, might descripe the needed documents */
  title?: string | undefined;
  /** List of required infos */
  keyPoints?: OpsKeyPointDTO[] | undefined;
}

/** A requirement block */
export class OpsRequirementDTO implements IOpsRequirementDTO {
  /** Id for reference */
  id?: number | undefined;
  /** Description of the requirements */
  name?: string | undefined;
  /** List of requirementgroups */
  keyPointGroups?: OpsKeyPointGroupDTO[] | undefined;

  constructor(data?: IOpsRequirementDTO) {
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
      if (Array.isArray(_data["keyPointGroups"])) {
        this.keyPointGroups = [] as any;
        for (let item of _data["keyPointGroups"])
          this.keyPointGroups!.push(OpsKeyPointGroupDTO.fromJS(item));
      }
    }
  }

  static fromJS(data: any): OpsRequirementDTO {
    data = typeof data === "object" ? data : {};
    let result = new OpsRequirementDTO();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["id"] = this.id;
    data["name"] = this.name;
    if (Array.isArray(this.keyPointGroups)) {
      data["keyPointGroups"] = [];
      for (let item of this.keyPointGroups)
        data["keyPointGroups"].push(item.toJSON());
    }
    return data;
  }

  clone(): OpsRequirementDTO {
    const json = this.toJSON();
    let result = new OpsRequirementDTO();
    result.init(json);
    return result;
  }
}

/** A requirement block */
export interface IOpsRequirementDTO {
  /** Id for reference */
  id?: number | undefined;
  /** Description of the requirements */
  name?: string | undefined;
  /** List of requirementgroups */
  keyPointGroups?: OpsKeyPointGroupDTO[] | undefined;
}

export class OuLocation implements IOuLocation {
  standortId?: string | undefined;
  originalShortName?: string | undefined;
  shortName?: string | undefined;
  longName?: string | undefined;
  originalLongName?: string | undefined;
  ikNr?: string | undefined;
  rightValue?: number | undefined;

  constructor(data?: IOuLocation) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.standortId = _data["standortId"];
      this.originalShortName = _data["originalShortName"];
      this.shortName = _data["shortName"];
      this.longName = _data["longName"];
      this.originalLongName = _data["originalLongName"];
      this.ikNr = _data["ikNr"];
      this.rightValue = _data["rightValue"];
    }
  }

  static fromJS(data: any): OuLocation {
    data = typeof data === "object" ? data : {};
    let result = new OuLocation();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["standortId"] = this.standortId;
    data["originalShortName"] = this.originalShortName;
    data["shortName"] = this.shortName;
    data["longName"] = this.longName;
    data["originalLongName"] = this.originalLongName;
    data["ikNr"] = this.ikNr;
    data["rightValue"] = this.rightValue;
    return data;
  }

  clone(): OuLocation {
    const json = this.toJSON();
    let result = new OuLocation();
    result.init(json);
    return result;
  }
}

export interface IOuLocation {
  standortId?: string | undefined;
  originalShortName?: string | undefined;
  shortName?: string | undefined;
  longName?: string | undefined;
  originalLongName?: string | undefined;
  ikNr?: string | undefined;
  rightValue?: number | undefined;
}

export class Person implements IPerson {
  id?: number | undefined;
  title!: string;
  salutation!: string;
  firstName?: string | undefined;
  lastName?: string | undefined;
  jobTitle!: string;
  boundBnvUser!: string;
  boundBnvUsername!: string;
  eMail!: string;
  phone!: string;

  constructor(data?: IPerson) {
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
      this.title = _data["title"];
      this.salutation = _data["salutation"];
      this.firstName = _data["firstName"];
      this.lastName = _data["lastName"];
      this.jobTitle = _data["jobTitle"];
      this.boundBnvUser = _data["boundBnvUser"];
      this.boundBnvUsername = _data["boundBnvUsername"];
      this.eMail = _data["eMail"];
      this.phone = _data["phone"];
    }
  }

  static fromJS(data: any): Person {
    data = typeof data === "object" ? data : {};
    let result = new Person();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["id"] = this.id;
    data["title"] = this.title;
    data["salutation"] = this.salutation;
    data["firstName"] = this.firstName;
    data["lastName"] = this.lastName;
    data["jobTitle"] = this.jobTitle;
    data["boundBnvUser"] = this.boundBnvUser;
    data["boundBnvUsername"] = this.boundBnvUsername;
    data["eMail"] = this.eMail;
    data["phone"] = this.phone;
    return data;
  }

  clone(): Person {
    const json = this.toJSON();
    let result = new Person();
    result.init(json);
    return result;
  }
}

export interface IPerson {
  id?: number | undefined;
  title: string;
  salutation: string;
  firstName?: string | undefined;
  lastName?: string | undefined;
  jobTitle: string;
  boundBnvUser: string;
  boundBnvUsername: string;
  eMail: string;
  phone: string;
}

/** Describing an individual */
export class PersonCDTO implements IPersonCDTO {
  /** Firstname */
  firstName?: string | undefined;
  /** Lastname */
  lastName?: string | undefined;
  /** Title */
  title!: string;
  /** Salutation */
  salutation!: string;
  /** Job title */
  jobTitle!: string;
  /** e-mail */
  eMail!: string;
  /** Phone number */
  phone!: string;

  constructor(data?: IPersonCDTO) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.firstName = _data["firstName"];
      this.lastName = _data["lastName"];
      this.title = _data["title"];
      this.salutation = _data["salutation"];
      this.jobTitle = _data["jobTitle"];
      this.eMail = _data["eMail"];
      this.phone = _data["phone"];
    }
  }

  static fromJS(data: any): PersonCDTO {
    data = typeof data === "object" ? data : {};
    let result = new PersonCDTO();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["firstName"] = this.firstName;
    data["lastName"] = this.lastName;
    data["title"] = this.title;
    data["salutation"] = this.salutation;
    data["jobTitle"] = this.jobTitle;
    data["eMail"] = this.eMail;
    data["phone"] = this.phone;
    return data;
  }

  clone(): PersonCDTO {
    const json = this.toJSON();
    let result = new PersonCDTO();
    result.init(json);
    return result;
  }
}

/** Describing an individual */
export interface IPersonCDTO {
  /** Firstname */
  firstName?: string | undefined;
  /** Lastname */
  lastName?: string | undefined;
  /** Title */
  title: string;
  /** Salutation */
  salutation: string;
  /** Job title */
  jobTitle: string;
  /** e-mail */
  eMail: string;
  /** Phone number */
  phone: string;
}

/** Describing an individual */
export class PersonDTO implements IPersonDTO {
  /** Id for reference */
  id?: number | undefined;
  /** Salutation */
  salutation!: string;
  /** Title */
  title!: string;
  /** e-mail */
  email!: string;
  /** Phone number */
  phone!: string;
  /** Firstname */
  firstName?: string | undefined;
  /** Lastname */
  lastName?: string | undefined;
  /** Job title */
  jobTitle!: string;
  /** Name imported user */
  username!: string;

  constructor(data?: IPersonDTO) {
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
      this.salutation = _data["salutation"];
      this.title = _data["title"];
      this.email = _data["email"];
      this.phone = _data["phone"];
      this.firstName = _data["firstName"];
      this.lastName = _data["lastName"];
      this.jobTitle = _data["jobTitle"];
      this.username = _data["username"];
    }
  }

  static fromJS(data: any): PersonDTO {
    data = typeof data === "object" ? data : {};
    let result = new PersonDTO();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["id"] = this.id;
    data["salutation"] = this.salutation;
    data["title"] = this.title;
    data["email"] = this.email;
    data["phone"] = this.phone;
    data["firstName"] = this.firstName;
    data["lastName"] = this.lastName;
    data["jobTitle"] = this.jobTitle;
    data["username"] = this.username;
    return data;
  }

  clone(): PersonDTO {
    const json = this.toJSON();
    let result = new PersonDTO();
    result.init(json);
    return result;
  }
}

/** Describing an individual */
export interface IPersonDTO {
  /** Id for reference */
  id?: number | undefined;
  /** Salutation */
  salutation: string;
  /** Title */
  title: string;
  /** e-mail */
  email: string;
  /** Phone number */
  phone: string;
  /** Firstname */
  firstName?: string | undefined;
  /** Lastname */
  lastName?: string | undefined;
  /** Job title */
  jobTitle: string;
  /** Name imported user */
  username: string;
}

export class PersonSearchResultDTO
  extends SearchResultDTO
  implements IPersonSearchResultDTO
{
  readonly resultType?: string | undefined;
  readonly sortIndex?: string | undefined;
  /** Describing an individual */
  readonly data?: PersonDTO | undefined;

  constructor(data?: IPersonSearchResultDTO) {
    super(data);
    this._discriminator = "PersonSearchResultDTO";
  }

  override init(_data?: any) {
    super.init(_data);
    if (_data) {
      (<any>this).resultType = _data["resultType"];
      (<any>this).sortIndex = _data["sortIndex"];
      (<any>this).data = _data["data"]
        ? PersonDTO.fromJS(_data["data"])
        : <any>undefined;
    }
  }

  static override fromJS(data: any): PersonSearchResultDTO {
    data = typeof data === "object" ? data : {};
    let result = new PersonSearchResultDTO();
    result.init(data);
    return result;
  }

  override toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["resultType"] = this.resultType;
    data["sortIndex"] = this.sortIndex;
    data["data"] = this.data ? this.data.toJSON() : <any>undefined;
    super.toJSON(data);
    return data;
  }

  clone(): PersonSearchResultDTO {
    const json = this.toJSON();
    let result = new PersonSearchResultDTO();
    result.init(json);
    return result;
  }
}

export interface IPersonSearchResultDTO extends ISearchResultDTO {
  resultType?: string | undefined;
  sortIndex?: string | undefined;
  /** Describing an individual */
  data?: PersonDTO | undefined;
}

/** Describing an individual */
export class PersonUDTO implements IPersonUDTO {
  /** Id for reference */
  id?: number | undefined;
  /** Salutation */
  salutation!: string;
  /** Title */
  title!: string;
  /** e-mail */
  eMail!: string;
  /** Phone number */
  phone!: string;
  /** Firstname */
  firstName!: string;
  /** Lastname */
  lastName!: string;
  /** Job title */
  jobTitle!: string;
  /** Name imported user */
  username!: string;

  constructor(data?: IPersonUDTO) {
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
      this.salutation = _data["salutation"];
      this.title = _data["title"];
      this.eMail = _data["eMail"];
      this.phone = _data["phone"];
      this.firstName = _data["firstName"];
      this.lastName = _data["lastName"];
      this.jobTitle = _data["jobTitle"];
      this.username = _data["username"];
    }
  }

  static fromJS(data: any): PersonUDTO {
    data = typeof data === "object" ? data : {};
    let result = new PersonUDTO();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["id"] = this.id;
    data["salutation"] = this.salutation;
    data["title"] = this.title;
    data["eMail"] = this.eMail;
    data["phone"] = this.phone;
    data["firstName"] = this.firstName;
    data["lastName"] = this.lastName;
    data["jobTitle"] = this.jobTitle;
    data["username"] = this.username;
    return data;
  }

  clone(): PersonUDTO {
    const json = this.toJSON();
    let result = new PersonUDTO();
    result.init(json);
    return result;
  }
}

/** Describing an individual */
export interface IPersonUDTO {
  /** Id for reference */
  id?: number | undefined;
  /** Salutation */
  salutation: string;
  /** Title */
  title: string;
  /** e-mail */
  eMail: string;
  /** Phone number */
  phone: string;
  /** Firstname */
  firstName: string;
  /** Lastname */
  lastName: string;
  /** Job title */
  jobTitle: string;
  /** Name imported user */
  username: string;
}

/** Parameters for importing settings and certificates from QS-Monitor */
export class QsmImportParametersDTO implements IQsmImportParametersDTO {
  /** ShortIdent of tenant with good configuration in QS-Monitor for that location */
  qsmTenantShortIdent!: string;
  /** StandortID if location to import settings and certificates from QS-Monitor */
  standortId!: string;
  /** Import settings too along with certificates */
  includeSettings?: boolean | undefined;
  /** Prefix for the keys for saving the settings (eg. qsffx) */
  settingsPrefix!: string;

  constructor(data?: IQsmImportParametersDTO) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.qsmTenantShortIdent = _data["qsmTenantShortIdent"];
      this.standortId = _data["standortId"];
      this.includeSettings = _data["includeSettings"];
      this.settingsPrefix = _data["settingsPrefix"];
    }
  }

  static fromJS(data: any): QsmImportParametersDTO {
    data = typeof data === "object" ? data : {};
    let result = new QsmImportParametersDTO();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["qsmTenantShortIdent"] = this.qsmTenantShortIdent;
    data["standortId"] = this.standortId;
    data["includeSettings"] = this.includeSettings;
    data["settingsPrefix"] = this.settingsPrefix;
    return data;
  }

  clone(): QsmImportParametersDTO {
    const json = this.toJSON();
    let result = new QsmImportParametersDTO();
    result.init(json);
    return result;
  }
}

/** Parameters for importing settings and certificates from QS-Monitor */
export interface IQsmImportParametersDTO {
  /** ShortIdent of tenant with good configuration in QS-Monitor for that location */
  qsmTenantShortIdent: string;
  /** StandortID if location to import settings and certificates from QS-Monitor */
  standortId: string;
  /** Import settings too along with certificates */
  includeSettings?: boolean | undefined;
  /** Prefix for the keys for saving the settings (eg. qsffx) */
  settingsPrefix: string;
}

export class QsxDataWebFormat implements IQsxDataWebFormat {
  qsxJsonDocument?: string | undefined;
  qsxJsFunctions?: string | undefined;

  constructor(data?: IQsxDataWebFormat) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.qsxJsonDocument = _data["qsxJsonDocument"];
      this.qsxJsFunctions = _data["qsxJsFunctions"];
    }
  }

  static fromJS(data: any): QsxDataWebFormat {
    data = typeof data === "object" ? data : {};
    let result = new QsxDataWebFormat();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["qsxJsonDocument"] = this.qsxJsonDocument;
    data["qsxJsFunctions"] = this.qsxJsFunctions;
    return data;
  }

  clone(): QsxDataWebFormat {
    const json = this.toJSON();
    let result = new QsxDataWebFormat();
    result.init(json);
    return result;
  }
}

export interface IQsxDataWebFormat {
  qsxJsonDocument?: string | undefined;
  qsxJsFunctions?: string | undefined;
}

export class RepeatedPingResult implements IRepeatedPingResult {
  host?: string | undefined;
  address!: string;
  exceptionMessage!: string;
  maxMilliseconds?: number | undefined;
  sentPackets?: number | undefined;
  lostPackets?: number | undefined;
  readonly averageMilliseconds?: number | undefined;

  constructor(data?: IRepeatedPingResult) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.host = _data["host"];
      this.address = _data["address"];
      this.exceptionMessage = _data["exceptionMessage"];
      this.maxMilliseconds = _data["maxMilliseconds"];
      this.sentPackets = _data["sentPackets"];
      this.lostPackets = _data["lostPackets"];
      (<any>this).averageMilliseconds = _data["averageMilliseconds"];
    }
  }

  static fromJS(data: any): RepeatedPingResult {
    data = typeof data === "object" ? data : {};
    let result = new RepeatedPingResult();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["host"] = this.host;
    data["address"] = this.address;
    data["exceptionMessage"] = this.exceptionMessage;
    data["maxMilliseconds"] = this.maxMilliseconds;
    data["sentPackets"] = this.sentPackets;
    data["lostPackets"] = this.lostPackets;
    data["averageMilliseconds"] = this.averageMilliseconds;
    return data;
  }

  clone(): RepeatedPingResult {
    const json = this.toJSON();
    let result = new RepeatedPingResult();
    result.init(json);
    return result;
  }
}

export interface IRepeatedPingResult {
  host?: string | undefined;
  address: string;
  exceptionMessage: string;
  maxMilliseconds?: number | undefined;
  sentPackets?: number | undefined;
  lostPackets?: number | undefined;
  averageMilliseconds?: number | undefined;
}

export class RequestFileUploadParameterDTO
  implements IRequestFileUploadParameterDTO
{
  targetPersonId?: number | undefined;
  contactPersonId?: number | undefined;
  targetOpsKeyPointId?: number | undefined;
  message?: string | undefined;
  deadline?: Date | undefined;

  constructor(data?: IRequestFileUploadParameterDTO) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.targetPersonId = _data["targetPersonId"];
      this.contactPersonId = _data["contactPersonId"];
      this.targetOpsKeyPointId = _data["targetOpsKeyPointId"];
      this.message = _data["message"];
      this.deadline = _data["deadline"]
        ? new Date(_data["deadline"].toString())
        : <any>undefined;
    }
  }

  static fromJS(data: any): RequestFileUploadParameterDTO {
    data = typeof data === "object" ? data : {};
    let result = new RequestFileUploadParameterDTO();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["targetPersonId"] = this.targetPersonId;
    data["contactPersonId"] = this.contactPersonId;
    data["targetOpsKeyPointId"] = this.targetOpsKeyPointId;
    data["message"] = this.message;
    data["deadline"] = this.deadline
      ? this.deadline.toISOString()
      : <any>undefined;
    return data;
  }

  clone(): RequestFileUploadParameterDTO {
    const json = this.toJSON();
    let result = new RequestFileUploadParameterDTO();
    result.init(json);
    return result;
  }
}

export interface IRequestFileUploadParameterDTO {
  targetPersonId?: number | undefined;
  contactPersonId?: number | undefined;
  targetOpsKeyPointId?: number | undefined;
  message?: string | undefined;
  deadline?: Date | undefined;
}

export class SoftwareInfoDTO implements ISoftwareInfoDTO {
  readonly softwareName?: string | undefined;
  readonly softwareVersion?: string | undefined;
  readonly name?: string | undefined;
  readonly address?: string | undefined;
  readonly email?: string | undefined;
  readonly phone?: string | undefined;
  readonly copyrightYears?: string | undefined;

  constructor(data?: ISoftwareInfoDTO) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      (<any>this).softwareName = _data["softwareName"];
      (<any>this).softwareVersion = _data["softwareVersion"];
      (<any>this).name = _data["name"];
      (<any>this).address = _data["address"];
      (<any>this).email = _data["email"];
      (<any>this).phone = _data["phone"];
      (<any>this).copyrightYears = _data["copyrightYears"];
    }
  }

  static fromJS(data: any): SoftwareInfoDTO {
    data = typeof data === "object" ? data : {};
    let result = new SoftwareInfoDTO();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["softwareName"] = this.softwareName;
    data["softwareVersion"] = this.softwareVersion;
    data["name"] = this.name;
    data["address"] = this.address;
    data["email"] = this.email;
    data["phone"] = this.phone;
    data["copyrightYears"] = this.copyrightYears;
    return data;
  }

  clone(): SoftwareInfoDTO {
    const json = this.toJSON();
    let result = new SoftwareInfoDTO();
    result.init(json);
    return result;
  }
}

export interface ISoftwareInfoDTO {
  softwareName?: string | undefined;
  softwareVersion?: string | undefined;
  name?: string | undefined;
  address?: string | undefined;
  email?: string | undefined;
  phone?: string | undefined;
  copyrightYears?: string | undefined;
}

export class SqlSystemInfo implements ISqlSystemInfo {
  productVersion!: string;
  edition!: string;
  servicePack!: string;
  machineName!: string;
  instanceName!: string;
  versionName!: string;
  defaultCollation!: string;
  authentication!: string;
  machineInfo?: MachineSystemInfo | undefined;

  constructor(data?: ISqlSystemInfo) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.productVersion = _data["productVersion"];
      this.edition = _data["edition"];
      this.servicePack = _data["servicePack"];
      this.machineName = _data["machineName"];
      this.instanceName = _data["instanceName"];
      this.versionName = _data["versionName"];
      this.defaultCollation = _data["defaultCollation"];
      this.authentication = _data["authentication"];
      this.machineInfo = _data["machineInfo"]
        ? MachineSystemInfo.fromJS(_data["machineInfo"])
        : <any>undefined;
    }
  }

  static fromJS(data: any): SqlSystemInfo {
    data = typeof data === "object" ? data : {};
    let result = new SqlSystemInfo();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["productVersion"] = this.productVersion;
    data["edition"] = this.edition;
    data["servicePack"] = this.servicePack;
    data["machineName"] = this.machineName;
    data["instanceName"] = this.instanceName;
    data["versionName"] = this.versionName;
    data["defaultCollation"] = this.defaultCollation;
    data["authentication"] = this.authentication;
    data["machineInfo"] = this.machineInfo
      ? this.machineInfo.toJSON()
      : <any>undefined;
    return data;
  }

  clone(): SqlSystemInfo {
    const json = this.toJSON();
    let result = new SqlSystemInfo();
    result.init(json);
    return result;
  }
}

export interface ISqlSystemInfo {
  productVersion: string;
  edition: string;
  servicePack: string;
  machineName: string;
  instanceName: string;
  versionName: string;
  defaultCollation: string;
  authentication: string;
  machineInfo?: MachineSystemInfo | undefined;
}

/** Station */
export class StationDTO implements IStationDTO {
  /** Id for reference */
  id?: number | undefined;
  /** Name of the station */
  name?: string | undefined;
  /** Supervising Location */
  location?: LocationDTO | undefined;

  constructor(data?: IStationDTO) {
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
      this.location = _data["location"]
        ? LocationDTO.fromJS(_data["location"])
        : <any>undefined;
    }
  }

  static fromJS(data: any): StationDTO {
    data = typeof data === "object" ? data : {};
    let result = new StationDTO();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["id"] = this.id;
    data["name"] = this.name;
    data["location"] = this.location ? this.location.toJSON() : <any>undefined;
    return data;
  }

  clone(): StationDTO {
    const json = this.toJSON();
    let result = new StationDTO();
    result.init(json);
    return result;
  }
}

/** Station */
export interface IStationDTO {
  /** Id for reference */
  id?: number | undefined;
  /** Name of the station */
  name?: string | undefined;
  /** Supervising Location */
  location?: LocationDTO | undefined;
}

export class StationSearchResultDTO
  extends SearchResultDTO
  implements IStationSearchResultDTO
{
  readonly resultType?: string | undefined;
  readonly sortIndex?: string | undefined;
  /** Station */
  readonly data?: StationDTO | undefined;

  constructor(data?: IStationSearchResultDTO) {
    super(data);
    this._discriminator = "StationSearchResultDTO";
  }

  override init(_data?: any) {
    super.init(_data);
    if (_data) {
      (<any>this).resultType = _data["resultType"];
      (<any>this).sortIndex = _data["sortIndex"];
      (<any>this).data = _data["data"]
        ? StationDTO.fromJS(_data["data"])
        : <any>undefined;
    }
  }

  static override fromJS(data: any): StationSearchResultDTO {
    data = typeof data === "object" ? data : {};
    let result = new StationSearchResultDTO();
    result.init(data);
    return result;
  }

  override toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["resultType"] = this.resultType;
    data["sortIndex"] = this.sortIndex;
    data["data"] = this.data ? this.data.toJSON() : <any>undefined;
    super.toJSON(data);
    return data;
  }

  clone(): StationSearchResultDTO {
    const json = this.toJSON();
    let result = new StationSearchResultDTO();
    result.init(json);
    return result;
  }
}

export interface IStationSearchResultDTO extends ISearchResultDTO {
  resultType?: string | undefined;
  sortIndex?: string | undefined;
  /** Station */
  data?: StationDTO | undefined;
}

export class StationUDTO implements IStationUDTO {
  /** Id for reference */
  id?: number | undefined;
  /** Name of the station */
  name?: string | undefined;

  constructor(data?: IStationUDTO) {
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

  static fromJS(data: any): StationUDTO {
    data = typeof data === "object" ? data : {};
    let result = new StationUDTO();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["id"] = this.id;
    data["name"] = this.name;
    return data;
  }

  clone(): StationUDTO {
    const json = this.toJSON();
    let result = new StationUDTO();
    result.init(json);
    return result;
  }
}

export interface IStationUDTO {
  /** Id for reference */
  id?: number | undefined;
  /** Name of the station */
  name?: string | undefined;
}

/** Context information for querying Settings */
export class StorageScopeQueryDTO implements IStorageScopeQueryDTO {
  /** Name of setting key */
  key?: string | undefined;
  /** Name of storage scope to query */
  scopeName!: string;
  /** Optional parameter for the storage scope */
  scopeParam!: string;

  constructor(data?: IStorageScopeQueryDTO) {
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
      this.scopeName = _data["scopeName"];
      this.scopeParam = _data["scopeParam"];
    }
  }

  static fromJS(data: any): StorageScopeQueryDTO {
    data = typeof data === "object" ? data : {};
    let result = new StorageScopeQueryDTO();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["key"] = this.key;
    data["scopeName"] = this.scopeName;
    data["scopeParam"] = this.scopeParam;
    return data;
  }

  clone(): StorageScopeQueryDTO {
    const json = this.toJSON();
    let result = new StorageScopeQueryDTO();
    result.init(json);
    return result;
  }
}

/** Context information for querying Settings */
export interface IStorageScopeQueryDTO {
  /** Name of setting key */
  key?: string | undefined;
  /** Name of storage scope to query */
  scopeName: string;
  /** Optional parameter for the storage scope */
  scopeParam: string;
}

/** Context information for storing a setting */
export class StorageScopeStoreDTO implements IStorageScopeStoreDTO {
  /** Name of setting key */
  key?: string | undefined;
  /** Name of storage scope to query */
  scopeName?: string | undefined;
  /** Optional parameter for the storage scope */
  scopeParam?: string | undefined;
  /** Value to store for setting */
  value!: any;

  constructor(data?: IStorageScopeStoreDTO) {
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
      this.scopeName = _data["scopeName"];
      this.scopeParam = _data["scopeParam"];
      this.value = _data["value"];
    }
  }

  static fromJS(data: any): StorageScopeStoreDTO {
    data = typeof data === "object" ? data : {};
    let result = new StorageScopeStoreDTO();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["key"] = this.key;
    data["scopeName"] = this.scopeName;
    data["scopeParam"] = this.scopeParam;
    data["value"] = this.value;
    return data;
  }

  clone(): StorageScopeStoreDTO {
    const json = this.toJSON();
    let result = new StorageScopeStoreDTO();
    result.init(json);
    return result;
  }
}

/** Context information for storing a setting */
export interface IStorageScopeStoreDTO {
  /** Name of setting key */
  key?: string | undefined;
  /** Name of storage scope to query */
  scopeName?: string | undefined;
  /** Optional parameter for the storage scope */
  scopeParam?: string | undefined;
  /** Value to store for setting */
  value: any;
}

/** An item for the process of requesting an OPS */
export class StropsItemDTO implements IStropsItemDTO {
  /** Id for reference */
  id?: number | undefined;
  /** Ops */
  ops?: OpsDTO | undefined;
  /** Describing an individual */
  responsible!: PersonDTO;
  /** Current state of the request */
  state?: EStropsItemState | undefined;
  /** Result of the request */
  result?: EStropsItemResult | undefined;
  /** Type of request */
  requestType?: EStropsItemRequestType | undefined;
  /** Type of audit */
  auditType?: EStropsItemAuditType | undefined;
  /** Scheduled deadline to finish the request */
  internalDeadline!: Date;
  /** Deadline to request the ops */
  requestDeadline!: Date;
  /** The date the claims will be verified */
  visitDate!: Date;
  /** Ops is valid till */
  validationDeadline!: Date;
  /** Stations asigned to the Certificate */
  stations!: StationDTO[];
  /** Units asigned to the Certificate */
  logicalUnits!: LogicalUnitDTO[];
  /** Start Date of which the StropsItem no longer has an effect */
  breakFrom!: Date;
  /** End Date of which the StropsItem no longer has an effect */
  breakUntil!: Date;

  constructor(data?: IStropsItemDTO) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
    if (!data) {
      this.responsible = new PersonDTO();
      this.stations = [];
      this.logicalUnits = [];
    }
  }

  init(_data?: any) {
    if (_data) {
      this.id = _data["id"];
      this.ops = _data["ops"] ? OpsDTO.fromJS(_data["ops"]) : <any>undefined;
      this.responsible = _data["responsible"]
        ? PersonDTO.fromJS(_data["responsible"])
        : new PersonDTO();
      this.state = _data["state"];
      this.result = _data["result"];
      this.requestType = _data["requestType"];
      this.auditType = _data["auditType"];
      this.internalDeadline = _data["internalDeadline"]
        ? new Date(_data["internalDeadline"].toString())
        : <any>undefined;
      this.requestDeadline = _data["requestDeadline"]
        ? new Date(_data["requestDeadline"].toString())
        : <any>undefined;
      this.visitDate = _data["visitDate"]
        ? new Date(_data["visitDate"].toString())
        : <any>undefined;
      this.validationDeadline = _data["validationDeadline"]
        ? new Date(_data["validationDeadline"].toString())
        : <any>undefined;
      if (Array.isArray(_data["stations"])) {
        this.stations = [] as any;
        for (let item of _data["stations"])
          this.stations!.push(StationDTO.fromJS(item));
      }
      if (Array.isArray(_data["logicalUnits"])) {
        this.logicalUnits = [] as any;
        for (let item of _data["logicalUnits"])
          this.logicalUnits!.push(LogicalUnitDTO.fromJS(item));
      }
      this.breakFrom = _data["breakFrom"]
        ? new Date(_data["breakFrom"].toString())
        : <any>undefined;
      this.breakUntil = _data["breakUntil"]
        ? new Date(_data["breakUntil"].toString())
        : <any>undefined;
    }
  }

  static fromJS(data: any): StropsItemDTO {
    data = typeof data === "object" ? data : {};
    let result = new StropsItemDTO();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["id"] = this.id;
    data["ops"] = this.ops ? this.ops.toJSON() : <any>undefined;
    data["responsible"] = this.responsible
      ? this.responsible.toJSON()
      : <any>undefined;
    data["state"] = this.state;
    data["result"] = this.result;
    data["requestType"] = this.requestType;
    data["auditType"] = this.auditType;
    data["internalDeadline"] = this.internalDeadline
      ? this.internalDeadline.toISOString()
      : <any>undefined;
    data["requestDeadline"] = this.requestDeadline
      ? this.requestDeadline.toISOString()
      : <any>undefined;
    data["visitDate"] = this.visitDate
      ? this.visitDate.toISOString()
      : <any>undefined;
    data["validationDeadline"] = this.validationDeadline
      ? this.validationDeadline.toISOString()
      : <any>undefined;
    if (Array.isArray(this.stations)) {
      data["stations"] = [];
      for (let item of this.stations) data["stations"].push(item.toJSON());
    }
    if (Array.isArray(this.logicalUnits)) {
      data["logicalUnits"] = [];
      for (let item of this.logicalUnits)
        data["logicalUnits"].push(item.toJSON());
    }
    data["breakFrom"] = this.breakFrom
      ? this.breakFrom.toISOString()
      : <any>undefined;
    data["breakUntil"] = this.breakUntil
      ? this.breakUntil.toISOString()
      : <any>undefined;
    return data;
  }

  clone(): StropsItemDTO {
    const json = this.toJSON();
    let result = new StropsItemDTO();
    result.init(json);
    return result;
  }
}

/** An item for the process of requesting an OPS */
export interface IStropsItemDTO {
  /** Id for reference */
  id?: number | undefined;
  /** Ops */
  ops?: OpsDTO | undefined;
  /** Describing an individual */
  responsible: PersonDTO;
  /** Current state of the request */
  state?: EStropsItemState | undefined;
  /** Result of the request */
  result?: EStropsItemResult | undefined;
  /** Type of request */
  requestType?: EStropsItemRequestType | undefined;
  /** Type of audit */
  auditType?: EStropsItemAuditType | undefined;
  /** Scheduled deadline to finish the request */
  internalDeadline: Date;
  /** Deadline to request the ops */
  requestDeadline: Date;
  /** The date the claims will be verified */
  visitDate: Date;
  /** Ops is valid till */
  validationDeadline: Date;
  /** Stations asigned to the Certificate */
  stations: StationDTO[];
  /** Units asigned to the Certificate */
  logicalUnits: LogicalUnitDTO[];
  /** Start Date of which the StropsItem no longer has an effect */
  breakFrom: Date;
  /** End Date of which the StropsItem no longer has an effect */
  breakUntil: Date;
}

export class StropsItemUDTO implements IStropsItemUDTO {
  id?: number | undefined;
  responsibleId!: Int32NullableParameterWrapper;
  state!: EStropsItemState;
  result!: EStropsItemResult;
  internDeadline!: DateTimeNullableParameterWrapper;
  requestDeadline!: DateTimeNullableParameterWrapper;
  requestType!: EStropsItemRequestType;
  auditType!: EStropsItemAuditType;
  visitDate!: DateTimeNullableParameterWrapper;
  validationDeadline!: DateTimeNullableParameterWrapper;
  breakFrom!: DateTimeNullableParameterWrapper;
  breakUntil!: DateTimeNullableParameterWrapper;
  stationIdList!: number[];
  logicalIdList!: number[];

  constructor(data?: IStropsItemUDTO) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
    if (!data) {
      this.responsibleId = new Int32NullableParameterWrapper();
      this.internDeadline = new DateTimeNullableParameterWrapper();
      this.requestDeadline = new DateTimeNullableParameterWrapper();
      this.visitDate = new DateTimeNullableParameterWrapper();
      this.validationDeadline = new DateTimeNullableParameterWrapper();
      this.breakFrom = new DateTimeNullableParameterWrapper();
      this.breakUntil = new DateTimeNullableParameterWrapper();
      this.stationIdList = [];
      this.logicalIdList = [];
    }
  }

  init(_data?: any) {
    if (_data) {
      this.id = _data["id"];
      this.responsibleId = _data["responsibleId"]
        ? Int32NullableParameterWrapper.fromJS(_data["responsibleId"])
        : new Int32NullableParameterWrapper();
      this.state = _data["state"];
      this.result = _data["result"];
      this.internDeadline = _data["internDeadline"]
        ? DateTimeNullableParameterWrapper.fromJS(_data["internDeadline"])
        : new DateTimeNullableParameterWrapper();
      this.requestDeadline = _data["requestDeadline"]
        ? DateTimeNullableParameterWrapper.fromJS(_data["requestDeadline"])
        : new DateTimeNullableParameterWrapper();
      this.requestType = _data["requestType"];
      this.auditType = _data["auditType"];
      this.visitDate = _data["visitDate"]
        ? DateTimeNullableParameterWrapper.fromJS(_data["visitDate"])
        : new DateTimeNullableParameterWrapper();
      this.validationDeadline = _data["validationDeadline"]
        ? DateTimeNullableParameterWrapper.fromJS(_data["validationDeadline"])
        : new DateTimeNullableParameterWrapper();
      this.breakFrom = _data["breakFrom"]
        ? DateTimeNullableParameterWrapper.fromJS(_data["breakFrom"])
        : new DateTimeNullableParameterWrapper();
      this.breakUntil = _data["breakUntil"]
        ? DateTimeNullableParameterWrapper.fromJS(_data["breakUntil"])
        : new DateTimeNullableParameterWrapper();
      if (Array.isArray(_data["stationIdList"])) {
        this.stationIdList = [] as any;
        for (let item of _data["stationIdList"]) this.stationIdList!.push(item);
      }
      if (Array.isArray(_data["logicalIdList"])) {
        this.logicalIdList = [] as any;
        for (let item of _data["logicalIdList"]) this.logicalIdList!.push(item);
      }
    }
  }

  static fromJS(data: any): StropsItemUDTO {
    data = typeof data === "object" ? data : {};
    let result = new StropsItemUDTO();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["id"] = this.id;
    data["responsibleId"] = this.responsibleId
      ? this.responsibleId.toJSON()
      : <any>undefined;
    data["state"] = this.state;
    data["result"] = this.result;
    data["internDeadline"] = this.internDeadline
      ? this.internDeadline.toJSON()
      : <any>undefined;
    data["requestDeadline"] = this.requestDeadline
      ? this.requestDeadline.toJSON()
      : <any>undefined;
    data["requestType"] = this.requestType;
    data["auditType"] = this.auditType;
    data["visitDate"] = this.visitDate
      ? this.visitDate.toJSON()
      : <any>undefined;
    data["validationDeadline"] = this.validationDeadline
      ? this.validationDeadline.toJSON()
      : <any>undefined;
    data["breakFrom"] = this.breakFrom
      ? this.breakFrom.toJSON()
      : <any>undefined;
    data["breakUntil"] = this.breakUntil
      ? this.breakUntil.toJSON()
      : <any>undefined;
    if (Array.isArray(this.stationIdList)) {
      data["stationIdList"] = [];
      for (let item of this.stationIdList) data["stationIdList"].push(item);
    }
    if (Array.isArray(this.logicalIdList)) {
      data["logicalIdList"] = [];
      for (let item of this.logicalIdList) data["logicalIdList"].push(item);
    }
    return data;
  }

  clone(): StropsItemUDTO {
    const json = this.toJSON();
    let result = new StropsItemUDTO();
    result.init(json);
    return result;
  }
}

export interface IStropsItemUDTO {
  id?: number | undefined;
  responsibleId: Int32NullableParameterWrapper;
  state: EStropsItemState;
  result: EStropsItemResult;
  internDeadline: DateTimeNullableParameterWrapper;
  requestDeadline: DateTimeNullableParameterWrapper;
  requestType: EStropsItemRequestType;
  auditType: EStropsItemAuditType;
  visitDate: DateTimeNullableParameterWrapper;
  validationDeadline: DateTimeNullableParameterWrapper;
  breakFrom: DateTimeNullableParameterWrapper;
  breakUntil: DateTimeNullableParameterWrapper;
  stationIdList: number[];
  logicalIdList: number[];
}

/** Information about an generic Task */
export class TaskDTO implements ITaskDTO {
  /** Id for reference */
  id?: number | undefined;
  /** User to receive the task */
  target?: PersonDTO | undefined;
  /** Contact for questions */
  contact?: PersonDTO | undefined;
  /** Creator of the task */
  creator?: PersonDTO | undefined;
  /** Date of creation including time */
  creationTime?: Date | undefined;
  /** Deadline for the task. Time will be 00:00 */
  deadline?: Date | undefined;
  /** Readable description */
  description?: string | undefined;
  /** Module the Task is bound to */
  module?: string | undefined;
  /** State of the Task */
  state?: ETaskState | undefined;

  protected _discriminator: string;

  constructor(data?: ITaskDTO) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
    this._discriminator = "TaskDTO";
  }

  init(_data?: any) {
    if (_data) {
      this.id = _data["id"];
      this.target = _data["target"]
        ? PersonDTO.fromJS(_data["target"])
        : <any>undefined;
      this.contact = _data["contact"]
        ? PersonDTO.fromJS(_data["contact"])
        : <any>undefined;
      this.creator = _data["creator"]
        ? PersonDTO.fromJS(_data["creator"])
        : <any>undefined;
      this.creationTime = _data["creationTime"]
        ? new Date(_data["creationTime"].toString())
        : <any>undefined;
      this.deadline = _data["deadline"]
        ? new Date(_data["deadline"].toString())
        : <any>undefined;
      this.description = _data["description"];
      this.module = _data["module"];
      this.state = _data["state"];
    }
  }

  static fromJS(data: any): TaskDTO {
    data = typeof data === "object" ? data : {};
    let result = new TaskDTO();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["taskType"] = this._discriminator;
    data["id"] = this.id;
    data["target"] = this.target ? this.target.toJSON() : <any>undefined;
    data["contact"] = this.contact ? this.contact.toJSON() : <any>undefined;
    data["creator"] = this.creator ? this.creator.toJSON() : <any>undefined;
    data["creationTime"] = this.creationTime
      ? this.creationTime.toISOString()
      : <any>undefined;
    data["deadline"] = this.deadline
      ? this.deadline.toISOString()
      : <any>undefined;
    data["description"] = this.description;
    data["module"] = this.module;
    data["state"] = this.state;
    return data;
  }

  clone(): TaskDTO {
    const json = this.toJSON();
    let result = new TaskDTO();
    result.init(json);
    return result;
  }
}

/** Information about an generic Task */
export interface ITaskDTO {
  /** Id for reference */
  id?: number | undefined;
  /** User to receive the task */
  target?: PersonDTO | undefined;
  /** Contact for questions */
  contact?: PersonDTO | undefined;
  /** Creator of the task */
  creator?: PersonDTO | undefined;
  /** Date of creation including time */
  creationTime?: Date | undefined;
  /** Deadline for the task. Time will be 00:00 */
  deadline?: Date | undefined;
  /** Readable description */
  description?: string | undefined;
  /** Module the Task is bound to */
  module?: string | undefined;
  /** State of the Task */
  state?: ETaskState | undefined;
}

export class UnitSearchResultDTO
  extends SearchResultDTO
  implements IUnitSearchResultDTO
{
  readonly resultType?: string | undefined;
  readonly sortIndex?: string | undefined;
  /** Logical Unit */
  readonly data?: LogicalUnitDTO | undefined;

  constructor(data?: IUnitSearchResultDTO) {
    super(data);
    this._discriminator = "UnitSearchResultDTO";
  }

  override init(_data?: any) {
    super.init(_data);
    if (_data) {
      (<any>this).resultType = _data["resultType"];
      (<any>this).sortIndex = _data["sortIndex"];
      (<any>this).data = _data["data"]
        ? LogicalUnitDTO.fromJS(_data["data"])
        : <any>undefined;
    }
  }

  static override fromJS(data: any): UnitSearchResultDTO {
    data = typeof data === "object" ? data : {};
    let result = new UnitSearchResultDTO();
    result.init(data);
    return result;
  }

  override toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["resultType"] = this.resultType;
    data["sortIndex"] = this.sortIndex;
    data["data"] = this.data ? this.data.toJSON() : <any>undefined;
    super.toJSON(data);
    return data;
  }

  clone(): UnitSearchResultDTO {
    const json = this.toJSON();
    let result = new UnitSearchResultDTO();
    result.init(json);
    return result;
  }
}

export interface IUnitSearchResultDTO extends ISearchResultDTO {
  resultType?: string | undefined;
  sortIndex?: string | undefined;
  /** Logical Unit */
  data?: LogicalUnitDTO | undefined;
}

export class UploadLinkDTO implements IUploadLinkDTO {
  accessCode?: string | undefined;

  constructor(data?: IUploadLinkDTO) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.accessCode = _data["accessCode"];
    }
  }

  static fromJS(data: any): UploadLinkDTO {
    data = typeof data === "object" ? data : {};
    let result = new UploadLinkDTO();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["accessCode"] = this.accessCode;
    return data;
  }

  clone(): UploadLinkDTO {
    const json = this.toJSON();
    let result = new UploadLinkDTO();
    result.init(json);
    return result;
  }
}

export interface IUploadLinkDTO {
  accessCode?: string | undefined;
}

/** Data for an OTU */
export class UploadLinkDatasetDTO implements IUploadLinkDatasetDTO {
  /** OTU Code */
  accessCode?: string | undefined;
  /** Title of the document */
  title?: string | undefined;
  /** Message to display */
  message?: string | undefined;

  constructor(data?: IUploadLinkDatasetDTO) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.accessCode = _data["accessCode"];
      this.title = _data["title"];
      this.message = _data["message"];
    }
  }

  static fromJS(data: any): UploadLinkDatasetDTO {
    data = typeof data === "object" ? data : {};
    let result = new UploadLinkDatasetDTO();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["accessCode"] = this.accessCode;
    data["title"] = this.title;
    data["message"] = this.message;
    return data;
  }

  clone(): UploadLinkDatasetDTO {
    const json = this.toJSON();
    let result = new UploadLinkDatasetDTO();
    result.init(json);
    return result;
  }
}

/** Data for an OTU */
export interface IUploadLinkDatasetDTO {
  /** OTU Code */
  accessCode?: string | undefined;
  /** Title of the document */
  title?: string | undefined;
  /** Message to display */
  message?: string | undefined;
}

/** Infos about the User */
export class UserInfoDTO implements IUserInfoDTO {
  /** Username used for login */
  readonly username?: string | undefined;
  /** Fullname */
  readonly name?: string | undefined;
  /** EMail address */
  readonly email?: string | undefined;
  /** Academic title */
  readonly title?: string | undefined;
  /** Salutaion */
  readonly salutaion?: string | undefined;
  /** Phonenumber */
  readonly phone?: string | undefined;
  /** List of UserRightIds */
  readonly userRightList?: UserRightInfo[] | undefined;

  constructor(data?: IUserInfoDTO) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      (<any>this).username = _data["username"];
      (<any>this).name = _data["name"];
      (<any>this).email = _data["email"];
      (<any>this).title = _data["title"];
      (<any>this).salutaion = _data["salutaion"];
      (<any>this).phone = _data["phone"];
      if (Array.isArray(_data["userRightList"])) {
        (<any>this).userRightList = [] as any;
        for (let item of _data["userRightList"])
          (<any>this).userRightList!.push(UserRightInfo.fromJS(item));
      }
    }
  }

  static fromJS(data: any): UserInfoDTO {
    data = typeof data === "object" ? data : {};
    let result = new UserInfoDTO();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["username"] = this.username;
    data["name"] = this.name;
    data["email"] = this.email;
    data["title"] = this.title;
    data["salutaion"] = this.salutaion;
    data["phone"] = this.phone;
    if (Array.isArray(this.userRightList)) {
      data["userRightList"] = [];
      for (let item of this.userRightList)
        data["userRightList"].push(item.toJSON());
    }
    return data;
  }

  clone(): UserInfoDTO {
    const json = this.toJSON();
    let result = new UserInfoDTO();
    result.init(json);
    return result;
  }
}

/** Infos about the User */
export interface IUserInfoDTO {
  /** Username used for login */
  username?: string | undefined;
  /** Fullname */
  name?: string | undefined;
  /** EMail address */
  email?: string | undefined;
  /** Academic title */
  title?: string | undefined;
  /** Salutaion */
  salutaion?: string | undefined;
  /** Phonenumber */
  phone?: string | undefined;
  /** List of UserRightIds */
  userRightList?: UserRightInfo[] | undefined;
}

export class UserRightInfo implements IUserRightInfo {
  id?: string | undefined;
  value?: number | undefined;

  constructor(data?: IUserRightInfo) {
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
      this.value = _data["value"];
    }
  }

  static fromJS(data: any): UserRightInfo {
    data = typeof data === "object" ? data : {};
    let result = new UserRightInfo();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["id"] = this.id;
    data["value"] = this.value;
    return data;
  }

  clone(): UserRightInfo {
    const json = this.toJSON();
    let result = new UserRightInfo();
    result.init(json);
    return result;
  }
}

export interface IUserRightInfo {
  id?: string | undefined;
  value?: number | undefined;
}

/** user rights ids */
export class UserRightsDTO implements IUserRightsDTO {
  /** rightIds */
  rightIds?: string[] | undefined;

  constructor(data?: IUserRightsDTO) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      if (Array.isArray(_data["rightIds"])) {
        this.rightIds = [] as any;
        for (let item of _data["rightIds"]) this.rightIds!.push(item);
      }
    }
  }

  static fromJS(data: any): UserRightsDTO {
    data = typeof data === "object" ? data : {};
    let result = new UserRightsDTO();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    if (Array.isArray(this.rightIds)) {
      data["rightIds"] = [];
      for (let item of this.rightIds) data["rightIds"].push(item);
    }
    return data;
  }

  clone(): UserRightsDTO {
    const json = this.toJSON();
    let result = new UserRightsDTO();
    result.init(json);
    return result;
  }
}

/** user rights ids */
export interface IUserRightsDTO {
  /** rightIds */
  rightIds?: string[] | undefined;
}

/** User settings */
export class UserSettingsDTO implements IUserSettingsDTO {
  /** Key */
  key?: string | undefined;
  /** Value */
  value?: string | undefined;

  constructor(data?: IUserSettingsDTO) {
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
      this.value = _data["value"];
    }
  }

  static fromJS(data: any): UserSettingsDTO {
    data = typeof data === "object" ? data : {};
    let result = new UserSettingsDTO();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["key"] = this.key;
    data["value"] = this.value;
    return data;
  }

  clone(): UserSettingsDTO {
    const json = this.toJSON();
    let result = new UserSettingsDTO();
    result.init(json);
    return result;
  }
}

/** User settings */
export interface IUserSettingsDTO {
  /** Key */
  key?: string | undefined;
  /** Value */
  value?: string | undefined;
}

export class VorgangDTO implements IVorgangDTO {
  id?: number | undefined;
  vorgangName?: string | undefined;
  metaModule?: number | undefined;
  year?: number | undefined;

  constructor(data?: IVorgangDTO) {
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
      this.vorgangName = _data["vorgangName"];
      this.metaModule = _data["metaModule"];
      this.year = _data["year"];
    }
  }

  static fromJS(data: any): VorgangDTO {
    data = typeof data === "object" ? data : {};
    let result = new VorgangDTO();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["id"] = this.id;
    data["vorgangName"] = this.vorgangName;
    data["metaModule"] = this.metaModule;
    data["year"] = this.year;
    return data;
  }

  clone(): VorgangDTO {
    const json = this.toJSON();
    let result = new VorgangDTO();
    result.init(json);
    return result;
  }
}

export interface IVorgangDTO {
  id?: number | undefined;
  vorgangName?: string | undefined;
  metaModule?: number | undefined;
  year?: number | undefined;
}

export class VorgangSaveStatusDTO implements IVorgangSaveStatusDTO {
  name?: string | undefined;
  value?: string | undefined;
  setting?: string | undefined;

  constructor(data?: IVorgangSaveStatusDTO) {
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
      this.setting = _data["setting"];
    }
  }

  static fromJS(data: any): VorgangSaveStatusDTO {
    data = typeof data === "object" ? data : {};
    let result = new VorgangSaveStatusDTO();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["name"] = this.name;
    data["value"] = this.value;
    data["setting"] = this.setting;
    return data;
  }

  clone(): VorgangSaveStatusDTO {
    const json = this.toJSON();
    let result = new VorgangSaveStatusDTO();
    result.init(json);
    return result;
  }
}

export interface IVorgangSaveStatusDTO {
  name?: string | undefined;
  value?: string | undefined;
  setting?: string | undefined;
}

export class VorgangSaveStatusDTOResult implements IVorgangSaveStatusDTOResult {
  canUpdateWithoutAsking?: boolean | undefined;
  fieldsWereModified?: boolean | undefined;

  constructor(data?: IVorgangSaveStatusDTOResult) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.canUpdateWithoutAsking = _data["canUpdateWithoutAsking"];
      this.fieldsWereModified = _data["fieldsWereModified"];
    }
  }

  static fromJS(data: any): VorgangSaveStatusDTOResult {
    data = typeof data === "object" ? data : {};
    let result = new VorgangSaveStatusDTOResult();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["canUpdateWithoutAsking"] = this.canUpdateWithoutAsking;
    data["fieldsWereModified"] = this.fieldsWereModified;
    return data;
  }

  clone(): VorgangSaveStatusDTOResult {
    const json = this.toJSON();
    let result = new VorgangSaveStatusDTOResult();
    result.init(json);
    return result;
  }
}

export interface IVorgangSaveStatusDTOResult {
  canUpdateWithoutAsking?: boolean | undefined;
  fieldsWereModified?: boolean | undefined;
}

export class YeaorFolderNotFoundException
  implements IYeaorFolderNotFoundException
{
  readonly typeDef?: string | undefined;

  constructor(data?: IYeaorFolderNotFoundException) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      (<any>this).typeDef = _data["typeDef"];
    }
  }

  static fromJS(data: any): YeaorFolderNotFoundException {
    data = typeof data === "object" ? data : {};
    let result = new YeaorFolderNotFoundException();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["typeDef"] = this.typeDef;
    return data;
  }

  clone(): YeaorFolderNotFoundException {
    const json = this.toJSON();
    let result = new YeaorFolderNotFoundException();
    result.init(json);
    return result;
  }
}

export interface IYeaorFolderNotFoundException {
  typeDef?: string | undefined;
}

export interface FileParameter {
  data: any;
  fileName: string;
}

export interface FileResponse {
  data: Blob;
  status: number;
  fileName?: string;
  headers?: { [name: string]: any };
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
