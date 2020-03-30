package com.ijrobotics.ijschoolmanagergateway.web.rest;

import com.ijrobotics.ijschoolmanagergateway.domain.User;
import com.ijrobotics.ijschoolmanagergateway.service.UserService;
import com.ijrobotics.ijschoolmanagergateway.service.dto.UserCredDto;
import com.ijrobotics.ijschoolmanagergateway.service.dto.UserDTO;
import org.jboss.resteasy.client.jaxrs.ResteasyClientBuilder;
import org.keycloak.OAuth2Constants;
import org.keycloak.admin.client.CreatedResponseUtil;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.KeycloakBuilder;
import org.keycloak.admin.client.resource.RealmResource;
import org.keycloak.admin.client.resource.UsersResource;
import org.keycloak.representations.idm.CredentialRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.ws.rs.NotFoundException;
import javax.ws.rs.core.Response;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing users.
 * <p>
 * This class accesses the {@link com.ijrobotics.ijschoolmanagergateway.domain.User} entity, and needs to fetch its collection of authorities.
 * <p>
 * For a normal use-case, it would be better to have an eager relationship between User and Authority,
 * and send everything to the client side: there would be no View Model and DTO, a lot less code, and an outer-join
 * which would be good for performance.
 * <p>
 * We use a View Model and a DTO for 3 reasons:
 * <ul>
 * <li>We want to keep a lazy association between the user and the authorities, because people will
 * quite often do relationships with the user, and we don't want them to get the authorities all
 * the time for nothing (for performance reasons). This is the #1 goal: we should not impact our users'
 * application because of this use-case.</li>
 * <li> Not having an outer join causes n+1 requests to the database. This is not a real issue as
 * we have by default a second-level cache. This means on the first HTTP call we do the n+1 requests,
 * but then all authorities come from the cache, so in fact it's much better than doing an outer join
 * (which will get lots of data from the database, for each HTTP call).</li>
 * <li> As this manages users, for security reasons, we'd rather have a DTO layer.</li>
 * </ul>
 * <p>
 * Another option would be to have a specific JPA entity graph to handle this case.
 */
@RestController
@RequestMapping("/api")
public class UserResource {

    private final Logger log = LoggerFactory.getLogger(UserResource.class);
    private final String serverUrl = "http://localhost:9080/auth";
    private final String realm = "jhipster";
    private final String clientId = "User-Admin-Client";
    private final String clientSecret = "7d93a518-2777-498e-a63f-84282835624e";
    /*
     * Groups|ID
     * Employees_Admins  | ca8a3c9c-fe3a-4ba4-9001-db3688e0772a
     * Guardians | 7b465c6b-e263-4529-b59b-94b7f266c345
     * Students  | c64588a4-7fbe-4ea5-85fd-eca7314550c3
     * Teachers  | 11f79662-a32a-4be9-be9a-4449bd785470
     * */

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final UserService userService;

    public UserResource(UserService userService) {
        this.userService = userService;
    }

