# System Architecture And Design

## Purpose

This system helps Reviewer Randall process sensitive-data access requests faster while preserving human accountability, policy enforcement, and auditability.

The MVP focuses on the reviewer workflow. The requester experience is treated as an upstream input, not a full product surface.

## Primary Scenario

Customer Support Carl requests temporary read-only access to a patient blood work report for a support case. Reviewer Randall evaluates the request with help from AI-assisted evidence summarization, policy mapping, risk scoring, and recommended action.

Randall makes the final decision.

## Design Principles

1. Human decision authority: AI recommends, but Randall decides.
2. Explainability by default: every recommendation must include evidence and policy logic.
3. Minimum necessary access: approvals should be narrow, time-bound, and scoped to the business need.
4. Audit-first workflow: every request, recommendation, decision, note, and override must be recorded.
5. Sensitive-data minimization: PHI should be shown only when necessary for review.

## High-Level Architecture

```text
Access Request Source
        |
        v
Request Intake API
        |
        v
Context Enrichment Service  <---- Identity / HRIS / IAM
        |                    <---- Resource Catalog / Data Classification
        |                    <---- Case Management / Ticketing
        |                    <---- Security Telemetry
        v
Policy Evaluation Service   <---- Policy Store
        |
        v
Risk Scoring Service
        |
        v
AI Recommendation Service
        |
        v
Reviewer Console
        |
        v
Decision And Audit Service
        |
        v
Audit Log / Records Store
```

## Core Components

### 1. Request Intake API

Receives access requests from upstream systems such as ticketing, access management, or employee self-service tools.

Inputs:

- Requester
- Support case ID
- Requested resource
- Requested access level
- Requested duration
- Business justification
- Urgency

Output:

- Normalized access request record

### 2. Context Enrichment Service

Adds the context Randall needs to review the request in the right manner.

Sources:

- IAM for existing permissions
- HRIS for role, department, manager, employment status
- Training/compliance systems for HIPAA or policy training status
- Resource catalog for data classification and owner
- Ticketing or case management for business context
- Security telemetry for device, MFA, location, and alert signals

Output:

- Enriched request context

### 3. Policy Evaluation Service

Compares the request against applicable access policies.

Policy examples:

- Support users can only receive temporary read-only PHI access.
- Blood work reports require minimum necessary justification.
- Bulk PHI access requires escalation to compliance or the data owner.
- Missing HIPAA training blocks or escalates access.
- PHI exceptions must expire within the allowed time window.

Output:

- Policy matches
- Policy conflicts
- Required approval path
- Required conditions, such as expiration or escalation

### 4. Risk Scoring Service

Calculates a risk score based on request context, policy results, and security signals.

Example factors:

- Resource sensitivity
- Current permission level
- Requested scope
- Requested duration
- Requester role fit
- Compliance status
- Device posture
- MFA status
- Location risk
- Prior approvals, denials, and overrides
- Missing or conflicting evidence

Output:

- Risk score
- Risk band
- Risk factor list

### 5. AI Recommendation Service

Generates a reviewer-facing recommendation based on structured context.

AI responsibilities:

- Summarize the request
- Highlight important evidence
- Explain policy matches and conflicts
- Recommend approve, deny, escalate, or approve with expiration
- Identify missing or uncertain information
- Draft a suggested audit note

AI boundaries:

- AI does not approve access.
- AI does not bypass policy.
- AI output must be grounded in supplied evidence.
- AI prompt context should minimize unnecessary PHI.

Output:

- Recommended action
- Rationale
- Evidence summary
- Confidence or uncertainty
- Suggested audit note

### 6. Reviewer Console

The primary UX surface for Randall.

Core views:

- Request queue
- Request detail
- Current permission level
- Requested data access
- Evidence and policy logic
- AI recommendation
- Decision controls
- Audit notes

Supported decisions:

- Approve
- Deny
- Escalate
- Approve with expiration

### 7. Decision And Audit Service

Records Randall's final decision and the logic behind it.

Audit record includes:

- Original request
- Enriched context
- Current permissions
- Requested data access
- Policy results
- Risk score
- AI recommendation
- Final reviewer decision
- Whether the reviewer followed or overrode AI
- Audit note
- Access expiration or conditions
- Timestamps
- Reviewer identity

## Data Model

### AccessRequest

- id
- caseId
- requesterId
- resourceId
- requestedAccessLevel
- requestedDuration
- businessJustification
- urgency
- status
- createdAt

### RequesterContext

- requesterId
- name
- role
- department
- manager
- employmentStatus
- complianceStatus
- currentPermissions
- priorAccessHistory

### ResourceContext

- resourceId
- resourceName
- resourceType
- dataClassification
- sensitiveDataTypes
- owner
- criticality

### PolicyEvaluation

- requestId
- matchedPolicies
- conflicts
- requiredApprovals
- requiredConditions
- evaluationTimestamp

### RiskAssessment

- requestId
- riskScore
- riskBand
- riskFactors
- missingSignals
- assessedAt

### AIRecommendation

- requestId
- recommendedAction
- rationale
- supportingEvidence
- uncertainty
- suggestedAuditNote
- generatedAt

### ReviewDecision

- requestId
- reviewerId
- finalDecision
- expiration
- auditNote
- overrideReason
- followedRecommendation
- decidedAt

## Request Lifecycle

1. Access request is submitted by an upstream request system.
2. Request Intake API validates and normalizes the request.
3. Context Enrichment Service gathers requester, resource, permission, ticket, and telemetry context.
4. Policy Evaluation Service checks request against healthcare access rules.
5. Risk Scoring Service calculates request risk.
6. AI Recommendation Service creates a recommendation, rationale, and suggested audit note.
7. Reviewer Console presents the request to Randall.
8. Randall makes the final decision and records notes.
9. Decision And Audit Service stores the complete decision record.
10. Downstream access provisioning or notification systems act on the decision.

## Trust And Safety Controls

- Separate policy results from AI recommendation.
- Show supporting evidence for each recommendation.
- Require reviewer notes for final decisions.
- Require override reason when Randall disagrees with AI.
- Treat missing compliance, telemetry, or resource classification as risk-increasing.
- Keep PHI out of AI prompts unless strictly necessary.
- Log all reviewer actions.

## MVP Scope

Included:

- Reviewer queue
- Request detail view
- Requester identity context
- Current permission level
- Requested data access
- Policy logic
- Risk score
- AI recommendation
- Reviewer decision controls
- Audit notes

Excluded:

- Full employee request portal
- Real IAM integration
- Real ticketing integration
- Real security telemetry integration
- Automated provisioning
- Model training pipeline
- Admin policy builder

## Future Extensions

- Persisted audit log view
- Override analytics
- Policy simulation before rollout
- Data-owner approval workflow
- SLA tracking for review queues
- Low-risk auto-routing with human spot checks
- Integration with IAM provisioning tools
- Fine-grained prompt governance and evaluation
