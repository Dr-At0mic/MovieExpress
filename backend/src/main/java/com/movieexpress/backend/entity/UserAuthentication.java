package com.movieexpress.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserAuthentication implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userAuthenticationId;
    @JoinColumn(name = "user")
    @OneToOne(cascade = CascadeType.ALL,fetch = FetchType.EAGER, orphanRemoval = true)
    private User user;
    @Column
    private String password;
    @Column
    private String RefreshToken;
}
