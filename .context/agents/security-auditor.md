---
name: Security Auditor
description: Identify security vulnerabilities
status: unfilled
generated: 2026-01-16
---

# Security Auditor Agent Playbook

## Mission
Describe how the security auditor agent supports the team and when to engage it.

## Responsibilities
- Identify security vulnerabilities
- Implement security best practices
- Review dependencies for security issues
- Ensure data protection and privacy compliance

## Best Practices
- Follow security best practices
- Stay updated on common vulnerabilities
- Consider the principle of least privilege

## Key Project Resources
- Documentation index: [docs/README.md](../docs/README.md)
- Agent handbook: [agents/README.md](./README.md)
- Agent knowledge base: [AGENTS.md](../../AGENTS.md)
- Contributor guide: [CONTRIBUTING.md](../../CONTRIBUTING.md)

## Repository Starting Points
- `db/` — TODO: Describe the purpose of this directory.
- `download/` — TODO: Describe the purpose of this directory.
- `examples/` — TODO: Describe the purpose of this directory.
- `mini-services/` — TODO: Describe the purpose of this directory.
- `prisma/` — TODO: Describe the purpose of this directory.
- `public/` — TODO: Describe the purpose of this directory.
- `skills/` — TODO: Describe the purpose of this directory.
- `src/` — TODO: Describe the purpose of this directory.

## Key Files
**Entry Points:**
- [`../../../examples/websocket/server.ts`](../../../examples/websocket/server.ts)

## Architecture Context

