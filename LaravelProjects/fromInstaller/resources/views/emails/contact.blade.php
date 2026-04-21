<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>New Contact Form Submission</title>
</head>
<body style="font-family: 'Segoe UI', Arial, sans-serif; background: #f4f6f9; margin: 0; padding: 20px;">
    <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
        
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); padding: 30px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px;">📬 New Portfolio Contact</h1>
            <p style="color: #94a3b8; margin: 8px 0 0; font-size: 14px;">Someone just reached out to you!</p>
        </div>
        
        <!-- Body -->
        <div style="padding: 30px;">
            <table style="width: 100%; border-collapse: collapse;">
                <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                        <strong style="color: #475569;">👤 Name:</strong>
                    </td>
                    <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #0f172a;">
                        {{ $contact->name }}
                    </td>
                </tr>
                <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                        <strong style="color: #475569;">📧 Email:</strong>
                    </td>
                    <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #0f172a;">
                        <a href="mailto:{{ $contact->email }}" style="color: #3b82f6; text-decoration: none;">
                            {{ $contact->email }}
                        </a>
                    </td>
                </tr>
                @if(!empty($contact->phone))
                <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                        <strong style="color: #475569;">📞 Phone:</strong>
                    </td>
                    <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #0f172a;">
                        {{ $contact->phone }}
                    </td>
                </tr>
                @endif
                <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                        <strong style="color: #475569;">🆔 Message ID:</strong>
                    </td>
                    <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #0f172a;">
                        #{{ $contact->id }}
                    </td>
                </tr>
                <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                        <strong style="color: #475569;">🕒 Received:</strong>
                    </td>
                    <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #0f172a;">
                        {{ $contact->created_at->format('M d, Y - h:i A') }}
                    </td>
                </tr>
            </table>
            
            <div style="margin-top: 24px;">
                <strong style="color: #475569; display: block; margin-bottom: 10px;">💬 Message:</strong>
                <div style="background: #f8fafc; padding: 16px; border-left: 4px solid #3b82f6; border-radius: 6px; color: #1e293b; line-height: 1.6;">
                    {{ $contact->message }}
                </div>
            </div>
            
            <div style="margin-top: 30px; text-align: center;">
                <a href="mailto:{{ $contact->email }}" 
                   style="background: #0f172a; color: #ffffff; padding: 12px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; display: inline-block;">
                    Reply to {{ $contact->name }}
                </a>
            </div>
        </div>
        
        <!-- Footer -->
        <div style="background: #f8fafc; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0;">
            <p style="color: #64748b; margin: 0; font-size: 12px;">
                Sent from your portfolio contact form
            </p>
        </div>
    </div>
</body>
</html>