"use client"
import { useUser } from "@/context/userContext"
import React, { useState, useRef, useEffect } from "react"



const CoverLetterTemp = ({ formData, setFormData, coverletter, onCoverLetterChange }) => {
    const { state } = useUser()
    const user = state?.user
    const personalInfo = user?.default_resume?.json?.parsedPersonalInfo || {};
    const [isEditing, setIsEditing] = useState(false)
    const [editableText, setEditableText] = useState(coverletter || "")
    const textareaRef = useRef(null)
    const displayRef = useRef(null)
    const [editingField, setEditingField] = useState(null);

    // Update local state when prop changes
    useEffect(() => {
        setEditableText(coverletter || "")
    }, [coverletter])

    const handleClick = () => {
        setIsEditing(true)
    }

    const handleBlur = () => {
        setIsEditing(false)
        if (onCoverLetterChange) {
            onCoverLetterChange(editableText)
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
            setIsEditing(false)
            setEditableText(coverletter || "")
        }
    }

    const handleChange = (e) => {
        setEditableText(e.target.value)
    }



    // Auto-resize textarea and focus when editing starts
    useEffect(() => {
        if (isEditing && textareaRef.current) {
            const textarea = textareaRef.current
            textarea.focus()

            // Auto-resize function
            const autoResize = () => {
                textarea.style.height = 'auto'
                textarea.style.fontSize = '15px'
                textarea.style.height = textarea.scrollHeight + 'px'
            }

            autoResize()
            textarea.addEventListener('input', autoResize)

            return () => {
                textarea.removeEventListener('input', autoResize)
            }
        }
    }, [isEditing])

    const fullName = `${personalInfo.firstName || ""} ${personalInfo.lastName || ""}`.trim();


    return (
        <div className="font-tinos bg-white w-full h-[calc(100vh-200px)] overflow-y-auto hide-scrollbar px-4">
            {/* Header */}
            <header className="border-b border-gray-400 px-8 pt-2 pb-4 mb-5">

                <div className="text-2xl font-bold text-gray-900 mb-4">
                    {editingField === 'name' ? (
                        <input
                            type="text"

                            defaultValue={fullName}
                            onBlur={(e) => {
                                const [firstName = '', ...lastNameParts] = e.target.value.trim().split(' ');
                                setFormData({ ...formData, firstName, lastName: lastNameParts.join(' ') });
                                setEditingField(null);
                            }}
                            onKeyDown={(e) => e.key === 'Enter' && e.target.blur()}
                            className="text-2xl font-bold text-gray-900 bg-transparent border-none outline-none w-full"
                            autoFocus
                        />
                    ) : (
                        <span onClick={() => setEditingField('name')}>
                            {fullName || "Click to add name"}
                        </span>
                    )}
                </div>


                <div className="flex items-center gap-4 text-gray-600">
                    {personalInfo.phone || editingField === 'phone' ? (
                        <div className="flex items-center min-w-0 max-w-xs gap-2">
                            <svg viewBox="0 0 20 20" className="w-5 flex-shrink-0 h-5">
                                <path d="M2 3.5A1.5 1.5 0 0 1 3.5 2h1.148a1.5 1.5 0 0 1 1.465 1.175l.716 3.223a1.5 1.5 0 0 1-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 0 0 6.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 0 1 1.767-1.052l3.223.716A1.5 1.5 0 0 1 18 15.352V16.5a1.5 1.5 0 0 1-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 0 1 2.43 8.326 13.019 13.019 0 0 1 2 5V3.5Z" />
                            </svg>
                            {editingField === 'phone' ? (
                                <input
                                    type="text"
                                    defaultValue={personalInfo.phone}
                                    onBlur={(e) => {
                                        setFormData({ ...formData, phone: e.target.value });
                                        setEditingField(null);
                                    }}
                                    onKeyDown={(e) => e.key === 'Enter' && e.target.blur()}
                                    className="bg-transparent border-none outline-none text-gray-600 w-28"
                                    autoFocus
                                />
                            ) : (
                                <span onClick={() => setEditingField('phone')} className="cursor-pointer">
                                    {personalInfo.phone || "Add phone"}
                                </span>
                            )}
                        </div>
                    ) : null}

                    {personalInfo.email || editingField === 'email' ? (
                        <div className="flex items-center gap-2 min-w-0">
                            <svg viewBox="0 0 20 20" className="w-5 h-5 flex-shrink-0">
                                <path d="M3 4a2 2 0 0 0-2 2v1.161l8.441 4.221a1.25 1.25 0 0 0 1.118 0L19 7.162V6a2 2 0 0 0-2-2H3Z"></path>
                                <path d="m19 8.839-7.77 3.885a2.75 2.75 0 0 1-2.46 0L1 8.839V14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.839Z"></path>
                            </svg>
                            {editingField === 'email' ? (
                                <input
                                    type="email"
                                    defaultValue={personalInfo.email}
                                    onBlur={(e) => {
                                        setFormData({ ...formData, email: e.target.value });
                                        setEditingField(null);
                                    }}
                                    onKeyDown={(e) => e.key === 'Enter' && e.target.blur()}
                                    className="bg-transparent border-none outline-none text-gray-600 w-48"
                                    autoFocus
                                />
                            ) : (
                                <span onClick={() => setEditingField('email')} className="truncate cursor-pointer">
                                    {personalInfo.email || "Add email"}
                                </span>
                            )}
                        </div>
                    ) : null}
                </div>
            </header>

            {/* Letter body - Editable */}
            <div className="px-10 pb-8 text-gray-800 relative">
                {isEditing ? (
                    <textarea
                        ref={textareaRef}
                        value={editableText}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        onKeyDown={handleKeyDown}
                        className="w-full cursor-text resize-none border-none outline-none bg-transparent font-tinos font-[500] leading-relaxed text-justify text-gray-800 p-0 m-0"
                        style={{
                            fontSize: 'inherit',
                            lineHeight: 'inherit',
                            fontFamily: 'inherit',
                            fontWeight: 'inherit'
                        }}
                        placeholder="Click to start writing your cover letter..."
                    />
                ) : (
                    <div
                        ref={displayRef}
                        onClick={handleClick}
                        className="cursor-text min-h-[100px] outline-none"
                        role="textbox"
                        tabIndex={0}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault()
                                setIsEditing(true)
                            }
                        }}
                    >
                        {editableText ? (
                            <div className="font-tinos font-[500] text-[15px] text-justify whitespace-pre-wrap">
                                {editableText}
                            </div>
                        ) : (
                            <h2 className="pb-4 font-tinos font-[500]  text-justify text-gray-400">
                                Click to start writing your cover letter...
                            </h2>
                        )}

                    </div>
                )}
            </div>
        </div>
    )
}

export default CoverLetterTemp