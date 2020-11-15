package com.BoundlessPartners.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.*;

/**
 * A class representing a project.
 * Each participant has a unique id
 */
public class Project {
    private final int id;
    private final String name;
    private final List<Skill> skills;

    public Project(@JsonProperty("id") int id,
                   @JsonProperty("name") String name,
                   @JsonProperty("skills") List<Skill> skills) {
        this.id = id;
        this.name = name;
        this.skills = skills;
    }

    public String getName() {
        return name;
    }

    public List<Skill> getSkills() {
        return skills;
    }

    public int getID() {
        return id;
    }
}

