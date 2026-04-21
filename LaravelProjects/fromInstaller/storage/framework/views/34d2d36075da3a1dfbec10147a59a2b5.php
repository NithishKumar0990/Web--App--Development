<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Thank You for Reaching Out</title>
</head>
<body style="font-family: 'Segoe UI', Arial, sans-serif; background: #f4f6f9; margin: 0; padding: 20px;">
    <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
        
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); padding: 40px 30px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 28px;">Thank You! 🙏</h1>
            <p style="color: #94a3b8; margin: 12px 0 0; font-size: 16px;">Your message has been received</p>
        </div>
        
        <!-- Body -->
        <div style="padding: 40px 30px;">
            <p style="color: #1e293b; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
                Hi <strong><?php echo e($contact->name); ?></strong>,
            </p>
            
            <p style="color: #475569; font-size: 15px; line-height: 1.7; margin: 0 0 20px;">
                Thank you so much for reaching out through my portfolio! 🎉 
                I truly appreciate you taking the time to get in touch with me.
            </p>
            
            <p style="color: #475569; font-size: 15px; line-height: 1.7; margin: 0 0 20px;">
                I have received your message and will personally review it shortly. 
                You can expect a response from me within <strong>24-48 hours</strong>.
            </p>
            
            <!-- Their message preview -->
            <div style="background: #f8fafc; padding: 20px; border-left: 4px solid #3b82f6; border-radius: 6px; margin: 24px 0;">
                <p style="color: #64748b; margin: 0 0 8px; font-size: 13px; font-weight: 600;">YOUR MESSAGE:</p>
                <p style="color: #1e293b; margin: 0; line-height: 1.6; font-style: italic;">
                    "<?php echo e($contact->message); ?>"
                </p>
            </div>
            
            <p style="color: #475569; font-size: 15px; line-height: 1.7; margin: 0 0 20px;">
                In the meantime, feel free to explore my work and connect with me on social platforms.
            </p>
            
            <!-- Social Links -->
            <div style="text-align: center; margin: 30px 0;">
                <a href="https://github.com/Nithishkumar0990" 
                   style="display: inline-block; margin: 0 8px; color: #0f172a; text-decoration: none; padding: 10px 18px; background: #f1f5f9; border-radius: 6px; font-size: 14px;">
                    GitHub
                </a>
                <a href="https://www.linkedin.com/in/nithish-kumar-l-04a998372/"
                   style="display: inline-block; margin: 0 8px; color: #0f172a; text-decoration: none; padding: 10px 18px; background: #f1f5f9; border-radius: 6px; font-size: 14px;">
                    LinkedIn
                </a>
            </div>
            
            <p style="color: #475569; font-size: 15px; line-height: 1.7; margin: 30px 0 0;">
                Looking forward to connecting with you soon!
            </p>
            
            <p style="color: #1e293b; font-size: 15px; line-height: 1.7; margin: 20px 0 0;">
                Best regards,<br>
                <strong style="font-size: 17px;">Nithish Kumar L</strong><br>
                <span style="color: #64748b; font-size: 13px;">Full Stack Developer</span>
            </p>
        </div>
        
        <!-- Footer -->
        <div style="background: #f8fafc; padding: 24px; text-align: center; border-top: 1px solid #e2e8f0;">
            <p style="color: #64748b; margin: 0 0 8px; font-size: 13px;">
                📧 nithishkumarl168@gmail.com
            </p>
            <p style="color: #94a3b8; margin: 0; font-size: 11px;">
                This is an automated response. Please do not reply to this email.
            </p>
        </div>
    </div>
</body>
</html><?php /**PATH C:\LaravelProjects\fromInstaller\resources\views/emails/auto-reply.blade.php ENDPATH**/ ?>