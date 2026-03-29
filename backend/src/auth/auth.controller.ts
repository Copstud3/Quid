<<<<<<< HEAD
import { Controller, Get, Query } from '@nestjs/common';
=======
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
>>>>>>> 58231901cb6cabc822ad0214daa12df85338a234
import { AuthService } from './auth.service';
import { ChallengeQueryDto } from './dto/challenge-query.dto';
import { VerifySignatureDto } from './dto/verify-signature.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('challenge')
<<<<<<< HEAD
  generateChallenge(@Query('address') address: string) {
    return this.authService.generateChallenge(address);
=======
  getChallenge(@Query() query: ChallengeQueryDto) {
    return this.authService.generateChallenge(query.address);
  }

  @Post('verify')
  verifySignature(@Body() body: VerifySignatureDto) {
    return this.authService.verifySignature(body.signedXdr);
>>>>>>> 58231901cb6cabc822ad0214daa12df85338a234
  }
}
