import { Link, Outlet, useNavigate } from "react-router-dom"
import styled from "styled-components";
import { auth } from "../firebase";

const Wrapper = styled.div`
    display: grid;
    gap: 20px;
    grid-template-columns: 1fr 4fr;
    padding: 50px 0px;
    width: 100%;
    height: 100%;
    max-width: 860px;
`;
const Menu = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
`;
const MenuItem = styled.div`
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid white;
    height: 50px;
    width: 50px;
    border-radius: 50%;
    border-color: white;
    svg{
        width: 30px;
        fill: white;
    }
    &.log-out{
        border-color: tomato;
        svg{
            fill: tomato;
        }
    }
`;


export default function Layout(){
    const navigate = useNavigate();
    const onLogOut = async() =>{
        const ok = confirm("Are you sure you want to log out?");
        if(ok){
            await auth.signOut();
            navigate("/login");
        }
    }
    return (
        <Wrapper>
            <Menu>
                <MenuItem>
                <Link to="/">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" >
                    <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>
                </Link>

                </MenuItem>
                <MenuItem>
                <Link to="/profile">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
                </Link>
                </MenuItem>
                
                <MenuItem onClick={onLogOut} className="log-out">
                <Link to="/">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
                </svg>
                </Link>
                </MenuItem>
            </Menu>
            <Outlet/>
        </Wrapper>
    );
}