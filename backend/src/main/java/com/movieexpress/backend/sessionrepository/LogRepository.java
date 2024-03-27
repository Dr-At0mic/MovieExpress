package com.movieexpress.backend.sessionrepository;

import com.movieexpress.backend.sessiondocument.Log;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LogRepository extends MongoRepository<Log, ObjectId> {
}
