import styled from "styled-components";
import { ITweet } from "./timeline";
import { auth, db } from "../firebase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useState } from "react";

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 3fr 1fr;
    padding: 20px;
    border:1px solid rgba(255,255,255,0.5);
    border-radius: 15px;

`;
const Column = styled.div``;
const Username = styled.span`
    font-weight: 600;
    font-size: 15px;
`;
const Payload = styled.p`
    margin: 10px 0px;
    font-size: 15px;
`;
const Photo = styled.img`
    width: 100px;
    height: 100px;
    border-radius: 15px;
`;
const DeleteButton = styled.button`
    background-color: tomato;
    color: white;
    font-weight: 600;
    border: 0;
    font-size: 12px;
    padding: 5px 10px;
    text-transform: uppercase;
    border-radius: 5px;
    cursor: pointer;

`
const EditButton = styled.button`
    background-color: blue;
    color: white;
    font-weight: 600;
    border: 0;
    font-size: 12px;
    padding: 5px 10px;
    text-transform: uppercase;
    border-radius: 5px;
    margin-left: 5px;
    cursor: pointer;

`
const SaveButton = styled.button`
    background-color: yellowgreen;
    color: white;
    font-weight: 600;
    border: 0;
    font-size: 12px;
    padding: 5px 10px;
    text-transform: uppercase;
    border-radius: 5px;
    cursor: pointer;

`
const CancelButton = styled.button`
    background-color: gray;
    color: white;
    font-weight: 600;
    border: 0;
    font-size: 12px;
    padding: 5px 10px;
    text-transform: uppercase;
    border-radius: 5px;
    margin-left: 5px;
    margin-top: 5px;
    cursor: pointer;

`
const Textarea = styled.textarea`
    margin-top: 5px;
    font-size: 15px;
    background-color: black;
    color : white;
    border: none;
    resize: none;
`
export default function Tweet({username,fileData,tweet,userId, id}:ITweet){
    const user = auth.currentUser;
    const [isEditing, setIsEditing] = useState(false);
    const [editedTweet, setEditedTweet] = useState(tweet);

    const onDelete = async() =>{
        const ok = confirm("Are you sure you want to delete this tweet?");
        if(!ok || user?.uid !== userId) return;
        try {
            await deleteDoc(doc(db,"tweets", id));
        } catch (error) {
            console.log(error);
        }finally{

        }
    }
    const onEdit = async() => {
        if( user?.uid !== userId) return;
        try {
            const twwetRef = doc(db, "tweets", id);
            await updateDoc(twwetRef, {
                tweet : editedTweet,
            })
            setIsEditing(false);
            alert("Tweet updated successfully!");
        } catch (e) {
            console.log(e);
            alert("Falied to update tweet")
            
        }
    }
    return (
    <Wrapper>
        <Column>
            <Username>{username}</Username>
              {isEditing ? (
                <div>
                    <Textarea 
                        value={editedTweet}
                        onChange={(e)=>setEditedTweet(e.target.value)}>
                    </Textarea>
                </div>
            ) : <Payload>{tweet}</Payload>
            }
            {
                isEditing? ( 
                <div>
                    <SaveButton onClick={onEdit}>Save</SaveButton>
                    <CancelButton onClick={()=> setIsEditing(false)}>Cancel</CancelButton>
                </div>      
                ) : 
                <div>
                    {user?.uid === userId ? <DeleteButton onClick={onDelete}>Delete</DeleteButton> : null}
                    {user?.uid === userId ? <EditButton onClick={()=>setIsEditing(true)}>Edit</EditButton> : null}
                </div>
            }
            
        </Column>
        {fileData ?(  
            <Column>
      
            <Photo src={fileData}/>
        </Column>)
        : null }
    
        
    </Wrapper>
    )
}