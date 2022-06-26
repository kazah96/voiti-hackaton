import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from '../users/users.module';
import { WorkersModule } from '../workers/workers.module';
import { OrganizationController } from './organization.controller';
import { Organization, OrganizationSchema } from './organization.schema';
import { OrganizationService } from './organization.service';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    forwardRef(() => WorkersModule),
    MongooseModule.forFeature([
      { name: Organization.name, schema: OrganizationSchema },
    ]),
  ],
  controllers: [OrganizationController],
  providers: [OrganizationService],
  exports: [OrganizationService, MongooseModule],
})
export class OrganizationModule {}
