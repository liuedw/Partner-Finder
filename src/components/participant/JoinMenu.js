import React from 'react';

const JoinMenu = parent => {
    let mismatch;
    if (parent.state.password !== parent.state.confirmation) {
        mismatch = <div className="mismatch">Passwords do not match!</div>
    } else {
        mismatch = null
    }
    const skills = []
    for (let i = 0; i < parent.state.relevantSkills.length; i++) {
        skills.push(
            <label className="checkbox-label" key={parent.state.relevantSkills[i].id}>
                <input type="checkbox"
                    id={parent.state.relevantSkills[i].id}
                    name={parent.state.relevantSkills[i].name}
                    onClick={parent.onCheck}
                />
                {parent.state.relevantSkills[i].name}
            </label>
        );
    }
    return (
        <div className="editfields">
            <div>
                <div className="prompt">Name: </div>
                <input
                    name="name"
                    value={parent.state.name}
                    onKeyPress={parent.onKeyPress}
                    onChange={parent.onChange}
                />
            </div>
            <div>
                <div className="prompt">Contact: </div>
                <input
                    name="contact"
                    value={parent.state.contact}
                    onKeyPress={parent.onKeyPress}
                    onChange={parent.onChange}
                />
            </div>
            <div>
                <div className="prompt">Skills: </div>
                {skills}
            </div>
            <div>
                <div className="prompt">Introduction: </div>
                <textarea
                    name="greeting"
                    value={parent.state.greeting}
                    onKeyPress={parent.onKeyPress}
                    onChange={parent.onChange}
                />
            </div>
            <div>
                <div className="prompt">Password: </div>
                <input
                    name="password"
                    type="password"
                    value={parent.state.password}
                    onKeyPress={parent.onKeyPress}
                    onChange={parent.onChange}
                />
            </div>
            <div>
                <div className="prompt">Confirm Password: </div>
                {mismatch}
                <input
                    name="confirmation"
                    type="password"
                    value={parent.state.confirmation}
                    onKeyPress={parent.onKeyPress}
                    onChange={parent.onChange}
                />
            </div>
            <div className="decision-buttons">
                <button className="cancel" onClick={parent.onCancel}> Cancel </button>
                <div className="divider1"/>
                <button className="submit" onClick={parent.onSubmit}>Submit</button>
                <div className="divider1"/>
                <button className="cancel" name="clear" onClick={parent.onClear}> Clear Fields </button>
            </div>
        </div>
    );
};

export default JoinMenu;