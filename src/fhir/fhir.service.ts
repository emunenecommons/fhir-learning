import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import FHIRAuthSetupService from './fhir.auth-setup';
import FHIRAuthCodeService from './fhir.auth-code';
import FHIRAccessTokenService from './fhir.access-token';
import { IAccessTokenResponseData } from './interfaces';
import * as is from 'is_js';

@Injectable()
export class FhirService implements OnModuleInit {
  constructor(
    private configService: ConfigService,
    private fhirSetupService: FHIRAuthSetupService,
    private fhirAuthTokenService: FHIRAuthCodeService,
    private fhirAccessTokenService: FHIRAccessTokenService,
  ) {}
  onModuleInit() {
    this.requestAuthEndpoints();
  }

  private FHIR_SMART_SERVER = this.configService.get<string>('FHIR_IP_ADDRESS');

  private authUrlEndpoint = '';
  public getAuthUrlEndpoint(): string {
    return this.authUrlEndpoint;
  }

  private tokenUrlEndpoint = '';
  public getTokenUrlEndpoint(): string {
    return this.tokenUrlEndpoint;
  }

  private authCode = '';
  public getAuthCode() {
    return this.authCode;
  }
  public setAuthCode(newCode) {
    this.authCode = newCode;
  }

  private accessToken: IAccessTokenResponseData = null;

  public getHello(): string {
    return 'Hello fhir';
  }

  async requestAuthEndpoints(): Promise<void> {
    const authConfig = await this.fhirSetupService.getAuthConfig(
      this.FHIR_SMART_SERVER,
    );
    this.authUrlEndpoint = authConfig.authURL;
    this.tokenUrlEndpoint = authConfig.tokenURL;
  }

  async requestAuthRedirectUrl(): Promise<string> {
    const authToken: string = await this.fhirAuthTokenService.getAuthUrl(
      this.authUrlEndpoint,
      this.FHIR_SMART_SERVER,
    );

    return authToken;
  }

  async requestAccessToken(): Promise<boolean> {
    const response = await this.fhirAccessTokenService.getAccessToken(
      this.tokenUrlEndpoint,
      this.authCode,
    );

    if (is.not.null(response)) {
      this.accessToken = response;
      return true;
    }
    return false;
  }
}
