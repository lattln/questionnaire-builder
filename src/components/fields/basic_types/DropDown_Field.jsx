import React from "react"

const SelectionField = ({ field, onUpdate, onDelete, isPreview }) => {
    const addOption = () => {
        onUpdate("options", [...field.options, ""])
    }

    const updateOption = (index, value) => {
        const updatedOptions = [...field.options]
        updatedOptions[index] = value
        onUpdate("options", updatedOptions)
    }

    const removeOption = (index) => {
        const updatedOptions = field.options.filter((_, i) => i !== index)
        onUpdate("options", updatedOptions)
    }

    return (
        <div className="p-4 border rounded">
            <div className="flex justify-between mb-2">
                <input
                    type="text"
                    value={field.question}
                    onChange={(e) => onUpdate("question", e.target.value)}
                    placeholder="Enter question"
                    className="px-3 py-2 border rounded w-full"
                    disabled={isPreview}
                />
                {!isPreview && (
                    <button
                        onClick={onDelete}
                        className="ml-2 px-3 py-1 bg-red-500 text-white rounded"
                    >
                        Delete
                    </button>
                )}
            </div>
            <select
                className="px-3 py-2 border rounded w-full"
                onChange={(e) => onUpdate("selected", e.target.value)}
                value={field.selected || ""}
                disabled={isPreview}
            >
                <option value="">Select an option</option>
                {field.options.map((option, index) => (
                    <option key={index} value={option}>
                        {option}
                    </option>
                ))}
            </select>
            <div>
                {field.options.map((option, index) => (
                    <div key={index} className="flex items-center mt-2">
                        <input
                            type="text"
                            value={option}
                            onChange={(e) => updateOption(index, e.target.value)}
                            placeholder="Option text"
                            className="px-3 py-2 border rounded w-full"
                            disabled={isPreview}
                        />
                        {!isPreview && (
                            <button
                                onClick={() => removeOption(index)}
                                className="ml-2 px-3 py-1 bg-red-500 text-white rounded"
                            >
                                Remove
                            </button>
                        )}
                    </div>
                ))}
            </div>
            {!isPreview && (
                <button
                    onClick={addOption}
                    className="mt-2 px-3 py-1 bg-indigo-500 text-white rounded"
                >
                    Add Option
                </button>
            )}
        </div>
    )
}

export default SelectionField
