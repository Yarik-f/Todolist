import React, {ChangeEvent} from 'react';

type CheckboxType = {
    onChange: (checked: boolean)=> void
    checked: boolean
}
const CheckBox = (props: CheckboxType) => {
    const {onChange, checked} = props

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(e.currentTarget.checked)

    }
    return (
        <div>
            <input type="checkbox" onChange={onChangeHandler} checked={checked}/>
        </div>
    );
};

export default CheckBox;