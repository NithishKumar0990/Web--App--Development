<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;
use App\Mail\ContactFormMail;
use App\Mail\AutoReplyMail;
use App\Models\Message; // <-- Keep the Model import

class ContactController extends Controller
{
    public function send(Request $request)
    {
        try {
            // 1. Validate Input (from Code 2, with custom rules/messages)
            $validated = $request->validate([
                'name' => 'required|string|min:2|max:255',
                'email' => 'required|email:rfc|max:255',
                'phone' => 'nullable|regex:/^[+]?[0-9\s\-\(\)]{10,15}$/',
                'message' => 'required|string|min:10|max:2000',
            ], [
                'name.required' => 'Please enter your name',
                'name.min' => 'Name must be at least 2 characters',
                'email.required' => 'Email address is required',
                'email.email' => 'Please enter a valid email address',
                'phone.regex' => 'Please enter a valid phone number (10-15 digits)',
                'message.required' => 'Please enter your message',
                'message.min' => 'Message must be at least 10 characters',
            ]);

            // 2. Save to Database (from Code 1 ✨ NEW STEP ✨)
            $newMessage = Message::create([
                'name' => $validated['name'],
                'email' => $validated['email'],
                'phone' => $validated['phone'] ?? null,
                'message' => $validated['message'],
                'is_read' => false, // Default to unread
            ]);

            // 3. Send Email to YOU (Notification)
            Mail::to('nithishkumarl168@gmail.com')
                ->send(new ContactFormMail($newMessage));

            // 4. Send Auto-Reply to Visitor
            Mail::to($validated['email'])
                ->send(new AutoReplyMail($newMessage));

            // 5. Log success
            Log::info('Both emails sent successfully', [
                'visitor' => $validated['email']
            ]);

            // 6. Return JSON Response
            return response()->json([
                'success' => true,
                'message' => 'Message sent successfully! Check your email for a confirmation.'
            ], 200);

        } catch (\Illuminate\Validation\ValidationException $e) {
            // Handle validation errors (from Code 2)
            return response()->json([
                'success' => false,
                'errors' => $e->errors(),
                'error' => collect($e->errors())->flatten()->first()
            ], 422);

        } catch (\Exception $e) {
            // Handle other errors (from both codes)
            Log::error('Contact Form Error: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
