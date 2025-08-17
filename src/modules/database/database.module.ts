import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [
        MongooseModule.forRoot(
            'mongodb+srv://shiharadotadilshanid:dfaNmDD0HVNxHpxL@cluster0.ew2kksa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
        ),
    ],
})
export class DatabaseModule {}
