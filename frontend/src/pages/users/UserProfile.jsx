import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
    asyncdeleteuser,
    asynclogoutuser,
    asyncupdateuser,
} from '../../store/actions/userActions';

const UserProfile = () => {
    const { id } = useParams();
    const {
        userReducer: { users },
    } = useSelector((state) => state);

    const { register, handleSubmit } = useForm({
        defaultValues: {
            username: users?.username,
            email: users?.email,
            password: users?.password,
        },
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const UpdateUserHandler = (user) => {
        dispatch(asyncupdateuser(users.id, user));
    };

    const LogOutHandler = () => {
        dispatch(asynclogoutuser());
        navigate('/login');
    };

    const DeleteHandler = () => {
        dispatch(asyncdeleteuser(users.id));
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-white to-yellow-200 flex items-center justify-center p-4 animate-fade-in">
            <div className="relative bg-white/90 backdrop-blur-2xl rounded-3xl shadow-[0_8px_40px_rgba(200,180,80,0.12)] w-full max-w-2xl p-10 overflow-hidden animate-slide-up">
               
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-gradient-to-br from-yellow-400 to-orange-400 opacity-20 rounded-full blur-2xl pointer-events-none animate-pulse"></div>
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-gradient-to-br from-yellow-400 to-orange-400 opacity-20 rounded-full blur-2xl pointer-events-none animate-pulse"></div>
                
                <div className="text-center mb-10">
                    <div className="mx-auto mb-4 w-24 h-24 rounded-full bg-gradient-to-br from-yellow-300 to-orange-200 flex items-center justify-center shadow-lg border-4 border-yellow-100 animate-bounce-slow">
                        <span className="text-5xl text-yellow-700 animate-fade-in">{users?.username?.[0]?.toUpperCase() || "U"}</span>
                    </div>
                    <h1 className="text-4xl font-extrabold text-yellow-700 mb-2 drop-shadow-lg animate-fade-in">
                        {users?.username || "Unknown User"}
                    </h1>
                    <h2 className="text-lg text-gray-600 animate-fade-in">{users?.email}</h2>
                    <hr className="mt-4 border-yellow-400 animate-fade-in" />
                </div>

                <form onSubmit={handleSubmit(UpdateUserHandler)} className="animate-fade-in">
                    <div className="space-y-7">
                        <input
                            {...register("username")}
                            className="w-full border-b-2 p-4 text-lg rounded-t-xl outline-none focus:border-yellow-700 transition-all duration-300 placeholder:text-gray-400 bg-white/70 animate-slide-in-left"
                            type="text"
                            placeholder="Username"
                        />
                        <input
                            {...register("email")}
                            className="w-full border-b-2 p-4 text-lg rounded-t-xl outline-none focus:border-yellow-700 transition-all duration-300 placeholder:text-gray-400 bg-white/70 animate-slide-in-right"
                            type="email"
                            placeholder="Email"
                        />
                        <input
                            {...register("password")}
                            className="w-full border-b-2 p-4 text-lg rounded-t-xl outline-none focus:border-yellow-700 transition-all duration-300 placeholder:text-gray-400 bg-white/70 animate-slide-in-left"
                            type="password"
                            placeholder="Password"
                        />
                    </div>

                    <div className="flex flex-wrap gap-4 justify-center mt-10">
                        <button
                            type="submit"
                            className="px-8 py-3 bg-gradient-to-r from-yellow-500 to-yellow-700 text-white rounded-xl font-bold shadow-lg hover:from-yellow-600 hover:to-yellow-800 transition duration-300 hover:scale-110 animate-pop"
                        >
                            Update
                        </button>
                        <button
                            type="button"
                            onClick={DeleteHandler}
                            className="px-8 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl font-bold shadow-lg hover:from-red-600 hover:to-orange-600 transition duration-300 hover:scale-110 animate-pop"
                        >
                            Delete
                        </button>
                        <button
                            type="button"
                            onClick={LogOutHandler}
                            className="px-8 py-3 bg-gradient-to-r from-gray-500 to-gray-700 text-white rounded-xl font-bold shadow-lg hover:from-gray-600 hover:to-gray-800 transition duration-300 hover:scale-110 animate-pop"
                        >
                            Logout
                        </button>
                    </div>
                </form>
            </div>
           
            <style>
                {`
                @keyframes fade-in {
                    0% { opacity: 0; transform: translateY(30px);}
                    100% { opacity: 1; transform: translateY(0);}
                }
                .animate-fade-in {
                    animation: fade-in 1s cubic-bezier(.4,0,.2,1) both;
                }
                @keyframes slide-up {
                    0% { opacity: 0; transform: translateY(60px);}
                    100% { opacity: 1; transform: translateY(0);}
                }
                .animate-slide-up {
                    animation: slide-up 1.2s cubic-bezier(.4,0,.2,1) both;
                }
                @keyframes slide-in-left {
                    0% { opacity: 0; transform: translateX(-40px);}
                    100% { opacity: 1; transform: translateX(0);}
                }
                .animate-slide-in-left {
                    animation: slide-in-left 1s cubic-bezier(.4,0,.2,1) both;
                }
                @keyframes slide-in-right {
                    0% { opacity: 0; transform: translateX(40px);}
                    100% { opacity: 1; transform: translateX(0);}
                }
                .animate-slide-in-right {
                    animation: slide-in-right 1s cubic-bezier(.4,0,.2,1) both;
                }
                @keyframes pop {
                    0% { transform: scale(0.8);}
                    80% { transform: scale(1.08);}
                    100% { transform: scale(1);}
                }
                .animate-pop {
                    animation: pop 0.5s cubic-bezier(.4,0,.2,1) both;
                }
                @keyframes bounce-slow {
                    0%, 100% { transform: translateY(0);}
                    50% { transform: translateY(-12px);}
                }
                .animate-bounce-slow {
                    animation: bounce-slow 2.5s infinite;
                }
                `}
            </style>
        </div>
    );
};

export default UserProfile;