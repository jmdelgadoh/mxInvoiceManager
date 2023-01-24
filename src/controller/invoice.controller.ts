import {Request, Response, NextFunction} from "express";
import isObject from 'lodash/isObject'
import pick from 'lodash/pick'
import {Options} from "xml-js";
import InvoiceModel from "../models/invoice.model";
const busboy = require('busboy')
const convert = require('xml-js')


export const uploadInvoices = async (req : Request, res: Response, next: NextFunction) => {
    const bb = busboy({headers:req.headers})
    const filesArr : Array<{}> = []
// key for bb to parse!
    req.pipe(bb)
    bb.on('file', (name : string, file: any, info: { filename: string; encoding: any; mimeType: string; }) => {

        const { filename, encoding, mimeType } = info;
        console.log(
            `File [${name}]: filename: %j, encoding: %j, mimeType: %j`,
            filename,
            encoding,
            mimeType
        );

        file.on('data', (data : Buffer) => {
            const xmlOptions : Options.XML2JS = {
                compact:true,
                nativeType:true,
                elementNameFn : removeJSONFieldPrefix,
                attributeNameFn: removeJSONFieldPrefix
            }
            const json = convert.xml2js(data.toString(), xmlOptions)
            //todo validate xml is valid cfdi
            const sansAtt = removeAttributeLayer(json)
            const curatedObj = keepRelevantInvoiceFields(sansAtt)
            console.log(json.comprobante.complemento)
            const doc = {
                comprobante: {...curatedObj},
                clientName: curatedObj.receptor.nombre,
                uuid: json.comprobante.complemento.timbrefiscaldigital._attributes.uuid,
                deduct: true,
                selfEmitted: true, //todo extract this data from cfdi
                tags: ['tags','banana'],
                xmlString: data.toString()
            }
            filesArr.push(doc)

        }).on('close', () => {
            console.log(`File [${name}] done`);
        });


    })
    bb.on('close', async () => {
        console.log('Done parsing form!');

        await InvoiceModel.insertMany(filesArr).then((response)=>{
            res.status(201).send(response);
        }).catch(err => {
            if(err.name === 'ValidationError')
                res.status(400).json(err)
            else
                res.status(500).json(err)
            // return next(err)
        })
    });



}

const removeJSONFieldPrefix = (value : string) : string => {

    let newValue = value.toLowerCase()

    if(value.includes(':')){
        newValue = value.split(':')[1].toLowerCase()
    }

    return newValue
}

const removeAttributeLayer = (invoiceOriginal: object) : {_declaration: any, comprobante:any} => {
    let clone : object | any = {...invoiceOriginal}

    Object.keys(clone).forEach(nestedKey => {
        if(nestedKey === '_attributes'){
            clone = {
                ...clone,
                ...clone[nestedKey]
            }
            delete clone[nestedKey]
        } else {
            if(isObject(clone[nestedKey])){
                clone[nestedKey] = {
                    ...removeAttributeLayer(clone[nestedKey])
                }
            }
        }
    })
    return clone
}

const keepRelevantInvoiceFields = (invoice : {'_declaration': any, comprobante:any}) => {
    const fields = ['emisor','receptor','conceptos','impuestos', 'fecha','version','formapago',
        'subtotal','total','moneda','metodopago','lugarexpedicion','tipocomprobante','exportacion']
    const comprobante = pick(invoice.comprobante, fields)

    return {...comprobante}
}