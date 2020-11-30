package com.BoundlessPartners.dao;

import com.BoundlessPartners.model.Project;
import com.BoundlessPartners.model.Participant;
import com.BoundlessPartners.model.Skill;
import org.springframework.stereotype.Repository;

import java.io.FileInputStream;
import java.io.IOException;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;
import java.util.Scanner;

@Repository("sqlDao")
public class ParticipantSQL implements ParticipantDao {
    private Connection conn;

    // SQL commands used to add a project to the database
    private static final String ADD_PROJECT = "INSERT INTO Projects VALUES(?, ?)";
    private static final String GET_PROJECT_COUNT = "SELECT COUNT(*) FROM Projects";
    private static final String ADD_SKILL = "INSERT INTO Skills(projectID, name) VALUES(?,?)";
    private PreparedStatement addProjectStatement;
    private PreparedStatement getProjectCountStatement;
    private PreparedStatement addSkillStatement;

    // SQL command used to add a participant to a project
    private static final String ADD_PARTICIPANT = "INSERT INTO Participants(projectID, name, contact, skills, " +
            "message, hashword, salt) VALUES(?, ?, ?, ?, ?, ?, ?)";
    private PreparedStatement addParticipantStatement;

    // SQL commands to get a set of participants with a set of skills from a project
    private static final String GET_PARTICIPANT = "SELECT * FROM Participants AS P WHERE P.projectID = ?";
    private static final String GET_SKILL = "SELECT * FROM Skills AS S WHERE S.id = ?";
    private PreparedStatement getParticipantStatement;
    private PreparedStatement getSkillStatement;

    // SQL command to get a set of qualifications for a certain project
    private static final String GET_PROJECT_SKILLS = "SELECT * FROM Skills AS S WHERE S.projectID = ?";
    private PreparedStatement getProjectSkillsStatement;

    // SQL commands to delete a participant from a project
    private static final String DELETE_PARTICIPANT = "DELETE FROM Participants WHERE id = ?";
    private static final String GET_PARTICIPANT_BY_ID = "SELECT * FROM Participants WHERE id = ?";
    private PreparedStatement deleteParticipantStatement;
    private PreparedStatement getParticipantByIDStatement;

    // SQL commands used to add a project to the database
    private static final String GET_PROJECT_NAME = "SELECT name FROM Projects WHERE id = ?";
    private PreparedStatement getProjectNameStatement;

    /**
     * Initializes a new ParticipantSQL trivially
     * @throws SQLException If there was an issue connecting with the database
     */
    public ParticipantSQL() throws SQLException, IOException {
        this(null, null, null, null);
    }

    /**
     * Initializes a new ParticipantSQL which allows connection to the Peer Finder database
     * @param serverURL The URL of the database
     * @param dbName THe name of the database
     * @param adminName The username of an admin
     * @param password The admin's password
     * @throws SQLException If there was an issue connecting with the database.
     * @throws IOException If unable to read from the file where the above information is stored
     */
    protected ParticipantSQL(String serverURL, String dbName, String adminName, String password)
            throws SQLException, IOException {
        conn = serverURL == null ? openConnectionFromDbConn()
                : openConnectionFromCredential(serverURL, dbName, adminName, password);

        prepareStatements();
    }

    /**
     * Opens connection to the project database based on passed credentials.
     * @param serverURL The URL of the database
     * @param dbName THe name of the database
     * @param adminName The username of an admin
     * @param password The admin's password
     * @return A Connection object representing a connection to the database
     * @throws SQLException If there was an issue connecting with the database.
     */
    protected static Connection openConnectionFromCredential(String serverURL, String dbName,
                                                             String adminName, String password) throws SQLException {
        String connectionUrl =
                String.format("jdbc:sqlserver://%s:1433;databaseName=%s;user=%s;password=%s", serverURL,
                        dbName, adminName, password);
        Connection conn = DriverManager.getConnection(connectionUrl);

        // By default, automatically commit after each statement
        conn.setAutoCommit(true);

        // By default, set the transaction isolation level to serializable
        conn.setTransactionIsolation(Connection.TRANSACTION_SERIALIZABLE);

        return conn;
    }

