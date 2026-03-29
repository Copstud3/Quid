<<<<<<< HEAD
import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  Keypair,
  Networks,
  Operation,
  StrKey,
  Transaction,
  WebAuth,
} from '@stellar/stellar-sdk';
import { PrismaService } from '../prisma/prisma.service';

const CHALLENGE_TIMEOUT = 300;

export interface ChallengeResponse {
  address: string;
  transaction: string;
  homeDomain: string;
  webAuthDomain: string;
  networkPassphrase: string;
  nonce: string;
  issuedAt: number;
  expiresIn: number;
=======
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Keypair } from '@stellar/stellar-sdk';
import { PrismaService } from '../prisma/prisma.service';

interface AuthConfig {
  serverKeypair: Keypair;
  webAuthDomain: string;
  networkPassphrase: string;
>>>>>>> 58231901cb6cabc822ad0214daa12df85338a234
}

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
  ) {}

<<<<<<< HEAD
  generateChallenge(address: string): ChallengeResponse {
    if (!StrKey.isValidEd25519PublicKey(address)) {
      throw new BadRequestException('Invalid Stellar public key');
    }

    const serverSecret = this.config.getOrThrow<string>(
      'STELLAR_SERVER_SECRET',
    );
    const serverKeypair = Keypair.fromSecret(serverSecret);

    const homeDomain = this.config.getOrThrow<string>('HOME_DOMAIN');
    const webAuthDomain = this.config.getOrThrow<string>('WEB_AUTH_DOMAIN');
    const networkPassphrase = this.config.get<string>(
      'STELLAR_NETWORK',
      Networks.TESTNET,
    );

    const issuedAt = Math.floor(Date.now() / 1000);

    const transaction = WebAuth.buildChallengeTx(
      serverKeypair,
      address,
      homeDomain,
      CHALLENGE_TIMEOUT,
      networkPassphrase,
      webAuthDomain,
    );

    const tx = new Transaction(transaction, networkPassphrase);
    const manageDataOp = tx.operations[0] as Operation.ManageData;
    const nonce = manageDataOp.value?.toString('base64') ?? '';

    return {
      address,
      transaction,
      homeDomain,
      webAuthDomain,
      networkPassphrase,
      nonce,
      issuedAt,
      expiresIn: CHALLENGE_TIMEOUT,
    };
=======
  private loadAuthConfig(): AuthConfig {
    const serverPrivateKey = this.config.get<string>('SERVER_PRIVATE_KEY');
    if (!serverPrivateKey) {
      throw new InternalServerErrorException(
        'Missing required env var: SERVER_PRIVATE_KEY',
      );
    }

    const webAuthDomain = this.config.get<string>('STELLAR_WEB_AUTH_DOMAIN');
    if (!webAuthDomain) {
      throw new InternalServerErrorException(
        'Missing required env var: STELLAR_WEB_AUTH_DOMAIN',
      );
    }

    const networkPassphrase = this.config.get<string>(
      'STELLAR_NETWORK_PASSPHRASE',
    );
    if (!networkPassphrase) {
      throw new InternalServerErrorException(
        'Missing required env var: STELLAR_NETWORK_PASSPHRASE',
      );
    }

    const serverKeypair = this.parseServerKeypair(serverPrivateKey);

    return { serverKeypair, webAuthDomain, networkPassphrase };
  }

  private parseServerKeypair(secretKey: string): Keypair {
    try {
      return Keypair.fromSecret(secretKey);
    } catch {
      throw new InternalServerErrorException(
        'Invalid SERVER_PRIVATE_KEY: must be a valid Stellar secret key',
      );
    }
  }

  private normalizeVerifyError(error: unknown): string {
    if (error instanceof Error) {
      return error.message;
    }
    return 'Signature verification failed';
  }

  generateChallenge(
    address: string,
  ): { transaction: string; networkPassphrase: string } {
    const { serverKeypair, webAuthDomain, networkPassphrase } =
      this.loadAuthConfig();

    // Placeholder: real SEP-10 challenge generation (BE-022/BE-023) will
    // use serverKeypair, webAuthDomain, and networkPassphrase to build the XDR.
    void serverKeypair;
    void webAuthDomain;
    void address;

    return { transaction: '', networkPassphrase };
  }

  verifySignature(signedXdr: string): { token: string } {
    const { networkPassphrase } = this.loadAuthConfig();

    try {
      // Placeholder: real SEP-10 verification (BE-022/BE-024) will validate
      // signedXdr against the challenge and issue a JWT.
      void signedXdr;
      void networkPassphrase;

      return { token: '' };
    } catch (error) {
      const message = this.normalizeVerifyError(error);
      throw new InternalServerErrorException(message);
    }
>>>>>>> 58231901cb6cabc822ad0214daa12df85338a234
  }

  validateUser(publicKey: string) {
    return this.prisma.user.findUnique({ where: { email: publicKey } });
  }
}
