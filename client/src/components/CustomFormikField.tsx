import React, { FC } from 'react'

type PropsType = {
    name: string
    type: string
    placeholder: string
    formik: any
}

const CustomFormikField: FC<PropsType> = ({name, type, placeholder, formik}) => {
    return (
        <div className="field">
                    <label htmlFor={name}>{placeholder}:</label><br />
                    <input
                        type={type}
                        placeholder={placeholder}
                        id={name}
                        className={formik.errors[name] ? "error" : ""}
                        {...formik.getFieldProps(name)} />
                    {formik.errors[name] && <p className="error">{formik.errors[name]}</p>}
                </div>
    )
}

export default CustomFormikField
