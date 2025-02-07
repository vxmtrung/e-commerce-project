import { Module } from "@nestjs/common";
import { UserModule } from "../users/user.module";
import { JwtModule } from "@nestjs/jwt";
import { AuthService } from "./services/auth.service";
import { AuthController } from "./controllers/auth.controller";

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      global: true,
      useFactory: async () => {
        return {
          secret: process.env.JWT_SECRET,
          signOptions: {
            expiresIn: process.env.JWT_EXPIRED,
          },
        };
      },
    }),
  ],
  controllers: [AuthController],
  exports: ['IAuthService'],
  providers: [
    {
      provide: 'IAuthService',
      useClass: AuthService,
    },
  ],
})

export class AuthModule {}