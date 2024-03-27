package com.movieexpress.backend.sessiondocument;

import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.LocalDateTime;
@Document
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Log {
    @Id
    private ObjectId logId;
    @Field
    private String ipAddress;
    @Field
    private String token;
    @Field
    private String emailId;
    @CreatedDate
    private LocalDateTime timeStamp;

}
