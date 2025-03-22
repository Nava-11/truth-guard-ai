
import { scanContent } from '../lib/scannerUtils';

// Set up MutationObserver for automatic content scanning
const setupContentObserver = () => {
  // Text nodes we want to scan
  const textSelector = 'p, h1, h2, h3, h4, h5, h6, article, section, div > text';
  
  // Image nodes we want to scan (when AI image scanning is implemented)
  const imageSelector = 'img[src]:not([src=""])';
  
  // Threshold for minimum text length to scan
  const MIN_TEXT_LENGTH = 50;
  
  // Debounce function to avoid too many scans
  let scanTimer: number | null = null;
  const debounceScan = (callback: Function, delay: number) => {
    if (scanTimer) {
      clearTimeout(scanTimer);
    }
    scanTimer = setTimeout(() => {
      callback();
    }, delay) as unknown as number;
  };
  
  // Function to scan visible text content
  const scanVisibleContent = async () => {
    const textElements = document.querySelectorAll(textSelector);
    
    // Find the most prominent text element with substantial content
    let longestText = '';
    let longestElement: Element | null = null;
    
    textElements.forEach(element => {
      // Skip hidden elements
      if (element.getBoundingClientRect().height === 0) return;
      
      const text = element.textContent?.trim() || '';
      if (text.length > longestText.length && text.length >= MIN_TEXT_LENGTH) {
        longestText = text;
        longestElement = element;
      }
    });
    
    // If we found substantial text, scan it
    if (longestText && longestElement) {
      try {
        const result = await scanContent(longestText);
        
        if (!result.isSafe) {
          // Send result to background script
          chrome.runtime.sendMessage({
            action: "contentDetected",
            result,
            url: window.location.href,
            domain: window.location.hostname
          });
          
          // Create visual indicator
          showWarningOverlay(longestElement, result);
        }
      } catch (error) {
        console.error("Error scanning content:", error);
      }
    }
    
    // Future: Add image scanning here
  };
  
  // Show warning overlay for harmful content
  const showWarningOverlay = (element: Element, result: any) => {
    const rect = element.getBoundingClientRect();
    const overlay = document.createElement('div');
    
    // Create the warning element
    overlay.style.position = 'absolute';
    overlay.style.top = `${window.scrollY + rect.top}px`;
    overlay.style.left = `${window.scrollX + rect.left}px`;
    overlay.style.width = `${rect.width}px`;
    overlay.style.height = `${rect.height}px`;
    overlay.style.backgroundColor = 'rgba(255, 0, 0, 0.1)';
    overlay.style.border = '2px solid red';
    overlay.style.borderRadius = '4px';
    overlay.style.zIndex = '9999';
    overlay.style.pointerEvents = 'none';
    
    const warningBadge = document.createElement('div');
    warningBadge.style.position = 'absolute';
    warningBadge.style.top = '-10px';
    warningBadge.style.right = '-10px';
    warningBadge.style.backgroundColor = 'red';
    warningBadge.style.color = 'white';
    warningBadge.style.padding = '4px 8px';
    warningBadge.style.borderRadius = '4px';
    warningBadge.style.fontSize = '12px';
    warningBadge.style.fontWeight = 'bold';
    warningBadge.style.pointerEvents = 'all';
    warningBadge.style.cursor = 'pointer';
    warningBadge.textContent = `Harmful Content (${result.safetyScore}/100)`;
    
    warningBadge.addEventListener('click', () => {
      // Show more detailed modal
      showDetailedWarning(result, element);
    });
    
    overlay.appendChild(warningBadge);
    document.body.appendChild(overlay);
    
    // Remove after interaction or 10 seconds
    setTimeout(() => {
      if (document.body.contains(overlay)) {
        document.body.removeChild(overlay);
      }
    }, 10000);
  };
  
  // Show detailed warning modal
  const showDetailedWarning = (result: any, element: Element) => {
    // Create modal
    const modal = document.createElement('div');
    modal.style.position = 'fixed';
    modal.style.top = '50%';
    modal.style.left = '50%';
    modal.style.transform = 'translate(-50%, -50%)';
    modal.style.backgroundColor = 'white';
    modal.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    modal.style.padding = '20px';
    modal.style.borderRadius = '8px';
    modal.style.zIndex = '10000';
    modal.style.maxWidth = '500px';
    modal.style.width = '90%';
    
    // Add content
    modal.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
        <h2 style="margin: 0; color: #e11d48; font-size: 18px;">Harmful Content Detected</h2>
        <button id="close-warning-modal" style="background: none; border: none; cursor: pointer; font-size: 20px;">&times;</button>
      </div>
      <div style="margin-bottom: 16px;">
        <div style="display: flex; align-items: center; margin-bottom: 8px;">
          <div style="width: 24px; height: 24px; border-radius: 50%; background-color: ${result.safetyScore < 50 ? '#e11d48' : result.safetyScore < 70 ? '#f59e0b' : '#10b981'}; margin-right: 8px;"></div>
          <div style="font-weight: bold;">Safety Score: ${result.safetyScore}/100</div>
        </div>
        <p style="margin: 0 0 8px 0;">The following issues were detected:</p>
        <ul style="margin: 0; padding-left: 20px;">
          ${result.issues.map((issue: any) => `
            <li style="margin-bottom: 8px;">
              <div style="font-weight: bold;">${issue.type.charAt(0).toUpperCase() + issue.type.slice(1)}</div>
              <div style="font-size: 14px; color: #666;">${issue.explanation}</div>
              <div style="font-size: 12px; color: #666;">Severity: ${issue.severity}, Confidence: ${Math.round(issue.confidence * 100)}%</div>
            </li>
          `).join('')}
        </ul>
      </div>
      <div style="display: flex; justify-content: space-between;">
        <button id="block-site-btn" style="background-color: #e11d48; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer;">Block This Site</button>
        <button id="ignore-btn" style="background-color: #6b7280; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer;">Ignore</button>
      </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add backdrop
    const backdrop = document.createElement('div');
    backdrop.style.position = 'fixed';
    backdrop.style.top = '0';
    backdrop.style.left = '0';
    backdrop.style.width = '100%';
    backdrop.style.height = '100%';
    backdrop.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    backdrop.style.zIndex = '9999';
    document.body.appendChild(backdrop);
    
    // Add event listeners
    const closeModal = () => {
      document.body.removeChild(modal);
      document.body.removeChild(backdrop);
    };
    
    document.getElementById('close-warning-modal')?.addEventListener('click', closeModal);
    document.getElementById('ignore-btn')?.addEventListener('click', closeModal);
    
    document.getElementById('block-site-btn')?.addEventListener('click', () => {
      chrome.runtime.sendMessage({
        action: "addBlockedSite",
        domain: window.location.hostname
      }, (response) => {
        if (response.success) {
          alert(`Site ${window.location.hostname} has been blocked. You'll be redirected to a safe page.`);
          window.location.href = chrome.runtime.getURL('blocked.html') + `?site=${encodeURIComponent(window.location.hostname)}`;
        }
      });
      closeModal();
    });
  };
  
  // Observe changes to the DOM
  const observer = new MutationObserver((mutations) => {
    debounceScan(scanVisibleContent, 1000);
  });
  
  // Start observing
  observer.observe(document.body, {
    childList: true,
    subtree: true,
    characterData: true
  });
  
  // Initial scan
  setTimeout(scanVisibleContent, 1500);
  
  return observer;
};

// Initialize when DOM is ready
let observer: MutationObserver | null = null;
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    observer = setupContentObserver();
  });
} else {
  observer = setupContentObserver();
}

// Listen for messages from background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "scanSelectedText" && message.text) {
    scanContent(message.text).then(result => {
      // Send result to background script
      chrome.runtime.sendMessage({
        action: "contentDetected",
        result,
        url: window.location.href,
        domain: window.location.hostname
      });
      
      // Show result to user
      alert(`Scan complete. Safety score: ${result.safetyScore}/100. ${
        result.isSafe ? 'No issues found.' : `Issues found: ${result.issues.length}`
      }`);
    });
  }
  
  return true; // Keep the message channel open for async response
});
