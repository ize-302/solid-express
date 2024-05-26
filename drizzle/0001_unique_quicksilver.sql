CREATE TABLE `chatrooms` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `nameIndex` ON `chatrooms` (`name`);