    /**
     * {@code POST /users/} : Create new user.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the user, or with status {@code 404 (Not Found)}.
     */
    @PostMapping("/users")
    public Optional<UserDTO> createUser(@RequestBody UserCredDto userCredDto) {

        Keycloak keycloak = KeycloakBuilder.builder()
            .serverUrl(serverUrl)
            .realm(realm)
            .grantType(OAuth2Constants.CLIENT_CREDENTIALS)
            .clientId(clientId)
            .clientSecret(clientSecret)
            .resteasyClient(new ResteasyClientBuilder().connectionPoolSize(10).build())
            .build();

        //Define Password for user
        CredentialRepresentation passwordCred = new CredentialRepresentation();
        passwordCred.setTemporary(false);
        passwordCred.setType(CredentialRepresentation.PASSWORD);
        passwordCred.setValue(userCredDto.getPassword());


        // Define user
        List<CredentialRepresentation> credentialRepresentationList = new ArrayList<>();
        credentialRepresentationList.add(passwordCred);
        UserRepresentation user = new UserRepresentation();
        user.setEnabled(true);
        user.setUsername(userCredDto.getUserDTO().getLogin());
        user.setFirstName(userCredDto.getUserDTO().getFirstName());
        user.setLastName(userCredDto.getUserDTO().getLastName());
        user.setEmail(userCredDto.getUserDTO().getEmail());
        user.setCredentials(credentialRepresentationList);

        // Get realm
        RealmResource realmResource = keycloak.realm(realm);
        UsersResource usersRessource = realmResource.users();

        Response response = usersRessource.create(user);
        String userId = CreatedResponseUtil.getCreatedId(response);


        org.keycloak.admin.client.resource.UserResource userResource = usersRessource.get(userId);
        // Assign Group Guardian to user
        switch (userCredDto.getUserDTO().getAuthorities().iterator().next()) {
            case "GUARDIAN":
                userResource.joinGroup("7b465c6b-e263-4529-b59b-94b7f266c345");
                break;
            case "TEACHER":
                userResource.joinGroup("11f79662-a32a-4be9-be9a-4449bd785470");
                break;
            case "STUDENT":
                userResource.joinGroup("c64588a4-7fbe-4ea5-85fd-eca7314550c3");
                break;
            case "ADMIN":
                userResource.joinGroup("ca8a3c9c-fe3a-4ba4-9001-db3688e0772a");
                break;
        }

        userResource = usersRessource.get(userId);
        if (response.getStatus() == 201) {
            User user1 = new User();
            user1.setId(userResource.toRepresentation().getId());
            user1.setLogin(userResource.toRepresentation().getUsername());
            user1.setEmail(userResource.toRepresentation().getEmail());
            user1.setActivated(userResource.toRepresentation().isEnabled());
            user1.setFirstName(userResource.toRepresentation().getFirstName());
            user1.setLastName(userResource.toRepresentation().getLastName());
            UserDTO usersaved = userService.save(user1);

            return Optional.of(usersaved);
        } else {
            return Optional.empty();
        }

    }

    /**
     * {@code GET /users} : get all users.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body all users.
     */
    @GetMapping("/GetAllUsers")
    public List<UserDTO> getAllUsers() {
        return userService.getAllUsers();
    }
    /**
     * {@code GET /users} : get all users.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body all users.
     */
    @GetMapping("/refreshDB")
    public List<UserDTO> refreshDB() {
        Keycloak keycloak = KeycloakBuilder.builder()
            .serverUrl(serverUrl)
            .realm(realm)
            .grantType(OAuth2Constants.CLIENT_CREDENTIALS)
            .clientId(clientId)
            .clientSecret(clientSecret)
            .resteasyClient(new ResteasyClientBuilder().connectionPoolSize(10).build())
            .build();
        RealmResource realmResource = keycloak.realm(realm);
        UsersResource usersRessource = realmResource.users();

        List<UserDTO> userOnJPAList = userService.getAllUsers(); //users on gateway but not on keycloak   //delete this users
        List<UserDTO> userOnJPAListCopy = new ArrayList<>(userOnJPAList);
        List<UserRepresentation> userRepresentationList = usersRessource.list();//users on keycloak but not on gateway //create this users
        userRepresentationList.forEach(userRepresentation -> {
            userOnJPAList.removeIf(userDTO -> userDTO.getLogin().toLowerCase().equals(userRepresentation.getUsername().toLowerCase()));
        });
        userOnJPAListCopy.forEach(userDTO -> {
            userRepresentationList.removeIf(userRepresentation -> userDTO.getLogin().toLowerCase().equals(userRepresentation.getUsername().toLowerCase()));
        });
        if (!userOnJPAList.isEmpty()) {
            userOnJPAList.forEach(userDTO -> {
                if (!userDTO.getLogin().equals("system") && !userDTO.getLogin().equals("anonymoususer")) {
                    userService.deleteUser(userDTO.getLogin());
                }
            });
        }
        if (!userRepresentationList.isEmpty()) {
            List<User> dtoToUserList = new ArrayList<>();
            userRepresentationList.forEach(userDTO -> {
                User newUser = new User();
                newUser.setId(userDTO.getId());
                newUser.setLogin(userDTO.getUsername());
                newUser.setEmail(userDTO.getEmail());
                newUser.setActivated(userDTO.isEnabled());
                newUser.setFirstName(userDTO.getFirstName());
                newUser.setLastName(userDTO.getLastName());
                dtoToUserList.add(newUser);
            });
            userService.addAllUsers(dtoToUserList);
        }
        return userService.getAllUsers();

    }

