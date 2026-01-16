export const STRINGS_EN = {
    common: {
        saveButton: 'Save',
        cancelButton: 'Cancel',
        discardButton: 'Discard',
        okButton: 'OK',
    },
    fileMenu: {
        resyncTitle: 'Resync Kindle highlights in file'
    },
    syncModal: {
        yourHighlights: 'Your Kindle highlights',
        initialSync: 'Sync highlights',
        syncingTitle: 'Syncing your highlights...',
        chooseSyncMethod: 'Choose a sync method...',
        books: 'Books',
        highlights: 'Highlights',
        amazonCloud: 'Amazon Cloud',
        syncNowButton: 'Sync now',
        syncing: 'Syncing',
        uploadClippings: 'Upload "My Clippings.txt file"',
        loggingInto: 'Logging into ',
        amazonProgressMessage: 'Looking for new Kindle highlights to sync...',
        clippingsProgressMessage: 'Parsing your My Clippings.txt files for highlights and notes...',
        syncingViewErrorMessage: ' books(s) could not be synced because of errors',
        breakingChangeNotice: 'Breaking change notice', // TODO: Remove this
    },
    templateEditorModal: {
        title: 'Unsaved changes',
        message: 'Are you sure you want to close the template editor without saving? Your changes will be lost.',
        editControlsAreaLabel: 'See available template variables',
        hasErrorsMessage: 'Template has a syntax error and cannot be compiled',
    },
    tipsModal: {
        alwaysSet: ' - (always set)',
        shortBookTitleTip: 'Book title - short',
        longTitleTip: 'Book title - full',
        authorTip: 'Authors\' name',
        authorsLastNamesTip: 'Combined Authors\' last names',
        authorsLastNamesExampleTip: 'e.g. "Sanderson_et_al", Robin-Dominguez"',
        firstAuthorFirstNameTip: 'First name of first author',
        firstAuthorLastNameTip: 'First name of last author',
        secondAuthorFirstNameTip: 'First name of second author',
        secondAuthorLastNameTip: 'Last name of second author',
        asinTip: 'Book ASIN',
        urlTip: 'Amazon Book URL',
        imageUrlTip: 'Amazon book cover image URL',
        lastAnnotatedDateTip: 'Date of last highlight annotation',
        appLinkTip: 'Link to book in Kindle application',
        isbnTip: 'Book ISBN',
        pageTip: 'Page',
        pagesTip: 'Number of pages in book',
        publicationDateTip: 'Publication date',
        publisherTip: 'Name of publisher',
        authorUrl: 'Author\'s page on Amazon.com',
        highlightsCountTip: 'Number of highlights',
        textTip: 'Highlighted text',
        highlightsTip: 'Block of book highlights',
        locationTip: 'Highlight location in book',
        noteTip: 'Your note annotation',
        colorTip: 'Highlighted color',
        creationDateTip: 'Highlight creation date',
    },
    settings: {
        groups: {
            account: 'Amazon Account',
            highlights: 'Highlights',
            templates: 'Highlight templates',
            bases: 'Book base',
            advanced: 'Advanced',
        },
        account: {
            title: 'Logged in to Amazon Kindle Reader',
            lastSync: 'Last sync: ',
            booksSynced: 'book(s) synced',
            neverSynced: 'Sync has never run',
            buttonDefault: 'Sign out',
            buttonPressed: 'Signing out...',
        },
        region: {
            title: 'Amazon region',
            description: 'Select the Amazon region for your Kindle account.',
        },
        templates: {
            title: 'Highlight templates',
            description: 'Manage and edit templates for file names and highlight note content.',
            button: 'Manage',
        },
        highlightsFolder: {
            title: 'Highlight folder location',
            descriotion: 'Vault folder to use for writing book highlight notes.',
        },
        highlightsBaseFolder: {
            title: 'Highlight base folder location',
            description: 'Vault folder to use to Create a customizable Obsidian base file in the Highlights folder location to display your Kindle highlights and metadata, in one place.',
        },
        highlightsBaseFile: {
            button: 'Create base file',
        },
        downloadBookMetadata: {
            title: 'Download book metadata',
            description: 'Download extra book metadata from Amazon.com. Turn off to speed up the sync process.',
        },
        useObsidianFileProperties: {
            title: 'Use Obsidian file properties',
            description: 'Store book metadata in Obsidian file properties (front matter).',
        },
        downloadHighResImages: {
            title: 'Download high resolution book images',
            description: 'Download high resolution book cover images when available.',
        },
        syncOnStartup: {
            title: 'Sync on startup',
            description: 'Automatically sync new Kindle highlights when Obsidian starts  (Amazon sync only)'
        },
        showHighlightsToolbar: {
            title: 'Show highlight sync state in status bar',
            description: 'Show the highlight note sync state in the status bar',
        },
        sponsor: {
            title: 'Sponsor',
            description: '☕️ Buy me a coffee'
        }
    },
    templates: {
        common: {
            overrideDefaultTemplateButtonDefault: 'Override default template',
        },
        fileName: {
            pane: 'File name',
            title: 'File name template',
        },
        fileContent: {
            pane: 'File content',
            title: 'File template',
            description: 'Template for a file of highlights. This can include YAML front matter.',
        },
        highlight: {
            pane: 'Highlight',
            title: 'Highlight template',
            description: 'Template for an individual highlight',
        },
        livePreview: {
            title: 'Live Preview',
            selectBook: 'Select a sample book',
            selectHighlight: 'Select a sample highlight',
            fileName: 'File name',
            fileMarkup: 'File markup',
        }
    }
}