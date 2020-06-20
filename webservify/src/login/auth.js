import {useState} from 'react';


export function IsAuth(user) {
    const [islog, setIslog]  = useState(false);
    return {islog, setIslog}
}