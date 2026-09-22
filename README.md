# Risk Based System for Enterprise with AI Access Rules

## Goal

Design a risk-based access management system for a large enterprise moving from static access rules to AI-assisted access decisions. Then prototype a lightweight reviewer console for triaging access requests, including risk score, evidence, recommended action, reviewer decision, and audit notes.

## Product Thesis

The system enables human reviewers to process sensitive-data access requests faster by leveraging AI-assisted risk assessment, evidence summarization, and recommended actions while keeping the reviewer accountable for the final decision.

## Customer

Healthcare companies and fintech enterprises that need controlled, auditable access to regulated and sensitive data.

## Business Outcome

Increase the velocity of sensitive-data access approvals while maintaining responsible policy enforcement, security oversight, and audit readiness.

## Primary Persona

Reviewer Randall is a security or access governance reviewer at a healthcare company. His job is to evaluate sensitive-data access requests quickly and responsibly, especially requests involving PHI such as blood work reports.

For the MVP, the product focuses on Randall. The employee requester, such as Customer Support Carl, is treated as request context rather than a separate user experience.

## Jobs To Be Done

### Primary Reviewer Job

When Randall receives a sensitive-data access request, he wants to quickly understand who is asking, what they need, why they need it, which policies apply, and what risk signals exist so that he can make a fast, responsible, and auditable access decision.

### AI-Assisted Review Job

When Randall reviews a request, he wants AI to summarize the evidence, highlight risk factors, map the request to policy, and recommend an action with rationale so that he can process the request faster while still trusting and owning the final decision.

### Audit And Trust Job

When Randall or the organization reviews a decision later, they want a complete record of the request, evidence, AI recommendation, human decision, and rationale so that the organization can prove the decision was appropriate, explainable, and policy-aligned.

## Product Concept

A reviewer console for evaluating sensitive-data access requests using identity context, request details, resource sensitivity, policy constraints, security telemetry, historical records, and AI-assisted reasoning.

The system should help Randall process requests faster without hiding risk. Randall should be able to understand the recommendation, inspect the evidence, apply policy judgment, and make an auditable final decision.

## Reviewer UX Flow

1. Randall views a queue of pending sensitive-data access requests.
2. Randall opens a request, such as Carl requesting access to a patient blood work report for a support case.
3. The system shows enriched request context, including requester role, business justification, resource sensitivity, relevant policies, prior history, and security signals.
4. AI assists Randall by summarizing evidence, highlighting risk factors, identifying policy matches, and recommending an action.
5. Randall decides to approve, deny, escalate, or grant time-bound access.
6. Randall adds or confirms audit notes, including an override reason if he disagrees with the AI recommendation.
7. The system saves an audit record with the request, evidence, AI recommendation, Randall decision, notes, and timestamps.

## Data Inputs

- Request: requested resource, access level, duration, business justification, urgency, and source ticket or workflow.
- User: role, department, manager, employment type, location, tenure, and compliance or training status.
- Resource: system, application, dataset, environment, owner, criticality, and data classification.
- Sensitive data: PII, PHI for healthcare, PCI or payment data for fintech, customer records, financial data, and business-confidential data.
- Policy: RBAC and ABAC rules, least-privilege requirements, separation-of-duties constraints, approval chains, retention rules, and audit requirements.
- Telemetry and security signals: device posture, MFA status, IP or location risk, impossible travel, recent alerts, anomalous behavior, and compromised credential signals.
- Records history: prior approvals and denials, reviewer notes, overrides, incidents, past access patterns, and audit logs.
- AI prompt context: structured request summary, relevant policies, evidence, risk factors, and instructions for producing a recommendation with rationale.

## Reviewer Console Prototype

The lightweight prototype should let Randall triage access requests by showing:

- Request queue
- Risk score
- Evidence
- Policy matches
- Recommended action
- Reviewer decision
- Audit notes