    /**
     * Opens a connection to the database
     * @return A connection to the database
     * @throws SQLException If could not establish a connection
     * @throws IOException If could not read credentials from file
     */
    public static Connection openConnectionFromDbConn() throws SQLException, IOException {
        // Connect to the database with the provided connection configuration
        Properties configProps = new Properties();
        configProps.load(new FileInputStream("src/main/resources/dbconn.properties"));
        String serverURL = configProps.getProperty("partner-finder.server_url");
        String dbName = configProps.getProperty("partner-finder.database_name");
        String adminName = configProps.getProperty("partner-finder.username");
        String password = configProps.getProperty("partner-finder.password");
        return openConnectionFromCredential(serverURL, dbName, adminName, password);
    }

    /**
     * Prepares the SQL statements
     * @throws SQLException If fails to prepare the statements
     */
    private void prepareStatements() throws SQLException {
        addProjectStatement = conn.prepareStatement(ADD_PROJECT);
        getProjectCountStatement = conn.prepareStatement(GET_PROJECT_COUNT);
        addSkillStatement = conn.prepareStatement(ADD_SKILL);
        addParticipantStatement = conn.prepareStatement(ADD_PARTICIPANT);
        getParticipantStatement = conn.prepareStatement(GET_PARTICIPANT);
        getSkillStatement = conn.prepareStatement(GET_SKILL);
        getProjectSkillsStatement = conn.prepareStatement(GET_PROJECT_SKILLS);
        deleteParticipantStatement = conn.prepareStatement(DELETE_PARTICIPANT);
        getParticipantByIDStatement = conn.prepareStatement(GET_PARTICIPANT_BY_ID);
        getProjectNameStatement = conn.prepareStatement(GET_PROJECT_NAME);
    }

    /**
     * Adds a new project to the database.
     * @param project The project to be added.
     * @return 1 if the project was added successfully, 0 otherwise.
     */
    @Override
    public int addProject(Project project) {
        try {
            ResultSet results = getProjectCountStatement.executeQuery();
            results.next();
            int id = results.getInt(1);
            results.close();

            addProjectStatement.clearParameters();
            addProjectStatement.setInt(1, id);
            addProjectStatement.setString(2, project.getName());
            addProjectStatement.execute();

            for(Skill skill : project.getSkills()) {
                addSkillStatement.clearParameters();
                addSkillStatement.setInt(1, id);
                addSkillStatement.setString(2, skill.name);
                addSkillStatement.execute();
            }

            return id;

        } catch (Exception e) {
            e.printStackTrace();
        }
        return -1;
    }

