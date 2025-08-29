"use client";
import { useState, useRef, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import clsx from "clsx";

const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];
const years = Array.from({ length: 50 }, (_, i) => (2025 - i).toString());

function SearchableSelect({ id, activeId, setActiveId, label, value, onChange, options, disabled, error }) {
    const [search, setSearch] = useState("");
    const wrapperRef = useRef(null);

    const open = activeId === id && !disabled;
    const filtered = options
        .map(String)
        .filter(opt => opt.toLowerCase().includes(search.toLowerCase()));

    // Close on outside click
    useEffect(() => {
        function handleClickOutside(e) {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
                setActiveId(null);
            }
        }
        if (open) {
            document.addEventListener("mousedown", handleClickOutside);
            return () => document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [setActiveId, open]);

    // Reset search when dropdown closes
    useEffect(() => {
        if (!open) {
            setSearch("");
        }
    }, [open]);

    return (
        <div ref={wrapperRef} className="flex flex-col gap-2 relative w-full font-circular">
            <Label className="text-black">{label}</Label>
            <input
                type="text"
                value={open ? search : (value || "")}
                onChange={e => {
                    setSearch(e.target.value);
                    if (!open) {
                        setActiveId(id);
                    }
                }}
                onFocus={() => {
                    setActiveId(id);
                    setSearch("");
                }}
                placeholder={label}
                disabled={disabled}
                className={clsx(
                    "p-3 font-circular h-10 block w-full rounded-sm text-sm leading-5 text-secondary-400 shadow transition placeholder:text-gray-400 focus:outline-none focus:ring-4 disabled:bg-[#F2F2F2] disabled:opacity-90",
                    {
                        "border border-gray-200 focus:border-[#3EC0DD] focus:ring-[#3EC0DD]/10": !error,
                        "border border-red-500 focus:border-red-500 focus:ring-red-200": error,
                    }
                )} />

            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}

            {open && (
                <div
                    className="absolute top-16 left-0 w-full border bg-white rounded shadow-md max-h-[140px] overflow-y-auto z-10
                     transition-all duration-150 ease-out"
                >
                    {filtered.length ? (
                        filtered.map(opt => (
                            <div
                                key={opt}
                                onClick={() => {
                                    onChange(opt);
                                    setActiveId(null);
                                }}
                                className="px-2 py-2 hover:bg-primary-lighter/40 duration-150 text-sm cursor-pointer"
                            >
                                {opt}
                            </div>
                        ))
                    ) : (
                        <div className="px-2 py-6 text-center text-sm text-gray-400">No results</div>
                    )}
                </div>
            )}
        </div>
    );
}

export default function SelectDate({ sectionData, handleFieldChange, handlePresentChange, title, error }) {
    console.log("🚀 ~ SelectDate ~ error:", error)
    const [activeId, setActiveId] = useState(null); // only one open at a time



    return (
        <div className="flex flex-col gap-4">
            {/* Start Date */}
            <div className="flex gap-4">
                <SearchableSelect
                    error={error?.startMonth}
                    id="startMonth"
                    activeId={activeId}
                    setActiveId={setActiveId}
                    label="Start Month"
                    value={sectionData?.startDate?.month}
                    onChange={val => handleFieldChange("startDate.month", val)}
                    options={months}
                />
                <SearchableSelect
                    error={error?.startYear}
                    id="startYear"
                    activeId={activeId}
                    setActiveId={setActiveId}
                    label="Start Year"
                    value={sectionData?.startDate?.year}
                    onChange={val => handleFieldChange("startDate.year", val)}
                    options={years}
                />
            </div>

            {/* End Date */}
            <div className="flex gap-4">
                <SearchableSelect
                    error={error?.endMonth}
                    id="endMonth"
                    activeId={activeId}
                    setActiveId={setActiveId}
                    label="End Month"
                    value={sectionData?.endDate?.month}
                    onChange={val => handleFieldChange("endDate.month", val)}
                    options={months}
                    disabled={sectionData?.present}
                />
                <SearchableSelect
                    error={error?.endYear}
                    id="endYear"
                    activeId={activeId}
                    setActiveId={setActiveId}
                    label="End Year"
                    value={sectionData?.endDate?.year}
                    onChange={val => handleFieldChange("endDate.year", val)}
                    options={years}
                    disabled={sectionData?.present}
                />
            </div>

            {/* Checkbox */}
            <div className="flex items-center gap-2">
                <Checkbox
                    checked={sectionData?.present || false}
                    onCheckedChange={handlePresentChange}
                    className="h-4 w-4 rounded data-[state=checked]:border-none data-[state=checked]:bg-primary-light data-[state=unchecked]:border data-[state=unchecked]:bg-white data-[state=unchecked]:shadow data-[state=checked]:text-white"
                />
                <span className="text-sm text-gray-600">
                    {title}
                </span>
            </div>
        </div>
    );
}
