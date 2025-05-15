import { useState } from 'react';
import { assets } from '../assets/assets';

const MyProfile = () => {
    const [userType, setUserType] = useState('patient');
    const [isEdit, setIsEdit] = useState(false);
    const [documents, setDocuments] = useState([]);
    const [userData, setUserData] = useState({
        name: "",
        image: assets.profile_pic,
        email: '',
        phone: '',
        Address: { line1: "", line2: "" },
        gender: '',
        dob: '',
        // User type specific fields
        ...(userType === 'doctor' && {
            speciality: '',
            qualification: '',
            experience: '',
            licenseNumber: '',
            availableSlots: [],
            maxOnlineConsultations: 10,
            currentConsultations: 0,
            verificationStatus: 'pending',
        }),
        ...(userType === 'patient' && {
            medicalHistory: [],
            appointments: [],
        }),
        ...(userType === 'admin' && {
            adminRole: '',
            accessLevel: 0,
        })
    });

    const renderField = (label, value, editComponent = null) => (
        <>
            <p className='font-medium'>{label}:</p>
            {isEdit && editComponent ? editComponent : <p className='text-gray-500'>{value}</p>}
        </>
    );

    return (
        <div className='max-w-lg flex flex-col gap-2 text-sm'>
            <img className='w-36 rounded' src={userData.image} alt="" />
            {renderField('Name', userData.name,
                <input 
                    className='bg-gray-50 text-3xl font-medium max-w-60 mt-4'
                    value={userData.name}
                    onChange={e => setUserData(prev => ({ ...prev, name: e.target.value }))}
                />
            )}

            <hr className='bg-zinc-400 h-[1px] border-none'/>
            
            {/* Contact Information */}
            <div>
                <p className='text-neutral-500 underline mt-3'>CONTACT INFORMATION</p>
                <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
                    {renderField('Email', userData.email)}
                    {renderField('Phone', userData.phone,
                        <input 
                            className='bg-gray-100 max-w-52'
                            value={userData.phone}
                            onChange={e => setUserData(prev => ({ ...prev, phone: e.target.value }))}
                        />
                    )}
                    {renderField('Address', `${userData.Address.line1} ${userData.Address.line2}`,
                        <>
                            <input 
                                className='bg-gray-50'
                                value={userData.Address.line1}
                                onChange={e => setUserData(prev => ({ ...prev, Address: { ...prev.Address, line1: e.target.value } }))}
                            />
                            <br />
                            <input 
                                className='bg-gray-50'
                                value={userData.Address.line2}
                                onChange={e => setUserData(prev => ({ ...prev, Address: { ...prev.Address, line2: e.target.value } }))}
                            />
                        </>
                    )}
                </div>
            </div>

            {/* Basic Information */}
            <div>
                <p className='text-neutral-500 underline mt-3'>BASIC INFORMATION</p>
                <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
                    {renderField('Gender', userData.gender,
                        <select 
                            className='max-w-20 bg-gray-100'
                            value={userData.gender}
                            onChange={e => setUserData(prev => ({ ...prev, gender: e.target.value }))}
                        >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    )}
                    {renderField('Birthday', userData.dob,
                        <input 
                            className='max-w-28 bg-gray-100'
                            type="date"
                            value={userData.dob}
                            onChange={e => setUserData(prev => ({ ...prev, dob: e.target.value }))}
                        />
                    )}
                </div>
            </div>

            {/* Professional Information for Doctors */}
            {userType === 'doctor' && (
                <div>
                    <p className='text-neutral-500 underline mt-3'>PROFESSIONAL INFORMATION</p>
                    <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
                        {renderField('Speciality', userData.speciality,
                            <input 
                                className='bg-gray-100'
                                value={userData.speciality}
                                onChange={e => setUserData(prev => ({ ...prev, speciality: e.target.value }))}
                            />
                        )}
                        {renderField('License', userData.licenseNumber)}
                        {renderField('Status', userData.verificationStatus)}
                    </div>
                </div>
            )}

            {/* Document Upload for Doctors */}
            {userType === 'doctor' && (
                <div className='mt-4'>
                    <p className='text-neutral-500 underline'>DOCUMENTS</p>
                    <input 
                        type="file" 
                        multiple 
                        accept=".pdf,.jpg,.png"
                        onChange={(e) => setDocuments([...documents, ...e.target.files])}
                        className='mt-2'
                    />
                </div>
            )}

            <button 
                className='mt-4 border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all'
                onClick={() => setIsEdit(!isEdit)}
            >
                {isEdit ? 'Save' : 'Edit'}
            </button>
        </div>
    );
};

export default MyProfile;
