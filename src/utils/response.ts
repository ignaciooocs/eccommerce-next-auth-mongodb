import mongoose from "mongoose";

const mercadopagoResponse = {
  body: {
    accounts_info: null,
    additional_info: {
      authentication_code: null,
      available_balance: null,
      ip_address: '201.223.142.138',
      items: [Array],
      nsu_processadora: null
    },
    authorization_code: '229549003',
    binary_mode: false,
    brand_id: null,
    build_version: '3.17.0-rc-3',
    call_for_authorize_id: null,
    captured: true,
    card: {
      cardholder: [Object],
      date_created: '2023-09-25T20:39:49.000-04:00',
      date_last_updated: '2023-09-25T20:39:49.000-04:00',
      expiration_month: 11,
      expiration_year: 2025,
      first_six_digits: '541675',
      id: null,
      last_four_digits: '2580'
    },
    charges_details: [],
    collector_id: 1489843539,
    corporation_id: null,
    counter_currency: null,
    coupon_amount: 0,
    currency_id: 'CLP',
    date_approved: '2023-09-25T20:39:49.616-04:00',
    date_created: '2023-09-25T20:39:49.370-04:00',
    date_last_updated: '2023-09-25T20:39:49.616-04:00',
    date_of_expiration: null,
    deduction_schema: null,
    description: 'Smart TV',
    differential_pricing_id: null,
    external_reference: null,
    fee_details: [ [Object] ],
    financing_group: null,
    id: 1318163943,
    installments: 1,
    integrator_id: null,
    issuer_id: '200',
    live_mode: false,
    marketplace_owner: null,
    merchant_account_id: null,
    merchant_number: null,
    metadata: {},
    money_release_date: '2023-09-25T20:39:49.616-04:00',
    money_release_schema: null,
    money_release_status: null,
    notification_url: 'https://chj8mbsz-3000.brs.devtunnels.ms/api/payment/webhook',
    operation_type: 'regular_payment',
    order: { id: '12056942857', type: 'mercadopago' },
    payer: {
      first_name: null,
      last_name: null,
      email: 'test_user_80507629@testuser.com',
      identification: [Object],
      phone: [Object],
      type: null,
      entity_type: null,
      id: '1491161142'
    },
    payment_method: {
      data: [Object],
      id: 'master',
      issuer_id: '200',
      type: 'credit_card'
    },
    payment_method_id: 'master',
    payment_type_id: 'credit_card',
    platform_id: null,
    point_of_interaction: {
      business_info: [Object],
      transaction_data: [Object],
      type: 'CHECKOUT'
    },
    pos_id: null,
    processing_mode: 'aggregator',
    refunds: [],
    shipping_amount: 0,
    sponsor_id: null,
    statement_descriptor: null,
    status: 'approved',
    status_detail: 'accredited',
    store_id: null,
    tags: null,
    taxes_amount: 0,
    transaction_amount: 20000,
    transaction_amount_refunded: 0,
    transaction_details: {
      acquirer_reference: null,
      external_resource_url: null,
      financial_institution: null,
      installment_amount: 20000,
      net_received_amount: 19240,
      overpaid_amount: 0,
      payable_deferral_period: null,
      payment_method_reference_id: null,
      total_paid_amount: 20000
    }
  },
  status: 200,
  idempotency: undefined,
  pagination: undefined
}


