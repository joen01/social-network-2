import React, {ChangeEvent} from 'react';

type PropsType = {
    status:string
    updateStatusThunk:(status: string)=>void

}
type StateType={
    editMode: boolean
    status:string

}


class ProfileStatus extends React.Component<PropsType,StateType> {
    state = {
        editMode: false,
        status: this.props.status || ""
    };


    activateEditMode = () => {
        this.setState({editMode: true})
    };

    deActivateEditMode = () => {
        this.setState({editMode: false})
        this.props.updateStatusThunk(this.state.status)
    };
    onStatusChange = (e:ChangeEvent<HTMLInputElement>) => {
        this.setState({status: e.target.value})
    }

    componentDidUpdate(prevProps:PropsType, prevState:StateType) {
        if (prevProps.status !== this.props.status) {
            this.setState({status: this.props.status || ""});
        }
    }

    render() {
        return (
            <div>
                {!this.state.editMode &&
                    <div>
                        <span onDoubleClick={this.activateEditMode}>{this.props.status || "there is no status"}</span>
                    </div>
                }
                {this.state.editMode &&
                    <div>
                        <input autoFocus={true} onBlur={this.deActivateEditMode}
                               onChange={this.onStatusChange}
                               value={this.state.status}/>
                    </div>
                }
            </div>
        )
    }
}


export default ProfileStatus