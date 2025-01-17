import { generateUniqueId, initializeField } from "../utils/initializedFieldOptions";
import fieldTypes from "./fields/fieldTypes-config";
import React, { useState } from "react";

const FormBuilder = ({ formData, setFormData }) => {
    const [isPreview, setIsPreview] = useState(false);

    const togglePreview = () => setIsPreview(!isPreview);

    const addField = (type) => {
        const fieldTemplate = fieldTypes[type]?.defaultProps;
        if (fieldTemplate) {
            const initializedField = initializeField({ ...fieldTemplate, id: generateUniqueId() });
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
        <div className="p-4 bg-white rounded shadow">
            <div className="justify-between mb-4">
                <div className="grid gap-2">
                    <button
                        onClick={togglePreview}
                        className="px-4 py-2 bg-gray-700 text-white rounded"
                    >
                        {isPreview ? "Switch to Edit Mode" : "Switch to Preview Mode"}
                    </button>

                    {!isPreview && (
                        <div className="flex gap-2">
                            {Object.keys(fieldTypes).map((type) => (
                                <button
                                    key={type}
                                    className="px-4 py-2 bg-indigo-500 text-white rounded"
                                    onClick={() => addField(type)}
                                >
                                    Add {fieldTypes[type].label}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div>
                {formData.map((field) => {
                    const FieldComponent = fieldTypes[field.fieldType]?.component;
                    return (
                        FieldComponent && (
                            <div key={field.id} className="mb-4">
                                <FieldComponent
                                    field={field}
                                    onUpdate={(key, value) =>
                                        updateField(field.id, key, value) 
                                    }
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
