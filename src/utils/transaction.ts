export const createTransaction = (items: Object[], response: any) => {
  const products: string[] = []

  items.forEach((product: any) => {
    const { id } = product;
    products.push(id)
  });

  const newTransaction = {
    products,
    authorization_code: response.authorization_code,
    card: {
      date_created: response.date_created,
      expiration_month: response.card.expiration_month,
      expiration_year: response.card.expiration_year,
      first_six_digits: response.card.first_six_digits,
      last_four_digits: response.card.last_four_digits
    },
    collector_id: response.collector_id,
    currency_id: response.currency_id,
    date_approved: response.date_approved,
    date_created: response.date_created,
    description: response.description,
    id: response.id,
    installments: response.installments,
    operation_type: response.operation_type,
    order_id: response.order.id,
    order_type: response.order.type,
    payment_method_id: response.payment_method_id,
    payment_type_id: response.payment_type_id,
    status: response.status,
    transaction_amount: response.transaction_amount,
    transaction_details: {
      installment_amount: response.transaction_details.installment_amount,
      net_received_amount: response.transaction_details.net_received_amount,
      total_paid_amount: response.transaction_details.total_paid_amount
    }
  }
  return {...newTransaction}
}