import { useDispatch, useSelector } from "react-redux";
import { selectLightMode, setColorMode } from '../redux/colorSlice'
import { SunMedium, Moon } from 'lucide-react';

export default function DarkModeBtn() {
    const dispatch = useDispatch();
    const lightMode = useSelector(selectLightMode);

    const toggleColor = () => {
        dispatch(setColorMode(!lightMode))
    }

    if (!lightMode) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }

    return (

        <label className="swap swap-rotate">
            {/* this hidden checkbox controls the state */}
            <input type="checkbox" className="theme-controller" value="synthwave" checked={lightMode} onChange={toggleColor} />

            {/* sun icon */}
            <SunMedium size="30" className='swap-off ' />


            {/* moon icon */}
            <Moon size="30" className=' swap-on' />
        </label>

    );
}
