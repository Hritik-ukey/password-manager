import React, { useEffect, useState } from 'react';
import { MdContentCopy } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
    const [form, setForm] = useState({ site: "", username: "", password: "" });
    const [passwordArray, setPasswordArray] = useState([]);

    useEffect(() => {
        let passwords = localStorage.getItem("passwords");
        if (passwords) {
            setPasswordArray(JSON.parse(passwords));
        }
    }, []);

    const copyText = (text) => {
        navigator.clipboard.writeText(text);
    };

    const savePassword = () => {
        if (form.site.trim() === "" || form.username.trim() === "" || form.password.trim() === "" || form.site.trim() === "") {
            alert("Please fill in all fields.");
            return;
        }
    
        const newPassword = { ...form, id: uuidv4() };
        const newPasswordArray = [...passwordArray, newPassword];
        setPasswordArray(newPasswordArray);
        localStorage.setItem("passwords", JSON.stringify(newPasswordArray));
        setForm({ site: "", username: "", password: "" });  // Clear form after saving
    };
    
    const editPassword = (id) => {
        const passwordToEdit = passwordArray.find(entry => entry.id === id);
        setForm(passwordToEdit);
        const updatedPasswordArray = passwordArray.filter(entry => entry.id !== id);
        setPasswordArray(updatedPasswordArray);
    };

    const deletePassword = (id) => {
        const c = confirm("Do you really want to delete this!!!")
        if(c){
            const updatedPasswordArray = passwordArray.filter(entry => entry.id !== id);
            setPasswordArray(updatedPasswordArray);
            localStorage.setItem("passwords", JSON.stringify(updatedPasswordArray));
        }
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    return (
        <>
            <div className='mx-auto bg-slate-200 max-w-4xl'>
                <div className='text-center text-2xl'>
                    <h1>PassOp</h1>
                    <p>Your own Password Manager</p>
                </div>

                <div className='md:lex md:flex-col p-4'>
                    <input
                        type="text"
                        name='site'
                        className='rounded-full border border-green-500 w-full md:p-1.5 p-0'
                        placeholder='Enter Website URL'
                        onChange={handleChange}
                        value={form.site}
                    />
                    <div className="flex gap-8 py-4 ">
                        <input
                            type="text"
                            name='username'
                            className=' w-1/2 border border-green-500 hover:bg-green-100 rounded-full md:p-1.5 p-0'
                            placeholder='Enter Username'
                            onChange={handleChange}
                            value={form.username}
                        />
                        <input
                            type="text"
                            name='password'
                            className='w-1/2 border border-green-500 hover:bg-green-100 rounded-full md:p-1.5 p-0'
                            placeholder='Enter Password'
                            onChange={handleChange}
                            value={form.password}
                        />
                    </div>
                    <button
                        onClick={savePassword}
                        className='flex justify-center items-center bg-green-200 border border-green-500 hover:bg-green-100 mx-auto p-2 rounded-full w-1/2'
                    >
                        Save
                    </button>
                </div>

                <div className="password">
                    <h2 className='py-4 font-bold'>Your Passwords</h2>

                    {passwordArray.length === 0 && <div>No passwords to show</div>}
                    {passwordArray.length !== 0 &&
                        <table className="table-auto w-full rounded-xl overflow-hidden">
                            <thead className='bg-green-800 text-white'>
                                <tr>
                                    <th className='py-2'>Site</th>
                                    <th className='py-2'>Username</th>
                                    <th className='py-2'>Password</th>
                                    <th className='py-2'>Actions</th>
                                </tr>
                            </thead>
                            <tbody className='bg-gray-100'>
                                {passwordArray.map((entry) => (
                                    <tr key={entry.id}>
                                        <td className='text-center w-32 py-2 border border-white'>
                                            <div className='flex justify-center items-center'>
                                                <a href={entry.site} target='_blank' rel="noreferrer"><span>{entry.site}</span></a>
                                                <div className='cursor-pointer' onClick={() => copyText(entry.site)}><MdContentCopy /></div>
                                            </div>
                                        </td>
                                        <td className='text-center w-32 py-2 border border-white'>
                                            <div className='flex justify-center items-center'>
                                                <span>{entry.username}</span>
                                                <div className='cursor-pointer' onClick={() => copyText(entry.username)}><MdContentCopy /></div>
                                            </div>
                                        </td>
                                        <td className='text-center w-32 py-2 border border-white'>
                                            <div className='flex justify-center items-center'>
                                                <span>{entry.password}</span>
                                                <div className='cursor-pointer' onClick={() => copyText(entry.password)}><MdContentCopy /></div>
                                            </div>
                                        </td>
                                        <td className='text-center w-32 py-2 border border-white'>
                                            <div className='flex justify-center gap-4'>
                                                <FaEdit className='cursor-pointer' onClick={() => editPassword(entry.id)} />
                                                <MdDelete className='cursor-pointer' onClick={() => deletePassword(entry.id)} />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    }
                </div>
            </div>
        </>
    );
}

export default Manager;
