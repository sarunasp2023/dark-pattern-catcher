async function detectCountdownTimerCases(highlight, domCopy) {
        let foundDarkPatterns = 0;
        let newNode = null;
        let newNodeDigits = null;
        let removedNodeDigits = null;
        const config = {
                        childList: true,
                        subtree: true,
                        attributes: false,
                        characterData: true,
                        characterDataOldValue: true
        };

        const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                        console.log(mutation);
                        if (mutation.type === 'characterData') {
                                if (/\d+/g.test(mutation.oldValue) && /\d+/g.test(mutation.target.textContent)) {
                                        const oldValueDigits = mutation.oldValue.match(/\d+/g);
                                        const newValueDigits = mutation.target.textContent.match(/\d+/g);

                                        if (oldValueDigits !== null && newValueDigits !== null && Number(oldValueDigits) - Number(newValueDigits) === 1) {
                                                foundDarkPatterns++;
                                                if (highlight) {
                                                        mutation.target.parentElement.parentElement.classList.add('highlighted-dark-pattern');
                                                }
                                        }
                                }
                        }

                        if (mutation.type === 'childList') {
                                mutation.addedNodes.forEach(addedNode => {
                                        if (addedNode.nodeType === Node.TEXT_NODE && /\d+/g.test(addedNode.textContent)) {
                                                const digits = addedNode.textContent.match(/\d+/g);
                                                
                                                newNodeDigits = digits.join('');
                                                newNode = addedNode;
                                        }
                                });
                                
                                mutation.removedNodes.forEach(removedNode => {
                                        if (removedNode.nodeType === Node.TEXT_NODE && /\d+/g.test(removedNode.textContent)) {
                                                const digits = removedNode.textContent.match(/\d+/g);

                                                removedNodeDigits = digits.join('');
                                        }
                                });
                                
                                if (newNodeDigits !== null && removedNodeDigits !== null && Number(removedNodeDigits) - Number(newNodeDigits) === 1) {
                                        foundDarkPatterns++;
                                        if (highlight) {
                                                highlightCountdownTimerCases(newNode);
                                        } 
                                }
                        }
                });
        });

        observer.observe(domCopy, config);

        setTimeout(() => {
                observer.disconnect();
        }, 1500);
        
        return new Promise((resolve) => {
                setTimeout(() => {
                        resolve(foundDarkPatterns);
                }, 1100);
        });
}

function highlightCountdownTimerCases(addedNode) {
        let currentParentNode = addedNode.parentNode;
        while (currentParentNode) {
                if (currentParentNode.tagName && currentParentNode.tagName.toLowerCase() === "div") {
                        currentParentNode.style.border = "2px solid red";
                        break;
                }

                currentParentNode = currentParentNode.parentNode;
        }
}
