export class BusinessRuleViolationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'BusinessRuleViolationError'
  }
}
