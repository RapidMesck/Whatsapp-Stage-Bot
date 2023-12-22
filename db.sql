CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `user_number` varchar(255) DEFAULT NULL,,
  `status` varchar(255) DEFAULT NULL,
  `last_message` varchar(255) DEFAULT NULL,
  `last_update` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
)