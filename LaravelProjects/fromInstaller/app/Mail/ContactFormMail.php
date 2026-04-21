<?php

namespace App\Mail;

use App\Models\Message;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ContactFormMail extends Mailable
{
    use Queueable, SerializesModels;

    public Message $contact;

    public function __construct(Message $contact)
    {
        $this->contact = $contact;
    }

    public function build()
    {
        return $this->subject('New Portfolio Contact - ' . $this->contact->name)
                    ->replyTo($this->contact->email, $this->contact->name)
                    ->view('emails.contact');
    }
}