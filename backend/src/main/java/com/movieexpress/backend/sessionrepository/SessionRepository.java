package com.movieexpress.backend.sessionrepository;

import com.movieexpress.backend.sessiondocument.SessionDocument;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.MongoId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SessionRepository extends MongoRepository<SessionDocument, ObjectId> {
    SessionDocument findByAccountVerificationToken(String sessionAccessToken);
}
