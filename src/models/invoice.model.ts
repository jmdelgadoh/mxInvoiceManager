import mongoose from 'mongoose'
import {REGEX_RFC} from "../constants/regEx";

interface Comprobante {
    emisor: {
        rfc: string;
        nombre: string;
        regimenfiscal : string;
    },
    receptor: {
        rfc: string;
        nombre: string;
        domiciliofiscalreceptor: string;
        regimenfiscalreceptor:string;
        usocfdi: string;
    },
    conceptos : {
        concepto: {
            impuestos: {},
            claveprodserv: string;
            cantidad: string;
            claveunidad: string;
            unidad: string;
            descripcion: string;
            valorunitario: number | string;
            importe: number | string;
            objetoimp: string;
        }
    },
    impuestos: {
        retenciones? : {};
        traslados? : {};
        totalimpuestostrasladados?: number | string;
        totalimpuestosretenidos?: number | string;
    },
    fecha: string;
    version: string;
    formapago : string;
    subtotal: number | string;
    total: number | string;
    moneda: number | string;
    metodopago:string;
    lugarexpedicion:string;
    exportacion: string;

}

export interface InvoiceDocInterface {
    comprobante : Comprobante;
    clientId? : string;
    uuid : string;
    clientName? : string;
    deduct? : boolean;
    selfEmitted? : boolean;
    tags? : [string];
    xmlString: string;
}

const invoiceSchema = new mongoose.Schema<InvoiceDocInterface>({
    clientId : {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Clients'
    },
    clientName : String,
    uuid: {
        type:String,
        required:true
    },
    deduct: Boolean,
    selfEmitted: Boolean,
    tags: [String],
    xmlString: {
        type:String,
        required:true
    },
    comprobante: {
        emisor: {
            rfc: {
                type: String,
                match: REGEX_RFC,
                required:true
            },
            nombre: {
                type:String,
                required:true
            },
            regimenfiscal : {
                type:String,
                required:true
            }
        },
        receptor: {
            rfc: {
                type:String,
                required:true,
                match: REGEX_RFC
            },
            nombre: {
                type:String,
                required:true
            },
            domiciliofiscalreceptor: {
                type:String,
                required:true
            },
            regimenfiscalreceptor: {
                type:String,
                required:true
            },
            usocfdi: {
                type:String,
                required:true,
                //todo add enum of usoCFDI
            }
        },
        conceptos : {
            concepto: {
                impuestos: {},
                claveprodserv: String,
                cantidad: String,
                claveunidad: String,
                unidad: String,
                descripcion: String,
                valorunitario: Number,
                importe: Number,
                objetoimp: String
            }
        },
        impuestos: {
            retenciones : {},
            traslados : {},
            totalimpuestostrasladados: Number,
            totalimpuestosretenidos: Number
        },
        fecha: Date,
        version: String,
        formapago : {
            type:String,
            required:true
        },
        subtotal: {
            type:Number,
            required:true
        },
        total: {
            type:Number,
            required:true
        },
        moneda: {
            type:String,
            required:true
        },
        metodopago: {
            type:String,
            required:true
        },
        lugarexpedicion: {
            type:String,
            required:true
        },
        exportacion: String
    }
}, {
    timestamps: true,
})

const InvoiceModel = mongoose.model<InvoiceDocInterface>('Invoice', invoiceSchema);

export default InvoiceModel;
