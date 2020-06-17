import {useState} from 'react';


export function IsAuth(user) {
    const [islog, setIslog]  = useState(true);
    return {islog, setIslog}
}