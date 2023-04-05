import { Module } from '@nestjs/common';
import { FhirService } from './fhir.service';
import { FhirController } from './fhir.controller';
import { ConfigModule } from '@nestjs/config';
import FHIRAuthSetup from './fhir.auth-setup';
import FHIRAuthCode from './fhir.auth-code';
import FHIRAccessTokenService from './fhir.access-token';

@Module({
  imports: [ConfigModule],
  controllers: [FhirController],
  providers: [FhirService, FHIRAuthSetup, FHIRAuthCode, FHIRAccessTokenService],
})
export class FhirModule {}
