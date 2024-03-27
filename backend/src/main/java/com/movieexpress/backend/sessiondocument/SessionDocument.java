package com.movieexpress.backend.sessiondocument;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.MongoId;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Date;

@Document
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SessionDocument implements Serializable {
    @MongoId
    private ObjectId mongosId;
    @Field
    private String accountVerificationToken;
    @Field
    private Object data;
    @Field
    private int Count;
    @CreatedDate
    private LocalDateTime timeStamp;
}
