# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.1]

### Changed

- README CI/CD badges to point to this fork

## [Unreleased]

This project was originally forked from [hadynz
obsidian-kindle-plugin](https://github.com/hadynz/obsidian-kindle-plugin), and contains numerous bug fixes, security updates, and a few additional features made possible with more recent versions of Obsidian.

The following is a list of changes based on [Kindle Highlights](https://github.com/hadynz/obsidian-kindle-plugin) v1.9.2, which was last released on Apr 2, 2023.

### Added

- New statusbar icon to display the current highlight sync state when logged into Amazon
- Statusbar tooltip to display the last sync time
- New setting to toggle statusbar visibility
- Support for i18n translations (based on the user's global language selection)
- Initial support for the Spanish language
- New setting to quickly create a new "Book" Obsidian base file to view all of your highlights in one place
- New setting to enable Obsidian frontmatter properties on imported highlight notes
- Add `lastAnnotatedDate` template property to filenames
- New setting to download high resolution book covers (#259 - hadynz/obsidian-kindle-plugin)
- Support for Amazon.ca (#292 - hadynz/obsidian-kindle-plugin)

### Changed

- Support for setting groups added in Obsidian v1.11
- Tag and lookup highlight notes with a `kindle-highlights` tag
- Rename FileManager to KindleFileManager for disambiguation

### Deprecated

- The `kindle-sync` frontmatter property is still currently written to notes. Any previous user-created bases that

### Removed

- Legacy `shortTitle` variable
- Code related to migrations

### Fixed

- Avoid using `vault.modify()` to write files
- README link to licence file
- Fix linter
- Failing test case
- Sync on startup prevented Obsidian from starting (#301 - hadynz/obsidian-kindle-plugin)
- Exception on Amazon logout (#289 - hadynz/obsidian-kindle-plugin)
- Increase book scrape timeout (#310 - hadynz/obsidian-kindle-plugin)
- Match product page to region URL (#279 - hadynz/obsidian-kindle-plugin)
- Author URL is always broken (#280 - hadynz/obsidian-kindle-plugin)
- Notes are not displayed after sync (#305 - hadynz/obsidian-kindle-plugin)

### Security

- Add `npm audit` to pre-commit hook
- Automatically run tests and linter on pre-commit
- Bump application dependencies (#325 - hadynz/obsidian-kindle-plugin)
