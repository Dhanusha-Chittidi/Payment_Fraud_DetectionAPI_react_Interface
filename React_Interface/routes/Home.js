import React from "react";
import payment_fraud_detection from "./payment_fraud_detection.jpg";
export const Home=()=>{
    return (
        <div className="poi">
            Welcome to<h1> Fraud Prediction System</h1>
            <img src={payment_fraud_detection} alt="Fraud Prediction System" id="img" />
        </div>
    );
}