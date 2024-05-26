CREATE TABLE `profiles` (
	`id` text PRIMARY KEY NOT NULL,
	`userid` text
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`username` text,
	`password` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `userIdIndex` ON `profiles` (`userid`);--> statement-breakpoint
CREATE UNIQUE INDEX `usernameIndex` ON `users` (`username`);