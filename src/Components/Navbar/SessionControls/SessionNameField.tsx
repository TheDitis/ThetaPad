import {useEffect, useState} from "react";
import {TextField} from "@mui/material";


interface SessionNameFieldProps {
    sessionName: string | null;
}

const SessionNameField: React.FC<SessionNameFieldProps> = () => {
    const [sessionName, setSessionName] = useState<string>();

    useEffect(() => {

    }, [])

    return (
        <TextField value={sessionName}>
        </TextField>
    )
}



export default SessionNameField;