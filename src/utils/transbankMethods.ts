import { Environment, IntegrationApiKeys, IntegrationCommerceCodes, Options, WebpayPlus } from "transbank-sdk"
import { generarNumeroOrden } from "./generateNumeroOrder"
import { v4 } from "uuid"


const sessionId = v4()
const buyOrder = generarNumeroOrden()
const returnUrl = 'http://localhost:3000/transaction/view'

export const createTransaction = async (amount: number) => {
  const orderResponse = await (
    new WebpayPlus.Transaction(
      new Options(
        IntegrationCommerceCodes.WEBPAY_PLUS,
        IntegrationApiKeys.WEBPAY, 
        Environment.Integration
      )
    )).create(
    buyOrder, 
    sessionId, 
    amount, 
    returnUrl
  );
  return { orderResponse, sessionId }
}

export const getStatus = async (tbkToken: string) => {
  const statusResponse = await (
    new WebpayPlus.Transaction(
      new Options(
        IntegrationCommerceCodes.WEBPAY_PLUS, 
        IntegrationApiKeys.WEBPAY, 
        Environment.Integration
      )
    ).status(tbkToken)
  )
    return statusResponse
}

export const commitTransaction = async (token: string) => {
  const commitResponse = await (
    new WebpayPlus.Transaction(
      new Options(
        IntegrationCommerceCodes.WEBPAY_PLUS, 
        IntegrationApiKeys.WEBPAY, 
        Environment.Integration
      )
    ).commit(token)
  )
  return commitResponse
}