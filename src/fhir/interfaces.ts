export interface IWellKnownConfigurationResponse {
  authorization_endpoint: string;
  token_endpoint: string;
  smart_app_state_endpoint: string;
  introspection_endpoint: string;
  code_challenge_methods_supported: string[];
  token_endpoint_auth_methods_supported: string[];
  token_endpoint_auth_signing_alg_values_supported: string[];
  scopes_supported: string[];
  response_types_supported: string[];
  capabilities: string[];
}

export interface IAccessTokenResponseData {
  accessToken: string;
  expiresIn: number;
  idToken: string;
  needPatientBanner: boolean;
  patient: string;
  scope: string;
  smartStyleUrl: string;
  tokenType: string;
}
