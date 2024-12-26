# Features to Prioritize

## User Authentication
- Implement basic sign-up/login with email and password (skip OAuth for now).
- Use JWT for session handling.

## Real-Time Messaging
- Focus on 1-to-1 chat first using Socket.IO.
- Basic message sending and receiving functionality.

## Basic Chat Management
- Maintain chat history (store messages in MongoDB).
- Display a list of recent chats.

## Notifications
- Real-time in-app notifications for new messages.

## User Profiles
- Allow users to view and update basic profile info (name and picture).

# Features to Postpone
- Group chat functionality.
- Media sharing and advanced notifications (e.g., push notifications).
- End-to-end encryption and message reactions.
- Themes, customizations, and voice/video calls.

# Best Practices to Focus On
- Keep the code modular and clean for easy future expansion.
- Test critical flows (authentication and messaging).
- Use dummy data where necessary to save time (e.g., hardcoded user lists).

# Realistic Timeline
- **Day 1**: Set up project structure and database. Implement basic user authentication.
- **Day 2-3**: Develop 1-to-1 real-time messaging using Socket.IO and build chat history.
- **Day 4**: Add in-app notifications and create a simple UI for chat and profiles.
- **Day 5**: Refine and test core features.
- **Day 6**: Optimize performance, fix bugs, and prepare for deployment.
- **Day 7**: Deploy and conduct user testing.