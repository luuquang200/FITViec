import React, { useState } from 'react';

const SkillPopup = ({userInfo, onClose}) => {
    const [skill, setSkill] = useState('');
    const [level, setLevel] = useState('');
    const [formData, setFormData] = useState({ excellent: [], intermediate: [], beginner: [] });

    const handleAddSkill = () => {
        if (skill && level) {
            setFormData(prevState => ({
                ...prevState,
                [level.toLowerCase()]: [...prevState[level.toLowerCase()], skill]
            }));
            setSkill('');
            setLevel('');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };

    return (
        <div id="work-experience-popup" className="bg-black/50 flex justify-center fixed top-0 right-0 left-0 z-[999] w-full h-full">
            <div className="bg-white p-8 rounded shadow-md w-3/5 overflow-scroll h-2/5 mt-20 ">
                <div className='flex justify-between'>
                    <h2 className="text-xl font-semibold mb-6">Skills</h2>
                    <button onClick={onClose} className='flex self-start'>X</button>
                </div>
                    <hr />
                    <br></br>

                <form onSubmit={handleSubmit} className=" bg-white rounded-lg w-full">
                <div>
                <div className="flex space-x-2 mb-4">
                <input
                    type="text"
                    value={skill}
                    onChange={(e) => setSkill(e.target.value)}
                    placeholder="Search skills"
                    className="w-3/5 p-2 border rounded-md"
                />
                <select 
                    value={level} 
                    onChange={(e) => setLevel(e.target.value)}
                    className="w-2/5 p-2 border rounded-md"
                >
                    <option value="">Select level</option>
                    <option value="Excellent">Excellent</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Beginner">Beginner</option>
                </select>
                <button 
                    type="button" 
                    onClick={handleAddSkill}
                    className="p-2 border border-rose-500 text-red-500 rounded-md hover:bg-rose-200"
                >
                    Add
                </button>
                </div>
                <br></br>
                <div>
                <h3 className=" font-semibold mb-2">Excellent</h3>
                <ul className="list-disc pl-5 mb-4">
                    {formData.excellent.map((skill, index) => <li key={index}>{skill}</li>)}
                </ul>
                </div>
                <div>
                <h3 className=" font-semibold mb-2">Intermediate</h3>
                <ul className="list-disc pl-5 mb-4">
                    {formData.intermediate.map((skill, index) => <li key={index}>{skill}</li>)}
                </ul>
                </div>
                <div>
                <h3 className=" font-semibold mb-2">Beginner</h3>
                <ul className="list-disc pl-5 mb-4">
                    {formData.beginner.map((skill, index) => <li key={index}>{skill}</li>)}
                </ul>
                </div>
                </div>
                <div className="flex justify-end">
                    <button onClick={onClose} className="bg-white text-black px-4 py-2 rounded">Cancel</button>
                    <button type="submit" className="bg-red-500 text-white px-4 py-2 rounded">Save</button>
                </div>
                </form>

            </div>
        </div>
    );
};

export default SkillPopup;
