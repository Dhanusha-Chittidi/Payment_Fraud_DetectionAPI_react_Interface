import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Axios from "axios";
import './Form.css'
import { useState } from "react";



export const Form = () => {

    const [res, setRes] = useState("");
    const schema = yup.object().shape({
        step: yup.number().positive().integer().required(),
        amount: yup.number().positive().required(),
        oldbalanceOrg: yup.number().required(),
        newbalanceOrig: yup.number().required(),
        oldbalanceDest: yup.number().required(),
        newbalanceDest: yup.number().required(),
        isFlaggedFraud: yup.number().required(),
        type_1: yup.number().oneOf([0, 1]).required(),
        type_2: yup.number().oneOf([0, 1]).required(),
        type_3: yup.number().oneOf([0, 1]).required(),
        type_4: yup.number().oneOf([0, 1]).required(),
        type_5: yup.number().oneOf([0, 1]).required(),

    })
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = (data) => {
        console.log(data);
        const result = Axios.post('https://179b-34-138-90-190.ngrok-free.app/online_fraud_detection_prediction', data, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                mode: 'no-cors',
            }
        }
        );
        const printPrediction = async () => {
            const a = await result;
            setRes(a.data);
        };

        printPrediction();

        document.getElementById("form-payment").reset();


    }

    return (<div className="body">
        <form onSubmit={handleSubmit(onSubmit)} id="form-payment">
            <input type="number" className="data" placeholder="step..."  {...register("step")} />
            <p>{errors.step?.message}</p>
            <input type="number" className="data" placeholder="Amount..." {...register("amount")} />
            <p>{errors.amount?.message}</p>
            <input type="number" className="data" placeholder="sender_oldBalance..." {...register("oldbalanceOrg")} />
            <p>{errors.oldbalanceOrg?.message}</p>
            <input type="number" className="data" placeholder="sender_newbalance..." {...register("newbalanceOrig")} />
            <p>{errors.newbalanceOrig?.message}</p>
            <input type="number" className="data" placeholder="receiver_oldbalance..." {...register("oldbalanceDest")} />
            <p>{errors.oldbalanceDest?.message}</p>
            <input type="number" className="data" placeholder="receiver_newbalance..." {...register("newbalanceDest")} />
            <p>{errors.newbalanceDest?.message}</p>
            <input type="number" className="data" placeholder="dpf..." {...register("isFlaggedFraud")} />
            <p>{errors.isFlaggedFraud?.message}</p>
            <input type="number" className="data" placeholder="CASH_OUT..." {...register("type_1")} />
            <p>{errors.type_1?.message}</p>
            <input type="number" className="data" placeholder="PAYMENT..." {...register("type_2")} />
            <p>{errors.type_2?.message}</p>
            <input type="number" className="data" placeholder=" CASH_IN ..." {...register("type_3")} />
            <p>{errors.type_3?.message}</p>
            <input type="number" className="data" placeholder="TRANSFER..." {...register("type_4")} />
            <p>{errors.type_4?.message}</p>
            <input type="number" className="data" placeholder="DEBIT..." {...register("type_5")} />
            <p>{errors.type_5?.message}</p>
            <input type="submit" className="submit" />
        </form>
        <h1 id='result'>{res}</h1>
    </div>
    );
}
