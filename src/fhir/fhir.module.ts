import { Module } from '@nestjs/common';
import { FhirService } from './fhir.service';
import { FhirController } from './fhir.controller';
import { ConfigModule } from '@nestjs/config';
import FHIRAuthSetup from './fhir.auth-setup';
import FHIRAuthToken from './fhir.auth-token';

@Module({
  imports: [ConfigModule],
  controllers: [FhirController],
  providers: [FhirService, FHIRAuthSetup, FHIRAuthToken],
})
export class FhirModule {}
