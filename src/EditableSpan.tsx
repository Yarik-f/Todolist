import React, {useState} from 'react';

type EditableSpanPropsType ={
    oldTitle: string
    onClick: (newTitle: string) => void
}

const EditableSpan = (props: EditableSpanPropsType) => {

    const [edit, setEdit] = useState(false)
    let [newTitle, setNewTitle] = useState(props.oldTitle)

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }


    const editHandler = () => {
        setEdit(!edit)
        if(edit){
            updateTitle()
        }

    }
    const updateTitle = () => {
        props.onClick(newTitle)
    }
    return (
        edit
        ? <input value={newTitle} onBlur={editHandler} autoFocus onChange={onChangeHandler}/>
        :<span onDoubleClick={editHandler}>{props.oldTitle}</span>
    );
};

export default EditableSpan;