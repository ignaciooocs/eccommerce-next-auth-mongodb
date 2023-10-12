import { Environment, IntegrationApiKeys, IntegrationCommerceCodes, Options, WebpayPlus } from "transbank-sdk"

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