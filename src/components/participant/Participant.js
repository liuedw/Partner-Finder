import React from 'react';
import OutsideAlerter from "../OutsideAlerter";

const Participant = properties => {
    let deleteForm;
    if (parseInt(properties.state.deleting) === properties.participant.id) {
        deleteForm =
        <div className="delete-wrapper">
            <OutsideAlerter onCancel={properties.onCancel}>
                <div className="delete-form">
                    <div className="prompt">Password: </div>
                    {
                        properties.state.invalid ?
                        <div className="mismatch">The entered password is invalid!</div> :
                        null
                    }
                    <input className="long-input"
                        name="password"
                        type="password"
                        value={properties.state.name}
                        placeholder="password"
                        onChange={properties.onChange}
                    />
                    <label className="checkbox-label">
                        <input type="checkbox"
                                id={properties.participant.id}
                                name={properties.state.confirmation}
                                onClick={properties.onCheck}
                        />
                        I understand that this is irreversible.
                    </label>
                    <div className="decision-buttons">
                        <button className="cancel" onClick={properties.onCancel}> Cancel </button>
                        <div className="divider1"/>
                        <button className="submit" onClick={properties.onSubmit} id={properties.participant.id} value={properties.participant.hashword}>Submit</button>
                    </div>
                </div>
            </OutsideAlerter>
        </div>
    } else {
        deleteForm = null;
    }
    return (
        <div className="bio">
            <div className="name">{properties.participant.name}</div>
            <div className="desc">Contact Info:</div>
            <div className="data">{properties.participant.contact}</div>
            <div className="desc">Skills:</div>
            <div className="data">{properties.participant.skills}</div>
            <div className="desc">Introduction:</div>
            <div className="data">{properties.participant.greeting}</div>
            {deleteForm}
            <button className="delete-button" name={properties.participant.name} id={(properties.participant.id)} onClick={properties.onDelete}>Delete</button>
        </div>
    );
}

export default Participant;