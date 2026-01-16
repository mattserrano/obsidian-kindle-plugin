export const STRINGS_ES = {
    common: {
        saveButton: 'Guardar',
        cancelButton: ' Cancelar',
        discardButton: 'Descartar',
        okButton: 'OK',
    },
    fileMenu: {
        resyncTitle: 'Resincronizar notas de Kindle en el archivo'
    },
    syncModal: {
        yourHighlights: 'Tus notas de Kindle',
        initialSync: 'Sincroniza notas',
        syncingTitle: 'Sincronizando tus notas...',
        chooseSyncMethod: 'Elige un método de sincronización...',
        books: 'Libros',
        highlights: 'Notas',
        amazonCloud: 'Amazon Cloud',
        syncNowButton: 'Sincronizar ahora',
        syncing: 'Sincronizando',
        uploadClippings: 'Subir archivo "My Clippings.txt"',
        loggingInto: 'Logging into ',
        amazonProgressMessage: 'Buscando nuevas notas de Kindle para sincronizar...',
        clippingsProgressMessage: 'Analizando tus archivos My Clippings.txt para notas y destacados...',
        syncingViewErrorMessage: ' books(s) could not be synced because of errors',
        breakingChangeNotice: 'Aviso de cambio importante', // TODO: Remove this
    },
    templateEditorModal: {
        title: 'Cambios no guardados',
        message: '¿Estás seguro de que quieres cerrar el editor de plantillas sin guardar? Tus cambios se perderán.',
        editControlsAreaLabel: 'Ver variables de plantilla disponibles',
        hasErrorsMessage: 'La plantilla tiene un error de sintaxis y no se puede compilar',
    },
    tipsModal: {
        alwaysSet: ' - (siempre configurado)',
        shortBookTitleTip: 'Título del libro - corto',
        longTitleTip: 'Título del libro - completo',
        authorTip: 'Nombre del autor',
        authorsLastNamesTip: 'Apellidos combinados de los autores',
        authorsLastNamesExampleTip:' p.ej. "Sanderson_et_al", "Robin-Dominguez"',
        firstAuthorFirstNameTip: 'Nombre del primer autor',
        firstAuthorLastNameTip: 'Apellido del primer autor',
        secondAuthorFirstNameTip: 'Nombre del segundo autor',
        secondAuthorLastNameTip: 'Apellido del segundo autor',
        asinTip: 'ASIN del libro',
        urlTip: 'URL del libro en Amazon',
        imageUrlTip: 'URL de la imagen de portada del libro en Amazon',
        lastAnnotatedDateTip: 'Fecha de la última anotación destacada',
        appLinkTip: 'Enlace al libro en la aplicación Kindle',
        isbnTip: 'ISBN del libro',
        pageTip: 'Página',
        pagesTip: 'Número de páginas del libro',
        publicationDateTip: 'Fecha de publicación',
        publisherTip: 'Nombre del editor',
        authorUrl: 'Página del autor en Amazon.com',
        highlightsCountTip: 'Número de notas',
        textTip: 'Texto destacado',
        highlightsTip: 'Bloque de notas del libro',
        locationTip: 'Ubicación del destacado en el libro',
        noteTip: 'Tu anotación de nota',
        colorTip: 'Color destacado',
        creationDateTip: 'Fecha de creación del destacado',
    },
    settings: {
        groups: {
            account: 'Cuenta de usuario',
            highlights: 'Notas',
            templates: 'Plantillas de notas',
            bases: 'Base de libros',
            advanced: 'Configuración avanzada',
        },
        account: {
            title: 'Conectado a Amazon Kindle Reader',
            lastSync: 'Última sincronización: ',
            booksSynced: 'libro(s) sincronizado(s)',
            neverSynced: 'La sincronización nunca se ha realizado',
            buttonDefault: 'Cerrar sesión',
            buttonPressed: 'Cerrando sesión...',
        },
        region: {
            title: 'Región de Amazon',
            description: 'Selecciona la región de Amazon para tu cuenta de Kindle.',
        },
        templates: {
            title: 'Plantillas',
            description: 'Gestiona y edita plantillas para nombres de archivo y contenido de notas destacadas.',
            button: 'Gestionar',
        },
        highlightsFolder: {
            title: 'Ubicación de la carpeta de notas',
            descriotion: 'Carpeta de bóveda para escribir notas de libros destacados.',
        },
        highlightsBaseFolder: {
            title: 'Ubicación de la carpeta base de notas',
            description: 'Carpeta de bóveda para crear un archivo base personalizable de Obsidian en la ubicación de la carpeta de notas para mostrar tus notas y metadatos de Kindle, en un solo lugar.',
        },
        highlightsBaseFile: {
            title: 'Archivo base de notas de Kindle',
            description: 'Crea un archivo base personalizable de Obsidian en la ubicación de la carpeta de notas para mostrar tus notas y metadatos de Kindle.',
            button: 'Crear archivo base',
        },
        downloadBookMetadata: {
            title: 'Descargar metadatos del libro',
            description: 'Descarga metadatos adicionales del libro desde Amazon.com. Desactiva para acelerar el proceso de sincronización.',
        },
        useObsidianFileProperties: {
            title: 'Usar propiedades de archivo de Obsidian',
            description: 'Almacenar metadatos del libro en las propiedades de archivo de Obsidian (front matter).',
        },
        downloadHighResImages: {
            title: 'Descargar imágenes de libro de alta resolución',
            description: 'Descarga imágenes de portada de libros de alta resolución cuando estén disponibles.',
        },
        syncOnStartup: {
            title: 'Sincronizar al iniciar',
            description: 'Sincroniza automáticamente las nuevas notas de Kindle cuando se inicia Obsidian (solo sincronización de Amazon)'
        },
        showHighlightsToolbar: {
            title: 'Mostrar estado de sincronización de notas en la barra de estado',
            description: 'Mostrar el estado de sincronización de notas en la barra de estado',
        },
        sponsor: {
            title: 'Patrocinar',
            description: '☕️ Cómprame un café'
        }
    },
    templates: {
        common: {
            overrideDefaultTemplateButtonDefault: 'Anular la plantilla predeterminada',
        },
        fileName: {
            pane: 'Nombre del archivo',
            title: 'Plantilla de nombre de archivo',
        },
        fileContent: {
            pane: 'Contenido del archivo',
            title: 'Plantilla de archivo',
            description: 'Plantilla para un archivo de notas destacadas. Esto puede incluir YAML front matter.',
        },
        highlight: {
            pane: 'Nota destacada',
            title: 'Plantilla de nota destacada',
            description: 'Plantilla para una nota destacada individual',
        },
        livePreview: {
            title: 'Vista previa en vivo',
            selectBook: 'Selecciona un libro de ejemplo',
            selectHighlight: 'Selecciona una nota destacada de ejemplo',
            fileName: 'Nombre del archivo',
            fileMarkup: 'Marcado del archivo',
        }
    }
}