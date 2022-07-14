import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import { useState } from "react";
import { useForm } from "react-hook-form";


function App() {

    const { register, handleSubmit } = useForm();
    const [integrityCheck, setIntegrityCheck] = useState("");
    const [proofing, setProofing] = useState("");
    
    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append("ledgerTransactionFile", data.ledgerTransactionFile[0]);
        formData.append("ledgerBalanceFile", data.ledgerBalanceFile[0]);
        formData.append("swiftFile", data.swiftFile[0]);

        axios.post('http://localhost:8080/rec/reconcile', 
            formData, 
            {headers: {'Content-Type': 'multipart/form-data'}})
            .then((res) => {
                // console.log(res.data[0]);
                setIntegrityCheck(res.data[0]);
                setProofing(res.data[1]);
                console.log(proofing);
            })
    };

    return ( 
        <div style={{ textAlign: "center" }}>
            <div class="form-group">
                <ToastContainer />
            </div> 
            <h1>RECONCILIATION</h1>
            <div id="submission">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label>Ledger Transaction File:</label>
                    <input 
                        accept=".csv"
                        type="file"
                        { ...register("ledgerTransactionFile") }
                    />

                    <label>Ledger Balance File:</label>
                    <input 
                        accept=".csv"
                        type="file"
                        { ...register("ledgerBalanceFile") }
                    />

                    <label>Swift Message File:</label>
                    <input 
                        accept=".xml"
                        type="file"
                        { ...register("swiftFile") }
                    />
                    
                    <br></br>
                    <input type="submit"/>
                </form>
            </div>
            <div id="output">
                <h2>Transactions Recon Results</h2>
                <pre>{integrityCheck}</pre>
            </div>
            <div id="output">
                <h2>Balances Recon Results</h2>
                {proofing}
            </div>
            <br></br>
        </div>
    );
}

export default App;
