import html2pdf from 'html2pdf.js';

export const generatePDF = async (language: string) => {
    try {
        // 1. Determine the file URL based on language
        const cvFiles: Record<string, string> = {
            pt: '/cv-pt.html',
            en: '/cv-en.html',
            es: '/cv-es.html',
            de: '/cv-de.html'
        };

        // Normalize language code (e.g. en-US -> en)
        const currentLang = language.split('-')[0];
        const fileUrl = cvFiles[currentLang] || cvFiles['pt'];

        // 2. Fetch the HTML content
        const response = await fetch(fileUrl);
        if (!response.ok) {
            throw new Error(`Failed to fetch CV file: ${response.statusText}`);
        }
        const htmlText = await response.text();

        // 3. Parse the HTML
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlText, 'text/html');

        // 4. Extract content
        // We want the styles and the main content, but NOT the download hint
        const styles = doc.querySelectorAll('style');
        const content = doc.querySelector('body');

        if (!content) {
            throw new Error('Could not find body content in CV file');
        }

        // Remove the download hint from the clone
        const downloadHint = content.querySelector('.download-hint');
        if (downloadHint) {
            downloadHint.remove();
        }

        // Create a container for the PDF generation
        const container = document.createElement('div');

        // Append styles
        styles.forEach(style => {
            container.appendChild(style.cloneNode(true));
        });

        // Append content
        // We wrap it in a div to ensure styles scope correctly if needed, 
        // but here we just append the body's children
        Array.from(content.childNodes).forEach(node => {
            container.appendChild(node.cloneNode(true));
        });

        // 5. Configure PDF options
        const opt = {
            margin: [10, 10, 10, 10] as [number, number, number, number], // top, left, bottom, right in mm
            filename: `Newton_Calvin_CV_${currentLang.toUpperCase()}.pdf`,
            image: { type: 'jpeg' as 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true, letterRendering: true },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' as 'portrait' }
        };

        // 6. Generate PDF
        // We need to append the container to the body temporarily for html2canvas to render it correctly
        // However, html2pdf can handle off-screen elements if configured, but appending is safer for font rendering
        container.style.position = 'absolute';
        container.style.left = '-9999px';
        container.style.top = '0';
        container.style.width = '800px'; // Match the max-width in CSS
        document.body.appendChild(container);

        await html2pdf().set(opt).from(container).save();

        // Cleanup
        document.body.removeChild(container);

        return true;

    } catch (error) {
        console.error('Error generating PDF:', error);
        // Fallback to opening the HTML file
        const cvFiles: Record<string, string> = {
            pt: '/cv-pt.html',
            en: '/cv-en.html',
            es: '/cv-es.html',
            de: '/cv-de.html'
        };
        const currentLang = language.split('-')[0];
        const fileUrl = cvFiles[currentLang] || cvFiles['pt'];
        window.open(fileUrl, '_blank');
        return false;
    }
};
