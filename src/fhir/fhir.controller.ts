import { Controller, Get, Res } from '@nestjs/common';
import { FhirService } from './fhir.service';

@Controller('fhir')
export class FhirController {
  constructor(private readonly fhirService: FhirService) {}

  @Get('')
  getHello(): string {
    return this.fhirService.getHello();
  }

  @Get('/auth')
  async initiateAuthFlow(@Res() res) {
    const redirectUrl = await this.fhirService.getAuthRedirectUrl();
    res.redirect(redirectUrl);
    // return this.fhirService.getAuthRedirectUrl();
  }
}