const response = {
  accounts_info: null,
  additional_info: {
    authentication_code: null,
    available_balance: null,
    ip_address: '201.223.142.138',
    items: [Array],
    nsu_processadora: null
  },
  authorization_code: '229549003',
  binary_mode: false,
  brand_id: null,
  build_version: '3.17.0-rc-3',
  call_for_authorize_id: null,
  captured: true,
  card: {
    cardholder: [Object],
    date_created: '2023-09-25T20:39:49.000-04:00',
    date_last_updated: '2023-09-25T20:39:49.000-04:00',
    expiration_month: 11,
    expiration_year: 2025,
    first_six_digits: '541675',
    id: null,
    last_four_digits: '2580'
  },
  charges_details: [],
  collector_id: 1489843539,
  corporation_id: null,
  counter_currency: null,
  coupon_amount: 0,
  currency_id: 'CLP',
  date_approved: '2023-09-25T20:39:49.616-04:00',
  date_created: '2023-09-25T20:39:49.370-04:00',
  date_last_updated: '2023-09-25T20:39:49.616-04:00',
  date_of_expiration: null,
  deduction_schema: null,
  description: 'Smart TV',
  differential_pricing_id: null,
  external_reference: null,
  fee_details: [ [Object] ],
  financing_group: null,
  id: 1318163943,
  installments: 1,
  integrator_id: null,
  issuer_id: '200',
  live_mode: false,
  marketplace_owner: null,
  merchant_account_id: null,
  merchant_number: null,
  metadata: {},
  money_release_date: '2023-09-25T20:39:49.616-04:00',
  money_release_schema: null,
  money_release_status: null,
  notification_url: 'https://chj8mbsz-3000.brs.devtunnels.ms/api/payment/webhook',
  operation_type: 'regular_payment',
  order: { id: '12056942857', type: 'mercadopago' },
  payer: {
    first_name: null,
    last_name: null,
    email: 'test_user_80507629@testuser.com',
    identification: [Object],
    phone: [Object],
    type: null,
    entity_type: null,
    id: '1491161142'
  },
  payment_method: {
    data: [Object],
    id: 'master',
    issuer_id: '200',
    type: 'credit_card'
  },
  payment_method_id: 'master',
  payment_type_id: 'credit_card',
  platform_id: null,
  point_of_interaction: {
    business_info: [Object],
    transaction_data: [Object],
    type: 'CHECKOUT'
  },
  pos_id: null,
  processing_mode: 'aggregator',
  refunds: [],
  shipping_amount: 0,
  sponsor_id: null,
  statement_descriptor: null,
  status: 'approved',
  status_detail: 'accredited',
  store_id: null,
  tags: null,
  taxes_amount: 0,
  transaction_amount: 20000,
  transaction_amount_refunded: 0,
  transaction_details: {
    acquirer_reference: null,
    external_resource_url: null,
    financial_institution: null,
    installment_amount: 20000,
    net_received_amount: 19240,
    overpaid_amount: 0,
    payable_deferral_period: null,
    payment_method_reference_id: null,
    total_paid_amount: 20000
  }
}
const error_response = {
  accounts_info: null,
  additional_info: {
    authentication_code: null,
    available_balance: null,
    ip_address: '191.126.27.63',
    items: [ [Object], [Object], [Object] ],
    nsu_processadora: null
  },
  authorization_code: '229549003',
  binary_mode: false,
  brand_id: null,
  build_version: '3.18.0',
  call_for_authorize_id: null,
  captured: true,
  card: {
    cardholder: { identification: [Object], name: 'OTHE' },
    date_created: '2023-09-28T16:19:43.000-04:00',
    date_last_updated: '2023-09-28T16:19:43.000-04:00',
    expiration_month: 11,
    expiration_year: 2025,
    first_six_digits: '541675',
    id: null,
    last_four_digits: '2580'
  },
  charges_details: [],
  collector_id: 1491468720,
  corporation_id: null,
  counter_currency: null,
  coupon_amount: 0,
  currency_id: 'CLP',
  date_approved: null,
  date_created: '2023-09-28T16:19:43.221-04:00',
  date_last_updated: '2023-09-28T16:19:43.469-04:00',
  date_of_expiration: null,
  deduction_schema: null,
  description: 'Gorra New Era 59FIFTY',
  differential_pricing_id: null,
  external_reference: null,
  fee_details: [],
  financing_group: null,
  id: 1318236319,
  installments: 1,
  integrator_id: null,
  issuer_id: '200',
  live_mode: false,
  marketplace_owner: null,
  merchant_account_id: null,
  merchant_number: null,
  metadata: {},
  money_release_date: null,
  money_release_schema: null,
  money_release_status: null,
  notification_url: 'https://chj8mbsz-3000.brs.devtunnels.ms/api/payment/webhook',
  operation_type: 'regular_payment',
  order: { id: '12116868095', type: 'mercadopago' },
  payer: {
    first_name: null,
    last_name: null,
    email: 'test_user_80507629@testuser.com',
    identification: { number: '32659430', type: 'DNI' },
    phone: { area_code: null, number: null, extension: null },
    type: null,
    entity_type: null,
    id: '1491161142'
  },
  payment_method: {
    data: { routing_data: [Object] },
    id: 'master',
    issuer_id: '200',
    type: 'credit_card'
  },
  payment_method_id: 'master',
  payment_type_id: 'credit_card',
  platform_id: null,
  point_of_interaction: {
    business_info: { sub_unit: 'checkout_pro', unit: 'online_payments' },
    transaction_data: { e2e_id: null },
    type: 'CHECKOUT'
  },
  pos_id: null,
  processing_mode: 'aggregator',
  refunds: [],
  shipping_amount: 0,
  sponsor_id: null,
  statement_descriptor: null,
  status: 'rejected',
  status_detail: 'cc_rejected_other_reason',
  store_id: null,
  tags: null,
  taxes_amount: 0,
  transaction_amount: 19497,
  transaction_amount_refunded: 0,
  transaction_details: {
    acquirer_reference: null,
    external_resource_url: null,
    financial_institution: null,
    installment_amount: 19497,
    net_received_amount: 0,
    overpaid_amount: 0,
    payable_deferral_period: null,
    payment_method_reference_id: null,
    total_paid_amount: 19497
  }
}