### Utils
Shared utilities and helpers
- **Directories**: `src/lib`, `skills/frontend-design/examples/typescript`, `skills/docx/scripts`
- **Symbols**: 25 total
- **Key exports**: [`cn`](src/lib/utils.ts#L4), [`cn`](skills/frontend-design/examples/typescript/utils.ts#L21), [`formatFileSize`](skills/frontend-design/examples/typescript/utils.ts#L32), [`debounce`](skills/frontend-design/examples/typescript/utils.ts#L50), [`throttle`](skills/frontend-design/examples/typescript/utils.ts#L74), [`generateId`](skills/frontend-design/examples/typescript/utils.ts#L95), [`copyToClipboard`](skills/frontend-design/examples/typescript/utils.ts#L142), [`formatRelativeTime`](skills/frontend-design/examples/typescript/utils.ts#L172), [`truncate`](skills/frontend-design/examples/typescript/utils.ts#L192), [`sleep`](skills/frontend-design/examples/typescript/utils.ts#L203), [`clamp`](skills/frontend-design/examples/typescript/utils.ts#L215), [`prefersReducedMotion`](skills/frontend-design/examples/typescript/utils.ts#L222), [`prefersDarkMode`](skills/frontend-design/examples/typescript/utils.ts#L230), [`formatNumber`](skills/frontend-design/examples/typescript/utils.ts#L245), [`abbreviateNumber`](skills/frontend-design/examples/typescript/utils.ts#L260), [`getInitials`](skills/frontend-design/examples/typescript/utils.ts#L278), [`isValidEmail`](skills/frontend-design/examples/typescript/utils.ts#L293), [`isValidUrl`](skills/frontend-design/examples/typescript/utils.ts#L304), [`stripHtml`](skills/frontend-design/examples/typescript/utils.ts#L319), [`capitalize`](skills/frontend-design/examples/typescript/utils.ts#L332), [`camelToKebab`](skills/frontend-design/examples/typescript/utils.ts#L342), [`kebabToCamel`](skills/frontend-design/examples/typescript/utils.ts#L352), [`XMLEditor`](skills/docx/scripts/utilities.py#L41)

### Controllers
Request handling and routing
- **Directories**: `src/app/api`, `src/app/api/seed`, `src/app/api/progress`, `src/app/api/purchases`, `src/app/api/courses`, `src/app/api/categories`, `src/app/api/courses/[courseId]`, `src/app/api/admin/students`, `src/app/api/admin/sales`, `src/app/api/admin/courses`, `src/app/api/admin/courses/[courseId]`
- **Symbols**: 18 total
- **Key exports**: [`GET`](src/app/api/route.ts#L3), [`POST`](src/app/api/seed/route.ts#L4), [`PUT`](src/app/api/progress/route.ts#L4), [`GET`](src/app/api/progress/route.ts#L62), [`POST`](src/app/api/purchases/route.ts#L4), [`GET`](src/app/api/purchases/route.ts#L58), [`GET`](src/app/api/courses/route.ts#L4), [`POST`](src/app/api/courses/route.ts#L52), [`GET`](src/app/api/categories/route.ts#L4), [`POST`](src/app/api/categories/route.ts#L29), [`GET`](src/app/api/courses/[courseId]/route.ts#L4), [`GET`](src/app/api/admin/students/route.ts#L4), [`GET`](src/app/api/admin/sales/route.ts#L4), [`GET`](src/app/api/admin/courses/route.ts#L4), [`POST`](src/app/api/admin/courses/route.ts#L31), [`GET`](src/app/api/admin/courses/[courseId]/route.ts#L4), [`PATCH`](src/app/api/admin/courses/[courseId]/route.ts#L53), [`DELETE`](src/app/api/admin/courses/[courseId]/route.ts#L86)

### Components
UI components and views
- **Directories**: `src/app`, `src/components/ui`, `src/components/student`, `src/components/setup`, `src/components/layout`, `src/components/course`, `src/components/admin`, `src/app/setup`, `src/app/register`, `src/app/login`, `src/app/faq`, `src/app/dashboard`, `src/app/courses`, `src/app/admin`, `src/app/about`, `skills/frontend-design/examples/typescript`, `src/app/learn/[courseId]`, `src/app/courses/[id]`, `src/app/admin/students`, `src/app/admin/sales`, `src/app/admin/courses`, `src/app/admin/courses/new`
- **Symbols**: 347 total
- **Key exports**: [`Toaster`](src/components/ui/toaster.tsx#L13), [`ChartConfig`](src/components/ui/chart.tsx#L11), [`StudentDashboard`](src/components/student/student-dashboard.tsx#L17), [`SetupWizard`](src/components/setup/setup-wizard.tsx#L9), [`Sidebar`](src/components/layout/sidebar.tsx#L14), [`CoursePlayer`](src/components/course/course-player.tsx#L35), [`CourseCardProps`](src/components/course/course-card.tsx#L10), [`CourseCard`](src/components/course/course-card.tsx#L23), [`AdminSidebar`](src/components/admin/admin-sidebar.tsx#L14), [`Card`](skills/frontend-design/examples/typescript/sample-components.tsx#L227), [`CardHeader`](skills/frontend-design/examples/typescript/sample-components.tsx#L254), [`CardTitle`](skills/frontend-design/examples/typescript/sample-components.tsx#L258), [`CardDescription`](skills/frontend-design/examples/typescript/sample-components.tsx#L262), [`CardBody`](skills/frontend-design/examples/typescript/sample-components.tsx#L266), [`CardFooter`](skills/frontend-design/examples/typescript/sample-components.tsx#L270), [`Badge`](skills/frontend-design/examples/typescript/sample-components.tsx#L305), [`Alert`](skills/frontend-design/examples/typescript/sample-components.tsx#L341), [`Modal`](skills/frontend-design/examples/typescript/sample-components.tsx#L418), [`ModalBody`](skills/frontend-design/examples/typescript/sample-components.tsx#L449), [`ModalFooter`](skills/frontend-design/examples/typescript/sample-components.tsx#L453), [`Skeleton`](skills/frontend-design/examples/typescript/sample-components.tsx#L495), [`EmptyState`](skills/frontend-design/examples/typescript/sample-components.tsx#L558), [`ErrorState`](skills/frontend-design/examples/typescript/sample-components.tsx#L595), [`Avatar`](skills/frontend-design/examples/typescript/sample-components.tsx#L646)
## Key Symbols for This Agent
- [`getTokenValue`](skills/frontend-design/examples/typescript/design-tokens.ts#L296) (function)
- [`isColorToken`](skills/frontend-design/examples/typescript/design-tokens.ts#L574) (function)
- [`mergeTokens`](skills/frontend-design/examples/typescript/design-tokens.ts#L585) (function)
- [`validateTokenValue`](skills/frontend-design/examples/typescript/design-tokens.ts#L604) (function)

## Documentation Touchpoints
- [Documentation Index](../docs/README.md)
- [Project Overview](../docs/project-overview.md)
- [Architecture Notes](../docs/architecture.md)
- [Development Workflow](../docs/development-workflow.md)
- [Testing Strategy](../docs/testing-strategy.md)
- [Glossary & Domain Concepts](../docs/glossary.md)
- [Data Flow & Integrations](../docs/data-flow.md)
- [Security & Compliance Notes](../docs/security.md)
- [Tooling & Productivity Guide](../docs/tooling.md)

## Collaboration Checklist

1. Confirm assumptions with issue reporters or maintainers.
2. Review open pull requests affecting this area.
3. Update the relevant doc section listed above.
4. Capture learnings back in [docs/README.md](../docs/README.md).

## Hand-off Notes

Summarize outcomes, remaining risks, and suggested follow-up actions after the agent completes its work.
