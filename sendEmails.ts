import AprovedEmail from '@/components/emails/AprovedEmail';
import FailedEmail from '@/components/emails/FailedEmail';
import { IWebpayTransaction } from '@/models/WebpayTransaction';
import { TCart } from '@/types/Interfaces';
import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);

interface Props {
  email: string
  commitResponse: IWebpayTransaction
  products: TCart
}

export const SendEmailAuthorized = async ({ email, commitResponse, products }: Props): Promise<void> => {
  await resend.emails.send({
    from: 'PineBerry <equipopineberry@finanzastransparentes.co>',
    to: [email],
    subject: 'Compra Éxitosa!',
    react: AprovedEmail({data: { ...commitResponse, products }}) as React.ReactElement,
  });
}

export const SendEmailFailed = async ({ email, buy_order }: { email: string, buy_order: string }) => {
  await resend.emails.send({
    from: 'PineBerry <equipopineberry@finanzastransparentes.co>',
    to: [email],
    subject: 'Compra Fallida ❌',
    react: FailedEmail({ buy_order }) as React.ReactElement,
  });
}