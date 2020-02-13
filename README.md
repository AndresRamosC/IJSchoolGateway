# IJSchoolManagerGateway

This application was generated using JHipster 6.7.0, you can find documentation and help at [https://www.jhipster.tech/documentation-archive/v6.7.0](https://www.jhipster.tech/documentation-archive/v6.7.0).

This is a "gateway" application intended to be part of a microservice architecture, please refer to the [Doing microservices with JHipster][] page of the documentation for more information.

This application is configured for Service Discovery and Configuration with the JHipster-Registry. On launch, it will refuse to start if it is not able to connect to the JHipster-Registry at [http://localhost:8761](http://localhost:8761). For more information, read our documentation on [Service Discovery and Configuration with the JHipster-Registry][].

## Development

In order to run the Gateway properly you´ll have to run the next commands on a terminal in the project folder.

Kafka server

    docker-compose -f src/main/docker/kafka.yml up -d

Oauth(keycloak server)

    docker-compose -f src/main/docker/keycloak.yml up

JRegestry server

    docker-compose -f src/main/docker/jhipster-registry.yml up

Run the following commands in two separate terminals to create a blissful development experience where your browser
auto-refreshes when files change on your hard drive.

    ./mvnw
    npm start

The `npm run` command will list all of the scripts available to run for this project.

## OAuth 2.0 / OpenID Connect

To log in to your app, you'll need to have [Keycloak](https://keycloak.org) up and running. The JHipster Team has created a Docker container for you that has the default users and roles. Start Keycloak using the following command.

```
docker-compose -f src/main/docker/keycloak.yml up
```

The security settings in `src/main/resources/application.yml` are configured for this image.

```yaml
security:
  basic:
    enabled: false
  oauth2:
    client:
      accessTokenUri: http://localhost:9080/auth/realms/jhipster/protocol/openid-connect/token
      userAuthorizationUri: http://localhost:9080/auth/realms/jhipster/protocol/openid-connect/auth
      clientId: web_app
      clientSecret: web_app
      scope: openid profile email
    resource:
      userInfoUri: http://localhost:9080/auth/realms/jhipster/protocol/openid-connect/userinfo
```

### Service workers

Service workers are commented by default, to enable them please uncomment the following code.

- The service worker registering script in index.html

```html
<script>
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./service-worker.js').then(function() {
      console.log('Service Worker Registered');
    });
  }
</script>
```

Note: workbox creates the respective service worker and dynamically generate the `service-worker.js`

### Managing dependencies

For example, to add [Leaflet][] library as a runtime dependency of your application, you would run following command:

    npm install --save --save-exact leaflet

To benefit from TypeScript type definitions from [DefinitelyTyped][] repository in development, you would run following command:

    npm install --save-dev --save-exact @types/leaflet

Then you would import the JS and CSS files specified in library's installation instructions so that [Webpack][] knows about them:
Edit [src/main/webapp/app/main.ts](src/main/webapp/app/main.ts) file:

```
import 'leaflet/dist/leaflet.js';
```

Edit [src/main/webapp/content/scss/vendor.scss](src/main/webapp/content/scss/vendor.scss) file:

```
@import '~leaflet/dist/leaflet.scss';
```

Note: there are still few other things remaining to do for Leaflet that we won't detail here.

For further instructions on how to develop with JHipster, have a look at [Using JHipster in development][].

### Using vue-cli

You can also use [Vue CLI][] to display the project using vue UI.

For example, the following command:

    vue ui

will generate open Vue Project Manager. From there, you'll be able to manage your project as any other Vue.js projects.

## Building for production

### Packaging as jar

To build the final jar and optimize the IJSchoolManagerGateway application for production, run:

    ./mvnw -Pprod clean verify

This will concatenate and minify the client CSS and JavaScript files. It will also modify `index.html` so it references these new files.
To ensure everything worked, run:

    java -jar target/*.jar

Then navigate to [http://localhost:8080](http://localhost:8080) in your browser.

Refer to [Using JHipster in production][] for more details.

### Packaging as war

To package your application as a war in order to deploy it to an application server, run:

    ./mvnw -Pprod,war clean verify

## Testing

To launch your application's tests, run:
./mvnw verify

### Client tests

Unit tests are run by [Jest][] and written with [Jasmine][]. They're located in [src/test/javascript/](src/test/javascript/) and can be run with:
npm test

For more information, refer to the [Running tests page][].

### Code quality

Sonar is used to analyse code quality. You can start a local Sonar server (accessible on http://localhost:9001) with:

```
docker-compose -f src/main/docker/sonar.yml up -d
```

You can run a Sonar analysis with using the [sonar-scanner](https://docs.sonarqube.org/display/SCAN/Analyzing+with+SonarQube+Scanner) or by using the maven plugin.
Then, run a Sonar analysis:

```
./mvnw -Pprod clean verify sonar:sonar
```

If you need to re-run the Sonar phase, please be sure to specify at least the `initialize` phase since Sonar properties are loaded from the sonar-project.properties file.

```
./mvnw initialize sonar:sonar
```

or
For more information, refer to the [Code quality page][].

## Using Docker to simplify development (optional)

You can use Docker to improve your JHipster development experience. A number of docker-compose configuration are available in the [src/main/docker](src/main/docker) folder to launch required third party services.

For example, to start a mysql database in a docker container, run:
docker-compose -f src/main/docker/mysql.yml up -d
To stop it and remove the container, run:
docker-compose -f src/main/docker/mysql.yml down

You can also fully dockerize your application and all the services that it depends on.
To achieve this, first build a docker image of your app by running:
./mvnw -Pprod verify jib:dockerBuild
Then run:
docker-compose -f src/main/docker/app.yml up -d
For more information refer to [Using Docker and Docker-Compose][], this page also contains information on the docker-compose sub-generator (`jhipster docker-compose`), which is able to generate docker configurations for one or several JHipster applications.

[jhipster homepage and latest documentation]: https://www.jhipster.tech
[jhipster 6.7.0 archive]: https://www.jhipster.tech/documentation-archive/v6.7.0
[doing microservices with jhipster]: https://www.jhipster.tech/documentation-archive/v6.7.0/microservices-architecture/
[using jhipster in development]: https://www.jhipster.tech/documentation-archive/v6.7.0/development/
[service discovery and configuration with the jhipster-registry]: https://www.jhipster.tech/documentation-archive/v6.7.0/microservices-architecture/#jhipster-registry
[using docker and docker-compose]: https://www.jhipster.tech/documentation-archive/v6.7.0/docker-compose
[using jhipster in production]: https://www.jhipster.tech/documentation-archive/v6.7.0/production/
[running tests page]: https://www.jhipster.tech/documentation-archive/v6.7.0/running-tests/
[code quality page]: https://www.jhipster.tech/documentation-archive/v6.7.0/code-quality/
[setting up continuous integration]: https://www.jhipster.tech/documentation-archive/v6.7.0/setting-up-ci/
[node.js]: https://nodejs.org/
[yarn]: https://yarnpkg.org/
[webpack]: https://webpack.github.io/
[vue cli]: https://cli.vuejs.org/
[browsersync]: https://www.browsersync.io/
[jest]: https://facebook.github.io/jest/
[jasmine]: https://jasmine.github.io/2.0/introduction.html
[protractor]: https://www.protractortest.org/
[leaflet]: https://leafletjs.com/
[definitelytyped]: https://definitelytyped.org/
