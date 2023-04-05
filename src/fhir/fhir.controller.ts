import { Controller, Get, Query, Res } from '@nestjs/common';
import { FhirService } from './fhir.service';

@Controller('fhir')
export class FhirController {
  constructor(private readonly fhirService: FhirService) {}

  @Get('')
  getHello(): string {
    return this.fhirService.getHello();
  }

  @Get('/launch')
  async initiateAuthFlow(@Res() res) {
    const redirectUrl = await this.fhirService.requestAuthRedirectUrl();
    res.redirect(redirectUrl);
  }

  @Get('/auth-granted')
  async receiveAuthCodeFromSMARTRedirect(
    @Query() query: { code: string; state: string },
  ) {
    this.fhirService.setAuthCode(query.code);

    const accessTokenResult = await this.fhirService.requestAccessToken();
    if (accessTokenResult) {
      return 'Code received. You may close this window';
    }
    return 'Something wrong happened';

    // res.redirect('/fhir/access-token-granted');
  }
}
