const PROJECT_FALLBACK = {
  overview:
    "This project is actively maintained and details will be expanded as milestones ship.",
  problem:
    "The core problem statement is being refined with concrete user and business context.",
  role:
    "Implementation ownership and delivery scope will be documented in the next update.",
  statusNote:
    "Status details will be updated as the roadmap progresses.",
  constraints: [
    "Align scope with business priorities and available engineering bandwidth.",
  ],
  decisions: ["Ship in thin vertical slices to validate assumptions early."],
  impact: ["Outcome metrics will be published after launch validation."],
  lessons: ["Document tradeoffs early to accelerate future iterations."],
} as const;

const WORK_FALLBACK = {
  result: "Result summary will be updated with measurable impact.",
  scope: ["Owned delivery across planning, implementation, and iteration."],
  achievements: ["Delivered milestones aligned with product and engineering goals."],
  stackHighlights: ["TypeScript", "React", "Next.js"],
} as const;

function normalizeList(
  value: string[] | undefined,
  fallback: readonly string[]
): string[] {
  const clean = (value ?? []).map((item) => item.trim()).filter(Boolean);
  return clean.length > 0 ? clean : [...fallback];
}

export function normalizeProjectNarrative(project: Project) {
  return {
    overview: project.overview?.trim() || PROJECT_FALLBACK.overview,
    problem: project.problems?.trim() || PROJECT_FALLBACK.problem,
    role: project.myRole?.trim() || PROJECT_FALLBACK.role,
    statusNote: project.statusNote?.trim() || PROJECT_FALLBACK.statusNote,
    constraints: normalizeList(project.constraints, PROJECT_FALLBACK.constraints),
    decisions: normalizeList(project.decisions, PROJECT_FALLBACK.decisions),
    impact: normalizeList(project.impact, PROJECT_FALLBACK.impact),
    lessons: normalizeList(project.lessons, PROJECT_FALLBACK.lessons),
  };
}

export function normalizeWorkNarrative(item: WorkExperience) {
  return {
    result: item.result?.trim() || WORK_FALLBACK.result,
    scope: normalizeList(item.scope, WORK_FALLBACK.scope),
    achievements: normalizeList(item.achievements, WORK_FALLBACK.achievements),
    stackHighlights: normalizeList(
      item.stackHighlights,
      WORK_FALLBACK.stackHighlights
    ),
  };
}
