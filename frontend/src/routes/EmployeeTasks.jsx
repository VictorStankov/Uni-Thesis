import {useEffect, useState} from "react";
import {useParams, useNavigate} from "react-router-dom";
import {authFetch} from "../auth.jsx";
import Card from "./components/EmployeeTasks/OrderListItem.jsx"
import OrderDetails from "./components/EmployeeTasks/OrderDetails.jsx";

export default function EmployeeTasksList() {
    const {id} = useParams()

    return (
        id === undefined ? <List/> : <OrderDetails id={id}/>
    )
}
