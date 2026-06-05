import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def handler(event: dict, context) -> dict:
    """Отправляет заявку с контактной формы на почту dmitanton@ya.ru"""

    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400',
            },
            'body': ''
        }

    body = json.loads(event.get('body') or '{}')
    name = body.get('name', '').strip()
    contact = body.get('contact', '').strip()
    company = body.get('company', '').strip()
    message = body.get('message', '').strip()

    if not name or not contact:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Имя и контакт обязательны'})
        }

    smtp_host = os.environ.get('SMTP_HOST', 'smtp.yandex.ru')
    smtp_port = int(os.environ.get('SMTP_PORT', '465'))
    smtp_user = os.environ.get('SMTP_USER')
    smtp_password = os.environ.get('SMTP_PASSWORD')
    to_email = 'dmitanton@ya.ru'

    html = f"""
    <html><body style="font-family: Arial, sans-serif; color: #222;">
    <h2 style="color: #1a1a2e;">Новая заявка с сайта</h2>
    <table cellpadding="8" style="border-collapse: collapse; width: 100%;">
      <tr><td style="font-weight:bold; width:140px;">Имя:</td><td>{name}</td></tr>
      <tr style="background:#f5f5f5"><td style="font-weight:bold;">Телефон/Email:</td><td>{contact}</td></tr>
      <tr><td style="font-weight:bold;">Компания:</td><td>{company or '—'}</td></tr>
      <tr style="background:#f5f5f5"><td style="font-weight:bold; vertical-align:top;">Запрос:</td><td>{message or '—'}</td></tr>
    </table>
    </body></html>
    """

    msg = MIMEMultipart('alternative')
    msg['Subject'] = f'Новая заявка: {name}'
    msg['From'] = smtp_user
    msg['To'] = to_email
    msg.attach(MIMEText(html, 'html', 'utf-8'))

    auto_reply_html = f"""
    <html><body style="font-family: Arial, sans-serif; color: #222; max-width: 600px; margin: 0 auto;">
    <div style="border-top: 3px solid #b8902a; padding: 32px 0;">
      <h2 style="font-family: Georgia, serif; color: #1a2640; font-size: 24px; margin-bottom: 8px;">Антон Дмитриев</h2>
      <p style="color: #b8902a; font-size: 12px; letter-spacing: 2px; text-transform: uppercase; margin: 0 0 32px;">Консультант по продажам</p>
      <p style="font-size: 16px; line-height: 1.6;">{name}, добрый день!</p>
      <p style="font-size: 15px; line-height: 1.7; color: #444;">
        Спасибо Вам за выбор! В ближайшее время Мы свяжемся с Вами и ответим на все интересующие Вас вопросы!
      </p>
      <p style="font-size: 15px; line-height: 1.7; color: #444;">
        Первая консультация для Вас будет <strong>абсолютно бесплатной!</strong>
      </p>
      <div style="border-top: 1px solid #e0d5c0; margin-top: 32px; padding-top: 24px; color: #888; font-size: 13px;">
        С уважением,<br>
        <strong style="color: #1a2640;">Антон Дмитриев</strong>
      </div>
    </div>
    </body></html>
    """

    with smtplib.SMTP_SSL(smtp_host, smtp_port) as server:
        server.login(smtp_user, smtp_password)
        server.sendmail(smtp_user, to_email, msg.as_string())

        if '@' in contact:
            auto_msg = MIMEMultipart('alternative')
            auto_msg['Subject'] = 'Заявка получена — Антон Дмитриев'
            auto_msg['From'] = smtp_user
            auto_msg['To'] = contact
            auto_msg.attach(MIMEText(auto_reply_html, 'html', 'utf-8'))
            server.sendmail(smtp_user, contact, auto_msg.as_string())

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'ok': True})
    }