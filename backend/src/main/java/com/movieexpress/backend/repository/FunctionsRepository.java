package com.movieexpress.backend.repository;

import com.movieexpress.backend.entity.Functions;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FunctionsRepository extends JpaRepository<Functions, Long> {
    Functions findByFunctionName(String s);
}
