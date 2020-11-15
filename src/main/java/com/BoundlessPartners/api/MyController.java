package com.BoundlessPartners.api;

import com.BoundlessPartners.model.Project;
import com.BoundlessPartners.dao.ParticipantDao;
import com.BoundlessPartners.model.Skill;
import com.BoundlessPartners.model.Participant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * This class interacts with the front end to access information in the database.
 */
@RequestMapping("api")
@RestController
@CrossOrigin("*")
public class MyController {

    // A reference to the getter/setters in the database
    private final ParticipantDao participantDao;

    /**
     * Constructs a new MyController object
     * @param participantDao A reference to the database where information about participants/projects are stored.
     */
    @Autowired
    public MyController(@Qualifier("sqlDao") ParticipantDao participantDao) {
        this.participantDao = participantDao;
    }

    /**
     * Adds a new project to the database.
     * @param project A project.
     * @return 1 if a project was successfully added, 0 otherwise.
     */
    @PostMapping(path = "/project")
    public int createProject(@RequestBody Project project) {
        return participantDao.addProject(project);
    }

    /**
     * Returns the requirements for the project.
     * @param projectID The ID of the project
     * @return A list representing the requirements of the project.
     */
    @GetMapping(path = "/skills")
    public List<Skill> getSkills(@RequestParam int projectID) {
        return participantDao.getSkills(projectID);
    }

    /**
     * Adds a new participant to a project
     * @param projectID The ID of the project.
     * @param participant The participant.
     */
    @PostMapping(path = "/add")
    public void addParticipant(@RequestParam int projectID, @RequestBody Participant participant) {
        participantDao.addParticipant(projectID, participant);
    }

    /**
     * Returns a list of all the participants in a project
     * @param projectID The ID of the project.
     * @param skills A list of qualifications to filter participants by. If no list is given, then does not filter.
     * @return A list of participants that have all the given qualifications.
     */
    @GetMapping(path = "/participants")
    public List<Participant> getParticipants(@RequestParam int projectID,
                                             @RequestParam(required = false) List<Integer> skills) {
        return participantDao.getParticipants(projectID, skills);
    }

    /**
     * Removes a participant from a project.
     * @param participant The participant to be removed from a project.
     * @return 1 if the participant was successfully removed, 0 otherwise.
     */
    @PostMapping(path = "/delete")
    public int deleteParticipant(@RequestBody Participant participant) {
        return participantDao.deleteParticipant(participant.getID(), participant.getHashword());
    }

}