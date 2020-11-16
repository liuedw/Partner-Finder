import React from 'react';

const FilterMenu = parent => {
    const skills = [];
    for (let i = 0; i < parent.state.relevantSkills.length; i++) {
        skills.push(
            <div className="filter-grid-item" key={parent.state.relevantSkills[i].id}>
                <label className="checkbox-label" key={parent.state.relevantSkills[i].id}>
                    <input type="checkbox"
                        id={parent.state.relevantSkills[i].id}
                        name={parent.state.relevantSkills[i].name}
                        onChange={parent.onChange}
                        checked={parent.getFilter().includes(parent.state.relevantSkills[i].id)}
                    />
                    {parent.state.relevantSkills[i].name}
                </label>
            </div>
        );
    }
    return (
      <div className="editfields">
          <div className="filter-grid">
              {skills}
          </div>
          <div className="decision-buttons">
              <button className="cancel" name="close" onClick={parent.onCancel}> Close </button>
              <div className="divider1"/>
              <button className="cancel" name="clear" onClick={parent.onCancel}> Clear Filters </button>
          </div>
      </div>
    );
};

export default FilterMenu;