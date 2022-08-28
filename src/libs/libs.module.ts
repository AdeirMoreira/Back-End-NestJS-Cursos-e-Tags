import { Module } from '@nestjs/common';
import { HashManagerService } from './hash-manager.service';
import { UuidService } from './uuid.service';

@Module({
    providers: [HashManagerService, UuidService],
    exports: [HashManagerService, UuidService]
})
export class LibsModule {}
