import { useEffect, useState } from "react";
import Nav from "./components/Nav";
import Mainroutes from "./routes/Mainroutes";
import { asynccurrentuser } from "./store/actions/userActions";
import { useDispatch, useSelector } from "react-redux";



const themes = [
    {
        name: "Light",
        bg: "bg-gradient-to-br from-[#fefae0] via-[#fcdcb0] to-[#e8caa4]",
        text: "text-[#3a2e1f]",
        btn: "bg-yellow-200 text-yellow-800 hover:bg-yellow-300",
    },
    {
        name: "Dark",
        bg: "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700",
        text: "text-yellow-100",
        btn: "bg-gray-800 text-yellow-200 hover:bg-gray-700",
    },
    {
        name: "Emerald",
        bg: "bg-gradient-to-br from-emerald-100 via-emerald-200 to-emerald-300",
        text: "text-emerald-900",
        btn: "bg-emerald-200 text-emerald-900 hover:bg-emerald-300",
    },
    {
        name: "Blue",
        bg: "bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300",
        text: "text-blue-900",
        btn: "bg-blue-200 text-blue-900 hover:bg-blue-300",
    },
    {
        name: "Rose",
        bg: "bg-gradient-to-br from-rose-100 via-rose-200 to-rose-300",
        text: "text-rose-900",
        btn: "bg-rose-200 text-rose-900 hover:bg-rose-300",
    },
    {
        name: "Purple",
        bg: "bg-gradient-to-br from-purple-100 via-purple-200 to-purple-300",
        text: "text-purple-900",
        btn: "bg-purple-200 text-purple-900 hover:bg-purple-300",
    },
    {
        name: "Slate",
        bg: "bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300",
        text: "text-slate-900",
        btn: "bg-slate-200 text-slate-900 hover:bg-slate-300",
    }
];

const App = () => {
    const dispatch = useDispatch();
    const { users } = useSelector((state) => state.userReducer);

    
    const [themeIdx, setThemeIdx] = useState(
        Number(localStorage.getItem("themeIdx")) || 0
    );

   
    useEffect(() => {
        localStorage.setItem("themeIdx", themeIdx);
    }, [themeIdx]);

    useEffect(() => {
        !users && dispatch(asynccurrentuser());
    }, [users, dispatch]);

   
    const theme = themes[themeIdx];
    const bgClass = theme.bg;
    const textClass = theme.text;

    return (
        <div className={`min-h-screen w-screen overflow-y-auto ${bgClass} ${textClass} font-sans px-6 py-4 transition-all duration-500 ease-in-out scroll-smooth`}>
            <Nav themeIdx={themeIdx} setThemeIdx={setThemeIdx} themes={themes} />
            <Mainroutes />
        </div>
    );
};

export default App;