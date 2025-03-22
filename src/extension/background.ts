
// Background service worker for Content Safety Scanner

let blockedSites: string[] = [];
let detectionStats = {
  totalScanned: 0,
  blockedContent: 0,
  hateSpeech: 0,
  misinformation: 0,
  cyberbullying: 0,
  explicitContent: 0
};

// Initialize from storage
chrome.storage.local.get(['blockedSites', 'detectionStats'], (result) => {
  if (result.blockedSites) blockedSites = result.blockedSites;
  if (result.detectionStats) detectionStats = result.detectionStats;
});

// Listen for page navigation to check if site is blocked
chrome.webNavigation.onCommitted.addListener((details) => {
  if (details.frameId === 0) { // Main frame only
    const url = new URL(details.url);
    const domain = url.hostname;
    
    if (blockedSites.includes(domain)) {
      // Redirect to blocked page
      chrome.tabs.update(details.tabId, {
        url: chrome.runtime.getURL('blocked.html') + `?site=${encodeURIComponent(domain)}`
      });
    }
  }
});

// Setup context menu for scanning selected text
chrome.contextMenus.create({
  id: "scanSelectedText",
  title: "Scan for harmful content",
  contexts: ["selection"]
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "scanSelectedText" && info.selectionText) {
    chrome.tabs.sendMessage(tab.id, {
      action: "scanSelectedText",
      text: info.selectionText
    });
  }
});

// Listen for messages from content scripts and popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Background received message:", message);

  if (message.action === "getStats") {
    sendResponse(detectionStats);
  }
  
  else if (message.action === "getBlockedSites") {
    sendResponse(blockedSites);
  }
  
  else if (message.action === "addBlockedSite") {
    if (!blockedSites.includes(message.domain)) {
      blockedSites.push(message.domain);
      chrome.storage.local.set({ blockedSites });
      sendResponse({ success: true });
    } else {
      sendResponse({ success: false, reason: "Site already blocked" });
    }
  }
  
  else if (message.action === "removeBlockedSite") {
    blockedSites = blockedSites.filter(site => site !== message.domain);
    chrome.storage.local.set({ blockedSites });
    sendResponse({ success: true });
  }
  
  else if (message.action === "contentDetected") {
    // Update stats
    detectionStats.totalScanned++;
    
    if (!message.result.isSafe) {
      detectionStats.blockedContent++;
      
      // Count issue types
      message.result.issues.forEach(issue => {
        if (issue.type === 'hate') detectionStats.hateSpeech++;
        else if (issue.type === 'misinformation') detectionStats.misinformation++;
        else if (issue.type === 'bullying') detectionStats.cyberbullying++;
        else if (issue.type === 'explicit') detectionStats.explicitContent++;
      });
      
      // Save updated stats
      chrome.storage.local.set({ detectionStats });
      
      // Show notification
      chrome.notifications.create({
        type: 'basic',
        iconUrl: 'icons/icon128.png',
        title: 'Harmful Content Detected',
        message: `Safety score: ${message.result.safetyScore}/100. Issues found: ${message.result.issues.length}`,
        priority: 2
      });
    }
    
    sendResponse({ success: true });
  }
  
  return true; // Keep message channel open for async response
});
