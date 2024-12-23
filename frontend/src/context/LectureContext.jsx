import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { server } from "../App";

const lectureContext = createContext();

export const LectureContextProvider = ({ children }) => {
    const [lectures, setLectures] = useState([]);
    const [lecture, setLecture] = useState([]);
    const [loading, setLoading] = useState(true);
    const [lecLoading, setLecLoading] = useState(false);

    async function fetchLectures(id){
        try {
            const {data} = await axios.get(`${server}/api/course/lectures/${id}`, {
                headers: {
                    token: localStorage.getItem("token")
                }
            })
            setLectures(data.allLecture);
            setLoading(false);

        } catch (error) {
            console.log("Error in fetchLectures", error)
            setLoading(false);
        }
    }
    async function fetchLecture(id){
        setLecLoading(true);
        try {
            const {data } = await axios.get(`${server}/api/course/lecture/${id}`, {
                headers: {
                    token: localStorage.getItem("token")
                }
            })
            setLecture(data.lecture);
            setLecLoading(false);

        } catch (error) {
            console.log("Error in fetchLectures", error)
            setLecLoading(false);
        }
    }



    return(
        <lectureContext.Provider value={{lecture, lectures, fetchLecture, fetchLectures, loading, lecLoading}}>
            {children}
        </lectureContext.Provider>
    )
}

export const LectureData = () => useContext(lectureContext);