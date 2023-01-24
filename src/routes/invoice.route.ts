import {Router} from "express";
import {uploadInvoices} from "../controller/invoice.controller";

const invoiceRouter = Router();
invoiceRouter.get('/', (req,res)=>{
    res.status(200).send('Will return invoices here')
    return;
})
invoiceRouter.post('/upload', uploadInvoices)

export default invoiceRouter