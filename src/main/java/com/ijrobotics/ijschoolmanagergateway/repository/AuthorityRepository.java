package com.ijrobotics.ijschoolmanagergateway.repository;

import com.ijrobotics.ijschoolmanagergateway.domain.Authority;

import feign.Param;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

/**
 * Spring Data JPA repository for the {@link Authority} entity.
 */
public interface AuthorityRepository extends JpaRepository<Authority, String> {

    Optional<Authority> findByNameLike(@Param("name") String name);
}
