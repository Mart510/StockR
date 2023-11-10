// import the model functions
import * as dbModel from '../models/dbModel.js';

// GET all the data in tickerholder
export async function getDataDump(req, res) {
    const data = await dbModel.getAll();
    res.status(200).json({status: "success", payload: data})
}

// GET all the symbols
export async function getSymbolArray(req, res) {
    const symbols = await dbModel.getSymbols()
    res.status(200).json({status: "success", payload: symbols})
}

// PATCH to update records
export async function updateQuoteData(req, res) {
    const symbol = req.params.symbol
    const quoteData = req.body;
    const update = dbModel.updateQuoteData(symbol, quoteData)

    // 404 status if the symbol is not found
    if (!update) {
        return res.status(404).json({status: 'fail', payload: {msg: 'Symbol not found'}});
    } else {
    // return confirmation
        res.status(200).json({status: 'success', payload: update});
    }
}

// GET record with highest gain by value
export async function getBigValue(req, res) {
    const data = await dbModel.getHighestbyVal();
    res.status(200).json({status: "success", payload: data});
}

// GET record with biggest loss by value
export async function getBigLoss(req, res) {
    const data = await dbModel.getWorstbyVal();
    res.status(200).json({status: "success", payload: data});
}

// GET record with highest gain by percentage
export async function getBigPercent(req, res) {
    const data = await dbModel.getHighestbyPercent();
    res.status(200).json({status: "success", payload: data});
}

// GET record with biggest loss by percentage
export async function getBigLossPercent(req, res) {
    const data = await dbModel.getWorstbyPercent();
    res.status(200).json({status: "success", payload: data});
}