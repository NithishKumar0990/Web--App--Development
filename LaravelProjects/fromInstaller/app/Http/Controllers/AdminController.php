<?php

namespace App\Http\Controllers;

use App\Models\Message;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    // GET /api/admin/messages - List all messages
    public function index(Request $request)
    {
        $query = Message::query();

        // Search functionality
        if ($request->has('search') && $request->search !== '') {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('message', 'like', "%{$search}%")
                  ->orWhere('phone', 'like', "%{$search}%");
            });
        }

        // Filter by read/unread
        if ($request->has('filter')) {
            if ($request->filter === 'unread') {
                $query->where('is_read', false);
            } elseif ($request->filter === 'read') {
                $query->where('is_read', true);
            }
        }

        // Get messages (newest first)
        $messages = $query->orderBy('created_at', 'desc')->get();

        return response()->json([
            'success' => true,
            'messages' => $messages,
            'total' => $messages->count(),
        ]);
    }

    // GET /api/admin/stats - Dashboard statistics
    public function stats()
    {
        $total = Message::count();
        $unread = Message::where('is_read', false)->count();
        $read = Message::where('is_read', true)->count();
        $today = Message::whereDate('created_at', today())->count();
        $thisWeek = Message::whereBetween('created_at', [
            now()->startOfWeek(),
            now()->endOfWeek(),
        ])->count();

        return response()->json([
            'success' => true,
            'stats' => [
                'total' => $total,
                'unread' => $unread,
                'read' => $read,
                'today' => $today,
                'this_week' => $thisWeek,
            ],
        ]);
    }

    // GET /api/admin/messages/{id} - View single message
    public function show($id)
    {
        $message = Message::find($id);

        if (!$message) {
            return response()->json([
                'success' => false,
                'message' => 'Message not found',
            ], 404);
        }

        // Auto-mark as read when viewing
        if (!$message->is_read) {
            $message->update([
                'is_read' => true,
                'read_at' => now(),
            ]);
        }

        return response()->json([
            'success' => true,
            'message' => $message,
        ]);
    }

    // PATCH /api/admin/messages/{id}/read - Mark as read
    public function markAsRead($id)
    {
        $message = Message::find($id);

        if (!$message) {
            return response()->json([
                'success' => false,
                'message' => 'Message not found',
            ], 404);
        }

        $message->update([
            'is_read' => true,
            'read_at' => now(),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Marked as read',
        ]);
    }

    // PATCH /api/admin/messages/{id}/unread - Mark as unread
    public function markAsUnread($id)
    {
        $message = Message::find($id);

        if (!$message) {
            return response()->json([
                'success' => false,
                'message' => 'Message not found',
            ], 404);
        }

        $message->update([
            'is_read' => false,
            'read_at' => null,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Marked as unread',
        ]);
    }

    // DELETE /api/admin/messages/{id} - Delete message
    public function destroy($id)
    {
        $message = Message::find($id);

        if (!$message) {
            return response()->json([
                'success' => false,
                'message' => 'Message not found',
            ], 404);
        }

        $message->delete();

        return response()->json([
            'success' => true,
            'message' => 'Message deleted successfully',
        ]);
    }
}