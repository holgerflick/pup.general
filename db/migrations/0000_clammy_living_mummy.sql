CREATE TABLE `polls` (
	`pollster` text NOT NULL,
	`range` text NOT NULL,
	`starts` text NOT NULL,
	`ends` text NOT NULL,
	`sample` text NOT NULL,
	`sampleNumber` integer,
	`sampleGroup` text NOT NULL,
	`registeredOnly` integer NOT NULL,
	`likelyOnly` integer NOT NULL,
	`allPolled` integer NOT NULL,
	`margin` text NOT NULL,
	`trump` text NOT NULL,
	`biden` text NOT NULL,
	`leading` text NOT NULL,
	`leadingBy` integer NOT NULL,
	PRIMARY KEY(`pollster`, `range`)
);
