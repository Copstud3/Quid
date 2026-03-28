import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ChallengeQueryDto } from './dto/challenge-query.dto';
import { VerifySignatureDto } from './dto/verify-signature.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('challenge')
  getChallenge(@Query() query: ChallengeQueryDto) {
    // The auth service would handle Stellar-specific logic here
    // return this.authService.generateChallenge(query.address);
    return { address: query.address };
  }

  @Post('verify')
  verifySignature(@Body() body: VerifySignatureDto) {
    // The auth service would handle Stellar-specific logic here
    // return this.authService.verifySignature(body.signedXdr);
    return { message: 'Signed XDR received', signedXdr: body.signedXdr };
  }
}
