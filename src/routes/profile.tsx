import styled from "styled-components";
import { auth, db } from "../firebase";
import { useEffect, useState } from "react";
import { handleFileChange } from "../util/util";
import { addDoc, collection, getDocs, limit, orderBy, query, updateDoc, where } from "firebase/firestore";
import { ITweet } from "../components/timeline";
import Tweet from "../components/tweet";

const Wraaper = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 20px;
`;
const AvatarUpload = styled.label`
    width: 80px;
    overflow: hidden;
    height: 80px;
    border-radius: 50%;
    background-color: #1d9bf0;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    svg{
        width: 100%;
    }
`;
const AvatarImg = styled.img`
    width: 100%;
`;
const AvatarInput = styled.input`
    display: none;
`;
const Name = styled.span`
    font-size: 22px;
`;
const Tweets = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
`;


export default function Profile(){
    const user = auth.currentUser;
    const [avatar, setAvatar] = useState<string | null>(null);
    const [tweets, setTweets] = useState<ITweet[]>([]);
    // 아바타 변경 처리
    const onAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const {files} = e.target;
        if (files && files.length === 1) {
            handleFileChange(e, async (fileData) => {
                if (!user) return;

                const usersCollectionRef = collection(db, "users");
                const q = query(usersCollectionRef, where("userId", "==", user.uid));
                const querySnapshot = await getDocs(q);

                if (querySnapshot.empty) {
                    // Firestore에 문서가 없을 때 새 문서 추가
                    await addDoc(usersCollectionRef, {
                        avatar: fileData,
                        userId: user.uid,
                    });
                    console.log("addDoc");
                } else {
                    // Firestore에 문서가 있을 때 avatar 업데이트
                    const docRef = querySnapshot.docs[0].ref;
                    await updateDoc(docRef, {avatar: fileData});
                    console.log("updateDoc");
                }

                setAvatar(fileData); // 상태 업데이트
            });
        }
    };
    const fetchTweets = async () =>{
        const tweetQuery = query(
            collection(db, "tweets"),
            where("userId", "==", user?.uid),
            orderBy("createdAt", "desc"),
            limit(25)
        );
        const snapshot = await getDocs(tweetQuery);
        const tweets = snapshot.docs.map(doc =>{
            const {tweet, createdAt, userId, username, fileData} = doc.data();
            return {
                tweet, 
                createdAt, 
                userId, 
                username, 
                fileData, 
                id:doc.id
            }
        });
        setTweets(tweets);
    }
    useEffect(()=>{
        fetchTweets();
    }, []);
    return <Wraaper>
        <AvatarUpload htmlFor="avatar">
           {avatar ? (<AvatarImg src={avatar}/>) : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
            <path fill-rule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clip-rule="evenodd" />
            </svg>
            } 
        </AvatarUpload>
        <AvatarInput 
        onChange={onAvatarChange}
        id="avatar" type="file" accept="image/*"/>
        <Name>{user?.displayName ?? "Anonymous"}</Name>
        <Tweets>{tweets.map(tweet =><Tweet key={tweet.id}{...tweet} />)}</Tweets>
    </Wraaper>
}