    /**
     * {@code GET /user} : get a user.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body a user.
     */
    @GetMapping("/GetAUsersByLogin/{userName}")
    public Optional<UserDTO> getAUser(@PathVariable String userName) {
        Optional<UserDTO> userDTO = userService.getAUserByUserName(userName);
        if (userDTO.isPresent()) {
            //exist on JPA,double check on keycloak
            Keycloak keycloak = KeycloakBuilder.builder()
                .serverUrl(serverUrl)
                .realm(realm)
                .grantType(OAuth2Constants.CLIENT_CREDENTIALS)
                .clientId(clientId)
                .clientSecret(clientSecret)
                .build();
            RealmResource realmResource = keycloak.realm(realm);
            try {
                Optional<UserRepresentation> userOnKeycloak = Optional.ofNullable(realmResource.users().get(userDTO.get().getId()).toRepresentation());
                if (userOnKeycloak.isPresent()) {

                    //if on keycloak exist return dto
                    log.debug("USER EXIST ON JPA AND ON KEYCLOAK");
                    System.out.println("USER: " + userOnKeycloak.get().getUsername());
                    return userDTO;
                } else {
                    return Optional.empty();
                }
            } catch (NotFoundException e) {
                //if on keycloak doesnt exit, delete it from JPA and return optional empty
                log.debug("USER EXIST ONLY ON JPA");
                userService.deleteUser(userName);
                return Optional.empty();
            }
        } else {
            //doesnt exit on JPA, search in Keycloak
            Keycloak keycloak = KeycloakBuilder.builder()
                .serverUrl(serverUrl)
                .realm(realm)
                .grantType(OAuth2Constants.CLIENT_CREDENTIALS)
                .clientId(clientId)
                .clientSecret(clientSecret)
                .build();
            RealmResource realmResource = keycloak.realm(realm);
            List<UserRepresentation> usersOnKeycloak = realmResource.users().search(userName);
            List<UserRepresentation> userOnKeycloak = new ArrayList<>();
            usersOnKeycloak.forEach(userRepresentation -> {
                if (userRepresentation.getUsername().toLowerCase().equals(userName.toLowerCase())) userOnKeycloak.add(userRepresentation);
            });
            if (!userOnKeycloak.isEmpty()) {
                log.debug("USER EXIST ON KEYCLOAK BUT NOT IN JPA CREATING...");
                //if on keycloak exist create it on JPA and return it
                User user1 = new User();
                user1.setId(userOnKeycloak.get(0).getId());
                user1.setLogin(userOnKeycloak.get(0).getUsername());
                user1.setEmail(userOnKeycloak.get(0).getEmail());
                user1.setActivated(userOnKeycloak.get(0).isEnabled());
                user1.setFirstName(userOnKeycloak.get(0).getFirstName());
                user1.setLastName(userOnKeycloak.get(0).getLastName());
                UserDTO usersaved = userService.save(user1);
                return Optional.of(usersaved);
            } else {
                log.debug("USER DOESNT EXIST ANYWHERE");
                return Optional.empty();
            }
        }
    }

