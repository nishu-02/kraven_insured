import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import HelpIcon from '@mui/icons-material/Help';
import LogoutIcon from '@mui/icons-material/Logout';
import Person4Icon from '@mui/icons-material/Person4';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';


export const SidebarData = [
    {
        title: "Home" ,  
        icon: <HomeIcon />,
        link:  "/Dashboard",


    },
    {
        title: "view Warranties" ,  
        icon: <ReceiptLongIcon />,
        link:  "/warranties",


    },
    {
        title: "Help & Support",   
        icon: <HelpIcon />,
        link:  "/help",


    },
    {
        title: "Logout",   
        icon: <LogoutIcon />,
        link:  "/logout",


    },
    {
        title: "Profile" ,  
        icon: <Person4Icon />,
        link:  "/profile",


    },
    {
        title: "FAQs"   ,
        icon: <QuestionAnswerIcon />,
        link:  "/answers",


    },
]

