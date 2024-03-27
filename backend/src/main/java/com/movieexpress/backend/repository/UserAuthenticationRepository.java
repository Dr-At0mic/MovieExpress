package com.movieexpress.backend.repository;

import com.movieexpress.backend.entity.User;
import com.movieexpress.backend.entity.UserAuthentication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserAuthenticationRepository extends JpaRepository<UserAuthentication, Long> {
    UserAuthentication findByUser(User user);
}
