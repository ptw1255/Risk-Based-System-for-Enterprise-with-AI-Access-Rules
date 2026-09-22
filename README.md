# Risk Based System for Enterprise with AI Access Rules

## Goal

Design a risk-based access management system for a large enterprise moving from static access rules to AI-assisted access decisions. Then prototype a lightweight reviewer console for triaging access requests, including risk score, evidence, recommended action, reviewer decision, and audit notes.

## Product Thesis

The system enables human reviewers to process sensitive-data access requests faster by leveraging AI-assisted risk assessment, evidence summarization, and recommended actions while keeping the reviewer accountable for the final decision.

## Customer

Healthcare companies and fintech enterprises that need controlled, auditable access to regulated and sensitive data.

## Business Outcome

Increase the velocity of sensitive-data access approvals while maintaining responsible policy enforcement, security oversight, and audit readiness.

## Primary Users

- Employees who are onboarding and need baseline access to data, systems, or applications.
- Existing employees who need new, expanded, or temporary access for a project, role change, investigation, client work, or operational need.
- Human reviewers, such as security reviewers or access governance analysts, who approve, deny, escalate, or time-bound access requests.

## Product Concept

A risk-based access management system that evaluates sensitive data access requests using identity context, request details, resource sensitivity, policy constraints, security telemetry, historical records, and AI-assisted reasoning.

The system should help reviewers process requests faster without hiding risk. Reviewers should be able to understand the recommendation, inspect the evidence, apply policy judgment, and make an auditable final decision.

## UX Flow

1. Employee requests access by selecting the resource, access level, duration, and business justification.
2. System enriches the request with user context, manager, team, resource sensitivity, policies, prior access history, and security signals.
3. Risk and policy evaluation runs to identify sensitive data exposure, policy matches, anomalies, and required approval paths.
4. AI assists the reviewer by summarizing evidence, highlighting risk factors, and recommending an action.
5. Human reviewer triages the request and decides to approve, deny, escalate, or grant time-bound access.
6. Employee is notified of the decision, next steps, and expiration terms if access is approved.
7. Audit record is saved with the request, evidence, AI recommendation, reviewer decision, notes, and timestamps.

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

The lightweight prototype should let a security reviewer triage access requests by showing:

- Request queue
- Risk score
- Evidence
- Policy matches
- Recommended action
- Reviewer decision
- Audit notes
