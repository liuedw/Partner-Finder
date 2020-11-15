import React from 'react';

const FilterParticipant = parent => {
    var skills = [];
    for (var i = 0; i < parent.state.relevantSkills.length; i++) {
        skills.push(
            <label className="checkbox-label" key={parent.state.relevantSkills[i].id}>
                <input type="checkbox"
                    id={parent.state.relevantSkills[i].id}
                    name={parent.state.relevantSkills[i].name}
                    onClick={parent.onClick}
                />
                {parent.state.relevantSkills[i].name}
            </label>
        );
    }
    return (
      <div className="formcontainer">
        <div className="selectfilter">
          {skills}
        </div>
        <div className="decision-buttons">
          <button className="cancel" onClick={parent.onCancel}> Cancel </button>
          <div className="divider1"/>
          <button className="submit" onClick={parent.onSubmit}>Submit</button>
        </div>
      </div>
    );
};

export default FilterParticipant;