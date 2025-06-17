import React, {ChangeEvent, useEffect, useState} from 'react';
import f from "./Profile.module.css"

type PropsType = {
    status: string
    isOwner: boolean
    updateStatusThunk: (status: string) => void
    }

const ProfileStatus: React.FC<PropsType> = (props) => {
    let [editMode, setEditMode] = useState<boolean>(false)
    let [status, setStatus] = useState<string>(props.status)

    useEffect(() => {
        setStatus(props.status)
    }, [props.status])

    let activateEditMode = () => {
        if (props.isOwner) {
            setEditMode(true)
        }
    };

    let deActivateEditMode = () => {
        setEditMode(false)
        props.updateStatusThunk(status)
    };

    let onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.target.value)
    }
    return (
        <div className={f.status}>
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