package com.BoundlessPartners.model;

/**
 * A class representing a skill.
 * Each participant has a unique id
 */
public class Skill {
    public int id;
    public int projectID;
    public String name;

    public Skill(int id, int projectID, String name) {
        this.projectID = projectID;
        this.name = name;
        this.id = id;
    }
}
