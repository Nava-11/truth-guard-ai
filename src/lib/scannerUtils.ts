
// Utility functions for content scanning

// Simulates an API call to scan content
export const scanContent = async (content: string): Promise<any> => {
  // Simulating API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Enhanced content analysis logic
  const result = analyzeContent(content);
  
  console.log("Analysis result:", result); // Debug the analysis result
  return result;
};

// Enhanced content analysis function with more accurate detection
const analyzeContent = (content: string) => {
  content = content.toLowerCase();
  const issues = [];
  let safetyScore = 100;
  
  // Check for hate speech (improved keyword detection)
  const hateTerms = ['hate', 'terrible', 'disgusting', 'stupid', 'idiot', 'loser'];
  const hateContexts = [
    'people from', 'that country', 'all terrible', 'them all', 'those people',
    'go back', 'not welcome', 'don\'t belong'
  ];
  
  let hateMatches = 0;
  let hateContextMatches = 0;
  
  hateTerms.forEach(term => {
    if (content.includes(term)) hateMatches++;
  });
  
  hateContexts.forEach(context => {
    if (content.includes(context)) hateContextMatches++;
  });
  
  // More sensitive detection for hate speech
  if (hateMatches >= 1 && hateContextMatches >= 1) {
    const severity = hateMatches + hateContextMatches > 3 ? 'high' : 'medium';
    const confidence = Math.min(0.5 + (hateMatches + hateContextMatches) * 0.1, 0.95);
    
    issues.push({
      type: 'hate',
      severity,
      confidence,
      explanation: 'This content contains language that may be targeting specific groups or individuals in a derogatory manner.'
    });
    
    safetyScore -= 25 + (hateMatches * 5);
  }
  
  // Check for misinformation (improved detection)
  const misInfoTerms = [
    'conspiracy', 'hoax', 'fake news', 'they don\'t want you to know',
    'government hiding', 'mainstream media', 'microchip', 'tracking',
    'created in a lab', 'bioweapon', 'secret agenda', 'mind control'
  ];
  
  let misInfoMatches = 0;
  
  misInfoTerms.forEach(term => {
    if (content.includes(term)) misInfoMatches++;
  });
  
  // More sensitive detection for misinformation
  if (misInfoMatches >= 1) {
    const severity = misInfoMatches >= 3 ? 'high' : misInfoMatches >= 2 ? 'medium' : 'low';
    const confidence = Math.min(0.6 + misInfoMatches * 0.1, 0.9);
    
    issues.push({
      type: 'misinformation',
      severity,
      confidence,
      explanation: 'This content may contain misleading claims that contradict established scientific consensus or verified information.'
    });
    
    safetyScore -= 15 + (misInfoMatches * 5);
  }
  
  // Check for cyberbullying (improved detection)
  const bullyingTerms = [
    'stupid', 'ugly', 'fat', 'loser', 'pathetic', 'failure', 'nobody likes',
    'everyone hates', 'kill yourself', 'should disappear', 'worthless', 'useless'
  ];
  
  let bullyingMatches = 0;
  
  bullyingTerms.forEach(term => {
    if (content.includes(term)) bullyingMatches++;
  });
  
  // More sensitive detection for cyberbullying
  if (bullyingMatches >= 1) {
    const severity = bullyingMatches >= 4 ? 'high' : bullyingMatches >= 2 ? 'medium' : 'low';
    const confidence = Math.min(0.7 + bullyingMatches * 0.05, 0.95);
    
    issues.push({
      type: 'bullying',
      severity,
      confidence,
      explanation: 'This content contains language that may be targeting an individual with hostile or abusive comments.'
    });
    
    safetyScore -= 20 + (bullyingMatches * 5);
  }
  
  // Check for explicit content (improved detection)
  const explicitTerms = ['xxx', 'porn', 'nsfw', 'naked', 'sexual'];
  
  let explicitMatches = 0;
  
  explicitTerms.forEach(term => {
    if (content.includes(term)) explicitMatches++;
  });
  
  if (explicitMatches >= 1) {
    const severity = explicitMatches >= 2 ? 'high' : 'medium';
    const confidence = Math.min(0.8 + explicitMatches * 0.05, 0.98);
    
    issues.push({
      type: 'explicit',
      severity,
      confidence,
      explanation: 'This content may contain explicit material that is not appropriate for all audiences.'
    });
    
    safetyScore -= 30 + (explicitMatches * 5);
  }
  
  // Final safety score calculations
  safetyScore = Math.max(safetyScore, 0);
  
  // Threshold for considering content safe (adjusted to be more sensitive)
  const isSafe = safetyScore >= 70 && issues.length === 0;
  
  return {
    id: generateId(),
    timestamp: Date.now(),
    content,
    issues,
    isSafe: isSafe,
    safetyScore
  };
};

// Generate a random ID
const generateId = () => {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
};
