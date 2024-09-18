import {
  HttpClient,
  HttpContext,
  HttpHeaders
} from "./chunk-ZWPDDIM2.js";
import "./chunk-V4LNXL5F.js";
import {
  Inject,
  Injectable,
  InjectionToken,
  NgModule,
  Optional,
  SkipSelf,
  setClassMetadata,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵinject
} from "./chunk-3V2WW6I2.js";

// node_modules/luminis-recipe-api/fesm2022/luminis-recipe-api.mjs
var CustomHttpParameterCodec = class {
  encodeKey(k) {
    return encodeURIComponent(k);
  }
  encodeValue(v) {
    return encodeURIComponent(v);
  }
  decodeKey(k) {
    return decodeURIComponent(k);
  }
  decodeValue(v) {
    return decodeURIComponent(v);
  }
};
var BASE_PATH = new InjectionToken("basePath");
var COLLECTION_FORMATS = {
  "csv": ",",
  "tsv": "   ",
  "ssv": " ",
  "pipes": "|"
};
var Configuration = class {
  /**
   *  @deprecated Since 5.0. Use credentials instead
   */
  apiKeys;
  username;
  password;
  /**
   *  @deprecated Since 5.0. Use credentials instead
   */
  accessToken;
  basePath;
  withCredentials;
  /**
   * Takes care of encoding query- and form-parameters.
   */
  encoder;
  /**
   * Encoding of various path parameter
   * <a href="https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#style-values">styles</a>.
   * <p>
   * See {@link README.md} for more details
   * </p>
   */
  encodeParam;
  /**
   * The keys are the names in the securitySchemes section of the OpenAPI
   * document. They should map to the value used for authentication
   * minus any standard prefixes such as 'Basic' or 'Bearer'.
   */
  credentials;
  constructor(configurationParameters = {}) {
    this.apiKeys = configurationParameters.apiKeys;
    this.username = configurationParameters.username;
    this.password = configurationParameters.password;
    this.accessToken = configurationParameters.accessToken;
    this.basePath = configurationParameters.basePath;
    this.withCredentials = configurationParameters.withCredentials;
    this.encoder = configurationParameters.encoder;
    if (configurationParameters.encodeParam) {
      this.encodeParam = configurationParameters.encodeParam;
    } else {
      this.encodeParam = (param) => this.defaultEncodeParam(param);
    }
    if (configurationParameters.credentials) {
      this.credentials = configurationParameters.credentials;
    } else {
      this.credentials = {};
    }
  }
  /**
   * Select the correct content-type to use for a request.
   * Uses {@link Configuration#isJsonMime} to determine the correct content-type.
   * If no content type is found return the first found type if the contentTypes is not empty
   * @param contentTypes - the array of content types that are available for selection
   * @returns the selected content-type or <code>undefined</code> if no selection could be made.
   */
  selectHeaderContentType(contentTypes) {
    if (contentTypes.length === 0) {
      return void 0;
    }
    const type = contentTypes.find((x) => this.isJsonMime(x));
    if (type === void 0) {
      return contentTypes[0];
    }
    return type;
  }
  /**
   * Select the correct accept content-type to use for a request.
   * Uses {@link Configuration#isJsonMime} to determine the correct accept content-type.
   * If no content type is found return the first found type if the contentTypes is not empty
   * @param accepts - the array of content types that are available for selection.
   * @returns the selected content-type or <code>undefined</code> if no selection could be made.
   */
  selectHeaderAccept(accepts) {
    if (accepts.length === 0) {
      return void 0;
    }
    const type = accepts.find((x) => this.isJsonMime(x));
    if (type === void 0) {
      return accepts[0];
    }
    return type;
  }
  /**
   * Check if the given MIME is a JSON MIME.
   * JSON MIME examples:
   *   application/json
   *   application/json; charset=UTF8
   *   APPLICATION/JSON
   *   application/vnd.company+json
   * @param mime - MIME (Multipurpose Internet Mail Extensions)
   * @return True if the given MIME is JSON, false otherwise.
   */
  isJsonMime(mime) {
    const jsonMime = new RegExp("^(application/json|[^;/ 	]+/[^;/ 	]+[+]json)[ 	]*(;.*)?$", "i");
    return mime !== null && (jsonMime.test(mime) || mime.toLowerCase() === "application/json-patch+json");
  }
  lookupCredential(key) {
    const value = this.credentials[key];
    return typeof value === "function" ? value() : value;
  }
  defaultEncodeParam(param) {
    const value = param.dataFormat === "date-time" && param.value instanceof Date ? param.value.toISOString() : param.value;
    return encodeURIComponent(String(value));
  }
};
var RecipesService = class _RecipesService {
  httpClient;
  basePath = "https://localhost:7215";
  defaultHeaders = new HttpHeaders();
  configuration = new Configuration();
  encoder;
  constructor(httpClient, basePath, configuration) {
    this.httpClient = httpClient;
    if (configuration) {
      this.configuration = configuration;
    }
    if (typeof this.configuration.basePath !== "string") {
      const firstBasePath = Array.isArray(basePath) ? basePath[0] : void 0;
      if (firstBasePath != void 0) {
        basePath = firstBasePath;
      }
      if (typeof basePath !== "string") {
        basePath = this.basePath;
      }
      this.configuration.basePath = basePath;
    }
    this.encoder = this.configuration.encoder || new CustomHttpParameterCodec();
  }
  // @ts-ignore
  addToHttpParams(httpParams, value, key) {
    if (typeof value === "object" && value instanceof Date === false) {
      httpParams = this.addToHttpParamsRecursive(httpParams, value);
    } else {
      httpParams = this.addToHttpParamsRecursive(httpParams, value, key);
    }
    return httpParams;
  }
  addToHttpParamsRecursive(httpParams, value, key) {
    if (value == null) {
      return httpParams;
    }
    if (typeof value === "object") {
      if (Array.isArray(value)) {
        value.forEach((elem) => httpParams = this.addToHttpParamsRecursive(httpParams, elem, key));
      } else if (value instanceof Date) {
        if (key != null) {
          httpParams = httpParams.append(key, value.toISOString().substring(0, 10));
        } else {
          throw Error("key may not be null if value is Date");
        }
      } else {
        Object.keys(value).forEach((k) => httpParams = this.addToHttpParamsRecursive(httpParams, value[k], key != null ? `${key}.${k}` : k));
      }
    } else if (key != null) {
      httpParams = httpParams.append(key, value);
    } else {
      throw Error("key may not be null if value is not object or array");
    }
    return httpParams;
  }
  addRecipe(recipeCreateDto, observe = "body", reportProgress = false, options) {
    if (recipeCreateDto === null || recipeCreateDto === void 0) {
      throw new Error("Required parameter recipeCreateDto was null or undefined when calling addRecipe.");
    }
    let localVarHeaders = this.defaultHeaders;
    let localVarHttpHeaderAcceptSelected = options && options.httpHeaderAccept;
    if (localVarHttpHeaderAcceptSelected === void 0) {
      const httpHeaderAccepts = ["application/json"];
      localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    }
    if (localVarHttpHeaderAcceptSelected !== void 0) {
      localVarHeaders = localVarHeaders.set("Accept", localVarHttpHeaderAcceptSelected);
    }
    let localVarHttpContext = options && options.context;
    if (localVarHttpContext === void 0) {
      localVarHttpContext = new HttpContext();
    }
    let localVarTransferCache = options && options.transferCache;
    if (localVarTransferCache === void 0) {
      localVarTransferCache = true;
    }
    const consumes = ["application/json"];
    const httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
    if (httpContentTypeSelected !== void 0) {
      localVarHeaders = localVarHeaders.set("Content-Type", httpContentTypeSelected);
    }
    let responseType_ = "json";
    if (localVarHttpHeaderAcceptSelected) {
      if (localVarHttpHeaderAcceptSelected.startsWith("text")) {
        responseType_ = "text";
      } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
        responseType_ = "json";
      } else {
        responseType_ = "blob";
      }
    }
    let localVarPath = `/recipes`;
    return this.httpClient.request("post", `${this.configuration.basePath}${localVarPath}`, {
      context: localVarHttpContext,
      body: recipeCreateDto,
      responseType: responseType_,
      withCredentials: this.configuration.withCredentials,
      headers: localVarHeaders,
      observe,
      transferCache: localVarTransferCache,
      reportProgress
    });
  }
  getRecipeById(recipeId, observe = "body", reportProgress = false, options) {
    if (recipeId === null || recipeId === void 0) {
      throw new Error("Required parameter recipeId was null or undefined when calling getRecipeById.");
    }
    let localVarHeaders = this.defaultHeaders;
    let localVarHttpHeaderAcceptSelected = options && options.httpHeaderAccept;
    if (localVarHttpHeaderAcceptSelected === void 0) {
      const httpHeaderAccepts = ["application/json"];
      localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    }
    if (localVarHttpHeaderAcceptSelected !== void 0) {
      localVarHeaders = localVarHeaders.set("Accept", localVarHttpHeaderAcceptSelected);
    }
    let localVarHttpContext = options && options.context;
    if (localVarHttpContext === void 0) {
      localVarHttpContext = new HttpContext();
    }
    let localVarTransferCache = options && options.transferCache;
    if (localVarTransferCache === void 0) {
      localVarTransferCache = true;
    }
    let responseType_ = "json";
    if (localVarHttpHeaderAcceptSelected) {
      if (localVarHttpHeaderAcceptSelected.startsWith("text")) {
        responseType_ = "text";
      } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
        responseType_ = "json";
      } else {
        responseType_ = "blob";
      }
    }
    let localVarPath = `/recipes/${this.configuration.encodeParam({
      name: "recipeId",
      value: recipeId,
      in: "path",
      style: "simple",
      explode: false,
      dataType: "number",
      dataFormat: void 0
    })}`;
    return this.httpClient.request("get", `${this.configuration.basePath}${localVarPath}`, {
      context: localVarHttpContext,
      responseType: responseType_,
      withCredentials: this.configuration.withCredentials,
      headers: localVarHeaders,
      observe,
      transferCache: localVarTransferCache,
      reportProgress
    });
  }
  updateRecipeById(recipeId, recipeCreateDto, observe = "body", reportProgress = false, options) {
    if (recipeId === null || recipeId === void 0) {
      throw new Error("Required parameter recipeId was null or undefined when calling updateRecipeById.");
    }
    if (recipeCreateDto === null || recipeCreateDto === void 0) {
      throw new Error("Required parameter recipeCreateDto was null or undefined when calling updateRecipeById.");
    }
    let localVarHeaders = this.defaultHeaders;
    let localVarHttpHeaderAcceptSelected = options && options.httpHeaderAccept;
    if (localVarHttpHeaderAcceptSelected === void 0) {
      const httpHeaderAccepts = ["application/json"];
      localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    }
    if (localVarHttpHeaderAcceptSelected !== void 0) {
      localVarHeaders = localVarHeaders.set("Accept", localVarHttpHeaderAcceptSelected);
    }
    let localVarHttpContext = options && options.context;
    if (localVarHttpContext === void 0) {
      localVarHttpContext = new HttpContext();
    }
    let localVarTransferCache = options && options.transferCache;
    if (localVarTransferCache === void 0) {
      localVarTransferCache = true;
    }
    const consumes = ["application/json"];
    const httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
    if (httpContentTypeSelected !== void 0) {
      localVarHeaders = localVarHeaders.set("Content-Type", httpContentTypeSelected);
    }
    let responseType_ = "json";
    if (localVarHttpHeaderAcceptSelected) {
      if (localVarHttpHeaderAcceptSelected.startsWith("text")) {
        responseType_ = "text";
      } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
        responseType_ = "json";
      } else {
        responseType_ = "blob";
      }
    }
    let localVarPath = `/recipes/${this.configuration.encodeParam({
      name: "recipeId",
      value: recipeId,
      in: "path",
      style: "simple",
      explode: false,
      dataType: "number",
      dataFormat: void 0
    })}`;
    return this.httpClient.request("put", `${this.configuration.basePath}${localVarPath}`, {
      context: localVarHttpContext,
      body: recipeCreateDto,
      responseType: responseType_,
      withCredentials: this.configuration.withCredentials,
      headers: localVarHeaders,
      observe,
      transferCache: localVarTransferCache,
      reportProgress
    });
  }
  static ɵfac = function RecipesService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _RecipesService)(ɵɵinject(HttpClient), ɵɵinject(BASE_PATH, 8), ɵɵinject(Configuration, 8));
  };
  static ɵprov = ɵɵdefineInjectable({
    token: _RecipesService,
    factory: _RecipesService.ɵfac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RecipesService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{
    type: HttpClient
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Inject,
      args: [BASE_PATH]
    }]
  }, {
    type: Configuration,
    decorators: [{
      type: Optional
    }]
  }], null);
})();
var APIS = [RecipesService];
var ApiModule = class _ApiModule {
  static forRoot(configurationFactory) {
    return {
      ngModule: _ApiModule,
      providers: [{
        provide: Configuration,
        useFactory: configurationFactory
      }]
    };
  }
  constructor(parentModule, http) {
    if (parentModule) {
      throw new Error("ApiModule is already loaded. Import in your base AppModule only.");
    }
    if (!http) {
      throw new Error("You need to import the HttpClientModule in your AppModule! \nSee also https://github.com/angular/angular/issues/20575");
    }
  }
  static ɵfac = function ApiModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ApiModule)(ɵɵinject(_ApiModule, 12), ɵɵinject(HttpClient, 8));
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _ApiModule
  });
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ApiModule, [{
    type: NgModule,
    args: [{
      imports: [],
      declarations: [],
      exports: [],
      providers: []
    }]
  }], () => [{
    type: ApiModule,
    decorators: [{
      type: Optional
    }, {
      type: SkipSelf
    }]
  }, {
    type: HttpClient,
    decorators: [{
      type: Optional
    }]
  }], null);
})();
export {
  APIS,
  ApiModule,
  BASE_PATH,
  COLLECTION_FORMATS,
  Configuration,
  RecipesService
};
//# sourceMappingURL=luminis-recipe-api.js.map
