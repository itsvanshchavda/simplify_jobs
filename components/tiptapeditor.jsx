"use client";
import React, { useEffect, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import { Button } from '@/components/ui/button';
import { Bold, Italic, List, ListOrdered, Underline as UnderlineIcon, Link as LinkIcon, Undo, Redo, Paperclip } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CiUndo } from "react-icons/ci";
import { CiRedo } from "react-icons/ci";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"


const TipTapEditor = ({ content, onChange, label, className }) => {
    const [showLinkDialog, setShowLinkDialog] = useState(false);
    const [linkUrl, setLinkUrl] = useState('');
    const [linkText, setLinkText] = useState('');

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                bulletList: {
                    keepMarks: true,
                    keepAttributes: false,
                },
                orderedList: {
                    keepMarks: true,
                    keepAttributes: false,
                },
            }),
            Underline,
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: 'text-blue-600 underline cursor-pointer',
                },
            }),
        ],
        content: content || '',
        editorProps: {
            attributes: {
                class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl focus:outline-none min-h-[150px]',
            },
            handleKeyDown: (view, event) => {
                // Handle Ctrl+Z (Undo)
                if (event.ctrlKey && event.key === 'z' && !event.shiftKey) {
                    event.preventDefault();
                    editor.chain().focus().undo().run();
                    return true;
                }

                // Handle Ctrl+Y (Redo)
                if (event.ctrlKey && event.key === 'y') {
                    event.preventDefault();
                    editor.chain().focus().redo().run();
                    return true;
                }

                // Handle Ctrl+Shift+Z (Alternative Redo)
                if (event.ctrlKey && event.shiftKey && event.key === 'Z') {
                    event.preventDefault();
                    editor.chain().focus().redo().run();
                    return true;
                }

                // Prevent form submission on Enter key
                if (event.key === 'Enter' && event.ctrlKey) {
                    event.preventDefault();
                    return true;
                }
                return false;
            },
        },
        onUpdate: ({ editor }) => {
            const html = editor.getHTML();
            if (onChange) {
                onChange(html);
            }
        },
        immediatelyRender: false,
    });

    useEffect(() => {
        if (editor && content !== undefined && content !== editor.getHTML()) {
            editor.commands.setContent(content || '');
        }
    }, [content, editor]);

    const handleLinkClick = () => {
        const { from, to } = editor.state.selection;
        const selectedText = editor.state.doc.textBetween(from, to);

        if (editor.isActive('link')) {
            // If link is active, remove it
            editor.chain().focus().unsetLink().run();
        } else {
            // If text is selected, use it as link text
            if (selectedText) {
                setLinkText(selectedText);
            }
            setShowLinkDialog(true);
        }
    };

    const addLink = () => {
        if (linkUrl) {
            if (linkText && !editor.state.selection.empty) {
                // Replace selected text with link
                editor.chain().focus().setLink({ href: linkUrl }).run();
            } else if (linkText) {
                // Insert new link with text
                editor.chain().focus().insertContent(`<a href="${linkUrl}">${linkText}</a>`).run();
            } else {
                // Just add link to selected text or insert URL as text
                editor.chain().focus().setLink({ href: linkUrl }).run();
            }
        }
        setShowLinkDialog(false);
        setLinkUrl('');
        setLinkText('');
    };


    if (!editor) {
        return null;
    }

    return (
        <div className={`editor-container ${className} font-circular w-full overflow-x-auto space-y-2`}>
            {label && (
                <label className="block text-sm font-medium text-gray-700">
                    {label}
                </label>
            )}

            <div className="border rounded-lg overflow-hidden">
                {/* Toolbar */}
                <div className="flex items-center gap-1 p-2 border-b bg-gray-50 flex-wrap">
                    {/* Text Formatting */}
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        className={`p-2 ${editor.isActive('bold') ? 'bg-gray-200' : ''}`}
                        title="Bold (Ctrl+B)"
                    >
                        <Bold className="h-4 w-4" />
                    </Button>
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                        className={`p-2 ${editor.isActive('italic') ? 'bg-gray-200' : ''}`}
                        title="Italic (Ctrl+I)"
                    >
                        <Italic className="h-4 w-4" />
                    </Button>
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => editor.chain().focus().toggleUnderline().run()}
                        className={`p-2 ${editor.isActive('underline') ? 'bg-gray-200' : ''}`}
                        title="Underline (Ctrl+U)"
                    >
                        <UnderlineIcon className="h-4 w-4" />
                    </Button>

                    <div className="w-px h-6 bg-gray-300 mx-1" />

                    {/* Lists */}
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => editor.chain().focus().toggleBulletList().run()}
                        className={`p-2 ${editor.isActive('bulletList') ? 'bg-gray-200' : ''}`}
                        title="Bullet List"
                    >
                        <List className="h-4 w-4" />
                    </Button>
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => editor.chain().focus().toggleOrderedList().run()}
                        className={`p-2 ${editor.isActive('orderedList') ? 'bg-gray-200' : ''}`}
                        title="Numbered List"
                    >
                        <ListOrdered className="h-4 w-4" />
                    </Button>

                    <div className="w-px h-6 bg-gray-300 mx-1" />

                    {/* Link */}
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={handleLinkClick}
                        className={`p-2 ${editor.isActive('link') ? 'bg-gray-200' : ''}`}
                        title="Add/Remove Link"
                    >
                        <LinkIcon className="h-4 w-4" />
                    </Button>



                    <div className="w-px h-6 bg-gray-300 mx-1" />

                    {/* Undo/Redo */}

                    <Tooltip>
                        <TooltipTrigger>
                            <div
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => editor.chain().focus().undo().run()}
                                disabled={!editor.can().undo()}
                                className="p-2"

                            >
                                <CiUndo className='size-6' />
                            </div>
                        </TooltipTrigger>
                        <TooltipContent className={"font-circular"} variant='gray'>
                            <div className='text-base'>
                                Ctrl + Z
                            </div>
                        </TooltipContent>
                    </Tooltip>





                    <Tooltip>
                        <TooltipTrigger>
                            <div
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => editor.chain().focus().redo().run()}
                                disabled={!editor.can().redo()}
                                className="p-2"
                            >
                                <CiRedo className='size-6' />
                            </div>
                        </TooltipTrigger>
                        <TooltipContent className={"font-circular"} variant='gray'>
                            <div className='text-base'>
                                Ctrl + Y
                            </div>
                        </TooltipContent>
                    </Tooltip>
                </div>

                {/* Editor Content */}
                <div className="">
                    <ScrollArea className="h-[140px]">
                        <EditorContent
                            editor={editor}
                            className="min-h-[140px] p-3 overflow-auto focus:outline-none"
                        />
                    </ScrollArea>
                </div>
            </div>

            {/* Link Dialog */}
            {showLinkDialog && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h3 className="text-lg font-semibold mb-4">Add Link</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Link Text (optional)
                                </label>
                                <input
                                    type="text"
                                    value={linkText}
                                    onChange={(e) => setLinkText(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Link text"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    URL
                                </label>
                                <input
                                    type="url"
                                    value={linkUrl}
                                    onChange={(e) => setLinkUrl(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="https://example.com"
                                    autoFocus
                                />
                            </div>
                        </div>
                        <div className="flex justify-end space-x-2 mt-6">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => {
                                    setShowLinkDialog(false);
                                    setLinkUrl('');
                                    setLinkText('');
                                }}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="button"
                                onClick={addLink}
                                disabled={!linkUrl}
                            >
                                Add Link
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            <style jsx global>{`
                .ProseMirror {
                    min-height: 150px;
                    outline: none;
                    font-size: 15px;
                    font-weight: 350; 
                }
                
                .ProseMirror strong{
                    font-weight:590;
                }
                .ProseMirror b {
                    font-weight:590; 
                }
                
                .ProseMirror u {
                    text-decoration: underline;
                }
                
                .ProseMirror a {
                    color: #2563eb;
                    text-decoration: underline;
                    cursor: pointer;
                }
                
                .ProseMirror a:hover {
                    color: #1d4ed8;
                }
                
                .ProseMirror > * + * {
                    margin-top: 0.75em;
                }
                .ProseMirror ul {
                    list-style-type: disc;
                    padding-left: 1.5em;
                }
                .ProseMirror ol {
                    list-style-type: decimal;
                    padding-left: 1.5em;
                }
                .ProseMirror li {
                    margin-bottom: 0.5em;
                }
                .ProseMirror li > p {
                    margin: 0;
                }
                .ProseMirror p.is-editor-empty:first-child::before {
                    color: #adb5bd;
                    content: attr(data-placeholder);
                    float: left;
                    height: 0;
                    pointer-events: none;
                }
            `}</style>
        </div>
    );
};

export default TipTapEditor;