    /**
     * {@code DEL /user} : delete a user.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body a user.
     */
    @DeleteMapping("/deleteUserByUserName/{userName}")
    public void deleteUser(@PathVariable String userName) {
        Optional<UserDTO> userDTO = userService.getAUserByUserName(userName);
        if (userDTO.isPresent()) {
            //exist on JPA,double check on keycloak
            Keycloak keycloak = KeycloakBuilder.builder()
                .serverUrl(serverUrl)
                .realm(realm)
                .grantType(OAuth2Constants.CLIENT_CREDENTIALS)
                .clientId(clientId)
                .clientSecret(clientSecret)
                .build();
            RealmResource realmResource = keycloak.realm(realm);
            try {
                Optional<UserRepresentation> userOnKeycloak = Optional.ofNullable(realmResource.users().get(userDTO.get().getId()).toRepresentation());
                if (userOnKeycloak.isPresent()) {
                    realmResource.users().delete(userDTO.get().getId());
                    userService.deleteUser(userName);
                }
            } catch (NotFoundException e) {
                userService.deleteUser(userName);
            }
        } else {
            //doesnt exit on JPA, search in Keycloak
            Keycloak keycloak = KeycloakBuilder.builder()
                .serverUrl(serverUrl)
                .realm(realm)
                .grantType(OAuth2Constants.CLIENT_CREDENTIALS)
                .clientId(clientId)
                .clientSecret(clientSecret)
                .build();
            RealmResource realmResource = keycloak.realm(realm);
            List<UserRepresentation> usersOnKeycloak = realmResource.users().search(userName);
            List<UserRepresentation> userOnKeycloak = new ArrayList<>();
            usersOnKeycloak.forEach(userRepresentation -> {
                if (userRepresentation.getUsername().toLowerCase().equals(userName.toLowerCase())) userOnKeycloak.add(userRepresentation);
            });
            if (!userOnKeycloak.isEmpty()) {
                //if on keycloak exist delete it
                realmResource.users().delete(userOnKeycloak.get(0).getId());
            }
        }
    }

