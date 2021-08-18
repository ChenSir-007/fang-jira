import {SearchPanel} from "./searchPanel";
import {List} from "./list";
import {useEffect, useState} from "react";
import {stringify} from "querystring";
import {cleanObject, useDebounce, useMount} from "../../utils";

const apiUrl = process.env.REACT_APP_API_URL

export const ProjectListScreen = () => {
    const [param, setParam] = useState({
        name: '',
        personId: ''
    })
    const debouncedParam = useDebounce(param, 2000)
    const [users, setUsers] = useState([])

    const [list, setList] = useState([])
    useEffect(() => {
        fetch(`${apiUrl}/projects?${stringify(cleanObject(debouncedParam))}`).then(async response => {
            if (response.ok) {
                setList(await response.json())
            }
        })
    }, [debouncedParam])
    useMount(() => {
        fetch(`${apiUrl}/users`).then(async response => {
            if (response.ok) {
                setUsers(await response.json())
            }
        })
    })
    return <div>
        <SearchPanel param={param} setParam={setParam} users={users}/>
        <List list={list} users={users}/>
    </div>
}