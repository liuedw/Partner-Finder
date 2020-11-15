package com.BoundlessPartners.dao;

import com.BoundlessPartners.model.Participant;
import com.BoundlessPartners.model.Project;
import com.BoundlessPartners.model.Skill;

import java.util.List;

public interface ParticipantDao {

    /**
     * Adds a new project to the database.
     * @param project The project to be added.
     * @return 1 if the project was added successfully, 0 otherwise.
     */
    int addProject(Project project);

    /**
     * Adds a participant to a project
     * @param projectID The ID of the project.
     * @param participant The participant.
     */
    void addParticipant(int projectID, Participant participant);

    /**
     * Gets a list of all participants in a certain project that contain a given set of qualifications.
     * @param projectID The ID of the project.
     * @param skills A list of qualifications that each participant returned should have.
     * @return A list of all participants that have all the given qualifications.
     */
    List<Participant> getParticipants(int projectID, List<Integer> skills);

    /**
     * Gets a list of all qualifications that a project has.
     * @param projectID The ID of the project.
     * @return A list of all qualifications for a project.
     */
    List<Skill> getSkills(int projectID);

    /**
     * Removes a participant from a project.
     * @param participantID The ID of the participant within a project.
     * @param hashword The password the participant used to register for the project.
     * @return 1 if the participant was successfully deleted from the project, 0 otherwise.
     */
    int deleteParticipant(int participantID, String hashword);


}