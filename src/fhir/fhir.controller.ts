import { Controller, Get } from '@nestjs/common';
import { FhirService } from './fhir.service';

@Controller('fhir')
export class FhirController {
  constructor(private readonly fhirService: FhirService) {}

  @Get('')
  getHello(): string {
    return this.fhirService.getHello();
  }

  @Get('/connect')
  getMetadata() {
    return this.fhirService.getAuthMetadata();
  }
}
