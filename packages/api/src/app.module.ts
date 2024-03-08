import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessagesController } from './messages.controller';
import { StepupMiddleware } from './stepup.middleware';

@Module({
  imports: [],
  controllers: [AppController, MessagesController],
  providers: [AppService],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(StepupMiddleware).forRoutes('messages');
  }
}