const orderSchema = new mongoose.Schema({
  authorization_code: String,
  card: {
    date_created: Date,
    expiration_month: Number,
    expiration_year: Number,
    first_six_digits: String,
    last_four_digits: String
  },
  collector_id: Number,
  currency_id: String,
  date_approved: Date,
  date_created: Date,
  description: String,
  id: Number,
  installments: Number,
  operation_type: String,
  order: { id: String, type: String },
  payer: {
    email: String,
    id: String
  },
  payment_method_id: String,
  payment_type_id: String,
  status: String,
  transaction_amount: Number,
  transaction_details: {
    installment_amount: Number,
    net_received_amount: Number,
    total_paid_amount: Number
  }
});

const OrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }],
  authorization_code: String,
  card: {
    date_created: Date,
    expiration_month: Number,
    expiration_year: Number,
    first_six_digits: String,
    last_four_digits: String
  },
  collector_id: Number,
  currency_id: String,
  date_approved: Date,
  date_created: Date,
  description: String,
  id: Number,
  installments: Number,
  operation_type: String,
  order: { id: String, type: String },
  payment_method_id: String,
  payment_type_id: String,
  status: String,
  transaction_amount: Number,
  transaction_details: {
    installment_amount: Number,
    net_received_amount: Number,
    total_paid_amount: Number
  }
});

module.exports = mongoose.model('Order', OrderSchema)

const reponseDebito = {
  vci: 'TSY',
  amount: 59980,
  status: 'AUTHORIZED',
  buy_order: '202310090052453665a07jxerh',
  session_id: '700441a2-8a03-4240-ac26-e77fe0a27bfe',
  card_detail: { card_number: '7763' },
  accounting_date: '1009',
  transaction_date: '2023-10-09T03:52:47.131Z',
  authorization_code: '1415',
  payment_type_code: 'VD',
  response_code: 0,
  installments_number: 0
}

const responseVisa6 = {
  vci: 'TSY',
  amount: 69990,
  status: 'AUTHORIZED',
  buy_order: '20231009010007319ppn6bmje8',
  session_id: 'c7b2b245-3259-4653-875e-faffb3899e9f',
  card_detail: { card_number: '6623' },
  accounting_date: '1009',
  transaction_date: '2023-10-09T04:00:09.498Z',
  authorization_code: '1213',
  payment_type_code: 'NC',
  response_code: 0,
  installments_amount: 11665,
  installments_number: 6
}

const prepago = {
  vci: 'TSY',
  amount: 29990,
  status: 'AUTHORIZED',
  buy_order: '20231009011452274whhvd87i3',
  session_id: 'a961ef81-e739-4632-ad85-aea17cb809bf',
  card_detail: { card_number: '6590' },
  accounting_date: '1009',
  transaction_date: '2023-10-09T04:14:54.042Z',
  authorization_code: '3122',
  payment_type_code: 'VP',
  response_code: 0,
  installments_number: 0
}

const amex = {
  vci: 'TSY',
  amount: 69990,
  status: 'AUTHORIZED',
  buy_order: '20231009011924525ltsd0yjhr',
  session_id: '2658c2e6-40f5-4275-9176-e2caa2600d16',
  card_detail: { card_number: '2032' },
  accounting_date: '1009',
  transaction_date: '2023-10-09T04:19:26.731Z',
  authorization_code: '1617',
  payment_type_code: 'SI',
  response_code: 0,
  installments_amount: 23330,
  installments_number: 3
}