    /**
     * Adds a participant to a project
     * @param projectID The ID of the project.
     * @param participant The participant.
     */
    @Override
    public void addParticipant(int projectID, Participant participant) {
        try {
            String skills = "";
            for(Skill skill : participant.getSkills()) {
                skills = skills + " [" + skill.id + "]";
            }

            addParticipantStatement.clearParameters();
            addParticipantStatement.setInt(1, projectID);
            addParticipantStatement.setString(2, participant.getName());
            addParticipantStatement.setString(3, participant.getContact());
            addParticipantStatement.setString(4, skills);
            addParticipantStatement.setString(5, participant.getMessage());
            addParticipantStatement.setString(6, participant.getHashword());
            addParticipantStatement.setString(7, participant.getSalt());

            addParticipantStatement.execute();

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    // Parses a string representing a list of skills in the database and
    // Returns those in a list of skill objects
    private List<Skill> getSkills(String skills) throws SQLException {
        List<String> strArr = new ArrayList<>();
        Scanner scan = new Scanner(skills);
        while (scan.hasNext()) {
            String str = scan.next();
            str = str.substring(1, str.length() - 1);
            strArr.add(str);
        }
        List<Skill> skillList = new ArrayList<>();
        for (String skillIDStr : strArr) {
            int skillID = Integer.parseInt(skillIDStr);
            getSkillStatement.clearParameters();
            getSkillStatement.setInt(1, skillID);

            ResultSet result = getSkillStatement.executeQuery();
            if (! result.next()) {
                throw new IllegalStateException("Skill does not exist!");
            }
            String skillName = result.getString("name");
            int projectID = result.getInt("projectID");
            skillList.add(new Skill(skillID, projectID, skillName));
        }
        return skillList;
    }

    /**
     * Gets a list of all participants in a certain project that contain a given set of qualifications.
     * @param projectID The ID of the project.
     * @param skills A list of qualifications that each participant returned should have.
     * @return A list of all participants that have all the given qualifications.
     */
    @Override
    public List<Participant> getParticipants(int projectID, List<Integer> skills) {
        List<Participant> participants = new ArrayList<>();
        try {
            getParticipantStatement.clearParameters();
            getParticipantStatement.setInt(1, projectID);
            ResultSet results = getParticipantStatement.executeQuery();
            // id, project id, name, contact, skills, message, hashed password, salt
            while (results.next()) {
                int id = results.getInt("id");
                String name = results.getString("name");
                String contact = results.getString("contact");
                List<Skill> skillList = getSkills(results.getString("skills"));
                String message = results.getString("message");
                String hashword = results.getString("hashword");
                boolean isValid = true;
                if (skills != null) {
                    for (int skill : skills) {
                        boolean contains = false;
                        for (Skill s : skillList) {
                            if (s.id == skill) {
                                contains = true;
                                break;
                            }
                        }
                        if (!contains) {
                            isValid = false;
                            break;
                        }
                    }
                }
                if (isValid) {
                    participants.add(new Participant(id, name, contact, skillList, message, hashword));
                }
            }
            return participants;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    /**
     * Gets a list of all qualifications that a project has.
     * @param projectID The ID of the project.
     * @return A list of all qualifications for a project.
     */
    @Override
    public List<Skill> getSkills(int projectID) {
        // id, projectID, name
        List<Skill> skills = new ArrayList<>();
        try {
            getProjectSkillsStatement.clearParameters();
            getProjectSkillsStatement.setInt(1, projectID);
            ResultSet results = getProjectSkillsStatement.executeQuery();

            while (results.next()) {
                int id = results.getInt("id");
                String name = results.getString("name");
                skills.add(new Skill(id, projectID, name));
            }
            return skills;
        } catch (Exception e) {
            e.printStackTrace();;
        }
        return null;
    }

    /**
     * Removes a participant from a project.
     * @param participantID The ID of the participant within a project.
     * @param hashword The password the participant used to register for the project.
     * @return 1 if the participant was successfully deleted from the project, 0 otherwise.
     */
    @Override
    public int deleteParticipant(int participantID, String hashword) {
        try {
            getParticipantByIDStatement.clearParameters();
            getParticipantByIDStatement.setInt(1, participantID);
            ResultSet result = getParticipantByIDStatement.executeQuery();

            if (!result.next()) {
                return 0;
            }

            if (result.getString("hashword").equals(hashword)) {
                deleteParticipantStatement.clearParameters();
                deleteParticipantStatement.setInt(1, participantID);
                deleteParticipantStatement.execute();
                return 1;
            }
            return 0;
        } catch (Exception e) {
            e.printStackTrace();;
        }
        return 0;
    }

    @Override
    public String getProjectName(int projectID) {
        try {
            getProjectNameStatement.clearParameters();
            getProjectNameStatement.setInt(1, projectID);
            ResultSet results = getProjectNameStatement.executeQuery();

            if (results.next()) {
                return results.getString("name");
            }
        } catch (Exception e) {
            e.printStackTrace();;
        }
        return null;
    }
}