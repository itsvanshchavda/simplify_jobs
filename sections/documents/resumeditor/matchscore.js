const matchScore = (jobSkills, resumeSkills) => {
  // Simple text normalization
  const normalize = (text) => text.toLowerCase().trim();

  // Normalize all skills
  const normalizedJobSkills = jobSkills.map(normalize);
  const normalizedResumeSkills = resumeSkills.map(normalize);

  let normalizedHighPriority = [];
  let normalizedLowPriority = [];

  const midPoint = Math.ceil(normalizedJobSkills.length / 2);
  normalizedHighPriority = normalizedJobSkills.slice(0, midPoint);
  normalizedLowPriority = normalizedJobSkills.slice(midPoint);

  // Check if skill is matched
  const isMatched = (jobSkill) => {
    return normalizedResumeSkills.some(
      (resumeSkill) =>
        resumeSkill.includes(jobSkill) || jobSkill.includes(resumeSkill)
    );
  };

  // High priority matches
  const highPriorityMatches = normalizedHighPriority.map((skill) => ({
    skill: skill,
    matched: isMatched(skill),
  }));

  // Low priority matches
  const lowPriorityMatches = normalizedLowPriority.map((skill) => ({
    skill: skill,
    matched: isMatched(skill),
  }));

  // Count matches
  const highMatchedCount = highPriorityMatches.filter(
    (item) => item.matched
  ).length;
  const lowMatchedCount = lowPriorityMatches.filter(
    (item) => item.matched
  ).length;

  // Calculate match percentage (high priority weighted more)
  const totalHigh = normalizedHighPriority.length;
  const totalLow = normalizedLowPriority.length;
  const totalSkills = totalHigh + totalLow;

  let matchPercentage = 0;
  if (totalSkills > 0) {
    // Weight high priority skills more heavily (70% weight)
    const highScore = totalHigh > 0 ? (highMatchedCount / totalHigh) * 0.7 : 0;
    const lowScore = totalLow > 0 ? (lowMatchedCount / totalLow) * 0.3 : 0;
    matchPercentage = Math.round((highScore + lowScore) * 100);
  }

  return {
    resumeMatch: `${matchPercentage}%`,
    totalKeywords: totalSkills,
    matchedKeywords: highMatchedCount + lowMatchedCount,
    highPriorityKeywords: {
      skills: highPriorityMatches,
      matchedCount: highMatchedCount,
      totalCount: normalizedHighPriority.length,
    },
    lowPriorityKeywords: {
      skills: lowPriorityMatches,
      matchedCount: lowMatchedCount,
      totalCount: normalizedLowPriority.length,
    },
  };
};

export default matchScore;
