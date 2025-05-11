import { GithubAuthProvider, signInWithPopup } from "firebase/auth";
import styled from "styled-components"
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const Button = styled.span`
margin-top: 50px;
background-color: white;
font-weight:600;
width: 100%;
color: black;
padding: 10px 20px;
border-radius: 50px;
border:0;
display: flex;
align-items: center;
justify-content: center;
`;
const Logo = styled.img`
height:25px;
padding-right: 5px;
`;
export default function GithubButton(){
    const navigate = useNavigate();
    const onClick = async() =>{
        try {
            const provider = new GithubAuthProvider();
            await signInWithPopup(auth, provider);
            navigate("/");

        } catch (error) {
            console.log(error)
        }
    }
    return (<Button onClick={onClick}><Logo src="/github-mark.png"/>Continue with Github</Button>)
}