import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import styled from "styled-components"
import { auth, db } from "../firebase";
import { handleFileChange } from "../util/util";

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;
const TextArea = styled.textarea`
    border: 2px solid white;
    padding: 20px;
    border-radius: 20px;
    font-size: 16px;
    color: white;
    background-color: black;
    width: 100%;
    resize: none;
    &::placeholder{
        font-size: 16px;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }
    &:focus{
        outline:none ;
        border-color: #1d9bf0;
    }
`;
const AttachFileButton = styled.label`
    padding: 10px 0px;
    color: #1d9bf0;
    text-align: center;
    border-radius: 20px;
    border: 1px solid #1d9bf0;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
`;
const AttachFileInput = styled.input`
    display: none;
`;
const SubmitBtn = styled.input`
    background-color: #1d9bf0;
    color: white;
    border: none;
    padding: 10px 0px;
    border-radius: 20px;
    font-size: 16px;
    cursor: pointer;
    &:hover,
    &:active {
        opacity: 0.8;
    }
`;

export default function PostTweetForm(){
    const [isLoading, setLoading] = useState(false);
    const [tweet, setTweet] = useState("");
    const [file, setFile] = useState<string | null>(null);
    const onChange = (e:React.ChangeEvent<HTMLTextAreaElement>) =>{
        setTweet(e.target.value)
    };
    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleFileChange(e, (fileData) => {
            setFile(fileData);
        })
    }
    const onSubmit = async(e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        const user = auth.currentUser;
        if(!user || isLoading || tweet === "" || tweet.length > 180) return;

        try {
            setLoading(true);
            await addDoc(collection(db, "tweets"), {
                tweet,
                createdAt: Date.now(),
                username: user.displayName || "Anonymous",
                userId: user.uid,
                fileData: file
            })
        } catch (e) {
            console.log(e);
        }finally{
            setLoading(false);
        }

    }
    
    return (
        <Form onSubmit={onSubmit}>
            <TextArea required rows={5} maxLength={180} onChange={onChange} value={tweet} placeholder="What is happening?"/>
            <AttachFileButton htmlFor="file">{file? "Photo added ✅" : "Add photo"}</AttachFileButton>
            <AttachFileInput onChange={onFileChange} type="file" id="file" accept="image/*" />
            <SubmitBtn type="submit" value={isLoading ? "Posting..." : "Post tweet"}/>
        </Form>
    );
}