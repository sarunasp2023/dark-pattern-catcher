function detectMisdirectionCases(highlightDarkPattern, domCopy) {
        let foundDarkPatterns = 0;

        const links = Array.from(domCopy).filter(element => element.tagName === 'A');

        const buttons = Array.from(domCopy).filter(element => element.tagName === 'BUTTON');

        const searchablePhrases = ['unsubscribe', 'click here', 'atšaukti', 'atsisakyti', 'spauskite čia'];

        links.forEach(link => {
                const fontSize = window.getComputedStyle(link).fontSize;
                let darkPatternLinks = [];
            
                if (link.innerText && searchablePhrases.some(phrase => link.innerText.toLowerCase().includes(phrase)) && parseInt(fontSize) < 14) {
                        foundDarkPatterns++;
                        console.log(foundDarkPatterns);
                        console.log(link);
                        darkPatternLinks.push(link);
                        if (highlightDarkPattern) {
                                console.log(darkPatternLinks);
                                highlightMisdirectionCases(darkPatternLinks);
                        }
                        
                }
        });

        buttons.forEach(button => {
                const rect = button.getBoundingClientRect();
                const width = rect.width;
                const height = rect.height;
                let darkPatternButtons = [];
            
                // Check conditions for potential dark pattern
                if (button.innerText && searchablePhrases.some(phrase => button.innerText.toLowerCase().includes(phrase)) && width <= 43 && height <= 43) {
                        foundDarkPatterns++;
                        console.log(foundDarkPatterns);
                        darkPatternButtons.push(button);
                        if (highlightDarkPattern) {
                                console.log(darkPatternButtons);
                                highlightMisdirectionCases(darkPatternButtons);
                        }
                }
        });

        return foundDarkPatterns;
}

function highlightMisdirectionCases(links) {
        if (links) {
                links.forEach((element) => {
                        element.style.border = "3px solid red";
                });
        }
}