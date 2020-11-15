package com.BoundlessPartners.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.*;

/**
 * A class representing a participant.
 * Each participant has a unique id
 */
public class Participant {
    private final int id;
    private final String name;
    private final String contact;
    private final List<Skill> skills;
    private final String message;
    private final String hashword;
    private final String salt;

    public Participant(@JsonProperty("id") int id,
                       @JsonProperty("name") String name,
                       @JsonProperty("contact") String contact,
                       @JsonProperty("skills") List<Skill> skills,
                       @JsonProperty("message") String message,
                       @JsonProperty("hashword") String password,
                       @JsonProperty("salt") String salt) {
        this.id = id;
        this.name = name;
        this.contact = contact;
        this.skills = skills;
        this.message = message;
        this.hashword = password;
        this.salt = salt;
    }

    public Participant(int id, String name, String contact, List<Skill> skills, String message, String hashword) {
        this.id = id;
        this.name = name;
        this.contact = contact;
        this.skills = skills;
        this.message = message;
        this.hashword = hashword;
        this.salt = "";
    }

    public String getName() {
        return name;
    }

    public String getContact() {
        return contact;
    }

    public List<Skill> getSkills() {
        return skills;
    }

    public String getMessage() {
        return message;
    }

    public int getID() {
        return id;
    }

    public String getHashword() {
        return hashword;
    }

    public String getSalt() {
        return salt;
    }
}
