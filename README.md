# Whatsapp-Stage-Bot
Using Node.js' whatsapp-web.js module enables the creation of a bot for WhatsApp that manages conversations in sequential stages, working like a dialogue funnel to guide the user in an organized and objective way.

# Create MYSQL Table
Run this sql code to create a user table for the bot job: 
```sql
  <CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `user_number` varchar(255) DEFAULT NULL,,
  `status` varchar(255) DEFAULT NULL,
  `last_message` varchar(255) DEFAULT NULL,
  `last_update` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
)```
