import React, {useEffect, useState} from 'react';

const ProfileStatus = (props) => {
    let [editMode , setEditMode]= useState(false)
    let [status , setStatus]= useState(props.status)

    useEffect( ()=> {
        setStatus(props.status)
    }, [props.status])

    let activateEditMode = () => {
        setEditMode (true)
    };

    let deActivateEditMode = () => {
        setEditMode (false)
        props.updateStatusThunk(status)
    };

    let onStatusChange = (e) => {
        setStatus (e.target.value)
    }
        return (
            <div>
                {!editMode &&
                    <div>
                        <span onDoubleClick={activateEditMode}>{status || "there is no status"}</span>
                    </div>
                }
                {editMode &&
                    <div>
                        <input autoFocus={true} onBlur={deActivateEditMode}
                               onChange={onStatusChange}
                               value={status}/>
                    </div>
                }
            </div>
        )
    }



export default ProfileStatus