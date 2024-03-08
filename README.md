# Add Step-up Authentication Using Angular and NestJS Example

This repository contains a working example of adding step-up authentication to protect an Angular route using the Okta Angular SDK. It also contains example code of protecting an API route in NestJS and Angular code required to handle step-up authentication challenge error response. Please read [Add Step-up Authentication Using Angular and NestJS][blog] for a detailed guide through.

**Prerequisites**

* Node 18 or greater
* Okta CLI
* Your favorite IDE
* A web browser with good debugging capabilities
* Terminal window
* Git

> [Okta](https://developer.okta.com/) has Authentication and User Management APIs that reduce development time with instant-on, scalable user infrastructure. Okta's intuitive API and expert support make it easy for developers to authenticate, manage and secure users and roles in any application.

* [Getting Started](#getting-started)
* [Links](#links)
* [Help](#help)
* [License](#license)

## Getting Started

To run this example, run the following commands:

```bash
git clone https://github.com/oktadev/okta-angular-nestjs-stepup-auth-example.git stepup-auth
cd stepup-auth
npm ci
```

### Create an OIDC Application in Okta

Create a free developer account with the following command using the [Okta CLI](https://cli.okta.com):

```shell
okta register
```

If you already have a developer account, use `okta login` to integrate it with the Okta CLI.

Provide the required information. Once you register, create a client application in Okta with the following command:

```shell
okta apps create
```

You will be prompted to select the following options:
- Type of Application: **2: SPA**
- Redirect URI: `http://localhost:4200/login/callback`
- Logout Redirect URI: `http://localhost:4200`

The application configuration will be printed to your screen:

```shell
Okta application configuration:
Issuer:    https://<OKTA_DOMAIN>.okta.com/oauth2/default
Client ID: <CLIENT_ID>
```

Update `packages/frontend-angular/src/app.config.ts` with your Okta settings.

```ts
{
  issuer: "https://{yourOktaDomain}/oauth2/default",
  clientId: "{yourClientId}"
}
```

Start the app by running

```shell
npm start
```

If you want to run the completed project, check out the `completed` branch.

```shell
git checkout completed
```

Search for `{yourOktaDomain}` and `{yourClientId}`. Update all occurrences. You will update two places with the Okta domain.

## Scaffold the project

This project is an Angular frontend and NestJS backend in a Lerna monorepo. You can recreate this app using the commands below. I will not include any code added to the scaffolded files.

```shell
npx lerna@8.1 init
mkdir packages && cd packages

npx @angular/cli@17.2 new frontend-angular --routing --skip-git --skip-install --skip-tests --style scss --ssr false
cd frontend-angular
npx @angular/cli generate component profile --inline-template --inline-style
npx @angular/cli generate component messages --inline-template --inline-style
cd ..

npx @nestjs/cli@10.3 new api --skip-git --skip-install --package-manager npm
cd api
npx @nestjs/cli generate controller messages --no-spec --flat
npx @nestjs/cli generate guard stepup --no-spec --flat
cd ../..

npm i @okta/okta-angular@6.3 @okta/okta-auth-js@7.5 -w frontend-angular 
npm i @okta/jwt-verifier@3.0 -w api
```

Open the project in an IDE. Create a [proxy for Angular](https://angular.io/guide/build#proxying-to-a-backend-server) to call the API without enabling CORS.

Open `packages/api/tsconfig.json` and add the property to enable ES Module interoperability:

```markup
"esModuleInterop": true
```

Open `packages/api/package.json` and change the `start` script to `"nest start --watch"`.

Open `package.json` and add the following npm scripts:

```json
"scripts": {
    "lerna": "lerna",
    "start": "lerna run start"
},
```

## Links

This example uses the following open source libraries from Okta:

* [Okta Auth JavaScript SDK](https://github.com/okta/okta-auth-js)
* [Okta Angular SDK](https://github.com/okta/okta-angular)
* [Okta JWT Verifier](https://github.com/okta/okta-jwt-verifier-js)
* [Okta CLI](https://github.com/okta/okta-cli)

## Help

Please post any questions as comments on the [blog post][blog], or visit our [Okta Developer Forums](https://devforum.okta.com/).

## License

Apache 2.0, see [LICENSE](LICENSE).

[blog]: https://developer.okta.com/blog/2024/03/12/stepup-authentication