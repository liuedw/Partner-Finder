import React from 'react';

const CreateMenu = parent => {
    const skills = [];
    for (let i = 0; i < parent.state.relevantSkills.length; i++) {
        let name = parent.state.relevantSkills[i]
        skills.push(
            <div className="grid-container">
                <div className="skills" key={i}> {name} </div>
                <button className={"delete-skill"} onClick={parent.onDelete} name={name}>Delete</button> 
            </div>
        );
    }
    return (
        <div className="editfields2">
            <div>
                <div className="prompt">Event Name: </div>
                <input
                    name="name"
                    value={parent.state.name}
                    onChange={parent.onChange}
                />
            </div>
            <div>
                <div className="prompt">Skills: </div>
                <input
                    name="skillToAdd"
                    value={parent.state.skillToAdd}
                    onKeyPress={parent.onKeyPress}
                    onChange={parent.onChange}
                />
                <button className="submit" name="add" onClick={parent.onAdd}>Add Skill To Event</button>
            </div>
            <div>
                {skills}
            </div>
            <div className="decision-buttons">
                <button className="cancel" onClick={parent.onCancel}>Close</button>
                <div className="divider1"/>
                <button className="submit" onClick={parent.onSubmit}>Submit</button>
                <div className="divider1" />
                <button className="cancel" onClick={parent.onClear}>Clear Fields</button>
            </div>
        </div>
    );
};

export default CreateMenu;