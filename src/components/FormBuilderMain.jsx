import React from "react";
import { v4 as uuidv4 } from "uuid";
import { initializeField } from "../utils/initializedFieldOptions";
import fieldTypes from "./fields/fieldTypes-config";
import MobileToolBar from "./MobileToolBar"

const FormBuilder = ({ formData, setFormData, isPreview, setIsPreview }) => {

    const addField = (type) => {
        const fieldTemplate = fieldTypes[type]?.defaultProps;
        if (fieldTemplate) {
            const initializedField = initializeField({ ...fieldTemplate, id: uuidv4() });
            setFormData([...formData, initializedField]);
        } else {
            alert("Unknown field type");
        }
    };

    const updateField = (id, key, value) => {
        setFormData(
            formData.map((field) =>
                field.id === id ? { ...field, [key]: value } : field
            )
        );
    };

    const deleteField = (id) => {
        setFormData(formData.filter((field) => field.id !== id));
    };

    return (
        <div className="formBuilderMain min-h-screen lg:pt-24 px-4 pt-40 pb-14">
            {/*MOBILE TOOL BAR COMPONENT 
            CONTAINING - TOOLBAR && JSON LOG MODAL */}

            <MobileToolBar
                addField={addField}
                fieldTypes={fieldTypes}
                formData={formData}
                isPreview={isPreview}
                setIsPreview={setIsPreview}
            />



            {/*MAIN FORM COMPONENT CONTAINING ALL FIELDS */}
            <div>
                {formData.map((field) => {
                    const FieldComponent = fieldTypes[field.fieldType]?.component;
                    return (
                        FieldComponent && (
                            <div key={field.id} className="mb-4">
                                <FieldComponent
                                    field={field}
                                    label={fieldTypes[field.fieldType]?.label}
                                    onUpdate={(key, value) => updateField(field.id, key, value)}
                                    onDelete={() => !isPreview && deleteField(field.id)}
                                    isPreview={isPreview}
                                />
                            </div>
                        )
                    );
                })}
            </div>
        </div>
    );
};

export default FormBuilder;
