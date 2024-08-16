'use client';

import addTransaction from "@/app/actions/addTransaction";
import { toast } from "react-toastify";
import React, { useRef } from "react";

const AddTrasaction = () => {
    const formRef = useRef<HTMLFormElement>(null);

    const clientAction = async (formData: FormData) => {
        const { data, error } = await addTransaction(formData);
        if (error) {
            toast.error(error);
        } else {
            toast.success('Transaction Added');
            formRef.current?.reset();
        }
    }

    return ( <>
        <h3>Add Transaction</h3>
        <form ref={formRef} action={ clientAction }>
            <div className="form-control">
                <label htmlFor="text">Text</label>
                <input type="text" name="text" id="text" placeholder="Enter Text..."/>
            </div>
            <div className="form-control">
                <label htmlFor="amount">Amount<br />(negative - expense, postive - income)</label>
                <input type="number" name="amount" id="amount" step={0.01} placeholder="Enter Amount ..."/>
            </div>
            <button className="btn">Add Transaction</button>
        </form>
    </> );
}

export default AddTrasaction;
