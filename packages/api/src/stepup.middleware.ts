import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import OktaJwtVerifier from '@okta/jwt-verifier';

@Injectable()
export class StepupMiddleware implements NestMiddleware {
  private jwtVerifier = new OktaJwtVerifier({issuer: 'https://{yourOktaDomain}.okta.com/oauth2/default'});
  
  async use(req: any, res: any, next: () => void) {
    const authHeader = req.headers.authorization || '';
    const match:string[]|undefined = authHeader.match(/Bearer (.+)/);

    if (!match && match.length >=1 && match[1]) {
      return res.status(HttpStatus.UNAUTHORIZED).send();
    }

    let accessToken:OktaJwtVerifier.Jwt;
    try {
      accessToken = await this.jwtVerifier.verifyAccessToken(match[1], 'api://default');
    } catch (err) { 
      console.error(err)
      return res.status(HttpStatus.UNAUTHORIZED).send(err.message);
    }

    const acr_values = 'urn:okta:loa:2fa:any';
    const acr = accessToken.claims['acr'] ?? '';

    if (acr === '' || acr !== acr_values) {
      res.setHeader('WWW-Authenticate', `Bearer error="insufficient_user_authentication",error_description="A different authentication level is required",acr_values="${acr_values}"`)
      return res.status(HttpStatus.UNAUTHORIZED).send();
    }

    next();
  }
}