    /**
     * {@code PUT /users/} : Update a user.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the user, or with status {@code 404 (Not Found)}.
     */
    @PutMapping("/users/{userName}")
    public Optional<UserDTO> updateUser(@PathVariable String userName,@RequestBody UserDTO userDTO) {
        Optional<UserDTO> userInJPA=userService.getAUserByUserName(userName);
        Optional<UserDTO> userReturn=Optional.empty();
        if (userInJPA.isPresent()){

            //GET the changes from de DTO
            if (userDTO.getEmail()!=null){
                userInJPA.get().setEmail(userDTO.getEmail());
            }
            if (userDTO.getFirstName()!=null){
                userInJPA.get().setFirstName(userDTO.getFirstName());
            }
            if (userDTO.getLastName()!=null){
                userInJPA.get().setLastName(userDTO.getLastName());
            }
            userService.updateUserfromDto(userInJPA.get());
            Keycloak keycloak = KeycloakBuilder.builder()
                .serverUrl(serverUrl)
                .realm(realm)
                .grantType(OAuth2Constants.CLIENT_CREDENTIALS)
                .clientId(clientId)
                .clientSecret(clientSecret)
                .resteasyClient(new ResteasyClientBuilder().connectionPoolSize(10).build())
                .build();

            // Get realm
            RealmResource realmResource = keycloak.realm(realm);
            UsersResource usersRessource = realmResource.users();
            //get the user from keycloak
            org.keycloak.admin.client.resource.UserResource userResource=  usersRessource.get(userInJPA.get().getId());
            UserRepresentation userRepresentation=new UserRepresentation();
            userRepresentation.setEmail(userDTO.getEmail());
            userRepresentation.setFirstName(userDTO.getFirstName());
            userRepresentation.setLastName(userDTO.getLastName());
            userResource.update(userRepresentation);
            return userReturn;
        }else{
            return Optional.empty();
        }

    }
    /**
     * {@code PUT /users/} : Update a user.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the user, or with status {@code 404 (Not Found)}.
     */
    @PutMapping("/users/credentials/{userName}")
    public Optional<UserDTO> updateUserCredentials(@PathVariable String userName,@PathVariable String credentials) {
        Optional<UserDTO> userInJPA=userService.getAUserByUserName(userName);
        if (userInJPA.isPresent()){
            Keycloak keycloak = KeycloakBuilder.builder()
                .serverUrl(serverUrl)
                .realm(realm)
                .grantType(OAuth2Constants.CLIENT_CREDENTIALS)
                .clientId(clientId)
                .clientSecret(clientSecret)
                .resteasyClient(new ResteasyClientBuilder().connectionPoolSize(10).build())
                .build();

            //Define Password for user
            CredentialRepresentation passwordCred = new CredentialRepresentation();
            passwordCred.setTemporary(false);
            passwordCred.setType(CredentialRepresentation.PASSWORD);
            passwordCred.setValue(credentials);

            // Define user
            List<CredentialRepresentation> credentialRepresentationList = new ArrayList<>();
            credentialRepresentationList.add(passwordCred);

            // Get realm
            RealmResource realmResource = keycloak.realm(realm);
            UsersResource usersRessource = realmResource.users();
            //get the user from keycloak
            org.keycloak.admin.client.resource.UserResource userResource=  usersRessource.get(userInJPA.get().getId());
            UserRepresentation userRepresentation=userResource.toRepresentation();
            userRepresentation.setCredentials(credentialRepresentationList);
            userResource.update(userRepresentation);
            return userInJPA;
        }else{
            return Optional.empty();
        }
    }
    /**
     * {@code PUT /users/} : unable a user.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the user, or with status {@code 404 (Not Found)}.
     */
    @PutMapping("/users/unable/{userName}")
    public Optional<UserDTO> unableUser(@PathVariable String userName) {
        Optional<UserDTO> userInJPA=userService.getAUserByUserName(userName);
        if (userInJPA.isPresent()){
            userInJPA.get().setActivated(false);
            userService.updateUserfromDto(userInJPA.get());

            Keycloak keycloak = KeycloakBuilder.builder()
                .serverUrl(serverUrl)
                .realm(realm)
                .grantType(OAuth2Constants.CLIENT_CREDENTIALS)
                .clientId(clientId)
                .clientSecret(clientSecret)
                .resteasyClient(new ResteasyClientBuilder().connectionPoolSize(10).build())
                .build();


            // Get realm
            RealmResource realmResource = keycloak.realm(realm);
            UsersResource usersRessource = realmResource.users();
            //get the user from keycloak
            org.keycloak.admin.client.resource.UserResource userResource=  usersRessource.get(userInJPA.get().getId());
            UserRepresentation userRepresentation=userResource.toRepresentation();
            userRepresentation.setEnabled(false);
            userResource.update(userRepresentation);
            return userInJPA;
        }else{
            return Optional.empty();
        }
    }
    /**
     * {@code PUT /users/} : unable a user.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the user, or with status {@code 404 (Not Found)}.
     */
    @PutMapping("/users/enable/{userName}")
    public Optional<UserDTO> enableUser(@PathVariable String userName) {
        Optional<UserDTO> userInJPA=userService.getAUserByUserName(userName);
        if (userInJPA.isPresent()){
            userInJPA.get().setActivated(true);
            userService.updateUserfromDto(userInJPA.get());

            Keycloak keycloak = KeycloakBuilder.builder()
                .serverUrl(serverUrl)
                .realm(realm)
                .grantType(OAuth2Constants.CLIENT_CREDENTIALS)
                .clientId(clientId)
                .clientSecret(clientSecret)
                .resteasyClient(new ResteasyClientBuilder().connectionPoolSize(10).build())
                .build();


            // Get realm
            RealmResource realmResource = keycloak.realm(realm);
            UsersResource usersRessource = realmResource.users();
            //get the user from keycloak
            org.keycloak.admin.client.resource.UserResource userResource=  usersRessource.get(userInJPA.get().getId());
            UserRepresentation userRepresentation=userResource.toRepresentation();
            userRepresentation.setEnabled(true);
            userResource.update(userRepresentation);
            return userInJPA;
        }else{
            return Optional.empty();
        }
    }
}
