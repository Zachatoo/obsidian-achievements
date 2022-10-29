import type { CachedMetadata } from "obsidian";
import { fileHasCallout, getFileHeadingLevelsCount } from "src/markdownHelpers";
import { describe, expect, it } from "vitest";

describe("markdownHelpers", () => {
	describe("fileHasCallout", () => {
		it("returns true if there is a callout", () => {
			const mockCache: CachedMetadata = {
				sections: [
					{
						type: "callout",
						position: {
							end: { line: 2, col: 10, offset: 27 },
							start: { line: 1, col: 0, offset: 1 },
						},
					},
				],
			};

			const result = fileHasCallout(mockCache);

			expect(result).toBe(true);
		});

		it("returns false for empty cache", () => {
			const mockCache: CachedMetadata = {};

			const result = fileHasCallout(mockCache);

			expect(result).toBe(false);
		});

		it("returns false if there are no callouts", () => {
			const mockCache: CachedMetadata = {
				sections: [
					{
						position: {
							end: { line: 0, col: 9, offset: 9 },
							start: { line: 0, col: 0, offset: 0 },
						},
						type: "heading",
					},
					{
						position: {
							end: { line: 2, col: 7, offset: 18 },
							start: { line: 2, col: 0, offset: 11 },
						},
						type: "paragraph",
					},
				],
			};

			const result = fileHasCallout(mockCache);

			expect(result).toBe(false);
		});
	});

	describe("getFileHeadingLevelsCount", () => {
		it("returns 0 if no headings", () => {
			const mockCache: CachedMetadata = {
				sections: [
					{
						type: "callout",
						position: {
							end: { line: 2, col: 10, offset: 27 },
							start: { line: 1, col: 0, offset: 1 },
						},
					},
				],
			};

			const result = getFileHeadingLevelsCount(mockCache);

			expect(result).toBe(0);
		});

		it("returns 0 if empty cache", () => {
			const mockCache: CachedMetadata = {};

			const result = getFileHeadingLevelsCount(mockCache);

			expect(result).toBe(0);
		});

		it("returns 1 if single heading", () => {
			const mockCache: CachedMetadata = {
				headings: [
					{
						heading: "Heading",
						level: 1,
						position: {
							end: { line: 0, col: 9, offset: 9 },
							start: { line: 0, col: 0, offset: 0 },
						},
					},
				],
			};

			const result = getFileHeadingLevelsCount(mockCache);

			expect(result).toBe(1);
		});

		it("returns 1 if 2 headings same level", () => {
			const mockCache: CachedMetadata = {
				headings: [
					{
						heading: "Heading",
						level: 1,
						position: {
							end: { line: 0, col: 9, offset: 9 },
							start: { line: 0, col: 0, offset: 0 },
						},
					},
					{
						heading: "Another heading",
						level: 1,
						position: {
							end: { line: 4, col: 17, offset: 37 },
							start: { line: 4, col: 0, offset: 20 },
						},
					},
				],
			};

			const result = getFileHeadingLevelsCount(mockCache);

			expect(result).toBe(1);
		});

		it("returns 2 if 2 headings different levels", () => {
			const mockCache: CachedMetadata = {
				headings: [
					{
						heading: "Heading",
						level: 1,
						position: {
							end: { line: 0, col: 9, offset: 9 },
							start: { line: 0, col: 0, offset: 0 },
						},
					},
					{
						heading: "Another heading",
						level: 2,
						position: {
							end: { line: 4, col: 18, offset: 38 },
							start: { line: 4, col: 0, offset: 20 },
						},
					},
				],
			};

			const result = getFileHeadingLevelsCount(mockCache);

			expect(result).toBe(2);
		});

		it("returns 6 if 6 headings different levels", () => {
			const mockCache: CachedMetadata = {
				headings: [
					{
						position: {
							start: { line: 0, col: 0, offset: 0 },
							end: { line: 0, col: 13, offset: 13 },
						},
						heading: "First level",
						level: 1,
					},
					{
						position: {
							start: { line: 2, col: 0, offset: 15 },
							end: { line: 2, col: 15, offset: 30 },
						},
						heading: "Second level",
						level: 2,
					},
					{
						position: {
							start: { line: 4, col: 0, offset: 32 },
							end: { line: 4, col: 15, offset: 47 },
						},
						heading: "Third level",
						level: 3,
					},
					{
						position: {
							start: { line: 6, col: 0, offset: 49 },
							end: { line: 6, col: 17, offset: 66 },
						},
						heading: "Fourth level",
						level: 4,
					},
					{
						position: {
							start: { line: 8, col: 0, offset: 68 },
							end: { line: 8, col: 17, offset: 85 },
						},
						heading: "Fifth level",
						level: 5,
					},
					{
						position: {
							start: { line: 10, col: 0, offset: 87 },
							end: { line: 10, col: 18, offset: 105 },
						},
						heading: "Sixth level",
						level: 6,
					},
				],
			};

			const result = getFileHeadingLevelsCount(mockCache);

			expect(result).toBe(6);
		});
	});
});
