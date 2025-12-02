export const generatePDF = async (language: string) => {
    try {
        const baseUrl = import.meta.env.BASE_URL;
        const cleanBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;

        // Map languages to HTML files
        const cvFiles: Record<string, string> = {
            pt: 'cv-pt.html',
            en: 'cv-en.html',
            es: 'cv-es.html',
            de: 'cv-de.html'
        };

        const currentLang = language.split('-')[0];
        const fileName = cvFiles[currentLang] || cvFiles['pt'];
        const fileUrl = `${cleanBase}${fileName}`;

        console.log(`Opening CV: ${fileUrl}`);

        // Open in new tab
        window.open(fileUrl, '_blank');

        return true;

    } catch (error) {
        console.error('Error opening CV:', error);
        return false;
    }
};
